<template>
  <div class="about">
    <h1>This is an about news</h1>
    <div v-for="(item, key) in list" :key="key">
      <div :class="item.is_choose ? 'active-class' : ''">fff</div>
    </div>
    <el-button type="text" @click="clickTest">测试</el-button>
  </div>
</template>


<script src="./news-list.ts"></script>