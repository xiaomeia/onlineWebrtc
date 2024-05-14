<template>
  <div class="l_conversation" ref="imgContainer">
    <div :class="{ sel: getSid == conversation.sid }" @click="touchConversation(index)" class="item" v-bind:key="index" v-for="(conversation, index) in getConversationList">
      <span :class="{ none: conversation.unread === 0 }" class="unread_number">{{ conversation.unread }}</span>

      <div v-if="conversation.sid === 0">
        <img class="avatar" :src="system_roster.avatar" />
        <div class="name">{{ system_roster.name }}</div>
      </div>
      <div v-else>
        <img class="avatar" :src="conversation.avatar" />
        <div class="name">{{ conversation.name }}</div>
      </div>

      <div class="last_msg_time">
        {{ formatTimeString(conversation.timestamp) }}
      </div>
      <div class="last_msg">{{ conversation.content }}</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { toNumber } from '@/utils/index';
// import moment from 'moment';
import { useChatviewStore } from '@/store/modules/content';
import { useCollectionStore } from '@/store/modules/contact';
import { useHeaderStore } from '@/store/modules/header';

const chatviewStore = useChatviewStore();
const collectionStore = useCollectionStore();
const headerStore = useHeaderStore();

export default {
  data() {
    return {
      system_roster: {
        name: '系统通知',
        avatar: '/image/setting.png'
      }
    };
  },
  mounted() {
    collectionStore.getConversationList()
    // this.$store.dispatch('contact/actionGetConversationList');
  },

  computed: {
    ...mapGetters('contact', ['getConversationList']),
    ...mapGetters('content', ['getSid']),
    token() {
      return proxy.flooIm.userManage.getToken();
    }
  },

  watch: {
    getConversationList() {
      //refresh list
    }
  },

  methods: {
    formatTimeString(timestamp) {
      if (!timestamp) return '';

      const timestampNumber = toNumber(timestamp);
      return moment(timestampNumber).calendar('', {
        sameDay: 'HH:mm',
        lastDay: 'HH:mm',
        lastWeek: 'YY/MM/DD',
        sameElse: 'YY/MM/DD'
      });
    },

    touchConversation(index) {
      const conversation = this.getConversationList[index];
      headerStore.actionChangeHeaderStatus('conversation')
      chatviewStore.actionSetType({
        sid: conversation.sid,
        type: conversation.type === 'group' ? 'groupchat' : 'rosterchat'
      })
      // this.$store.dispatch('header/actionChangeHeaderStatus', 'conversation');
      // this.$store.dispatch('content/actionSetType', {
      //   sid: conversation.sid,
      //   type: conversation.type === 'group' ? 'groupchat' : 'rosterchat'
      // });
    }
  }
};
</script>

<style scoped></style>
