<template>
  <div class="l_conversation" ref="imgContainer">
    <div class="conversation-top">
      <img src="" alt="">
      <div>
        <span class="name">医生</span><br />
        <span>主治医生</span>
      </div>
    </div>
    <div class="searchArea">
      <input @input="handleSearch" placeHolder="查找联系人" type="text" v-model="kw" />
    </div>
    <div :class="{ sel: getSid == conversation.sid }" @click="touchConversation(index)" class="item" v-bind:key="index" v-for="(conversation, index) in getConversationList">
      <span :class="{ none: conversation.unread === 0 }" class="unread_number">{{ conversation.unread }}</span>

      <div class="patient" v-if="conversation.sid === 0">
<!--        <img class="avatar" :src="system_roster.avatar" />-->
        <div class="name">{{ system_roster.name }}</div>
        <div class="sex">男</div>
        <div class="age">18岁</div>
      </div>
      <div class="patient" v-else>
<!--        <img class="avatar" :src="conversation.avatar" />-->
        <div class="name">{{ conversation.name }}</div>
        <div class="sex">男</div>
        <div class="age">18岁</div>
        <div class="status">
          已完成
        </div>
      </div>

      <div class="last_msg_time">
       医生就诊时间： {{ formatTimeString(conversation.timestamp) }}
      </div>
<!--      <div class="last_msg">{{ conversation.content }}</div>-->
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { toNumber } from '@/utils/index';
import moment from 'moment';
import { useChatviewStore } from '@/store/modules/content';
import { useCollectionStore } from '@/store/modules/contact';
import { useHeaderStore } from '@/store/modules/header';
import { useMainStore } from "@/store/modules/index";

const mainStore = useMainStore();

const chatviewStore = useChatviewStore();
const collectionStore = useCollectionStore();
const headerStore = useHeaderStore();

export default {
  data() {
    return {
      kw: '',
      system_roster: {
        name: '系统通知',
        avatar: '/image/setting.png'
      }
    };
  },
  mounted() {
    collectionStore.actionGetConversationList()
    // todo 获取url id
    chatviewStore.actionSetType({
      sid: this.getConversationList?.[0].sid,
      type: 'rosterchat'
    })
  },

  computed: {
    getConversationList () {
      return collectionStore.getConversationList;
    },
    getSid() {
      return chatviewStore.getSid;
    },
    // ...mapGetters('contact', ['getConversationList']),
    // ...mapGetters('content', ['getSid']),
    token() {
      return mainStore.getIm.userManage.getToken();
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
    },
    handleSearch(e) {
      const kw = e.target.value;
      // this.$store.dispatch('contact/actionSetSearchkeyword', kw);
      collectionStore.setSearchkeyword(kw);
    }
  }
};
</script>

<style scoped lang="scss">
.conversation-top {
  color: #ACAFBA;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  margin-top: 28px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 48px;
    margin-right: 10px;
  }
  .name {
    color: #E9E7EC;
    font-size: 16px;
  }
}
.patient {
  display: flex;
  margin-left: 20px;
  line-height: 1.2;
  padding-top: 12px;
  color: #E9E7EC;
  position: relative;
  div {
    margin-right: 20px;
  }
  .status {
    position: absolute;
    right: 0;
    font-size: 14px;
    color: #ACAFBA;
  }
}
.searchArea {
  input {
    width: 286px;
    height: 32px;
    background: #4F5054;
    border-radius: 8px;
    border: none;
    color: #fff;
    margin: 20px 17px;
  }
}
</style>
