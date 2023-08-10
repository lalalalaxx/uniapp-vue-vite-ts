<script lang="ts" setup>
import List from '@/components/List/List.vue'
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
        <List :api="demo" :after-load-data="afterLoadData">
            <template v-slot="{ item, index }">{{ index }} ---- {{ item }}</template>
        </List>
    </view>
</template>

<style lang="scss" scoped></style>
