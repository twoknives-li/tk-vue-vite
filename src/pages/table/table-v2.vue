<template>
  <div class="myTable">
    
  <el-table-v2 :columns="columns" :data="state.saveDATA" :width="700" :height="400" fixed />
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  useAttrs,
  watch,
  nextTick,
  reactive,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
  onBeforeUnmount
} from "vue";
const props = defineProps({
  defaultArray: {
    type: Array,
    default: () => [],
  },
});
const state: any = reactive({

  tableLoading: false,
  tableData: [], // 需要渲染的数据
  saveDATA: [], // 所有数据


})

const tableRef = ref();


const columns = ref([
{
  key: 'deptName',
  dataKey: 'deptName',
  title:'名称',
  width: 150,
},
{
    key: 'divisionName',
    title: '行政区划',
    dataKey: 'divisionName',
    width: 150
  }
]);

watch(
  () => state.num,
  (newV, newOld) => {
    console.log('state.num change', newV);


  }
);
onMounted(() => {

  state.saveDATA = props.defaultArray


})

onBeforeUnmount(() => {
  console.log('onBeforeMount');
})
</script>

<style scoped lang="scss">
.myTable {
  td {
    padding: 6px 0 !important;
  }
}
</style>
