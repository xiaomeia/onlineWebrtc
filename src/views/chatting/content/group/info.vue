<template>
  <div class="user_setting">
    <div class="avatar">
      <input @change="fileChangeHandler" ref="fileRef" type="file" />
      <img :src="groupInfo.avatar" @click="touchedAvatar" class="av" />
      <img @click="viewQrcode" class="qrcode" src="/image/qr.png" v-if="groupInfo.member_invite" />
    </div>

    <div class="line">
      <span class="ll">群名称</span>
      <p @click="nameModifyHandler" class="lr">{{ groupInfo.name }}</p>
    </div>

    <div class="line">
      <span class="ll">群id</span>
      <p class="lr">{{ getSid }}</p>
    </div>

    <div class="line">
      <span class="ll">群描述</span>
      <p @click="descriptionModifyHanderl" class="lr">
        {{ groupInfo.description }}
      </p>
    </div>

    <div class="line">
      <span class="ll">群名片</span>
      <p @click="cardModifyHandler" class="lr">{{ cardName }}</p>
    </div>

    <div @click="destroyClickHandler" class="logout mt15">
      {{ dismissMessage }}
    </div>

    <div @click="chatClickHandler" class="logout mt15">开始聊天</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'groupInfo',
  data() {
    return {
      groupInfo: {},
      cardName: ''
    };
  },
  mounted() {
    this.refreshGroupInfo(this.getSid);

    proxy.flooIm.on('onGroupListUpdate', () => {
      this.$store.dispatch('contact/actionClearGroupList');
      this.$store.dispatch('contact/actionLazyGetGroupList');
    });
  },
  watch: {
    getSid(newSid) {
      this.refreshGroupInfo(newSid);
    }
  },
  components: {},
  computed: {
    ...mapGetters('content', ['getGroupInfo', 'getSid', 'getAdminList', 'getMemberList']),

    token() {
      return proxy.flooIm.userManage.getToken();
    },

    group_id() {
      return this.getGroupInfo.group_id;
    },

    owner_id() {
      return this.getGroupInfo.owner_id;
    },
    isAdmin() {
      const uid = proxy.flooIm.userManage.getUid();
      return this.getAdminList.filter((x) => x.user_id === uid).length > 0 || this.getGroupInfo.member_modify;
    },
    isOwner() {
      const uid = proxy.flooIm.userManage.getUid();
      return this.getGroupInfo.owner_id === uid;
    },
    dismissMessage() {
      return this.isOwner ? '解散' : '退出';
    }
  },
  methods: {
    refreshGroupInfo(newSid) {
      proxy.flooIm.groupManage
        .asyncGetInfo({ group_id: newSid })
        .then((res) => {
          res.avatar = proxy.flooIm.sysManage.getImage({
            avatar: res.avatar,
            type: 'group'
          });
          this.groupInfo = res;
          const uid = proxy.flooIm.userManage.getUid();
          const user = this.getMemberList.find((x) => x.user_id === uid);
          this.cardName = (user && (user.display_name || user.name)) || '';
          if (!this.cardName) {
            proxy.flooIm.groupManage
              .asyncGetMemberDisplayName({
                group_id: newSid,
                user_list: [uid]
              })
              .then((res) => {
                if (!res || !res.length) {
                  return;
                }
                res.forEach((item) => {
                  this.cardName = item.display_name;
                });
              });
          }
        })
        .catch((ex) => {
          this.serr(ex);
        });
    },

    chatClickHandler() {
      this.$store.dispatch('header/actionChangeHeaderStatus', 'conversation');
      this.$store.dispatch('content/actionSetType', {
        sid: this.getSid,
        type: 'groupchat'
      });
    },
    touchedAvatar() {
      if (this.isAdmin) {
        this.$refs.fileRef.click();
      }
    },

    fileChangeHandler(e) {
      const file = e.target.files[0];

      proxy.flooIm.sysManage
        .asyncFileUpload({
          file,
          toType: 'groupAvatar',
          group_id: this.getSid,
          processCallback: function (res) {
            console.log('fileChangeHandler groupAvatar file upload percent :' + 100 * (res.loaded / res.total));
          }
        })
        .then((res) => {
          this.$refs.fileRef.value = '';
          this.updateAvatarUrl(res.url);
        })
        .catch(() => {
          this.$refs.fileRef.value = '';
        });
    },

    updateAvatarUrl(url) {
      proxy.flooIm.groupManage
        .asyncUpdateAvatar({
          group_id: this.getSid,
          value: url
        })
        .then(() => {
          this.$store.dispatch('content/actionUpdateGroup');
          alert('更新头像完成');
        });
    },

    destroyClickHandler() {
      if (this.isOwner) {
        //dismiss
        proxy.flooIm.groupManage.asyncDestroy({ group_id: this.getSid }).then(() => {
          alert('您已解散了此群。。');
        });
      } else {
        //leave
        proxy.flooIm.groupManage.asyncLeave({ group_id: this.getSid }).then(() => {
          alert('您已退出了此群。。');
        });
      }

      const also_delete_other_devices = true;
      proxy.flooIm.sysManage.deleteConversation(this.getSid, also_delete_other_devices);
    },
    viewQrcode() {
      this.$store.dispatch('layer/actionSetShowmask', 'true');
      this.$store.dispatch('layer/actionSetShowing', 'qrgroup');
    },
    nameModifyHandler() {
      if (!this.isAdmin && !this.isOwner && !this.getGroupInfo.member_modify) {
        return;
      }
      this.$prompt('请输入群名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) return;
          proxy.flooIm.groupManage
            .asyncUpdateName({
              group_id: this.getSid,
              value
            })
            .then(() => {
              this.name = value;
              alert('修改成功');
            });
        })
        .catch(() => {});
    },
    descriptionModifyHanderl() {
      if (!this.isAdmin && !this.isOwner && !this.getGroupInfo.member_modify) {
        return;
      }
      this.$prompt('请输入群描述', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) return;
          proxy.flooIm.groupManage
            .asyncUpdateDescription({
              group_id: this.getSid,
              value
            })
            .then(() => {
              this.description = value;
              alert('修改成功');
            });
        })
        .catch(() => {});
    },
    cardModifyHandler() {
      this.$prompt('请输入群名片', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) return;
          proxy.flooIm.groupManage
            .asyncUpdateDisplayName({
              group_id: this.getSid,
              value
            })
            .then(() => {
              this.$store.dispatch('content/actionUpdateMemberList');
              this.cardName = value;
              alert('修改成功');
            });
        })
        .catch(() => {});
    }
    //methods finish
  }
};
</script>

<style scoped>
.mt15 {
  margin-top: 15px !important;
}
</style>
