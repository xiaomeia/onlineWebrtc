// //collection.js
// // import { toNumber } from '../third/tools';

// const state = {
//   // groupsetting, addfriend, creategroup, joingroup, search, addpop // qrlogin, qrprofile, qrgroup
//   showing: '',
//   showmask: false,
//   imageUrl: '',
//   videoUrl: '',
//   appID: ''
// };

// const getters = {
//   getShowing(state) {
//     return state.showing;
//   },
//   getShowmask(state) {
//     return state.showmask;
//   },

//   gettingqrcode(state) {
//     return state.qrcode;
//   },
//   getImageUrl(state) {
//     return state.imageUrl;
//   },
//   getVideoUrl(state) {
//     return state.videoUrl;
//   },
//   getAppID(state) {
//     return state.appID;
//   }
// };

// const mutations = {
//   setShowing(state, x) {
//     state.showing = x;
//   },
//   setShowmask(state, x) {
//     state.showmask = x;
//   },

//   setImageUrl(state, x) {
//     state.imageUrl = x;
//   },
//   setVideoUrl(state, x) {
//     state.videoUrl = x;
//   },

//   setAppID(state, x) {
//     state.appID = x;
//   }
// };

// const actions = {
//   actionSetShowing(context, x) {
//     if (x === 'addpop' && state.showing === 'addpop') {
//       x = '';
//     }
//     context.commit('setShowing', x);
//   },
//   actionSetShowmask(context, x) {
//     context.commit('setShowmask', x);
//   },

//   actionSetQrcode(context, x) {
//     context.commit('setQrcode', x);
//   },

//   actionSetAppID(context, x) {
//     context.commit('setAppID', x);
//   },

//   actionSetImageUrl(context, x) {
//     context.commit('setImageUrl', x);
//   },

//   actionSetVideoUrl(context, x) {
//     context.commit('setVideoUrl', x);
//   }
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// };

// layerStore.js
// import { defineStore } from 'pinia';

export const useLayerStore = defineStore('layer', {
  state: () => ({
    showing: '',
    showmask: false,
    imageUrl: '',
    videoUrl: '',
    appID: ''
  }),

  getters: {
    getShowing: (state) => state.showing,
    getShowmask: (state) => state.showmask,
    gettingqrcode: (state) => state.qrcode,
    getImageUrl: (state) => state.imageUrl,
    getVideoUrl: (state) => state.videoUrl,
    getAppID: (state) => state.appID
  },

  actions: {
    actionSetShowing(x) {
      if (x === 'addpop' && this.showing === 'addpop') {
        x = '';
      }
      this.showing = x;
    },

    actionSetShowmask(x) {
      this.showmask = x;
    },

    actionSetQrcode(x) {
      this.qrcode = x;
    },

    actionSetAppID(x) {
      this.appID = x;
    },

    actionSetImageUrl(x) {
      this.imageUrl = x;
    },

    actionSetVideoUrl(x) {
      this.videoUrl = x;
    }
  }
});
