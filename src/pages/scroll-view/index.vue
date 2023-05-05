<template>
  <div class="p-10">
    <div class="box" id="boxItem">
      <div
        class="box-item"
        :class="state.nowCurrt.item === item.item ? 'currt' : ''"
        v-for="(item, key) in state.list"
        :key="key"
        :id="item.item"
        @click="doCheck(item, key, $event)"
      >
        <div>{{ item.item }}</div>
      </div>
    </div>

    <div>当前选中:{{ state.nowCurrt.item }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

const scrollRef = ref();
const rulesInfo = {
  name: [{ required: true, message: "姓名", trigger: "blur" }],
  phone: [{ required: true, message: "电话", trigger: "blur" }],
};
const state: any = reactive({
  scrollLeft: 0, //滚动条偏移量
  nowCurrt: {},
  list: [
    {
      item: "A",
      vale: "A",
    },
    {
      item: "B",
      vale: "B",
    },
    {
      item: "C",
      vale: "C",
    },
    {
      item: "D",
      vale: "D",
    },
    {
      item: "E",
      vale: "E",
    },
    {
      item: "E2",
      vale: "E2",
    },
    {
      item: "F",
      vale: "F",
    },
    {
      item: "G",
      vale: "G",
    },
  ],
});
const doCheck = (row, index, event) => {
  state.nowCurrt = row;

  const element: any = document.getElementById(row.item);
  const boxItem: any = document.getElementById('boxItem');
  const offsetHeight = element.offsetHeight;
  // console.log(event);
  // console.log(event.clientX);
  // console.log(offsetHeight);

  const left = index * 30;
  // console.log(left);
  boxItem.scrollLeft  = left ;
};
onMounted(() => {});
</script>
<style scoped lang="scss">
.box {
  width: 300px;
  overflow-x: scroll;
// overflow-y: hidden;
//   white-space: nowrap;

display: flex;
    justify-content: space-between;
  .currt {
    background: #dfdfdf;
  }
  .box-item {
    display: inline-table;
    width: 120px;
    padding: 0 20px;
    text-align: center;
    border: 1px solid #333;
  }
}
.box::-webkit-scrollbar {
  // display: none;
}
</style>
