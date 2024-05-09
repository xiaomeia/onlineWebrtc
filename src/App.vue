<template>
  <router-view />
</template>

<script setup>
import useSettingsStore from "@/store/modules/settings";
import { handleThemeStyle } from "@/utils/theme";
import { saveRouterInfo } from "@/utils/routerInfo";
import { saveRouters } from "@/api/menu";
function handleSaveRouters() {
  saveRouters(saveRouterInfo()).then((res) => {});
}
// handleSaveRouters()
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme);
  });
});
</script>