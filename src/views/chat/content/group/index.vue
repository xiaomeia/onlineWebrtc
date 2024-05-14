<template>
  <div class="chat-index">
    <MemberList />
    <Header />
    <Chat />
    <Inputer />
    <Forward />
  </div>
</template>

<script>
import Chat from './chat.vue';
import Inputer from './inputer.vue';
import Header from './header.vue';
import Forward from './forward.vue';
import MemberList from './memberList';

import { useChatviewStore } from '@/store/modules/content';
const chatviewStore = useChatviewStore();

import { useMainStore } from "@/store/modules/index";

const mainStore = useMainStore();

// import { mapGetters } from 'vuex';

export default {
  name: 'GroupChat',
  data() {
    return {
      // status: "login"
    };
  },
  mounted() {
    this.requireGroups();
    chatviewStore.actionOpenGroup()
    // this.$store.dispatch('content/actionOpenGroup');

    mainStore.getIm.on('onGroupMemberChanged', (/*gid*/) => {
      chatviewStore.actionUpdateMemberList()
      // this.$store.dispatch('content/actionUpdateMemberList');
    });
  },
  components: {
    Header,
    Chat,
    Inputer,
    Forward,
    MemberList
  },
  computed: {
    // ...mapGetters('content', ['getSid', 'getMessages', 'getMessageTime'])
  },
  methods: {
    requireGroups() {
      // 获取 memberlist  admin, 拉新数据
    }
  },
  watch: {
    getSid(a, b) {
      if (a !== b) {
        chatviewStore.actionOpenGroup()
        // this.$store.dispatch('content/actionOpenGroup');
      }
    }
  }
};
</script>

<style scoped></style>
