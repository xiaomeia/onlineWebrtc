<template>
  <div class="chat-index">
    <audio id="phone_ring_player" src="/audio/phone_ring.mp3" class="hide" autoplay playsinline muted />
    <Header />
    <Contact />
    <Content />
  </div>
</template>

<script>
import Header from './header';
import Contact from './contact';
import Content from './content';
import { toNumber } from '@/utils/index';
import { useCollectionStore } from '@/store/modules/contact';
import { useLayerStore } from '@/store/modules/layer';
import { useMainStore } from "@/store/modules/index";

const mainStore = useMainStore();
// import { useCollectionStore } from '@/stores/collectionStore';

// import { mapGetters } from 'vuex';

// import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: 'HelloWorld',
  components: {
    Header,
    Contact,
    Content
  },
  data() {
    return {
      callMap: new Map()
    };
  },
  mounted() {
    console.log('test--------------------------------', this.$root.$options.flooIm)
    const collectionStore = useCollectionStore();
    const layersStore = useLayerStore();
    {
      const au = document.getElementById('phone_ring_player');
      au.muted = false;
      au.loop = false;
      au.pause();
    }

    mainStore.getIm.on('onRosterListUpdate', () => {
      collectionStore.clearRosterList()
      collectionStore.lazyGetRosterList()
      // this.$store.dispatch('contact/actionClearRosterList');
      // this.$store.dispatch('contact/actionLazyGetRosterList');
    });

    mainStore.getIm.on('onGroupListUpdate', () => {
      collectionStore.clearGroupList()
      collectionStore.lazyGetGroupList()
      // this.$store.dispatch('contact/actionClearGroupList');
      // this.$store.dispatch('contact/actionLazyGetGroupList');
    });

    mainStore.getIm.on('recentlistUpdate', () => {
      collectionStore.getConversationList()
      // this.$store.dispatch('contact/actionGetConversationList');
    });

    mainStore.getIm.on('onUnreadChange', () => {
      collectionStore.getConversationList()
      // this.$store.dispatch('contact/actionGetConversationList');
    });

    mainStore.getIm.on('onRosterInfoUpdate', () => {
      collectionStore.getConversationList()
      // this.$store.dispatch('contact/actionGetConversationList');
    });

    mainStore.getIm.on('onRosterRTCMessage', (message) => {
      let that = this;
      const { config, isHistory, isNative } = message;
      const fromUid = toNumber(message.from);
      const toUid = toNumber(message.to);
      const uid = mainStore.getIm.userManage.getUid();
      const au = document.querySelector('#phone_ring_player');
      const callStatus = mainStore.getIm.rtcManage.getInCallStatus();

      if (!isHistory && config && !isNative) {
        if (config.action && config.action === 'call' && config.initiator) {
          if (callStatus == false) {
            this.callMap.set(
              config.callId,
              setTimeout(function () {
                if (config.initiator !== uid && toUid === uid) {
                  collectionStore.setCallInviteInfo(config)
                  collectionStore.setCallId(config.callId)
                  layersStore.actionSetShowmask('true')
                  layersStore.actionSetShowing('callinvite')
                  // that.$store.dispatch('contact/actionSetCallInviteInfo', config);
                  // that.$store.dispatch('contact/actionSetCallId', config.callId);
                  // that.$store.dispatch('layer/actionSetShowmask', 'true');
                  // that.$store.dispatch('layer/actionSetShowing', 'callinvite');
                  au.loop = true;
                  au.play();
                } else {
                  // current user other device launch call，just display message and do nothing.
                }
              }, 1000)
            );
          } else {
            if (config.initiator !== uid && toUid === uid) {
              mainStore.getIm.rtcManage.sendRTCMessage({
                uid: fromUid,
                content: 'busy',
                config: JSON.stringify({
                  action: 'hangup',
                  callId: config.callId,
                  initiator: config.initiator,
                  pushMessageLocKey: 'callee_busy'
                })
              });
            } else {
              // should not come here.
            }
          }
        } else if (config.action && config.action == 'pickup') {
          this.removeDelayCall(config.callId);
          this.stopPhoneRing();
          if (fromUid === uid) {
            // current use other device pickup call.
            layersStore.actionSetShowing('')
            layersStore.actionSetShowmask(false)
            collectionStore.setCallInviteInfo(null)
            collectionStore.setCallId('')
            collectionStore.setCallPickupTime(0)
            // this.$store.dispatch('layer/actionSetShowing', '');
            // this.$store.dispatch('layer/actionSetShowmask', false);
            // this.$store.dispatch('contact/actionSetCallInviteInfo', null);
            // this.$store.dispatch('contact/actionSetCallId', '');
            // this.$store.dispatch('contact/actionSetCallPickupTime', 0);
          } else {
            mainStore.getIm.rtcManage.joinRoom();
          }
        } else if (config.action && config.action == 'hangup') {
          this.removeDelayCall(config.callId);
          this.stopPhoneRing();
          layersStore.actionSetShowing('')
          layersStore.actionSetShowmask(false)
          collectionStore.setCallInviteInfo(null)
          collectionStore.setCallId('')
          collectionStore.setCallPickupTime(0)
          // this.$store.dispatch('layer/actionSetShowing', '');
          // this.$store.dispatch('layer/actionSetShowmask', false);
          // this.$store.dispatch('contact/actionSetCallInviteInfo', null);
          // this.$store.dispatch('contact/actionSetCallId', '');
          // this.$store.dispatch('contact/actionSetCallPickupTime', 0);
        } else if (config.action && config.action == 'record') {
          this.removeDelayCall(config.callId);
          this.stopPhoneRing();
          if (fromUid === uid) {
            // current user other device hangup call. just display message and do nothing.
          } else {
            if (callStatus == true) {
              mainStore.getIm.rosterManage.readRosterMessage(fromUid, message.id);
            }
          }
        }
      }
    });
  },
  methods: {
    removeDelayCall(callId) {
      if (this.callMap.has(callId)) {
        clearTimeout(this.callMap.get(callId));
        this.callMap.delete(callId);
      }
    },

    stopPhoneRing() {
      const au = document.querySelector('#phone_ring_player');
      au.loop = false;
      au.pause();
    }
    // clickA() {
    //   // this.$store.dispatch("test/invokePushItems", "hello");
    // }
    // ...mapActions("login", ["alertName"])
  }
};
</script>

<style scoped></style>
