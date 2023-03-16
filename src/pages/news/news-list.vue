<template>
  <div class="page">
    <div class="column">
      <h1>多表单校验 {{ list.length }}</h1>
      <el-row :gutter="20" type="flex" justify="center" style="margin-bottom:20px">
      <el-button type="primary" @click="clickTest">增加</el-button>
      <el-button type="reset" @click="rest">移除</el-button>
      </el-row>
    </div>
    <el-form
      :model="formListInfo"
      ref="infoChildRef"
      :rules="rules"
    >
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


<script lang="ts" src="./news-list.ts"></script>
<style scoped lang="scss">
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