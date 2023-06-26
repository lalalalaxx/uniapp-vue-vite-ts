<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title" @click="">{{ title }}</text>
    </view>
    <Empty></Empty>
  </view>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import Empty from '@/components/Empty/Empty.vue'
const title = ref('Hello')
import type { globalObjInt } from '@/types/global'



const goDemo = () => {
  globalObj?.goToPage({
    url: '/pages/demo/demo',
    mode: 'navigateTo'
  })
}

const globalObj = inject<globalObjInt>('globalObj')



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
