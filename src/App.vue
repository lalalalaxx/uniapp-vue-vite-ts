<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { provide, reactive } from "vue";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");

});
onHide(() => {
  console.log("App Hide");
});
interface pageIng {
  url: string,
  mode: 'navigateTo',
  params?: any

}

const val = reactive({

})
const goToPage = (obj: pageIng) => {
  console.log('obj', obj);

  uni.navigateTo({
    url: 'pages/demo/demo.vue'
  })
}

provide("global", {
  val,
  goToPage
})
</script>
<style>
@import "./static/css/common.css";
</style>
