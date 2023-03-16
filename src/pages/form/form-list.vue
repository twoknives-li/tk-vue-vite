<template>
  <div class="page">
    <div class="column">
      <h1>setup+ts多表单校验 {{ list.length }}</h1>
      <el-row
        :gutter="20"
        type="flex"
        justify="center"
        style="margin-bottom: 20px"
      >
        <el-button type="primary" @click="add">增加</el-button>
        <el-button type="reset" @click="rest">移除</el-button>
      </el-row>
    </div>
    <el-form :model="formListInfo" ref="infoChildRef" :rules="rules">
      <el-form-item label="证件号" prop="idCard">
        <el-input v-model="formListInfo.idCard" placeholder="请输入"></el-input>
      </el-form-item>
      <div v-for="(item, key) in list" :key="key" class="column">
        <form-info :newsInfo="item" ref="childForm"></form-info>
        <el-divider></el-divider>
      </div>
      <el-button type="primary" @click="doSave">保存</el-button>
      <el-button type="reset" @click="doReset">重置</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">

import formInfo from "./info/info.vue";
export default {
  components:{
    formInfo
  }
};
</script>

<script setup lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
import Vue from "vue";
import type { FormInstance } from "element-plus";


const list: any = reactive([]);
const info = {
  idCard: "",
  list: [],
};
const rules = {
  idCard: [{ required: true, message: "idCard", trigger: "blur" }],
};
const formListInfo = ref(info);
const childForm: any = ref([]);

onMounted(() => {
  console.log(childForm.value);
  childForm.value;
});

function add() {
  console.log("is test");
  const arr = [];
  const infoItem = {
    neame: "",
    phone: "",
  };
  list.push(infoItem);
}

function rest() {
  // list = [];
  list.splice(list.length - 1, 1);
}
function doSave() {
  console.log("保存");
  const childList = childForm.value;
  console.log(childForm.value);
  const formList: any = [];
  childForm.forEach((v) => {
    formList.push(
      new Promise((resolve) => {
        console.log(v);
        v.$refs.infoRef.validate((valid: any) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      })
    );
  });
  Promise.all(formList).then((res) => {
    console.log("校验完成");
    console.log(res);
  });
}

function doReset() {
  console.log("重置", list);
  list.splice(0,list.length )
  console.log("重置", list);
}
</script>
<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
.center {
  justify-content: center;
}
</style>