

export const useMainStore = defineStore("main", {
  state: () => ({
    appID: "",
    im: {},
    client: {},
  }),

  getters: {
    getAppID: (state) => state.appID,
    // wim: (state) => state.im,
    getIm: (state) => state.im,
    getClient: (state) => state.client
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
    }
  },
});
