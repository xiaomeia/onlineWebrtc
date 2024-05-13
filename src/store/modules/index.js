// import Vue from 'vue';
// import Vuex from 'vuex';

// import Login from './login';
// import header from './header';
// import contact from './contact';
// import chat from './content';
// import content from './content';
// import forward from './forward';
// import setting from './setting';
// import layer from './layer';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     login: Login,
//     header,
//     contact,
//     chat,
//     content,
//     forward,
//     setting,
//     layer
//   },

//   state: {
//     appID: '',
//     im: {}
//   },

//   getters: {
//     getAppID(state) {
//       return state.appID;
//     },

//     wim(state) {
//       return state.im;
//     },
//     im(state) {
//       return state.im;
//     }
//   },

//   mutations: {
//     changeAppID(state, newAppID) {
//       state.appID = newAppID;
//     },

//     saveIm(state, pim) {
//       state.im = pim;
//     }
//   },

//   actions: {
//     actionChangeAppID(context, appID) {
//       context.commit('changeAppID', appID);
//     },

//     actionSaveIm(context, pim) {
//       context.commit('saveIm', pim);
//     }
//   }
// });

// store.js
// import { createPinia } from 'pinia';
// import { useLoginStore } from './login';
// import { useHeaderStore } from './header';
// import { useContactStore } from './contact';
// import { useChatStore } from './content';
// import { useContentStore } from './content';
// import { useForwardStore } from './forward';
// import { useSettingStore } from './setting';
// import { useLayerStore } from './layer';

// const pinia = createPinia();

export const useStore = defineStore('main', {
  state: () => ({
    appID: '',
    im: {}
  }),

  getters: {
    getAppID: (state) => state.appID,
    wim: (state) => state.im,
    im: (state) => state.im
  },

  actions: {
    actionChangeAppID(appID) {
      this.appID = appID;
    },

    actionSaveIm(pim) {
      this.im = pim;
    }
  }
});

// export default pinia;

// 在 main.js 中使用 Pinia
// import { createApp } from 'vue';
// import App from './App.vue';
// import pinia from './store';

// const app = createApp(App);
// app.use(pinia);
// app.mount('#app');
