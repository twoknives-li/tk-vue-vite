<template>
  <el-table v-loading="state.tableLoading" :data="state.tableData" ref="tableRef" max-height="500" class="myTable"
    style="width: 100%">
    <el-table-column fixed prop="deptName" label="单位名称" width="150">
    </el-table-column>
    <el-table-column fixed prop="divisionName" label="行政区划" width="150">
    </el-table-column>
    <el-table-column fixed prop="portName" label="港口名称" width="150" />
    <el-table-column prop="date" label="船舶进出港及报备情况" width="150">
      <el-table-column prop="date" label="本港籍船舶进港" width="150">
        <el-table-column prop="bgjInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="bgjInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="外港籍船舶进港" width="150">
        <el-table-column prop="wgjInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="wgjReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="本港籍船舶出港" width="150">
        <el-table-column prop="bgjOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="bgjOutReport" label="出备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="外港籍船舶出港" width="150">
        <el-table-column prop="wgjOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="wgjOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
    </el-table-column>


    <el-table-column prop="date" label="主要船舶类型进港及报备情况" width="150">
      <el-table-column prop="date" label="渔业捕捞船" width="150">
        <el-table-column prop="yyblInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="yyblInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="游艇" width="150">
        <el-table-column prop="ytInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="ytInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="货船" width="150">
        <el-table-column prop="hcInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="hcInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="客船" width="150">

        <el-table-column prop="kcInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="kcInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="文体船舶" width="150">

        <el-table-column prop="wtInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="wtInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="加油船舶" width="150">
        <el-table-column prop="jyInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="jyInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="工程船舶" width="150">
        <el-table-column prop="gcInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="gcInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="其他船舶" width="150">
        <el-table-column prop="qtInPort" label="进港数量" width="150"></el-table-column>
        <el-table-column prop="qtInReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
    </el-table-column>



    <el-table-column prop="date" label="主要船舶类型出港及报备情况" width="150">
      <el-table-column prop="date" label="渔业捕捞船" width="150">
        <el-table-column prop="yyblOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="yyblOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="游艇" width="150">
        <el-table-column prop="ytOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="ytOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="货船" width="150">
        <el-table-column prop="hcOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="hcOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="客船" width="150">

        <el-table-column prop="kcOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="kcOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="文体船舶" width="150">

        <el-table-column prop="wtOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="wtOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="加油船舶" width="150">
        <el-table-column prop="jyOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="jyOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="工程船舶" width="150">
        <el-table-column prop="gcOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="gcOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="其他船舶" width="150">
        <el-table-column prop="qtOutPort" label="出港数量" width="150"></el-table-column>
        <el-table-column prop="qtOutReport" label="报备数量" width="150"></el-table-column>
      </el-table-column>
    </el-table-column>

    <el-table-column prop="date" label="人员进出港报备情况" width="150">
      <el-table-column prop="personInPort" label="进港报备数量" width="150"></el-table-column>
      <el-table-column prop="personOutPort" label="出港报备数量" width="150"></el-table-column>
    </el-table-column>

    <el-table-column prop="date" label="检查工作情况" width="150">
      <el-table-column prop="checkShip" label="船舶检查数量" width="150"></el-table-column>
      <el-table-column prop="checkPerson" label="人员检查数量" width="150"></el-table-column>
    </el-table-column>



    <el-table-column prop="date" label="进出港及报备时间段情况" width="150">
      <el-table-column prop="date" label="(0 - 3)时" width="150">
        <el-table-column prop="below3InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below3OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below3InPerson" label="进港人员" width="150" />
        <el-table-column prop="below3OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(3 - 6)时" width="150">
        <el-table-column prop="below6InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below6OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below6InPerson" label="进港人员" width="150" />
        <el-table-column prop="below6OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(6 - 9)时" width="150">
        <el-table-column prop="below9InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below9OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below9InPerson" label="进港人员" width="150" />
        <el-table-column prop="below9OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(9 - 12)时" width="150">
        <el-table-column prop="below12InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below12OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below12InPerson" label="进港人员" width="150" />
        <el-table-column prop="below12OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(12 - 15)时" width="150">
        <el-table-column prop="below15InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below15OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below15InPerson" label="进港人员" width="150" />
        <el-table-column prop="below15OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(15 - 18)时" width="150">
        <el-table-column prop="below18InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below18OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below18InPerson" label="进港人员" width="150" />
        <el-table-column prop="below18OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(18 - 21)时" width="150">
        <el-table-column prop="below21InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below21OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below21InPerson" label="进港人员" width="150" />
        <el-table-column prop="below21OutPerson" label="出港人员" width="150" />
      </el-table-column>
      <el-table-column prop="date" label="(21 - 24)时" width="150">
        <el-table-column prop="below24InReport" label="进港报备船舶" width="150" />
        <el-table-column prop="below24OutReport" label="出港报备船舶" width="150" />
        <el-table-column prop="below24InPerson" label="进港人员" width="150" />
        <el-table-column prop="below24OutPerson" label="出港人员" width="150" />
      </el-table-column>
    </el-table-column>

    <!-- <el-pagination v-if="state.showPagina" layout="prev, pager, next" :total="state.total" @current-change="currtChange" /> -->
  </el-table>
</template>

<script setup>
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
const state = reactive({
  // 分页 -废弃
  list: [],
  currt: 1,
  size: 100,
  total: 0,
  showPagina: false,

  tableLoading: false,
  tableData: [], // 需要渲染的数据
  saveDATA: [], // 所有数据
  fixLeft: null,
  fixRight: null,
  scrollTop: 0,
  num: 0,
  start: 0,
  end: 120, // 3倍的pageList
  starts: 0, // 备份[保持与上一样]
  ends: 20, // 备份[保持与上一样]
  pageList: 40, // 一屏显示
  itemHeight: 41, // 每一行高度
  timeOut: 40 // 延迟

})

const tableRef = ref();  // 设置了滚动的那个盒子
const bodyWrapper = ref();
const tableFixedLeft = ref();
const tableFixedRight = ref();
const tableWarp = ref();

const onScroll = () => {
  console.log("onScroll", bodyWrapper.value);
  console.log('tableRef.value.scrollTop', bodyWrapper.value.scrollTop);
  console.log('tableRef.value.scrollLeft', bodyWrapper.value.scrollLeft);
  state.scrollTop = bodyWrapper.value.scrollTop;
  state.num = Math.floor(state.scrollTop / (state.itemHeight * state.pageList))

}
const removeScroll = () => {

};
// 切换页码
const currtChange = (number) => {

}
watch(
  () => state.num,
  (newV, newOld) => {
    console.log('state.num change', newV);

    // 因为初始化时已经添加了3屏的数据，所以只有当滚动到第3屏时才计算位移量
    if (newV > 1) {
      state.tableLoading = true;
      state.start = (newV - 1) * state.pageList
      state.end = (newV + 2) * state.pageList
      setTimeout(() => {
        // 计算偏移量
        tableWarp.value.style.transform = `translateY(${state.start *
          state.itemHeight}px)`
        if (state.fixLeft) {
          state.fixLeft.style.transform = `translateY(${state.start *
            state.itemHeight}px)`
        }
        if (state.fixRight) {
          state.fixRight.style.transform = `translateY(${state.start *
            state.itemHeight}px)`
        }
        state.tableData = state.saveDATA.slice(state.start, state.end)

        state.tableLoading = false;
      }, state.timeOut)
    } else {
      state.tableLoading = true;
      setTimeout(() => {
        state.tableData = state.saveDATA.slice(state.starts, state.ends)
        tableWarp.value.style.transform = `translateY(0px)`
        if (state.fixLeft) {
          state.fixLeft.style.transform = `translateY(0px)`
        }
        if (state.fixRight) {
          state.fixRight.style.transform = `translateY(0px)`
        }

        state.tableLoading = false;
      }, state.timeOut)
    }

  }
);
onMounted(() => {

  state.saveDATA = props.defaultArray
  state.tableData = props.defaultArray.slice(state.start, state.end)


  console.log('tableRef', tableRef.value);

  // 设置了滚动的盒子
  bodyWrapper.value = tableRef.value.$refs.bodyWrapper.getElementsByClassName("el-scrollbar__wrap")[0];

  //  tableRef.value = document.querySelector(".myTable");
  // 左侧固定列所在的盒子
  tableFixedLeft.value = document.querySelector(
    '.el-table .el-table__fixed .el-table__fixed-body-wrapper'
  )
  // 右侧固定列所在的盒子
  tableFixedRight.value = document.querySelector(
    '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper'
  )
  /**
   * fixed-left | 主体 | fixed-right
   */
  // 主体改造
  // 创建内容盒子divWarpPar并且高度设置为所有数据所需要的总高度
  let divWarpPar = document.createElement('div')
  // 如果这里还没获取到saveDATA数据就渲染会导致内容盒子高度为0，可以通过监听saveDATA的长度后再设置一次高度
  divWarpPar.style.height = state.saveDATA.length * state.itemHeight + 'px'
  // 新创建的盒子divWarpChild
  let divWarpChild = document.createElement('div')
  divWarpChild.className = 'fix-warp'
  // 把tableRef的第一个子元素移动到新创建的盒子divWarpChild中
  console.log('children', bodyWrapper.value.children[0]);
  divWarpChild.append(bodyWrapper.value.children[0])
  // 把divWarpChild添加到divWarpPar中，最把divWarpPar添加到tableRef中
  divWarpPar.append(divWarpChild)
  bodyWrapper.value.append(divWarpPar);

  // left改造
  let divLeftPar = document.createElement('div')
  divLeftPar.style.height = state.saveDATA.length * state.itemHeight + 'px'
  let divLeftChild = document.createElement('div')
  divLeftChild.className = 'fix-left'
  tableFixedLeft.value &&
    divLeftChild.append(tableFixedLeft.value.children[0])
  divLeftPar.append(divLeftChild)
  tableFixedLeft.value && tableFixedLeft.value.append(divLeftPar)

  // right改造
  let divRightPar = document.createElement('div')
  divRightPar.style.height = state.saveDATA.length * state.itemHeight + 'px'
  let divRightChild = document.createElement('div')
  divRightChild.className = 'fix-right'
  tableFixedRight.value &&
    divRightChild.append(tableFixedRight.value.children[0])
  divRightPar.append(divRightChild)
  tableFixedRight.value && tableFixedRight.value.append(divRightPar)

  // 被设置的transform元素
  tableWarp.value = document.querySelector(
    '.el-table .el-table__body-wrapper .fix-warp'
  )
  state.fixLeft = document.querySelector(
    '.el-table .el-table__fixed .el-table__fixed-body-wrapper .fix-left'
  )
  state.fixRight = document.querySelector(
    '.el-table .el-table__fixed-right .el-table__fixed-body-wrapper .fix-right'
  )


  // tableRef.value = document.querySelector(".myTable");
  bodyWrapper.value.addEventListener('scroll', onScroll, true)
})

onBeforeUnmount(() => {
  console.log('onBeforeMount');
  bodyWrapper.value.removeEventListener("scroll", removeScroll);
})
</script>

<style scoped lang="scss">
.myTable {
  td {
    padding: 6px 0 !important;
  }
}

/*滚动条样式*/
.el-table__body-wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  background: #666;
}

.el-table__body-wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ccc;
}
</style>
