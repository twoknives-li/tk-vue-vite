<template>
  <div class="about">
    <h1>This is an about news</h1>
    <div v-for="(item, key) in list" :key="key">
      <div :class="item.is_choose ? 'active-class' : ''">fff</div>
    </div>
    <el-button type="text" @click="clickTest">测试</el-button>
  </div>
</template>

<script setup>
const list = [
  {
    id: 1,
    name: "测试名称",
    is_choose: true,
  },
  {
    id: 1,
    name: "测试名称",
    is_choose: true,
  },
  {
    id: 1,
    name: "测试名称",
    is_choose: true,
  },
];

function clickTest() {
  console.log("is test");
  console.log(list[0]);
}
</script>