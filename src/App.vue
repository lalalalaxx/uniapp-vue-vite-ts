<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import type { globalObjInt } from '@/types/global'
import { provide } from 'vue'
import { goToPage } from "@/utils/Main"
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
// 全局变量
provide('globalObj', <globalObjInt>{
  // 公用跳转方法
  goToPage
})
</script>
<style>
@import "./static/css/common.css";
</style>
