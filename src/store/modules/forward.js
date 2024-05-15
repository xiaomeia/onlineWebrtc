// //collection.js
// const state = {
//   rosterList: [],
//   groupList: [],
//   forwardMessage: null,

//   showForwardList: false
// };

// const getters = {
//   getRosterList(state) {
//     return state.rosterList;
//   },

//   getGroupList(state) {
//     return state.groupList;
//   },

//   getShowForwardList(state) {
//     return state.showForwardList;
//   }
// };

// const mutations = {
//   setRosterList(state, x) {
//     state.rosterList = x;
//   },

//   setGroupList(state, x) {
//     state.groupList = x;
//   },

//   setForwardMessage(state, x) {
//     state.forwardMessage = x;
//   },

//   setShowForwardList(state, x) {
//     state.showForwardList = x;
//   }
// };

// const actions = {
//   actionGetForwardList(context) {
//     const { rootState, state } = context;
//     if (!state.rosterList.length && !state.groupList.length) {
//       rootState.im.rosterManage.asyncGetRosterIdList().then((res) => {
//         rootState.im.rosterManage.asnycGetRosterListDetailByIds(res).then(() => {
//           const allMaps = rootState.im.rosterManage.getAllRosterDetail() || {};
//           const retObj = res.map((i) => {
//             const rosterInfo = allMaps[i] || { user_id: i };
//             return {
//               name: rosterInfo.username,
//               id: rosterInfo.user_id
//             };
//           });
//           context.commit('setRosterList', [].concat(retObj));
//         });
//       });

//       rootState.im.groupManage.asyncGetJoinedGroups(/**true**/).then((res) => {
//         res = res || [];
//         const retObj = res.map((i) => {
//           return {
//             name: i.name,
//             id: i.group_id
//           };
//         });
//         // this.forwardMembers.groupps = [].concat(retObj);
//         context.commit('setGroupList', [].concat(retObj));
//       });
//     }
//   },

//   actionRecordForwardMessage(context, x) {
//     // 记录要转发的message
//     context.commit('setForwardMessage', x);
//     context.commit('setShowForwardList', true);
//   },

//   actionForwardMessage(context, param) {
//     const { rootState, state } = context;
//     const { type, id: xid } = param; //type: group, roster; id: uid,gid
//     const fmsg = {};
//     if (type === 'roster') {
//       fmsg.uid = xid;
//     } else {
//       fmsg.gid = xid;
//     }
//     fmsg.mid = state.forwardMessage.id;
//     rootState.im.sysManage.forwardMessage(fmsg);
//     context.commit('setShowForwardList', false);
//   },

//   actionCancelForward(context) {
//     context.commit('setShowForwardList', false);
//   }
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// };

// forwardStore.js
import { useMainStore } from './index'
export const useForwardStore = defineStore('forward', {
  state: () => ({
    rosterList: [],
    groupList: [],
    forwardMessage: null,
    showForwardList: false
  }),

  getters: {
    getRosterList: (state) => state.rosterList,
    getGroupList: (state) => state.groupList,
    getShowForwardList: (state) => state.showForwardList
  },

  actions: {
    async actionGetForwardList() {
      // const rosterManage = useRosterManageStore();
      // const groupManage = useGroupManageStore();

      if (!this.rosterList.length && !this.groupList.length) {
        const rosterIds = await useMainStore().im.rosterManage.asyncGetRosterIdList();
        await useMainStore().im.rosterManage.asnycGetRosterListDetailByIds(rosterIds);
        const allMaps = await useMainStore().im.rosterManage.getAllRosterDetail() || {};
        const retObj = rosterIds.map((i) => {
          const rosterInfo = allMaps[i] || { user_id: i };
          return {
            name: rosterInfo.username,
            id: rosterInfo.user_id
          };
        });
        this.rosterList = [...retObj];

        const groups = await useMainStore().im.groupManage.asyncGetJoinedGroups();
        const groupRetObj = (groups || []).map((i) => {
          return {
            name: i.name,
            id: i.group_id
          };
        });
        this.groupList = [...groupRetObj];
      }
    },

    actionRecordForwardMessage(x) {
      this.forwardMessage = x;
      this.showForwardList = true;
    },

    async actionForwardMessage(param) {
      // const sysManage = useSysManageStore();
      const { type, id: xid } = param;
      const fmsg = {};
      if (type === 'roster') {
        fmsg.uid = xid;
      } else {
        fmsg.gid = xid;
      }
      fmsg.mid = this.forwardMessage.id;
      await useMainStore().im.sysManage.forwardMessage(fmsg);
      this.showForwardList = false;
    },

    actionCancelForward() {
      this.showForwardList = false;
    }
  }
});
