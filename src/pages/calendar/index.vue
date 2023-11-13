<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-calendar>
          <template #date-cell="{ data }">
            <div :class="`tk-bg ${makeDateClass(data.day)}`" @click="doUrl(data,item)">
              {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
              <div v-for="(item, index) in textContent(data.day)" :key="index">
                <el-button type="primary" v-if="item.status === 1"  
                  >填报</el-button
                >
                <el-button type="success" v-if="item.status === 2"  
                  >已填报</el-button
                >
                <el-button type="warning" v-if="item.status === 3"
                  >未填报</el-button
                >
                <el-button type="info" v-if="item.status === 4"
                  >未开始</el-button
                >
              </div>
            </div>
          </template>
        </el-calendar>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
const state = reactive({
  tableData: [],
  //测试数据
  calendarData: [
    {
      day: "2023-10-06",
      status: 1,
    },
    {
      day: "2023-10-19",
      status: 2,
    },
    {
      day: "2023-10-20",
      status: 3,
    },
    {
      day: "2023-10-21",
      status: 4,
    },
  ],
});
const checkDayStatus = (data) => {
  console.log(data);
};
// 构建样式
const makeDateClass = (data) => {
  // console.log("makeDateClass", data);
  let str = "tk-bg";
  state.calendarData.map((item) => {
    if (data === item.day) {
      str = "tk-bg-" + String(item.status);
    }
  });
  return str;
};
//处理日期获取后台数据动态渲染上去
const textContent = (date) => {
  //当前date是拿到上面日历组件当前的日期值 根据该值去筛选测试数据找到对应各个日期下对应的数据return出去
  // console.log(date, 1111);
  return state.calendarData.filter((item) => {
    return date === item.day;
  });
};
const doUrl = (data, item)=>{
  console.log('doUrl  点击了区域框 ',data, item);
} 
onMounted(() => {
  console.log(" 这里是日历页");
});
</script>
<style lang="scss" scoped>
.is-selected {
  color: #1989fa;
}
.tk-bg {
  background: #DCDFE6;
  width: 100%;
  height: 100%;
  padding: 8px;
}
.tk-bg-1 {
  background: #E6A23C;
}
.tk-bg-2 {
  background: #a1e77e;
}
.tk-bg-3 {
  background: #F56C6C;
}
</style>
