<template>
  <div class="app-container">
    <el-tabs v-model="activeIndex" class="demo-tabs">
      <el-tab-pane label="关于您邀我" name="1">
        <p>
          "您邀我"是互联网＋视频问诊＋线上开处方＋药送到患者手中＋康护就医一流品牌《互联网医院》隶属于北京您邀我科技有限责任公司，秉持"让优质医疗服务走进千家万户"的愿景，以"护士上门"为服务特色，将护理服务从医疗机构延伸到家庭、社区，构建连续性护理服务。为老年群体、院后康复期群体、母婴群体等行动不便的群体提供居家护理、居家康复、长期照护、省去频繁跑医院的烦恼、专项咨询和复诊通道，在线开具处方，由第三方机构将药配送到患者家中，线上看病，满足患者居家看病就医需要，同时也减少病原在医院的聚集。让大众在家就可以轻松获得优质的服务。
        </p>
        <h5 class="title">1、医院视频接诊：</h5>
        <p>
          专项咨询和复诊通道，患者通过远程视频问诊+医生在线开具处方+由第三方快递配送到患者家中，缩短了看病来回跑的时间，降低了看病成本，特别是冬天发病高峰期，满足患者在家看病就医，同时也减少病原在医院的聚集，省去了频繁跑医院的烦恼。
        </p>
        <h5 class="title">2、护理上门护理：</h5>
        <p>
          让用户可以通过“线上预约服务”的方式获得平台注册护士上门为患者提供居家护理服务，让需要护理服务的群体能够足不出户，在家就能方便、快捷地获得优质的护理服务。
        </p>
        <div class="QR-code">
          <div class="item">
            <img src="../../assets/images/gzh.png" alt="" />
            <span>扫码关注公众号</span>
          </div>
          <div class="item">
            <img src="../../assets/images/regist.png" alt="" />
            <span>扫码注册</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系我们" name="2">
        <ul class="Contact-Us">
          <li>地址：北京市海淀区信息路26号</li>
          <li>电话：18611929862</li>
          <li>邮箱：service@ninyaowo.com</li>
          <li>网址：https://www.ninyaowo.com/</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup name="Aboutus">
import { useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();
const type = route.query.type;
const activeIndex = ref(type);
onBeforeRouteUpdate((to) => {
  activeIndex.value = to.query.type;
});
// console.log(routeQuery);
</script>
<style lang="scss" scoped>
.app-container {
  padding-bottom: 0;
  .demo-tabs {
    border-radius: 12px 12px 0px 0px;
    background-color: #ffffff;
    ::v-deep .el-tabs__header {
      padding: 15px 30px 0;
      .el-tabs__item {
        font-size: 16px;
        color: #999999;
      }
      .el-tabs__item.is-active {
        color: #121212;
      }
    }
    ::v-deep .el-tabs__content {
      padding: 0 30px;
      font-size: 14px;
      line-height: 30px;
      padding-bottom: 50px;
      p {
        text-indent: 28px;
        color: #121212;
      }
      h5.title {
        text-indent: 28px;
        color: #b863ee;
        margin: 0;
      }
      .QR-code {
        display: flex;
        justify-content: flex-start;
        padding-left: 28px;
        .item {
          margin-right: 120px;
          text-align: center;
          img {
            display: block;
            width: 160px;
            height: 160px;
            margin-bottom: 10px;
          }
          span {
            font-size: 14px;
            color: #121212;
          }
        }
      }
      .Contact-Us {
        list-style: none;
        color: #121212;
        padding: 0;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
