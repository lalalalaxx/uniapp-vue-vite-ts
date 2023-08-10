<script setup lang="ts">
import useUserStore from '@/store/user'
import { goToPage } from '@/utils/util'

const userStore = useUserStore()
const dialogRef = ref()

const logout = () => {
    userStore.logOut()
}

const goList = () => {
    goToPage({
        url: '/pages/listDemo/listDemo'
    })
}

const showDialog = () => {
    dialogRef.value!.show = true
}
</script>
<template>
    <view class="index">
        <lx-header :title="'首页'" :left-icon-show="false"></lx-header>
        这里是首页~
        <button @click="goList">列表</button>
        <button @click="logout">退出</button>
        <button @tap="showDialog">弹窗</button>
        <view class="aaa flex-center-evenly column">
            <view class="flex-1">1</view>
            <view class="flex-1">2</view>
            <view class="flex-1">3</view>
        </view>
        <!-- <Dialogs ref="dialogRef" :show-cancel-button="false">
            <view>模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作</view>
        </Dialogs> -->
    </view>
</template>

<style scoped lang="scss"></style>
