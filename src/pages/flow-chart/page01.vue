<template>
  <div class="page">
    <div class="app-content">
      <div id="container" style="height: 600px"></div>
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
      y: 90,
      width: 100,
      height: 40,
      label: "总公司",
      data: {
        disableMove: false,//true为可拖拽，false不可拖拽
      },
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
      id: "node5",
      shape: "circle",
      x: 40,
      y: 180,
      width: 100,
      height: 40,
      label: "AAA",
      data: {
        disableMove: false,//true为可拖拽，false不可拖拽
      },
      attrs: {
        body: {
          stroke: "#fff",
          strokeWidth: 1,
          fill: "#333",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 40,
      y: 300,
      width: 100,
      height: 40,
      label: "分公司A",
      data: {
        disableMove: false,//true为可拖拽，false不可拖拽
      },
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
    {
      id: "node3",
      shape: "rect",
      x: 200,
      y: 300,
      width: 100,
      height: 40,
      label: "分公司A",
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

    {
      id: "node6",
      shape: "rect",
      x: -100,
      y: 300,
      width: 100,
      height: 40,
      label: "分公司D",
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

    {
      id: "node7",
      shape: "rect",
      x: 360,
      y: 300,
      width: 100,
      height: 40,
      label: "分公司E",
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
const parse = () => {
  const jsonDate = JSON.stringify(graph.value.toJSON(), null, 2);
  console.log("jsonDate", graph.value.toJSON());
};

onMounted(() => {
  makeInfo();
  graph.value = new Graph({
    container: document.getElementById("container")!,
    background: {
      color: "#ffffff",
    },
    autoResize: true,
    // 关于拖拽的方法
    interacting: function (cellView) {
		    if (cellView.cell.getData() != undefined && !cellView.cell.getData().disableMove) {
		      return { nodeMovable: false }
		    }
		    return true
		  },

  });

  graph.value.fromJSON(data); // 渲染元素
  graph.value.centerContent(); // 居中显示

  // 连接线
  graph.value.addEdge({
    shape: "edge",
    source: "node1", // 源节点
    target: "node5", // 目标节点
  });
  graph.value.addEdge({
    shape: "edge",
    source: "node5", // 源节点
    target: "node2", // 目标节点
    router: {
      name: "orth",
      args: {},
    },
  });
  graph.value.addEdge({
    shape: "edge",
    source: "node5", // 源节点
    target: "node3", // 目标节点
    // vertices: [{ x: 100, y: 160 }],
    router: {
      name: "orth",
      args: {},
    },
  });
  graph.value.addEdge({
    shape: "edge",
    source: "node5", // 源节点
    target: "node6", // 目标节点
    // vertices: [{ x: 100, y: 160 }],
    router: {
      name: "orth",
      args: {},
    },
  });
  graph.value.addEdge({
    shape: "edge",
    source: "node5", // 源节点
    target: "node7", // 目标节点
    // vertices: [{ x: 100, y: 160 }],
    router: {
      name: "orth",
      args: {},
    },
  });

  graph.value.addNode({
    shape: "custom-vue-node",
    x: 50,
    y: 50,
  });

  graph.value.on("cell:change:*", () => {
    console.log("dfdfdfdf");
    parse();
  });

  graph.value.on("change:data", ({ current }) => {
    const { progress } = current;
    console.log("change:data", current);
  });
});
</script>
