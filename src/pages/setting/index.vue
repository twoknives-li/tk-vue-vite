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
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, reactive, onMounted, computed } from "vue";
import { useThemeConfig } from "@/store/themeConfig";
import { useChangeColor } from "@/utils/theme";
import { Local } from "@/utils/storage";
import { storeToRefs } from "pinia";

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
// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
  Local.set("themeConfigStyle", document.documentElement.style.cssText);
};
</script>
<style lang="scss">
.box {
  background-color: var(--next-bg-topBar);
}
</style>
