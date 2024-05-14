<template>
  <div class="user_setting">
    <div class="avatar">
      <img :src="userInfo.avatar" class="av" />
    </div>

    <div class="line">
      <span class="ll">用户id</span>
      <p class="lr">{{ userInfo.user_id }}</p>
    </div>

    <div class="line">
      <span class="ll">用户名称</span>
      <p class="lr">{{ rosterName }}</p>
    </div>

    <div class="line">
      <span class="ll">用户昵称</span>
      <p class="lr">{{ nickName }}</p>
    </div>

    <div class="line">
      <span class="ll">用户别名</span>
      <p @click="setRosterAlias" class="lr">{{ alias }}</p>
    </div>

    <div @click="chatRemoveHandler" class="logout mt15" v-if="isFriend">删除好友</div>
    <div @click="addFriendHandler" class="logout mt15" v-else>添加好友</div>
    <div @click="chatClickHandler" class="logout mt15" v-if="isFriend">开始聊天</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { useChatviewStore } from '@/store/modules/content';
import { useCollectionStore } from '@/store/modules/contact';
import { useHeaderStore } from '@/store/modules/header';
const chatviewStore = useChatviewStore();
const collectionStore = useCollectionStore();
const headerStore = useHeaderStore();

export default {
  name: 'rosterInfo',
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.refreshUserInfo(this.getSid);

    mainStore.getIm.on('onRosterInfoUpdate', (ids) => {
      if (Array.isArray(ids) && ids.includes(this.getSid)) {
        this.refreshUserInfo(this.getSid);
      }
    });
  },
  watch: {
    getSid(newSid) {
      this.refreshUserInfo(newSid);
    }
  },
  components: {},
  computed: {
    // ...mapGetters('content', ['getSid']),
    // ...mapGetters('contact', ['getRosterList']),
    rosterName() {
      return this.userInfo.username;
    },
    alias() {
      return this.userInfo.alias;
    },
    nickName() {
      return this.userInfo.nick_name;
    },
    token() {
      return mainStore.getIm.userManage.getToken();
    },
    isFriend() {
      const index = this.getRosterList.findIndex((x) => x.user_id === this.getSid);
      return index >= 0;
    }
  },
  methods: {
    refreshUserInfo(newSid) {
      mainStore.getIm.rosterManage.asyncSearchRosterById({ user_id: newSid }).then((res) => {
        res.avatar = mainStore.getIm.sysManage.getImage({
          avatar: res.avatar,
          type: 'roster'
        });
        this.userInfo = res;
      });
    },
    setRosterAlias() {
      const im = mainStore.getIm;
      this.$prompt('请输入别名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (!value) return;
          im.rosterManage.asyncUpdateRosterAlias({ user_id: this.getSid, alias: value }).then(() => {
            chatviewStore.actionUpdateRoster()
            collectionStore.getConversationList()
            collectionStore.lazyGetRosterList()
            // this.$store.dispatch('content/actionUpdateRoster');
            // this.$store.dispatch('contact/actionGetConversationList');
            // this.$store.dispatch('contact/actionLazyGetRosterList');
            alert('修改成功');
          });
        })
        .catch(() => {});
    },
    chatRemoveHandler() {
      mainStore.getIm.rosterManage.asyncDeleteRoster({ user_id: this.getSid }).then(() => {
        alert('好友已删除');
      });

      const also_delete_other_devices = true;
      mainStore.getIm.sysManage.deleteConversation(this.getSid, also_delete_other_devices);
    },
    addFriendHandler() {
      const { user_id, username } = this.userInfo;
      const alias = username;
      mainStore.getIm.rosterManage.asyncApply({ user_id, alias }).then(() => {
        alert('请求已发送成功!');
      });
    },

    chatClickHandler() {
      headerStore.actionChangeHeaderStatus('conversation')
      chatviewStore.actionSetType({
        sid: this.getSid,
        type: 'rosterchat'
      })
      // this.$store.dispatch('header/actionChangeHeaderStatus', 'conversation');
      // this.$store.dispatch('content/actionSetType', {
      //   sid: this.getSid,
      //   type: 'rosterchat'
      // });
    }
  }
};
</script>

<style scoped>
.mt15 {
  margin-top: 15px !important;
}
</style>
