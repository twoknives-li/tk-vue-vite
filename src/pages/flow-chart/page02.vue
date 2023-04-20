<template>
  <div class="myTable">
  <div class="app-content">
    <div id="container"></div>
  </div>
  </div>
</template>

<script steup lang="ts">
import { defineComponent } from "vue";
import ProgressNode from "./components/ProgressNode.vue";
import { Graph } from "@antv/x6"; 
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

onMounted(() => {
console.log('流程图');
});
</script>
