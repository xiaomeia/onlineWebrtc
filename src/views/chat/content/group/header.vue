<template>
  <div class="header">
    <div class="header_items">
      <span class="name" @click="touchUserNameHandler">{{ groupName }}</span>
      <span class="typing" style="padding-left: 20px; color: #ddd"></span>
      <div class="delete_button" @click="deleteConversation(getSid)">删除会话</div>
    </div>
    <div class="mention_title" v-if="this.mentionMessage !== ''">
      <span @click="closeMention" class="closer">x</span>
      <span class="text">{{ mentionMessage }}</span>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { toNumber } from '@/utils/index';
import { useChatviewStore } from '@/store/modules/content';
import { useCollectionStore } from '@/store/modules/contact';
import { useHeaderStore } from '@/store/modules/header';
const chatviewStore = useChatviewStore();
const collectionStore = useCollectionStore();
const headerStore = useHeaderStore();

export default {
  name: 'GroupChat',
  data() {
    return {
      mentionMessage: ''
    };
  },
  mounted() {
    proxy.flooIm.on('onMentionMessage', (messages) => {
      const { from, config } = messages;
      const gid = this.getSid;
      const toUid = toNumber(messages.to);
      if (gid === toUid) {
        if (config && config.mentionList && config.mentionList.length) {
          // 如果有mention的
          const uid = proxy.flooIm.userManage.getUid();
          const hasIndex = config.mentionList.findIndex((x) => x + '' === uid + '');
          if (hasIndex > -1) {
            const umaps = proxy.flooIm.rosterManage.getAllRosterDetail();
            const str = umaps[from].username + ' 在群中提到了您!';
            this.mentionMessage = str;
          }
        }
        ////
      }
    });
  },
  components: {},
  computed: {
    ...mapGetters('content', ['getGroupInfo', 'getSid']),
    groupName() {
      let name = this.getGroupInfo.name;
      if (!name) {
        chatviewStore.actionUpdateGroup()
        // this.$store.dispatch('content/actionUpdateGroup');
      }
      return name;
    }
  },
  methods: {
    touchUserNameHandler() {
      chatviewStore.actionSetType({
        sid: this.getSid,
        type: 'groupinfo'
      })
      // this.$store.dispatch('content/actionSetType', {
      //   sid: this.getSid,
      //   type: 'groupinfo'
      // });
    },

    deleteConversation(id) {
      const also_delete_other_devices = true;
      proxy.flooIm.sysManage.deleteConversation(id, also_delete_other_devices);
      alert('会话删除成功');

      collectionStore.getConversationList()
      headerStore.actionChangeHeaderStatus('conversation')
      chatviewStore.actionSetType({
        sid: undefined
      })
      // this.$store.dispatch('contact/actionGetConversationList');
      // this.$store.dispatch('header/actionChangeHeaderStatus', 'conversation');
      // this.$store.dispatch('content/actionSetType', {
      //   sid: undefined
      // });
    },

    closeMention() {
      this.mentionMessage = '';
    }
    //finish
  }
};
</script>

<style scoped></style>
