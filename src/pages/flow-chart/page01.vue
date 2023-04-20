<template>
  <div class="page">
    <div class="app-content">
      <div id="container" style="height: 300px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import ProgressNode from "./components/ProgressNode.vue";
import { Graph } from "@antv/x6";
import { register, getTeleport } from "@antv/x6-vue-shape";
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
  onBeforeUnmount,
} from "vue";
register({
  shape: "custom-vue-node",
  width: 100,
  height: 100,
  component: ProgressNode,
});
const TeleportContainer = getTeleport();
const graph: any = ref();
const makeInfo = () => {
  console.log("dfdf");
};
const data = {
  nodes: [
    {
      id: "node1",
      shape: "rect",
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: "hello",
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: "world",
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
};
// const node = graph.value.addNode({
//   shape: "custom-vue-node",
//   x: 100,
//   y: 60,
//   data: {
//     progress: 80,
//   },
// });

// setInterval(() => {
//   const { progress } = node.getData();
//   node.setData({
//     progress: (progress + 10) % 100,
//   });
// }, 2000);

onMounted(() => {
  makeInfo();
  graph.value = new Graph({
    container: document.getElementById("container")!,
    background: {
      color: "#F2F7FA",
    },
    autoResize: true,
  });

  graph.value.fromJSON(data); // 渲染元素
  graph.value.centerContent(); // 居中显示

  graph.value.addNode({
    shape: "custom-vue-node",
    x: 100,
    y: 60,
  });
});
</script>
