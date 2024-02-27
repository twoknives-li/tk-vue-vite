<template>
  <div style="padding: 10px">
    <el-button @click="doMake()">执行</el-button>
  </div>
</template>
<script setup lang="ts">
import { watch, nextTick, reactive, onMounted, computed } from "vue";

import mittBus from "@/utils/mitt";
mittBus.on("changeTheme", () => {
      console.log("leecode, 这里是监听mittbus");
    });

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
const state = reactive({});
const doMake = () => {
  const a = [2, 4, 3];
  const b = [2, 5, 6];
  addTwoNumbers(a, b);
};

const addTwoNumbers = (l1, l2) => {
  let list: any = [];
  const numA = doOverReturn(l1);
  const numB = doOverReturn(l2);
  const num = numA + numB;
  if (String(num).length < 2) {
    list = [num];
  } else {
    list = String(num).split("").reverse().map(Number);
  }
  console.log("list", list);
  console.log(makeNodes(list));
  return makeNodes(list);
};

function makeNodes(valAry) {
  const count = valAry.length;
  const nodeAry: ListNode[] = [];
  for (let i = count - 1; i > -1; i--) {
    let newNode: ListNode | null = null;
    if (i === count - 1) {
      newNode = new ListNode(valAry[i], null);
    } else {
      newNode = new ListNode(valAry[i], nodeAry[nodeAry.length - 1]);
    }
    nodeAry.push(newNode);
  }
  const headerNode = nodeAry[nodeAry.length - 1];
  return headerNode;
}
function doOverReturn(list) {
  let sum = 0;
  let sumList: any = [];
  if (list && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      sumList.push(Number(list[list.length - i - 1]));
    }
    sum = sumList.join("");
  }
  return Number(sum);
}

onMounted(() => {});
</script>
