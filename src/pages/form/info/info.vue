<template>
  <el-form :model="state.info" ref="infoRef" label-width="80px" :rules="rules">
    <el-col :sm="12">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="state.info.name"> </el-input>
      </el-form-item>
    </el-col>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="state.info.phone" placeholder="电话"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
const props = defineProps({
  newsInfo: {
    type: Object,
    default: () => {},
  },
});
const infoRef = ref();
const rulesInfo = {
  name: [{ required: true, message: "姓名", trigger: "blur" }],
  phone: [{ required: true, message: "电话", trigger: "blur" }],
};
const state = reactive({
  info: props.newsInfo
});
const rules = reactive(rulesInfo);
onMounted ( ()=>{
 console.log('props', props.newsInfo);
})


defineExpose({ state });
</script>
<style scoped>
.about {
  width: 500px;
}
</style>