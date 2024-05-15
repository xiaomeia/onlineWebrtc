<template>
  <div class="app-container">
    <el-form
      class="search-box"
      :model="queryParams"
      ref="queryRef"
      :inline="true"
    >
      <div>
        <el-form-item label="" class="input-item">
          <el-input
            clearable
            prefix-icon="User"
            v-model="queryParams.patient_name"
            placeholder="请输入就诊人姓名"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="" class="input-item">
          <el-select
            v-model="queryParams.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="" class="input-item">
          <el-input
            prefix-icon="Iphone"
            v-model="queryParams.mobile"
            placeholder="请输入手机号"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="" style="width: 308px" class="input-item">
          <!-- <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="请选择就诊日期"
          end-placeholder="请选择就诊日期"
        ></el-date-picker> -->
          <el-date-picker
            value-format="YYYY-MM-DD"
            v-model="queryParams.visit_time"
            type="daterange"
            start-placeholder="请选择就诊日期"
            end-placeholder="请选择就诊日期"
            :default-value="[new Date(), new Date()]"
          />
        </el-form-item>
      </div>
      <el-form-item style="float: right">
        <el-button class="liner-btn tool-btn" @click="Register">注册</el-button>
        <el-button class="liner-btn tool-btn" @click="handleQuery"
          >搜索</el-button
        >
        <el-button class="liner-btn tool-btn" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <ul class="screen-list">
      <li :class="{ active: screenIndex == 0 }" @click="handleScreen(0)">
        全部(<span>{{ total }}</span
        >)
      </li>
      <li
        v-for="(item, i) in statusList"
        :key="i"
        :class="{ active: screenIndex == i + 1 }"
        @click="handleScreen(i + 1)"
      >
        {{ item.status }} (<span>{{ item.count }}</span
        >)
      </li>
      <!-- <li :class="{ active: screenIndex == 1 }" @click="handleScreen(1)">
        待接诊(<span>{{ total }}</span
        >)
      </li>
      <li :class="{ active: screenIndex == 2 }" @click="handleScreen(2)">
        接诊中(<span>{{ total }}</span
        >)
      </li>
      <li :class="{ active: screenIndex == 3 }" @click="handleScreen(3)">
        已完成(<span>{{ total }}</span
        >)
      </li> -->
    </ul>
    <el-table :data="List" v-loading="loading">
      <el-table-column label="订单号" align="center" prop="order_no" />
      <el-table-column label="就诊人" align="center" prop="patient_name">
        <template #default="scope">
          <span style="cursor: pointer" @click="toDetail(scope.row.id)">
            {{ scope.row.patient_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template #default="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-if="scope.row.sex == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center" prop="mobile" />
      <el-table-column label="接诊费" align="center" prop="reception_fee" />
      <el-table-column label="就诊日期" align="center" prop="visit_time" />
      <el-table-column
        label="发起就诊时间"
        align="center"
        prop="reception_time"
      />
      <el-table-column
        label="医生就诊时间"
        align="center"
        prop="receive_time"
      />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <span v-if="scope.row.status == 1">待接诊</span>
          <span v-if="scope.row.status == 2">接诊中</span>
          <span v-if="scope.row.status == 3">已完成</span>
          <span v-if="scope.row.status == 4">未接诊</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="400">
        <template #default="scope">
          <div class="btn-group">
            <el-button
              class="liner-btn"
              v-if="scope.row.status == 1"
              @click="handleReception(scope.row)"
              >接诊</el-button
            >
            <!--            <el-button-->
            <!--              class="liner-btn"-->
            <!--              v-if="scope.row.status == 1"-->
            <!--              @click="videoReception(scope.row)"-->
            <!--              >视频接诊</el-button-->
            <!--            >-->
            <!-- <el-button
              plain
              type="primary"
              v-if="scope.row.status == 2"
              @click="handleUpdate(scope.row)"
              >回复</el-button
            > -->
            <!--            <el-button plain type="primary" @click="handleOver(scope.row)"-->
            <!--              >结束</el-button-->
            <!--            >-->
            <!--            <el-button-->
            <!--              plain-->
            <!--              type="primary"-->
            <!--              @click="handlePrescription(scope.row)"-->
            <!--              >开具处方</el-button-->
            <!--            >-->
            <el-button
              v-if="scope.row.status == 3 || scope.row.status == 4"
              @click="handleUpdate(scope.row)"
              >查看</el-button
            >
            <el-icon
              size="22"
              color="#000000"
              v-if="false"
              style="margin-left: 10px; cursor: pointer"
              @click="handleDelete(scope.row)"
            >
              <Delete />
            </el-icon>
          </div>
          <!-- <el-button icon="Delete">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total="total"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.per_page"
      @pagination="getList"
    />
  </div>
</template>

<script setup name="mytask">
import {
  listsTask,
  videoTask,
  detailTask,
  overReception,
  countReception,
} from "@/api/hospital/mytask";
import flooim from "@/im/floo-3.0.0.js";
import { onMounted } from "vue";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const List = ref([]);
const statusList = ref([
  {
    id: 1,
    status: "待接诊",
    count: 0,
  },
  {
    id: 2,
    status: "接诊中",
    count: 0,
  },
  {
    id: 3,
    status: "已完成",
    count: 0,
  },
  {
    id: 4,
    status: "未接诊",
    count: 0,
  },
]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const screenIndex = ref("0");

const data = reactive({
  form: {},
  queryParams: {
    page: 1,
    per_page: 10,
    patient_name: undefined,
    mobile: undefined,
    sex: undefined,
    visit_time: undefined,
    status: undefined,
    start_time: undefined,
    end_time: undefined,
  },
  rules: {},
});

const { queryParams, form, rules } = toRefs(data);
import { useMainStore } from "@/store/modules/index";

const mainStore = useMainStore();

onMounted(() => {
  // 挂载一个聊天方法到全局
  const config = {
    //dnsServer: "https://dns.lanyingim.com/v2/app_dns",
    appid: "dhqtxhnsglwy",
    ws: false, // uniapp版需要设置为true, web版需要设置为false
    autoLogin: true,
  };

  const im = flooim(config);
  mainStore.actionSaveIm(im);
  mainStore.getIm.on({
    loginSuccess: () => {
      console.log("run loginSuccess");
    },
    loginFail: (msg) => {
      console.log("登陆失败, error: " + msg);
    },
    loginMessage: (message) => {
      console.log("登录信息相关的----", message);
    },
  });
});

function Register() {
  mainStore.getIm.userManage
    .asyncRegister({
      username: "admin",
      password: "123456",
    })
    .then(() => {
      console.log("注册成功");
    })
    .catch((ex) => {
      console.log(ex.message);
    });
}

/** 查询公告列表 */
function getList() {
  loading.value = true;
  if (queryParams.value.visit_time) {
    queryParams.value.start_time = +new Date(queryParams.value.visit_time[0]);
    queryParams.value.end_time = +new Date(queryParams.value.visit_time[1]);
  }
  listsTask(queryParams.value).then((response) => {
    if (response.code == 200) {
      List.value = response.data.data;
      total.value = response.data.total;
      loading.value = false;
      getCountReception();
    }
  });
}
function getCountReception() {
  countReception().then((res) => {
    const data = res.data;
    const obj = {};
    data.forEach((item) => {
      obj[item.status] = item.count;
    });
    statusList.value.forEach((item) => {
      if (obj[item.id]) {
        item.count = obj[item.id];
      }
    });
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryParams.value = {
    page: 1,
    per_page: 10,
    patient_name: undefined,
    mobile: undefined,
    sex: undefined,
    visit_time: undefined,
    status: undefined,
  };
  handleQuery();
}
/**状态筛选 */
function handleScreen(inx) {
  screenIndex.value = inx;
  if (inx != 0) {
    this.queryParams.status = inx;
    handleQuery();
  } else {
    resetQuery();
  }
}
/** 删除按钮操作 */
function handleDelete(row) {
  const ids = row.id || ids.value;
  proxy.$modal
    .confirm("是否确认删除该数据项？")
    .then(function () {})
    .then(() => {})
    .catch(() => {});
}
/** 患者详情 */
function toDetail(id) {
  router.push({
    path: "/doctor/userdetail",
    query: { id: id },
  });
}
/** 接诊 */
function handleReception(row) {
  // detailTask(row.id).then((res) => {
  //   console.log(res);
  // });
  // 执行登录操作
  // saveLoginInfo({
  //   name: "admin",
  //   password: "123456",
  // });
  imLogin({
    name: "admin",
    password: "123456",
  });
  router.push({
    path: "/reception/chat",
  });
}

function saveLoginInfo(info) {
  info.app_id = "dhqtxhnsglwy";
  window.localStorage.setItem("lanying_im_logininfo", JSON.stringify(info));
}

function imLogin({ name, password }) {
  mainStore.getIm.login({
    name,
    password,
  });
}
/** 视频接诊 */
function videoReception(row) {
  const id = row.id;
  videoTask(id).then((res) => {
    console.log(res);
  });
}
/** 开处方 */
function handlePrescription(row) {
  const id = row.id;
  router.push({
    path: "/doctor/prescription/prescription",
    query: { id: id },
  });
}
/** 结束问诊 */

function handleOver(row) {
  overReception(row.id).then((res) => {
    console.log(res);
  });
}
getList();
</script>
<style scoped>
.form-box {
  margin: 20px;
}
.input-item {
  padding: 6px 12px;
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
:deep(.el-table__header tr),
:deep(.el-table__row) {
  height: 60px;
}
</style>
