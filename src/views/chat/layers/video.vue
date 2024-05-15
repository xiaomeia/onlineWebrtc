<template>
  <div @click="closeLayer" class="video_layer">
    <video :src="getVideoUrl" autoplay class="video" v-if="getShowing == 'video'" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { useLayerStore } from '@/store/modules/layer';
import { useMainStore } from '@/store/modules/index';
const mainStore = useMainStore();
const layerStore = useLayerStore();

export default {
  data() {
    return {};
  },
  name: 'video',
  mounted() {},

  computed: {
    // ...mapGetters('layer', ['getShowing']),
    // ...mapGetters('layer', ['getVideoUrl']),
    getShowing() {
      return layerStore.getShowing
    },
    getVideoUrl() {
      return layerStore.getVideoUrl
    },
    token() {
      return mainStore.im.userManage.getToken();
    },
    im() {
      return mainStore.im;
    }
  },
  methods: {
    clickJoinGroupCloseHandler() {
      layerStore.actionSetShowing('')
      layerStore.actionSetShowmask(false)
      // this.$store.dispatch('layer/actionSetShowing', '');
      // this.$store.dispatch('layer/actionSetShowmask', false);
    },
    closeLayer() {
      layerStore.actionSetShowing('')
      layerStore.actionSetShowmask(false)
      // this.$store.dispatch('layer/actionSetShowing', '');
      // this.$store.dispatch('layer/actionSetShowmask', false);
    }

    //finish
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.closer {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 34px;
  font-weight: bold;
  color: white;
}
</style>
