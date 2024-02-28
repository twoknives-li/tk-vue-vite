<template>
  <div>
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

    <div class="box">fff</div>

    <el-button type="primary" @click="doJump">跳转</el-button>
    <el-button type="primary" @click="doExport">导出Excel</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, reactive, onMounted, computed, onUnmounted } from "vue";
import { useThemeConfig } from "@/store/themeConfig";
import { useChangeColor } from "@/utils/theme";
import { Local } from "@/utils/storage";
import { storeToRefs } from "pinia";
import mittBus from '@/utils/mitt';
import router from "@/router";
import * as XLSX from 'xlsx'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { getLightColor, getDarkColor } = useChangeColor();

const state = ref({
  topBar: "",
});
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
const doExport = () =>{
  const data = [
        ['姓名', '年龄', '性别', '身高'],
        ['Alice', 20,'','175'],
        ['Bob', 25, '男'],
        ['Charlie', 30, '', '']
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'data.xlsx');
}
const doJump = () =>{
  router.push('/leecode');
}
// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
  Local.set("themeConfigStyle", document.documentElement.style.cssText);
  
  mittBus.emit('changeTheme', themeConfig);
};

// 页面卸载时
onUnmounted(() => {
  console.log('页面卸载时');
	// mittBus.off('changeTheme', () => {});
});
</script>
<style lang="scss">
.box {
  background-color: var(--next-bg-topBar);
}
</style>
