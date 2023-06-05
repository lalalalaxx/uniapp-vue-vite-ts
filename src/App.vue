<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { demo } from '@/apis/demo'
onLaunch(() => {
  console.log("App Launch");
  demo().then(res => {
    console.log(2222, res);
  })
  demo().then(res => {
    console.log(2222, res);
  })
});
onShow(() => {
  console.log("App Show");

});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
