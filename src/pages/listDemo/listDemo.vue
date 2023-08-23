<script lang="ts" setup>
import { demo } from '@/apis/demo'

const afterLoadData = (data: any) => {
    console.log(789, data)
    // data.data.items.map((v: any) => {
    //     v.name = '你猜'
    // })
}
</script>

<template>
    <view>
        <lx-header :title="'列表测试页面'"></lx-header>
        <lx-list :api="demo" :after-load-data="afterLoadData">
            <template v-slot="{ item, index }">
                <view style="height: 25vh">{{ index }} ---- {{ item }}</view>
            </template>
        </lx-list>
    </view>
</template>

<style lang="scss" scoped></style>
