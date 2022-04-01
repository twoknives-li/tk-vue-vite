<template>
  <div>
    <div ref="mapInfo"></div>
    <div class="searchBox">
      <el-form :model="formInfo" ref="searchForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formInfo.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInfo.phone" placeholder="电话"></el-input>
        </el-form-item>

        <el-form-item label="登录时间"
          ><el-date-picker
            v-model="formInfo.beginTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-button type="primary" @click="doSearch">搜索</el-button>
        <el-button type="reset" @click="doReset">重置</el-button>
      </el-form>
      <el-button type="primary" @click="newsList">新闻中心</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  data() {
    return {
      formInfo: {
        name: "",
        phone: "",
        beginTime: "",
      },
    };
  },
  created() {
    console.log("is created");
  },
  methods: {
    /* 新闻中心 */
    newsList(){
      this.$router.push({path:'/news-list'});
    },
    doSearch() {
      console.log(this.formInfo);
      console.log('do search');
    },
    doReset() {
      console.log('重置');
      this.formInfo= {
        name: "",
        phone: "",
        beginTime: "",
      };
    }
  },
};
</script>

<style lang="scss">
.searchBox {
  width: 300px;
}
</style>