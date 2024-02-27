<template>
  <div class="box">fff</div>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="md:flex">
      
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          Case study
        </div>
        这里开始延迟显示： {{ showStr }}
        <br />
        <el-button type="primary" @click="makeShowStr">开始</el-button>
        <a
          href="#"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >Finding customers for your new business</a
        >
        <p class="mt-2 text-gray-500">
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </p>
      </div>
    </div>
  </div>
  <div>
    <div ref="mapInfo"></div>
      <el-link
        type="primary"
        class="mr-5"
        v-for="(item, key) in menuList"
        :key="key"
        :href="item.path"
        >{{ item.name }}</el-link
      >
    </div>
    <div class="searchBox">
      <el-row :gutter="20">
        <el-form :model="formInfo" label-width="auto" ref="searchForm">
          <el-col :lg="20" :xl="20">
            <el-form-item label="姓名">
              <el-input v-model="formInfo.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="20" :xl="20">
            <el-form-item label="电话">
              <el-input v-model="formInfo.phone" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="20" :xl="20">
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
          </el-col>
          <el-col :lg="20" :xl="20">
            <el-button type="primary" @click="doSearch">搜索</el-button>
            <el-button type="reset" @click="doReset">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
    </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
  ref,
  unref,
} from "vue";
import { webStore } from "@/store";
import router from "../router";
export default {
  data() {
    return {
      formInfo: {
        name: "",
        phone: "",
        beginTime: "",
      },
      menuList: router.options.routes,
    };
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    // console.log("proxy", proxy);
    // console.log(proxy.$api);
    // console.log(proxy.$sysName);
    const str = ref("1234567");
    const showStr = ref("");
    const store = webStore();
    const timeInterval = ref();
    let nowKey = 0;
    const makeShowStr = () => {
      const list = str.value.toString().split("");
      timeInterval.value = setInterval(() => {
        if (nowKey < list.length) {
          showStr.value += String(str.value[nowKey]);
          nowKey += 1;
        } else {
          nowKey = 0;
          showStr.value = "";
        }
      }, 1000);
      console.log("showStr", showStr.value);
    };

    onMounted(() => {});

    console.log("webStore", store.token);
    console.log("counter", store.counter);
    store.addCounter();
    console.log("counter", store.counter);
    return { proxy, showStr, makeShowStr };
  },
  created() {
    console.log("is created");
    console.log("router", router.options.routes);
    this.getList();
  },
  methods: {
    doSearch() {
      console.log(this.formInfo);
      console.log("do search");
      this.$refs.searchForm.validate(async (valid) => {
        if (valid) {
          console.log("ok");
          // this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    doReset() {
      console.log("重置");
      this.formInfo = {
        name: "",
        phone: "",
        beginTime: "",
      };
    },
    getList() {
      this.proxy.$api
        .post("/index/getAllMap", {
          params: {},
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.box{
  background-color: var(--next-bg-topBar);
}
</style>

