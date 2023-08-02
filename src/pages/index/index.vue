<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import useUserStore from '@/store/user'
const userStore = useUserStore()

const logout = () => {
    userStore.logOut()
}
</script>
<template>
    <view class="index">
        <Header :title="'首页'" :leftIconShow="false"></Header>
        首页
        <button @click="logout">退出</button>
    </view>
</template>

<style scoped lang="scss"></style>
