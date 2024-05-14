

export const useMainStore = defineStore("main", {
  state: () => ({
    appID: "",
    im: {},
  }),

  getters: {
    getAppID: (state) => state.appID,
    // wim: (state) => state.im,
    getIm: (state) => state.im
  },

  actions: {
    actionChangeAppID(appID) {
      this.appID = appID;
    },

    actionSaveIm(im) {
      this.im = im;
    },
  },
});
