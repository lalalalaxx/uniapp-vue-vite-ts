<script setup lang="ts">
import useUserStore from '@/store/user'

const userStore = useUserStore()

const dialogRef = ref()
const logout = () => {
    userStore.logOut()
}

const showDialog = () => {
    dialogRef.value!.show = true
}

const throttle = uni.$util.throttle((num: number, age: number) => {
    console.log(num, age)
    return num + age
}, 1000)

console.log('xxx', uni.$util.formatTime(Date.now(), 'yyyy-MM-dd'))
</script>
<template>
    <view class="index">
        <ex-header ref="headeRef" :title="'首页'" :left-icon-show="true" />

        <button @click="logout">退出</button>
        <button @tap="showDialog">弹窗</button>
        <button @tap="throttle">弹窗</button>

        <ex-dialog ref="dialogRef" :show-cancel-button="true">
            <view>模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作</view>
        </ex-dialog>
    </view>
</template>

<style scoped lang="scss"></style>
