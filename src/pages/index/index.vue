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
        首页
        <button @click="goList">列表</button>
        <button @click="logout">退出</button>
    </view>
</template>

<style scoped lang="scss"></style>
