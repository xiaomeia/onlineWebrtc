//collection.js

// const state = {
//   headerStatus: 'contact',
//   userProfile: {},
//   supportSafariAudio: false
// };

const headerRequestFlag = {
  profile: false
};

// const getters = {
//   getHeaderStatus(state) {
//     return state.headerStatus;
//   },
//   getUserProfile(state) {
//     return state.userProfile;
//   },
//   getSupportSafariAudio(state) {
//     return state.supportSafariAudio;
//   }
// };

// const mutations = {
//   changeHeaderStatus(state, status) {
//     state.headerStatus = status;
//   },

//   changeHeaderUserProfile(state, profile) {
//     state.userProfile = profile;
//   },

//   changeSupportSafariAudio(state, status) {
//     state.supportSafariAudio = status;
//   }
// };

// const actions = {
//   actionChangeHeaderStatus(context, status) {
//     context.commit('changeHeaderStatus', status);
//   },
//   actionChangeHeaderUserProfile(context, profile) {
//     context.commit('changeHeaderUserProfile', profile);
//   },
//   actionGetHeaderProfile(context) {
//     const { rootState } = context;
//     rootState.im.userManage.asyncGetProfile(true).then((profile) => {
//       context.commit('changeHeaderUserProfile', profile);
//     });
//   },
//   actionLazyGetHeaderProfile(context) {
//     const { state, rootState } = context;
//     if (!state.userProfile.user_id && !headerRequestFlag.profile) {
//       headerRequestFlag.profile = true;
//       rootState.im.userManage.asyncGetProfile().then((profile) => {
//         context.commit('changeHeaderUserProfile', profile);
//         headerRequestFlag.profile = false;
//       });
//     }
//   },
//   actionChangeSupportSafariAudio(context, status) {
//     context.commit('changeSupportSafariAudio', status);
//   }
// };
// export default {
//   namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
//   state,
//   getters,
//   mutations,
//   actions
// };


// headerStore.js
// import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', {
  state: () => ({
    headerStatus: 'contact',
    userProfile: {},
    supportSafariAudio: false
  }),

  getters: {
    getHeaderStatus: (state) => state.headerStatus,
    getUserProfile: (state) => state.userProfile,
    getSupportSafariAudio: (state) => state.supportSafariAudio
  },

  actions: {
    actionChangeHeaderStatus(status) {
      this.headerStatus = status;
    },

    actionChangeHeaderUserProfile(profile) {
      this.userProfile = profile;
    },

    async actionGetHeaderProfile() {
      // todo
      const userManage = useUserManageStore();
      const profile = await userManage.asyncGetProfile(true);
      this.userProfile = profile;
    },

    async actionLazyGetHeaderProfile() {
      // todo
      if (!this.userProfile.user_id && !headerRequestFlag.profile) {
        headerRequestFlag.profile = true;
        const userManage = useUserManageStore();
        const profile = await userManage.asyncGetProfile();
        this.userProfile = profile;
        headerRequestFlag.profile = false;
      }
    },

    actionChangeSupportSafariAudio(status) {
      this.supportSafariAudio = status;
    }
  }
});

