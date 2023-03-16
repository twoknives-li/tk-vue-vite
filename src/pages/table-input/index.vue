<template>
  <div class="p-4">
    <el-button type="primary" @click="add">添加</el-button>
    <div v-for="(tbItem, tbKey) in state.objList" :key="tbKey">

      {{ tbItem.name }}
      <el-table :data="tbItem.list">
        <el-table-column label="类型" prop="typeName"></el-table-column>
        <el-table-column label="合计">
          <template #default="{ row }">
            <el-input v-model="row.allNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column :label="item.year + '年' + item.month + '月'" v-for="(item, key) in state.monthList" :key="key">
          <template #default="{ row }">
            <!-- <el-input v-if="row.type === '1'" v-model="row.dataList[key].jm"></el-input>
          <el-input v-else v-model="row.dataList[key].gy"></el-input> -->
            {{ row.type }} {{ tbItem.list[0].dataList[key].jm }} {{ tbItem.list[0].dataList[key].gy }}
            <el-input v-if="row.type === 1" v-model="tbItem.list[0].dataList[key].jm"></el-input>
            <el-input v-if="row.type === 2" v-model="tbItem.list[0].dataList[key].gy"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="doSubmit">提交</el-button>
  </div>
</template>
<script setup lang="ts">
import { watch, nextTick, reactive, onMounted, computed } from "vue";
const state: any = reactive({
  objList: [
    {
      name: '表格',
      list: [],
    }
  ],
  monthList: [
    {
      year: '2023',
      month: '3',
    },
    {
      year: '2023',
      month: '4',
    },
    {
      year: '2023',
      month: '5',
    },
    {
      year: '2023',
      month: '6',
    },
    {
      year: '2023',
      month: '7',
    },
    {
      year: '2023',
      month: '8',
    },
    {
      year: '2023',
      month: '9',
    }

  ]
})

const doSubmit = () => {
  console.log('info');
  console.log(state.objList);
}

// 构建数据
const makeDataList = () => {
  const list = [{
    type: 1,
    typeName: '供气量',
    allNumber: 999,
    dataList: []
  },
  {
    type: 2,
    typeName: '用气量',
    allNumber: 666,
    dataList: []
  }];
  list.map(item => {
    const dataList: any = [];
    state.monthList.map(mItem => {
      const info = {
        year: mItem.year,
        month: mItem.month,
        jm: 0,
        gy: 0
      }
      dataList.push(info)
    })
    item.dataList = dataList;

  })
  return list;
}

// 新增
const add = () => {
  const item = {
    name: state.objList.length + 1 + '表格',
    list: makeDataList()

  }
  state.objList.push(item);
}
onMounted(() => {
  state.objList[0].list = makeDataList();
})
</script>