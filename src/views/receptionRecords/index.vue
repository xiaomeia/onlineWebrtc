<template>
  <div class="form-box">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>接诊详情</span>
        </div>
      </template>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>接诊科室:</dt>
            <dd>{{ form.department_name }}</dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>发起接诊时间:</dt>
            <dd>{{ form.reception_time }}</dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>接诊费:</dt>
            <dd>
              {{ form.reception_fee }}
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>接诊医生:</dt>
            <dd>
              {{ form.doctor_name }}
            </dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>医生接诊时间:</dt>
            <dd>
              {{ form.receive_time }}
            </dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>付款时间:</dt>
            <dd>
              {{ form.pay_time }}
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>就诊日期:</dt>
            <dd>
              {{ form.visit_time }}
            </dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>订单号:</dt>
            <dd>
              {{ form.order_no }}
            </dd>
          </dl>
        </el-col>
        <el-col :span="8">
          <dl>
            <dt>付款方式:</dt>
            <dd>
              <template v-if="form.pay_type == 1">微信支付</template>
              <template v-if="form.pay_type == 2">支付宝支付</template>
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>病情描述:</dt>
            <dd>
              {{ form.disease }}
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>病历/检验检查报告:</dt>
            <dd>
              <img
                :src="item"
                alt=""
                v-for="(item, i) in form.report"
                :key="i"
                style="display:inline-block;width:100px;height:100px;"
              />
            </dd>
          </dl>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px" v-if="form.recipel">
      <template #header>
        <div class="card-header">
          <span>问诊小结</span>
        </div>
      </template>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>问诊时间:</dt>
            <dd v-if="form.recipel.reception_time">
              {{ form.recipel.reception_time }}
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>诊断结果:</dt>
            <dd v-if="form.recipel.diagnostic_result">
              {{ form.recipel.diagnostic_result }}
            </dd>
          </dl>
        </el-col>
      </el-row>
<!--      <el-row class="input-form" :gutter="20">-->
<!--        <el-col :span="8">-->
<!--          <dl>-->
<!--            <dt>用药建议:</dt>-->
<!--            <dd v-if="form.recipel.drug_suggestion">-->
<!--              {{ form.recipel.drug_suggestion }}-->
<!--            </dd>-->
<!--          </dl>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>处理意见:</dt>
            <dd v-if="form.recipel.drug_suggestion">
              {{ form.recipel.drug_suggestion }}
            </dd>
          </dl>
        </el-col>
      </el-row>
      <el-row class="input-form" :gutter="20">
        <el-col :span="8">
          <dl>
            <dt>处方药品:</dt>
            <dd v-if="form.recipel.drug_suggestion">
              {{ form.recipel.drug_suggestion }}
            </dd>
          </dl>
        </el-col>
      </el-row>
    </el-card>
    <div class="btn-group" style="text-align: center">
      <el-button @click="goBack">返回</el-button>
      <!-- <el-button class="liner-btn" @click="saveForm">保存</el-button> -->
    </div>
  </div>
</template>
<script setup>
import { detailTask } from "@/api/hospital/mytask";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
const router = useRouter();
const data = reactive({
  /* 下单表单 */
  form: {
    department_name: "",
  },
});
const { form } = toRefs(data);
function getInfo() {
  const id = router.currentRoute.value.query.id;
  detailTask(id).then((res) => {
    console.log(res);
    if (res.code == 200) {
      form.value = res.data;
      console.log(form.value);
    }
  });
}
function goBack() {
  router.go(-1);
}
getInfo();
</script>
<style scoped>
.form-box {
  margin: 20px;
}
.input-item {
  padding: 6px 20px;
  background: #f9f9f9;
  border-radius: 8px;
}
:deep(.input-item .el-input__wrapper) {
  background: transparent;
  box-shadow: none;
}
:deep(.input-item .el-input__wrapper input) {
  border: 0;
  outline: none;
}
:deep(.input-item .el-select) {
  --el-select-border-color-hover: 0;
  --el-select-input-focus-border-color: 0;
}
:deep(.input-item .el-form-item__error) {
  top: calc(100% + 12px);
}
.btn-group {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
}
.btn-group .el-button {
  width: 180px;
  height: 60px;
  font-size: 16px;
}
dl {
  display: flex;
  justify-content: start;
  align-items: center;
}
dl dt {
  color: #666666;
}
dl dd {
  color: #121212;
}
</style>
