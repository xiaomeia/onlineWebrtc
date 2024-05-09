<template>
  <div class="form-box">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>处方信息</span>
        </div>
      </template>
      <el-form
        ref="drugForm"
        :model="form"
        :rules="rules"
        label-width="auto"
        label-position="left"
      >
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="医院全称"
              class="input-item"
              prop="hospital_name"
            >
              <el-input v-model="form.hospital_name" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用药人" class="input-item" prop="patient_name">
              <el-input v-model="form.patient_name" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item label="年龄" class="input-item" prop="age">
              <el-input v-model="form.age" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" class="input-item" prop="sex">
              <el-select
                disabled
                style="width: 100%"
                v-model="form.sex"
                placeholder="请选择性别"
              >
                <el-option label="男" :value="1" />
                <el-option label="女" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="主诉信息"
              class="input-item"
              prop="chief_complaint"
            >
              <el-input v-model="form.chief_complaint" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="既往史" prop="past_history" class="input-item">
              <el-select v-model="form.past_history" style="width: 100%">
                <el-option label="无" value="1"></el-option>
                <el-option label="有" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="过敏史"
              class="input-item"
              prop="allergy_history"
            >
              <el-select v-model="form.allergy_history" style="width: 100%">
                <el-option label="无" value="1"></el-option>
                <el-option label="有" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="诊断结果"
              prop="diagnostic_result"
              class="input-item"
            >
              <el-input v-model="form.diagnostic_result" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="用药建议"
              prop="drug_suggestion"
              class="input-item"
            >
              <el-select
                filterable
                style="width: 100%"
                v-model="form.drug_suggestion"
              >
                <el-option
                  v-for="item in drugList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                >
                  <div class="info">
                    <span>{{ item.name }}</span>
                    <span style="color: #8f56f1; font-size: 13px">
                      {{ item.manufacturer }}
                    </span>
                    <span style="color: #8f56f1; font-size: 13px">
                      ￥{{ item.price }}
                    </span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
                label="药品详情"
                prop="western_medicine_fee"
                class="input-item"
            >
              <el-input v-model="form.western_medicine_fee" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item
                label="医药费"
                prop="western_medicine_fee"
                class="input-item"
            >
              <el-input v-model="form.western_medicine_fee" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医师" prop="physician" class="input-item">
              <el-input v-model="form.physician" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="input-form" :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期" class="input-item" prop="reception_time">
              <el-date-picker
                type="datetime"
                placeholder="请选择就诊日期"
                v-model="form.reception_time"
              ></el-date-picker>
              <!-- <el-input v-model="form.reception_time" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="药师" prop="pharmacist" class="input-item">
              <el-select
                  filterable
                  style="width: 100%"
                  v-model="form.pharmacist"
              >
                <el-option
                    v-for="item in pharmacistList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                >
                  <div class="info-pharmacist">
                    <span>{{ item.name }}</span>
                    <span
                        style="color: #8f56f1; font-size: 13px"
                        v-if="item.role"
                    >
                      {{ item.role.name }}
                    </span>
                    <!-- <span style="color: #8f56f1; font-size: 13px">
                      ￥{{ item.price }}
                    </span> -->
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-group" style="text-align: center">
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveForm">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { rescribing } from "@/api/hospital/mytask";
import { listDrug } from "@/api/drugManagement/index";
import { listRole } from "@/api/organizationalManagement/role";
import { listDoctor } from "@/api/organizationalManagement/doctor";
import { detailTask } from "@/api/hospital/mytask";
// import { computed } from "vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();
const router = useRouter();
// 药品列表
const drugList = ref([]);
// 药师列表
const pharmacistList = ref([]);
const data = reactive({
  /* 下单表单 */
  form: {
    hospital_name: undefined,
    patient_name: undefined,
    age: undefined,
    sex: undefined,
    chief_complaint: undefined,
    past_history: undefined,
    allergy_history: undefined,
    diagnostic_result: undefined,
    drug_suggestion: undefined,
    western_medicine_fee: undefined,
    physician: undefined,
    pharmacist: undefined,
    reception_time: undefined,
  },
});
const rules = ref({
  hospital_name: [
    { required: true, message: "医院名称不能为空", trigger: "blur" },
  ],
  patient_name: [
    { required: true, message: "用药人不能为空", trigger: "blur" },
  ],
  chief_complaint: [
    { required: true, message: "主诉信息不能为空", trigger: "blur" },
  ],
  past_history: [
    { required: true, message: "请选择既往病史", trigger: "blur" },
  ],
  allergy_history: [
    { required: true, message: "请选择是否有过敏史", trigger: "blur" },
  ],
  diagnostic_result: [
    { required: true, message: "诊断结果不能为空", trigger: "blur" },
  ],
  drug_suggestion: [
    { required: true, message: "用药建议不能为空", trigger: "blur" },
  ],
  western_medicine_fee: [
    { required: true, message: "医药费不能为空", trigger: "blur" },
  ],
  pharmacist: [
    { required: true, message: "药品名称不能为空", trigger: "blur" },
  ],
  reception_time: [
    { required: true, message: "药品名称不能为空", trigger: "blur" },
  ],
  age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
  physician: [{ required: true, message: "医师名称不能为空", trigger: "blur" }],
});
const { form } = toRefs(data);

/** 获取药品 */
function getDrugList() {
  drugList.value = [];
  listDrug({ page: 1, per_page: 9999999 }).then((res) => {
    drugList.value = res.data.data;
  });
}
/** 获取角色 */
function getRoleList() {
  listRole({ page: 1, per_page: 9999999 }).then((res) => {
    console.log(res);
    if (res.code == 200) {
      const list = res.data.data;
      const roleId = null;
      console.log(list);
      list.forEach((item) => {
        console.log(item.name.includes("药师"));
        if (item.name.includes("药师")) {
          getPhysicianList(item.id);
        }
      });
    }
  });
}
/** 获取药师角色 */
function getPhysicianList(id) {
  listDoctor({ page: 1, per_page: 9999999, role_id: id }).then((res) => {
    console.log(res);
    if (res.code == 200) {
      pharmacistList.value = res.data.data;
    }
  });
}
/** 获取患者详情 */
function getInfo() {
  const id = router.currentRoute.value.query.id;
  detailTask(id).then((res) => {
    console.log(res);
    const info = res.data;
    form.value.age = info.recipel.age;
    form.value.physician = info.doctor_name;
    form.value.patient_name = info.patient_name;
    form.value.sex = info.sex;
    form.value.hospital_name = info.recipel.hospital_name;
  });
}
/** 开处方 */
function saveForm() {
  const id = router.currentRoute.value.query.id;
  proxy.$refs["drugForm"].validate((valid) => {
    if (valid) {
      rescribing(id, form.value).then((res) => {
        console.log(res);
        if (res.code == 200) {
          ElMessage.success("开具处方成功");
          goBack();
        }
      });
    }
  });
}
function goBack() {
  router.go(-1);
}
getInfo();
getDrugList();
getRoleList();
</script>
<style scoped>
.form-box {
  margin: 20px;
}
.input-item {
  padding: 10px 20px;
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
}
.btn-group .el-button {
  width: 180px;
  height: 60px;
  font-size: 16px;
}
:deep(.input-item .el-input-number span.el-input-number__decrease),
:deep(.input-item .el-input-number span.el-input-number__increase) {
  display: none;
}
:deep(.input-item .el-input-number .el-input__wrapper) {
  padding: 0;
}
:deep(.input-item .el-input-number .el-input__wrapper .el-input__inner) {
  text-align: left;
}
.info,
.info-pharmacist {
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
}
.info span {
  display: block;
  width: 33%;
}
.info span:nth-child(1) {
  text-align: left;
}
.info span:nth-child(2) {
  text-align: center;
}
.info span:nth-child(3) {
  text-align: right;
}
.info-pharmacist span {
  display: block;
  width: 50%;
}
.info-pharmacist span:nth-child(1) {
  text-align: left;
  padding-left: 20px;
}
.info-pharmacist span:nth-child(2) {
  text-align: right;
  padding-right: 20px;
}
</style>
