

export const useMainStore = defineStore("main", {
  state: () => ({
    appID: "",
    im: {},
    client: {},
    videoShow: false,
  }),

  getters: {
    getAppID: (state) => state.appID,
    // wim: (state) => state.im,
    getIm: (state) => state.im,
    getClient: (state) => state.client,
    getVideoShow: (state) => state.videoShow,
  },

  actions: {
    actionChangeAppID(appID) {
      this.appID = appID;
    },

    actionSaveIm(im) {
      this.im = im;
    },
    actionSetClient(client) {
      this.client = client;
    },
    actionSetVideoShow(videoShow) {
      this.videoShow = videoShow
    },
  },
});
