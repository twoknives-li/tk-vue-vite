<template>
  <div>
    <!-- <draggable
      class="wrapper"
      v-if="data.myArray.length>0"
      v-model="data.myArray"
      @start="data.drag = true"
      @end="data.drag = false"
      item-key="index"
    >
      <template #item="{ element }">
        <div class="item">
          <p>{{ element }}</p>
        </div>
      </template>
    </draggable> -->

    <draggable
      v-model="data.myArray"
      chosenClass="chosen"
      forceFallback="true"
      group="people"
      animation="1000"
      @start="data.drag = true"
      @end="data.drag = false"
    >
      <template #item="{ element }">
        <div
          class="border p-3"
          @contextmenu.prevent
          @mousedown="getInfo($event, element)"
        >
          {{ element.name }}
        </div>
      </template>
    </draggable>

    <div v-show="data.showCurrt">选中的div: {{ data.currtRow.name }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useAttrs,
  watch,
  nextTick,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
  onBeforeUnmount,
} from "vue";
import draggable from "vuedraggable";

const data:any = reactive({
  drag: false,
  myArray: [
    { id: 1, name: "Jenny" },
    { id: 2, name: "kevin" },
    { id: 3, name: "lili" },
  ],
  currtRow:{},
  showCurrt: false
});

const getInfo = (event, row) => {
  console.log(event);
  console.log(row);
  if (event.button === 0) {
    console.log("点击左键");
    clearCurrt();
  } else if (event.button === 1) {
    console.log("点击滚轮");
  } else {
    console.log("点击右键");
    getCurrtInfo(row);
  }
};

const clearCurrt=()=>{
  
  data.showCurrt = false;
   data.currtRow = {};
}
const getCurrtInfo=(row)=> {
   data.showCurrt = true;
   data.currtRow = row;
}
onMounted(() => {
  console.log("vuedraggable");
});
</script>
