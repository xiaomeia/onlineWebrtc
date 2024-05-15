<template>
  <div @click="closeLayer" class="image_layer">
    <img :src="getImageUrl" class="image" v-if="getShowing == 'image'" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { useLayerStore } from '@/store/modules/layer';
import { useMainStore } from '@/store/modules/index';
const mainStore = useMainStore()
const layerStore = useLayerStore();
export default {
  data() {
    return {};
  },
  name: 'image2',
  mounted() {},

  computed: {
    getShowing() {
      return layerStore.getShowing
    },
    getImageUrl() {
      return layerStore.getImageUrl
    },
    // ...mapGetters('layer', ['getShowing']),
    // ...mapGetters('layer', ['getImageUrl']),
    token() {
      return mainStore.im.userManage.getToken();
    },
    im() {
      return mainStore.im;
    }
  },
  methods: {
    clickJoinGroupCloseHandler() {
      layerStore.actionSetShowing('');
      layerStore.actionSetShowmask(false)
      // this.$store.dispatch('layer/actionSetShowing', '');
      // this.$store.dispatch('layer/actionSetShowmask', false);
    },
    closeLayer() {
      layerStore.actionSetShowing('');
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
