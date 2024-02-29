<template>
  <div class="p-5">
    <el-form class="p-12">
      <el-form-item label="主题色">
        <!-- <el-color-picker @change="changColor('topBar')" v-model="state.topBar" /> {{ state.topBar }} -->
        <el-color-picker
          @change="changColor('topBar')"
          v-model="themeConfig.topBar"
        />
        {{ themeConfig.topBar }}
      </el-form-item>
      <el-button type="primary" @click="changeTheme('')"
        >关闭夜间模式</el-button
      >
      <el-button type="primary" @click="changeTheme('dark')"
        >开启夜间模式</el-button
      >
    </el-form>
 
    <el-button type="primary" @click="doJump">跳转</el-button>
    <el-button type="primary" @click="doExport">导出Excel</el-button>
    <hr class="my-4" />

    <div class="text-lg font-bold">moment时间转换</div>
    <el-button type="primary" @click="makeTime">开始生成日期</el-button>
    <div>{{ state.nowDay }}</div>
    <div>{{ state.nowDayStrA }}</div>
    <div>{{ state.nowDayStrB }}</div>
    <div>
      {{ moment().add(1, 'days').calendar() }}
    </div>
    

    <hr class="my-4" />

    <div ref="qrcodeRef" class="qrcode-box"></div>
    <el-button type="primary" @click="makeQrcode">生成二维码</el-button>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  watch,
  nextTick,
  reactive,
  onMounted,
  computed,
  onUnmounted,
} from "vue";
import { useThemeConfig } from "@/store/themeConfig";
import { useChangeColor } from "@/utils/theme";
import { Local } from "@/utils/storage";
import { storeToRefs } from "pinia";
import mittBus from "@/utils/mitt";
import router from "@/router";
import * as XLSX from "xlsx";
import QRCode from "qrcodejs2-fixes";
import moment from "moment";
import "moment/dist/locale/zh-cn";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { getLightColor, getDarkColor } = useChangeColor();

const state = ref({
  topBar: "",
  nowDay: "",
  nowDayStrA:'',
  nowDayStrB:''
});

const qrcodeRef = ref<HTMLElement | null>(null); // 二维码

const changeTheme = (theme) => {
  console.log("changeTheme");

  const body = document.documentElement as HTMLElement;
  body.setAttribute("data-theme", theme);
};

const changColor = (color) => {
  console.log("changColor", color);
  // document.documentElement.style.setProperty(`--tk-bg-main-color`, color);

  document.documentElement.style.setProperty(
    `--next-bg-${color}`,
    themeConfig.value[color]
  );
  setLocalThemeConfigStyle();
};

// 导出Excel
const doExport = () => {
  const data = [
    ["姓名", "年龄", "性别", "身高"],
    ["Alice", 20, "", "175"],
    ["Bob", 25, "男"],
    ["Charlie", 30, "", ""],
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "data.xlsx");
};
const doJump = () => {
  router.push("/leecode");
};
// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
  Local.set("themeConfigStyle", document.documentElement.style.cssText);

  mittBus.emit("changeTheme", themeConfig);
};

/**
 * @name: 生成二维码
 * @return {*}
 */
const makeQrcode = () => {
  // 初始化生成二维码
  (qrcodeRef.value as HTMLElement).innerHTML = "";
  new QRCode(qrcodeRef.value, {
    text: `https://kezhang.twoknives.cn/h5`,
    width: 260,
    height: 260,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });
};

/**
 * @name: moment生成日期
 * @return {*}
 */
const makeTime = () => {
  state.value.nowDay = moment().format("YYYY-MM-DD");
  moment.locale(); 
  state.value.nowDayStrA = moment().format('ll'); 
  state.value.nowDayStrB = moment().format('LLLL'); 
};

// 页面卸载时
onUnmounted(() => {
  console.log("页面卸载时");
  // mittBus.off('changeTheme', () => {});
});
</script>
<style lang="scss">
.box {
  background-color: var(--next-bg-topBar);
}
.qrcode-box {
  width: 160px;
  height: 160px;
}
</style>
