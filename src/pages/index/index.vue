<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import useUserStore from '@/store/user'
import { goToPage } from '@/utils/util'
const userStore = useUserStore()

const logout = () => {
    userStore.logOut()
}

const goList = () => {
    goToPage({
        url: '/pages/listDemo/listDemo'
    })
}
</script>
<template>
    <view class="index">
        <Header :title="'首页'" :left-icon-show="false"></Header>
        这里是首页~
        <button @click="goList">列表</button>
        <button @click="logout">退出</button>
        <view class="aaa flex-center-evenly column">
            <view class="flex-1">1</view>
            <view class="flex-1">2</view>
            <view class="flex-1">3</view>
        </view>
    </view>
</template>

<style scoped lang="scss"></style>
