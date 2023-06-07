<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title" @click="goDemo">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {usePagingLoad} from "@/hooks/usePagingLoad"
const title = ref('Hello')
function demo() {
	return new Promise((r,j) => {
		r({})
	}) 
}

let list = usePagingLoad(() => {
	return demo()
})



const goDemo = ()=>{
	uni.navigateTo({
		url: "/pages/demo/demo"
	})
}

</script>

<style>
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
