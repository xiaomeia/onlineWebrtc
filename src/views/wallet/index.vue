<template>
  <div class="app-container">
    <div class="top" style="margin-bottom: 20px">
      <div class="title">
        <div class="block">
          <el-avatar :size="48" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <div class="title-con">
            <span class="hospital">北京协和医院</span><br />
            <span class="time">上次登陆时间2024-01-07 18:00:01 </span>
          </div>
        </div>
        <div class="block1">
          <div>
            总订单量
          </div>
          <div class="num">567</div>
        </div>
        <div class="block1">
          <div>
            金额
          </div>
          <div class="money">¥{{numFormat(43346)}}</div>
        </div>
      </div>
      <div class="btn-group">
        <el-button class="plain-btn" @click="handleAdd" size="large"
        >提现</el-button
        >
        <el-button class="plain-btn" @click="handleAdd" size="large"
        >文件导出</el-button
        >
      </div>
    </div>
    <el-form
      ref="queryRef"
      :inline="true"
      class="search-box"
      :model="queryParams"
      style="margin-bottom: 20px"
    >
      <div>
        <el-form-item label="" class="input-item">
          <el-input
            prefix-icon="User"
            v-model="queryParams.account_name"
            placeholder="请输入结算账户"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" style="width: 308px" class="input-item">
          <el-date-picker
              type="date"
              placeholder="请选择开始日期"
              v-model="queryParams.start_time"
              value-format="x"
              @change="dateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="" style="width: 308px" class="input-item">
          <el-date-picker
              type="date"
              placeholder="请选择结束日期"
              v-model="queryParams.end_time"
              value-format="x"
              @change="dateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="time-filter" style="width: 250px">
          <span @click="filterTime(item)" v-for="item of timeArr" :key="item.label" :class="{'no-cursor': !item.value, active: currentTime === item.value && item.value}">{{item.label}}</span>
        </el-form-item>
        <el-form-item>
          <el-button class="liner-btn tool-btn" @click="handleQuery">查询</el-button>
          <el-button class="liner-btn tool-btn" @click="resetQuery">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="list-box">
      <el-table :data="List" v-loading="loading">
        <el-table-column label="序号" align="center" prop="order_no" />
        <el-table-column label="结算账户" align="center" prop="patient_name">
          <template #default="scope">
          <span style="cursor: pointer" @click="toDetail(scope.row.id)">
            {{ scope.row.patient_name }}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template #default="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" prop="mobile" />
        <el-table-column label="费用名称" align="center" prop="reception_fee" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <span v-if="scope.row.status == 1">交易成功</span>
            <span v-if="scope.row.status == 2">交易失败</span>
            <span v-if="scope.row.status == 3">交易取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="400">
          <template #default="scope">
            <div class="btn-group">
              <el-button
                  @click="getDetail(scope.row)"
              >查看</el-button
              >
              <el-button
                  @click="download(scope.row)"
              >下载明细</el-button
              >
            </div>
            <!-- <el-button icon="Delete">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :backgeound="true"
        :total="total"
        layout="prev, pager, next"
        next-text="下一页"
        prev-text="上一页"
        v-model:page="queryParams.page"
        v-model:limit="queryParams.per_page"
        @pagination="pageChange"
      />
    </div>
  </div>
</template>
<script setup name="Corpus">
import { ElMessage } from "element-plus";
import { list } from "@/api/wallet";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const List = ref([]);
const loading = ref(true);
const total = ref(0);
const currentTime = ref(1)
const data = reactive({
  queryParams: {
    page: 1,
    per_page: 10,
    account_name: undefined,
    start_time: undefined,
    end_time: undefined,
  },
});
const timeArr = ref([{
    label: '今天',
    value: 1
  },
  {
    label: '最近:'
  },
  {
    label: '1个月',
    value: 2
  },
  {
    label: '3个月',
    value: 3
  },
  {
    label: '1年',
    value: 4
  }
])
const getToday = () => {
  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0); // 设置为今天的开始时间
  end.setHours(23, 59, 59, 999); // 设置为今天的结束时间
  return [start, end];
};

const getLastMonth = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30); // 获取30天前的日期
  return [start, end];
};

const getLastThreeMonth = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90); // 获取90天前的日期
  return [start, end];
};

const getLastYear = () => {
  const end = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1); // 获取1年前的日期
  return [start, end];
};

function getTimeRange(timeValue) {
  switch (timeValue) {
    case 1:
      return getToday();
    case 2:
      return getLastMonth();
    case 3:
      return getLastThreeMonth();
    case 4:
      return getLastYear();
    default:
      return [null, null];
  }
};

const numFormat = (_num) => {
  if (!_num && _num !== 0) return ''
  let num = Number(_num)
  if (isNaN(num)) {
    return _num
  }
  if (num.toString().indexOf('.') !== -1) {
    return num.toLocaleString()
  } else {
    return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
}

function filterTime(time) {
  if (!time.value) {
    return
  }
  queryParams.start_time = undefined
  queryParams.end_time = undefined
  currentTime.value = time.value
  getList()
}

const dateChange = () =>  {
  if (!queryParams.value.start_time && !queryParams.value.end_time) {
    currentTime.value = 1
    return
  }
  currentTime.value = undefined
}

const { queryParams } = toRefs(data);
function getList() {
  loading.value = true;
  const { queryParams } = toRefs(data);
  const query = {
    page: queryParams.value.page,
    per_page: queryParams.value.per_page,
    account_name: queryParams.value.account_name
  }
  if (currentTime.value) {
    const [start, end] = getTimeRange(currentTime.value);
    console.log('start', start);
    query.start_time = start.getTime();
    query.end_time = end.getTime();
  }

  // if (queryParams.value.start_time) {
  //   queryParams.value.start_time =
  //     Date.parse(new Date(queryParams.value.start_time));
  // } else if (queryParams.value.end_time) {
  //   queryParams.value.end_time =
  //     Date.parse(new Date(queryParams.value.end_time));
  // }
  console.log('queryParams333', query);
  list(query).then((response) => {
    if (response.code == 200) {
      List.value = response.data.data;
      total.value = response.data.total;
      loading.value = false;
    }
  });
}
/** 查看 **/
 function getDetail (row) {

}
/** 下载明细 **/
function download (row) {

}
/** 关键字查询 */
function handleQuery() {
  data.queryParams.page = 1
  getList();
}
function resetQuery() {
  data.queryParams.page = 1
  data.queryParams.account_name = undefined
  data.queryParams.start_time = undefined
  data.queryParams.end_time = undefined
  currentTime.value = 1
  getList();
}
function pageChange (val) {
  data.queryParams.page = val.page
  getList()
}
getList();
</script>
<style lang="scss" scoped>
:deep(.el-table__row) {
  height: 80px;
}
.top {
  width: 100%;
  display: flex;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 14px;
    position: relative;
    display: flex;
    .block {
      display: flex;
      align-items: center;
    }
    .block1 {
      margin-left: 60px;
      line-height: 36px;
      font-size: 14px;
      color: #666;
      .num, .money {
        font-size: 24px;
      }
      .num {
        color: #121212;
      }
      .money {
        color: #8F56F1;
      }
    }
  }
  .title-con {
    margin-left: 14px;
    color: #666;
    font-size: 14px;
    line-height: 32px;
    .hospital {
      color: #121212;
      font-size: 18px;
    }
  }
}

:deep(.el-table__header tr),
:deep(.el-table__row) {
  height: 60px;
}
.input-item {
  padding: 0;
  width: 290px;
  height: 44px;
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
}
.time-filter {
  font-size: 14px;
  span {
    padding: 6px;
    cursor: pointer;
  }
  .no-cursor {
    cursor: default;
  }
  .active {
    color: #8F56F1;
  }
}
:deep(.el-input) {
  width: 100%;
  height: 100%;
}
:deep(.el-input-group__append) {
  color: #ffffff;
  border: 0;
  background: linear-gradient(45deg, #9357f2, #c969ec);
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
  width: 100%;
  --el-select-border-color-hover: 0;
  --el-select-input-focus-border-color: 0;
}
:deep(.el-table__header tr),
:deep(.el-table__row) {
  height: 60px;
}
</style>
<style scoped>
.form-box {
  margin: 20px;
}
</style>
