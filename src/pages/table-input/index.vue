<template>
  <div class="p-4">
    <el-button type="primary" @click="add">添加</el-button>
    <div
      v-for="(tbItem, tbKey) in state.objList"
      :key="tbKey"
      class="table-box"
    >
      {{ tbItem.name }}

      {{ state.selectedData }}
      <el-table
        border
        :data="tbItem.list"
        @cell-mouse-enter="cellTable"
        @cell-click="cellClick"
        :cell-style="cellStyle"
        @mousedown.native="down($event)"
        @mousemove.native="move($event)"
        @mouseup.native="up($event)"
        :cell-class-name="tableCellClassName"
        :row-key="(row) => row.id"
        ref="multipleTable"
      >
        <el-table-column label="类型" prop="typeName"></el-table-column>
        <el-table-column label="合计">
          <template #default="{ row }">
            <el-input v-model="row.allNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          :label="item.year + '年' + item.month + '月'"
          v-for="(item, key) in state.monthList"
          :key="key"
        >
          <template #default="{ row }">
            <!-- <el-input v-if="row.type === '1'" v-model="row.dataList[key].jm"></el-input>
          <el-input v-else v-model="row.dataList[key].gy"></el-input> -->
            {{ row.type }} {{ tbItem.list[0].dataList[key].jm }}
            {{ tbItem.list[0].dataList[key].gy }}
            <el-input
              v-if="row.type === 1"
              v-model="tbItem.list[0].dataList[key].jm"
            ></el-input>
            <el-input
              v-if="row.type === 2"
              v-model="tbItem.list[0].dataList[key].gy"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="doSubmit">提交</el-button>
  </div>
</template>
<script setup lang="ts">
import { watch, nextTick, ref, reactive, onMounted, computed } from "vue";
const state: any = reactive({
  objList: [
    {
      name: "表格",
      list: [],
    },
  ],
  monthList: [
    {
      year: "2023",
      month: "3",
    },
    {
      year: "2023",
      month: "4",
    },
    {
      year: "2023",
      month: "5",
    },
    {
      year: "2023",
      month: "6",
    },
    {
      year: "2023",
      month: "7",
    },
    {
      year: "2023",
      month: "8",
    },
    {
      year: "2023",
      month: "9",
    },
  ],
  // 列表集合
  historyDataTables: [],
  select: false,
  isMouseDown: true, // 是否需要(允许)处理鼠标的移动事件

  // 定义移动元素div
  rect: null,
  // 记录鼠标按下时的坐标
  downX: 0,
  downY: 0,
  // 记录鼠标抬起时候的坐标
  mouseX2: 0,
  mouseY2: 0,
  // 表格dom元素
  TableDom: null,
  tableHeaderHeight: 0,
  selectedData: [], // 鼠标框选选中的数据

  selectedCellTop: 0, // 选中单元格距离el-table顶部的距离
  selectedCellLeft: 0, // 选中单元格距离el-table左侧的距离

  tableRectTop: 0, // el-table距离window顶部的距离
  tableRectLeft: 0, // el-table距离window左侧的距离
  xqArr: []
});
const multipleTable: any = ref();
const doSubmit = () => {
  console.log("info");
  console.log(state.objList);
};

// 构建数据
const makeDataList = () => {
  const list = [
    {
      type: 1,
      typeName: "供气量",
      allNumber: 999,
      dataList: [],
    },
    {
      type: 2,
      typeName: "用气量",
      allNumber: 666,
      dataList: [],
    },
  ];
  list.map((item) => {
    const dataList: any = [];
    state.monthList.map((mItem) => {
      const info = {
        year: mItem.year,
        month: mItem.month,
        jm: 0,
        gy: 0,
      };
      dataList.push(info);
    });
    item.dataList = dataList;
  });
  return list;
};

// 新增
const add = () => {
  const item = {
    name: state.objList.length + 1 + "表格",
    list: makeDataList(),
  };
  state.objList.push(item);
};
const cellClick = (row, column, cell, event) => {
  // console.log("cellClick", row, column, cell, event);
};
const cellTable = (row, column, cell, event) => {
  // console.log('这里是cellTable',row, column, cell, event);
};
const cellStyle = (row, column, cell, event) => {
  // 对xqArr选择选区的单元格加蓝边框
  let matchObj = state.xqArr.find(
    (item) =>
      item.column === column.index &&
      // item.row === row.index &&
      item.rowId === row.id &&
      item.sampleTime === row.sampleTime
  );
  console.log(state.xqArr);
  console.log('matchObj', matchObj);
  if (matchObj) {
    return { border: "1px solid #5E99FD" };
  }
};

const down = (event) => {
  // 当允许鼠标按下时,才允许处理鼠标的移动事件,这里结合项目其他问题所以设置了判断条件
  if (state.isMouseDown) {
    console.log("执行down");
    state.select = true;
    state.rect = document.createElement("div");
    // 框选div 样式
    state.rect.style.cssText =
      "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px solid #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
    state.rect.id = "selectDiv";
    // console.log("state.TableDom", state.TableDom);
    getTableMarginLeft();

    const container: any = document.querySelector(".el-table__body-wrapper"); // 获取table容器元素
    state.TableDom.appendChild(state.rect); // 添加到table元素
    // 取得鼠标按下时的坐标位置
    state.downX =
      event.x || event.clientX + container.scrollLeft - state.tableRectLeft; // 鼠标按下时的x轴坐标 event.x 兼容火狐浏览器, event.clientX 兼容谷歌浏览器
    state.downY =
      event.y || event.clientY + container.scrollTop - state.tableRectTop; // 鼠标按下时的y轴坐标

    state.rect.style.left = state.downX + "px"; // 设置你要画的矩形框的起点位置
    state.rect.style.top = state.downY + "px"; // 设置你要画的矩形框的起点位置
    //设置你要画的矩形框的起点位置
    state.rect.style.left = state.downX; // 因为在火狐浏览器下,上面的代码不起作用,所以在这里再写一遍，为什么火狐浏览器不起作用,因为火狐浏览器下,我们的div是绝对定位的,所以我们要加上px，为什么这里没加px,因为我们下面要加上px,所以这里不用加
    state.rect.style.top = state.downY;
  } else {
    return;
  }
};

const move = (event) => {
  /*
      这个部分,根据你鼠标按下的位置,和你拉框时鼠标松开的位置关系,可以把区域分为四个部分,根据四个部分的不同,
      我们可以分别来画框,否则的话,就只能向一个方向画框,也就是点的右下方画框.
      */
  if (state.select && state.isMouseDown) {
    // 取得鼠标移动时的坐标位置
    state.mouseX2 = event.clientX; // 鼠标移动时的x轴坐标
    state.mouseY2 = event.clientY; // 鼠标移动时的y轴坐标
    // 框选元素的显示与隐藏
    if (state.rect.style.display == "none") {
      state.rect.style.display = "";
    }
    // 框选元素的位置处理
    state.rect.style.left =
      Math.min(state.mouseX2, state.downX) - state.tableRectLeft + "px";

    state.rect.style.top =
      Math.min(state.mouseY2, state.downY) - state.tableRectTop + "px"; // 取得鼠标拉框时的起点坐标

    state.rect.style.width = Math.abs(state.mouseX2 - state.downX) + "px"; // 取得鼠标拉框时的宽度

    state.rect.style.height = Math.abs(state.mouseY2 - state.downY) + "px"; // 取得鼠标拉框时的高度
    // A part
    if (state.mouseX2 < state.downX && state.mouseY2 < state.downY) {
      state.rect.style.left = state.mouseX2 + state.tableRectLeft;
      state.rect.style.top = state.mouseY2 + state.tableRectTop;
    }

    // B part
    if (state.mouseX2 > state.downX && state.mouseY2 < state.downY) {
      state.rect.style.left = state.downX + state.tableRectLeft;
      state.rect.style.top = state.mouseY2 + state.tableRectTop;
    }

    // C part
    if (state.mouseX2 < state.downX && state.mouseY2 > state.downY) {
      state.rect.style.left = state.mouseX2 + state.tableRectLeft;
      state.rect.style.top = state.downY + state.tableRectTop;
    }

    // D part
    if (state.mouseX2 > state.downX && state.mouseY2 > state.downY) {
      state.rect.style.left = state.downX + state.tableRectLeft;
      state.rect.style.top = state.downY + state.tableRectTop;
    }
  } else {
    return;
  }

  stopEvent(event);
};
// 阻止默认事件
const stopEvent = (event) => {
  if (event.stopPropagation) {
    // 标准浏览器
    event.stopPropagation(); // 阻止事件冒泡
    event.preventDefault(); // 阻止默认事件
  } else {
    // IE浏览器
    event.cancelBubble = true;
    event.returnValue = false;
  }
};

// 鼠标抬起事件
const up = () => {
  if (state.select && state.isMouseDown) {
    const container: any = document.querySelector(".el-table__body-wrapper"); // 获取table容器元素
    const scrollTop = container.scrollTop; // 获取el-table的scrollTop和scrollLeft
    const scrollLeft = container.scrollLeft;

    const headerWrapper = state.TableDom.querySelector(".el-table__header");
    const tableHeaderHeight = Math.ceil(
      headerWrapper.getBoundingClientRect().height
    );
    const columns = multipleTable.value[0].columns; // 表格的标题
    // console.log("columns", multipleTable.value[0]);

    const rectLeft = state.rect.offsetLeft + scrollLeft - state.tableRectLeft;
    const rectTop =
      state.rect.offsetTop + scrollTop - state.tableRectTop - tableHeaderHeight;

    const tableBody: any = document.querySelector(".el-table__body");

    tableBody.children[1].childNodes.forEach((element) => {
      for (let index = 0; index < element.childNodes.length; index++) {
        // 获取当前单元格
        const cell = element.childNodes[index];
        if (
          // 判断选中的单元格是否在鼠标拉框的范围内
          rectLeft < cell.offsetLeft - state.tableRectLeft + cell.offsetWidth &&
          rectLeft + state.rect.offsetWidth >
            cell.offsetLeft - state.tableRectLeft &&
          rectTop < cell.offsetTop - state.tableRectTop + cell.offsetHeight &&
          rectTop + state.rect.offsetHeight >
            cell.offsetTop - state.tableRectTop &&
          index >= 3 // 选中的单元格所在列的索引大于等于3
        ) {
          if (cell.className.indexOf("add") == -1) {
            // cell.style.border = "1px solid red";
            const cellText = cell.innerText;
            console.log('element.rowIndex', element.rowIndex);
            const rowData = state.objList[0].list[element.rowIndex].dataList; // 获取当前单元格所在的行数据
            console.log('rowData', rowData);
            // 获取表格的列名的属性名property
            let columnProperty = undefined;
            // 遍历第一行数据
            // console.log(index, '--index--'); // 框选数据所在列的索引

            for (const item of columns) {
              if (item.index === index) {
                columnProperty = item.property;
                break;
              }
            }
            // const rowIndex = element.rowIndex; // 将当前单元格所在的行数据加入到该列数据中
            const columnIndex = index;
            const time = rowData.sampleTime;

            // 选择要添加到选中行数组中的属性
            const selected = {
              rowId: rowData.id,
              // row: rowIndex,
              column: columnIndex,
              sampleTime: time,
              factor: columnProperty,
              tag: rowData[columnProperty + "_tag"] || "",
              tagStatus: rowData[columnProperty + "_tag_status"] || "",
              mark: rowData[columnProperty + "_mark"] || "",
            };

            console.log('selected', selected);
            // 将选中数据加入到状态中已有的数据中,如果已有相同的数据，则不加入
            if (
              !state.selectedData.some((data) => state.isEqual(data, selected))
            ) {
              state.selectedData.push(selected);
            }
            // 将选中数据加入到 xqArr 中
            state.selectedData.forEach((item) => {
              // 如果 xqArr 中已有相同数据，则不加入
              if (!state.xqArr.some((data) => state.isEqual(data, item))) {
                state.xqArr.push(item);
              }
            });
            state.selectedData = [];
          }
        }
      }
    });

    //鼠标抬起,就不允许在处理鼠标移动事件
    state.select = false;
    //隐藏图层
    if (state.rect) {
      state.TableDom.removeChild(state.rect);
    }
  } else {
    return;
  }
};

// 获取table距离页面左侧和上方的距离
const getTableMarginLeft = () => {
  const tableRect = state.TableDom.getBoundingClientRect(); // 获取el-table元素的位置信息
  state.tableRectTop = Math.ceil(tableRect.top);
  state.tableRectLeft = Math.ceil(tableRect.left);
};

const tableCellClassName = ({ row, column, rowIndex, columnIndex }) => {
//注意这里是解构
//利用单元格的 className 的回调方法，给行列索引赋值
row.index = rowIndex;
column.index = columnIndex;
};
onMounted(() => {
  state.objList[0].list = makeDataList();
  
  console.log("onMounted  tableDom", multipleTable.value[0]);
  state.TableDom = multipleTable.value[0].$el;
  getTableMarginLeft();

  window.addEventListener("resize", getTableMarginLeft);

  state.clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  state.clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  // state.otherHeight =
  //   Math.ceil($(".is-always-shadow").outerHeight()) +
  //   Math.ceil($(".is-top").outerHeight());

  state.maxHeight1 = state.clientHeight - state.otherHeight - 150 + "px";
});
</script>
<style scoped>
::v-deep .el-table td.blue-cell {
  border: 1px solid blue !important;
}
</style>
