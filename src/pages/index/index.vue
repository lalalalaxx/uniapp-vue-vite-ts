<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title" @click="goDemo">{{ title }}</text>
    </view>
	<Empty></Empty>
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Empty from '@/components/Empty/Empty.vue'
// import { usePagingLoad } from "@/hooks/usePagingLoad"
// import { demo } from "@/apis/demo"
const title = ref('Hello')
// --------------------------------------------------
// 通过组合函数获取和声明页面所需要的变量及方法
// const pageNums = ref(1)
// const {
//   pageNum,
//   total,
//   pageSize,
//   pages,
//   loading,
//   tableData,
//   loadDataGrid,
// } = usePagingLoad({
//   request: demo, form: {pageNum: pageNums.value}
// });
// watchEffect(() => {
//   console.log("tableData.value----------watchEffect", tableData.value);
// })  
// setTimeout(()=>{
//   console.log(222222222222222284851818);
//   loadDataGrid()
// }, 5000)
// --------------------------------------------------


const goDemo = () => {
  uni.navigateTo({
    url: "/pages/demo/demo"
  })
}

</script>

<style >
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
