<template>
    <div class="room-container">
        <div class="room-left">
            <div class="room-info">
                <img src="@/assets/icons/emoji.png" class="room-info-left" />
                <div class="room-info-right">
                    <div class="room-info-name">张三医生</div>
                    <div class="room-info-title">主治医生</div>
                </div>
            </div>
            <div class="room-search">
                <el-input v-model="input1" placeholder="查找联系人" :prefix-icon="Search" />
            </div>
            <div class="room-list" v-for="item in roomList" :key="item.name" @click="onSelect(item.name)"
                :class="{ 'selected': selectItem === item.name }">
                <div class="room-list-item">
                    <div class="select-line" v-show="item.name === selectItem"></div>
                    <div class="room-list-item-top">
                        <div class="room-list-item-top-left">
                            <div>{{ item.name }}</div>
                            <div>{{ item.gender }}</div>
                            <div>{{ item.age }}</div>
                        </div>
                        <div class="room-list-item-top-right"
                            :style="{ color: item.name === selectItem ? '#8F56F1' : '#ACAFBA' }">{{
                                item.status }}</div>
                    </div>
                    <div class="room-list-item-bottom">
                        医生就诊时间： {{ item.time }}
                    </div>
                </div>
            </div>
        </div>
        <div class="room-right">
            <div class="chat-name">
                <div>王治中</div>
                <div>男</div>
                <div>25岁</div>
            </div>
            <div class="chat-name-line"></div>
            <!-- TODO:聊天框 -->
            <div class="chat-content">
                <!-- TODO:接入阿里云webrtc -->
                <div class="video-set" v-if="showVideo">
                    <video autoplay ref="localVideo" id="localVideo" muted playsinline class="local">本地视频</video>
                    <video autoplay ref="remoteVideo" id="remoteVideo" playsinline class="remote">远端视频</video>
                </div>
                <el-button @click="call">发起视频</el-button>
                <el-button @click="cancel">挂断</el-button>
            </div>
            <div class="chat-input">
                <div class="chat-input-line"></div>
                <div class="chat-input-icon">
                    <img class="chat-input-icon-item" src='@/assets/icons/emoji.png' />
                    <img class="chat-input-icon-item" src='@/assets/icons/picture.png' />
                    <img class="chat-input-icon-item" src='@/assets/icons/video.png' />
                    <img class="chat-input-icon-item" src='@/assets/icons/microphone.png' />
                </div>
                <div class="chat-input-box">
                    <el-input v-model="input2" type="textarea" :rows="2" />
                </div>
                <div class="chat-input-tips">按下Enter发送内容/ Command+Enter换行</div>
            </div>
        </div>
    </div>
</template>
  
<script setup name="ChatRoom" lang="ts">
import { ref, inject } from 'vue';
import { Search } from '@element-plus/icons-vue'
import {
    listsTask,
    videoTask,
    detailTask,
} from "@/api/hospital/mytask";

const input1 = ref('');
const input2 = ref('');

const roomList = [
    {
        name: '李思0',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    },
    {
        name: '李思1',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    },
    {
        name: '李思2',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    },
    {
        name: '李思3',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    },
    {
        name: '李思4',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    },
    {
        name: '李思5',
        gender: '男',
        age: 25,
        status: '已完成',
        time: '10:00:00'
    }
]
const im = inject('im');
const selectItem = ref(roomList[0].name);
let localVideo = ref();
let remoteVideo = ref();
let localStream = ref(null);
//默认不显示视频通话（需拨通后显示）
let showVideo = ref(false);

const initLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
        console.log(/gb123stream/,stream);
      startLink(stream);//获取成功后调用开始连接的函数
    })
    .catch((e) => {
        console.log(/gb123e/,e);
      alert("getUserMedia() error:" + e.name);
    });
};
const startLink = (stream) => {
  // console.log("获取stream成功！");
  //本地画面预览
  localVideo.value.srcObject = stream;
  localStream.value = stream;
  
  //为彼此添加ice candidate
  localPc.onicecandidate = (e) => {
    remotePc.addIceCandidate(e.candidate);
  };
  remotePc.onicecandidate = (e) => {
    localPc.addIceCandidate(e.candidate);
  };
  
  //提供远端画面
  remotePc.ontrack = (e) => {
    remoteVideo.value.srcObject = e.streams[0];
    // console.log('test success');
  };
  
  //将音视频逐一添加到本地流
  localStream.value.getTracks().forEach((track) => {
    localPc.addTrack(track, localStream.value);
    // console.log('test success');
  });
  
  //设定offer选项
  let offerOptions = {
    offerToRecieveAudio: 1,
    offerToRecieveVideo: 1,
  };
 
  //创建本地连接的offer，用于媒体协商
  localPc.createOffer(offerOptions).then((desc) => {
    //创建成功后会返回一个本地描述，并在这里设置本地描述
    localPc.setLocalDescription(desc);
    // console.log('send desc to signal');
    // console.log('receive desc from signal');
    // 设置远程描述
    remotePc.setRemoteDescription(desc);
    //创建远端描述回复
    remotePc.createAnswer().then((desc) => {
    //对两个对象设置远程/本地'描述'
      remotePc.setLocalDescription(desc);
      // console.log('send desc to signal');
      // console.log('receive desc from signal');
      localPc.setRemoteDescription(desc);
    });
  });
};
const call = () => {
  showVideo.value = true;
  initLocalStream();
};
const cancel = () => {
  localPc.close();
  remotePc.close();
  if (remoteVideo.value.srcObject) {
    remoteVideo.value.srcObject.getTracks().forEach((track) => track.stop());
    // console.log("关闭成功");
  }
  if (localVideo.value.srcObject) {
    localVideo.value.srcObject.getTracks().forEach((track) => track.stop());
    // console.log("关闭成功");
  }
  showVideo.value = false;
};
function onSelect(name) {
    selectItem.value = name;
}

// function handleClick() {
//     if (im) {
//         // 假设你已经有了 mobile, name, password 的值  
//         im.login({
//             mobile: '具体的手机号码',
//             name: '具体的用户名',
//             password: '具体的密码'
//         })
//     }
// }  
</script>
<style lang='scss' scoped>
.room-container {
    /* height: 1414px; */
    width: 1152px;
    margin-top: 20px;
    display: flex;
    background-color: #F1F3F9;

    .room-left {
        width: 320px;
        height: 1154px;
        background-color: #292B2E;
        border-radius: 12px 0 0 12px;

        .room-info {
            margin-top: 28px;
            display: flex;
            margin-left: 18px;

            .room-info-left {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                margin-right: 11px;
            }

            .room-info-right {
                display: flex;
                flex-direction: column;

                .room-info-name {
                    font-size: 16px;
                    color: #E9E7EC;
                }

                .room-info-title {
                    font-size: 14px;
                    color: #ACAFBA;
                }
            }
        }

        .room-search {
            width: 286px;
            margin: 20px auto 0;
            border-radius: 8px;

            :deep(.el-input__wrapper) {
                background-color: #999;
                box-shadow: none;
            }

            :deep(el-input__inner) {
                color: #fff; //TODO:没生效
            }
        }

        .room-list {
            margin-top: 20px;

            .room-list-item {
                padding-top: 20px;
                margin-left: 20px;
                width: 281px;
                height: 80px;

                .select-line {
                    height: 80px;
                    width: 4px;
                    background-color: #C969EC;
                    float: left;
                    margin-left: -20px;
                }

                .room-list-item-top {
                    display: flex;
                    color: #E9E7EC;
                    position: relative;

                    .room-list-item-top-left {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 20px;
                        font-size: 16px;
                    }

                    .room-list-item-top-right {
                        position: absolute;
                        right: 19px;
                        font-size: 14px;
                    }
                }

                .room-list-item-bottom {
                    margin-top: 6px;
                    color: #ACAFBA;
                    font-size: 14px;
                }

            }
        }
    }

    .room-right {
        border-radius: 0 12px 12px 0;
        width: 832px;
        background-color: #F7F8FE;

        .chat-name {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 111px;
            height: 14px;
            margin-top: 27px;
            margin-left: 20px;
            font-weight: 500;
            color: #121212;
            font-size: 14px;
        }

        .chat-name-line {
            height: 1px;
            width: 812px;
            border-radius: 0 12px 12px 0;
            background-color: #DDD;
            margin-top: 27px;
            margin-left: 20px;
        }

        .chat-content {
            height: 887px;
            width: 832px;
            .video-set {
                position: relative;

                video {
                    width: 270px;
                    height: 202.5px;
                    background-color: #fff;
                    border-radius: 10px;
                }

                .local {
                    background-color: #fff;
                    width: 90px;
                    height: 120px;
                    position: absolute;
                    left: 7.5px;
                    top: 7.5px;
                    border: 2px solid gray;
                    object-fit: cover;
                    // background-color: transparent;
                }
            }
        }
            .chat-input {
                height: 190px;
                position: relative;

                .chat-input-line {
                    background-color: #E7E8F0;
                    width: 832px;
                    height: 1px;
                    border-radius: 0.5px;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                .chat-input-icon {
                    padding-top: 25px;
                    margin-left: 17px;

                    .chat-input-icon-item {
                        margin-right: 21px;
                        width: 18px;
                        height: 18px;
                    }
                }

                .chat-input-box {
                    margin-top: 4px;

                    :deep(.el-textarea__inner) {
                        box-shadow: none;
                        background-color: transparent;
                    }
                }

                .chat-input-tips {
                    font-family: 'PingFangSC';
                    color: #999999;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 56px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
        }

    }
    </style>
  