<script setup lang="ts">
/* 
* @description: 人员信息组件
* @fileName: InfoItem.vue
* @params 
* @author: lxx
* @date: 2023-07-13 14:25:48"
* @version: V1.0.0 
*/
import { goToPage } from '@/utils/Main'
interface infoInt {
    list: any[]
}
withDefaults(defineProps<infoInt>(), {
    list: () => []
})
// 点击方法
const itemClick = (item: any) => {
    console.log(item);
    goToPage({
        url: '/pages/information/information',
        params: {
            id: item.id
        }
    })
}
</script>
<template>
    <view v-for="(item, index) in list" :key="index" @click="itemClick(item)">
        <slot :item="item"></slot>
    </view>
</template>
<style lang="scss" scoped></style>