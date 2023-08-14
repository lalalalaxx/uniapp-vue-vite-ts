<template>
    <view>
        <router-view></router-view>
        <view class="dialog-ref">123123</view>
    </view>
</template>
<script setup lang="ts">
onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
// 全局变量
// provide('globalObj', <globalObjInt>{
// 	// 公用跳转方法
// 	goToPage
// });
// // 引入静态资源
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
</style>
