<template>
  <div class="contact">
    <ConContact v-if="showContact" />
    <ConConversation v-if="showConversation" />
  </div>
</template>

<script>
import ConContact from './conContact.vue';
import ConConversation from './conConversation.vue';
import { useHeaderStore } from '@/store/modules/header';

const headerStore = useHeaderStore()
// import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {
    ConContact,
    ConConversation
  },
  computed: {
    // ...mapGetters('header', ['getHeaderStatus']),
    showContact() {
      return headerStore.getHeaderStatus === 'contact';
    },
    showConversation() {
      return headerStore.getHeaderStatus === 'conversation';
    }
  },
  methods: {}
};
</script>

<style scoped></style>
