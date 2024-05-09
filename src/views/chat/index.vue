<template>
    <div class="app-container">
        <div class="chat-tab">
            <div v-for="item in tabList" :key="item.name" class="tab-item" @click="currentTab = item.name">
                <div class="tab-title">{{ item.title }}</div>
                <div class="tab-line" v-show="currentTab === item.name"></div>
            </div>
        </div>
        <component :is="currentComponent" />
    </div>
</template>
  
<script setup name="chat">
import { ref } from 'vue'
import ChatRoom from './ChatRoom.vue';
import ChatDetail from './ChatDetail.vue';

const tabList = [
    {
        title: '接诊窗口',
        name: 'chat-room'
    },
    {
        title: '患者详情',
        name: 'chat-detail'
    }
]
const currentTab = ref('chat-room')

const currentComponent = computed(() => {
    return currentTab.value === 'chat-room' ? ChatRoom : ChatDetail
})

</script>
<style lang='scss' scoped>
.chat-tab {
    background-color: #fff;
    border-radius: 12px;
    padding: 15px 10px;
    display: flex;
    align-items: center;

    .tab-item {
        height:26px;
        position: relative;
    }

    .tab-title {
        margin:0 10px;
        font-family: 'Open Sans';
        font-size: 14px;
        color: #121212;
    }

    .tab-line {
        background: linear-gradient(45deg, #9357f2, #c969ec);
        border-radius: 1.5px;
        color: #E9E7EC;
        height: 3px;
        width: 24px;
        position: absolute;
        left:50%;
        bottom: 0;
        transform: translateX(-50%);
    }
}
</style>
  