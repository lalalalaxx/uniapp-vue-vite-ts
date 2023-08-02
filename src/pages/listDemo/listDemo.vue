<script lang="ts" setup>
import Header from '@/components/Header/Header.vue'
import List from '@/components/List/List.vue'
import { demo } from '@/apis/demo'

const afterLoadData = (data: any) => {
    console.log(789, data)
    data.data.data.map((v: any) => {
        v.name = '你猜'
    })
}
</script>

<template>
    <view>
        <Header :title="'列表测试页面'"></Header>
        <List :api="demo" :afterLoadData="afterLoadData">
            <template v-slot="{ item, index }"> {{ index }} ---- {{ item }} </template>
        </List>
    </view>
</template>

<style lang="scss" scoped></style>
