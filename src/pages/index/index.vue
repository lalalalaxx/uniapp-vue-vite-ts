<script setup lang="ts">
import useUserStore from '@/store/user'
const userStore = useUserStore()

import { throttle, formatTime } from '@/utils/util'

const dialogRef = ref()
const logout = () => {
    userStore.logOut()
}

const a = ref(11)
console.log(a)

const showDialog = () => {
    // dialogRef.value!.show = true
    // uni.navigateTo({
    //     url: '/components/dialog/dialog'
    // })
    uni.goToPage({
        url: 'components/lx_dialog/lx_dialog?title=' + '10231123'
    })
}

const goList = () => {
    uni.goToPage({
        url: 'pages/listDemo/listDemo'
    })
}

const throttles = throttle(() => {
    console.log('num, age')
    goList()
}, 1000)

console.log('xxx', formatTime(Date.now(), 'yyyy-MM-dd'))
</script>
<template>
    <view class="index">
        <lx-header :title="'首页'" :left-icon-show="false" />

        <button @click="logout">退出</button>
        <button @tap="showDialog">弹窗</button>
        <button @tap="throttles">列表</button>

        <ex-dialog ref="dialogRef" :show-cancel-button="true">
            <view>模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作</view>
        </ex-dialog>
        <lx-empty></lx-empty>
    </view>
</template>

<style scoped lang="scss"></style>
