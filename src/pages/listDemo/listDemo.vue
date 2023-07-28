<script lang="ts" setup>
import HeaderXcx from "@/components/Header/HeaderXcx.vue";
import List from "@/components/List/List.vue";
import { demo } from "@/apis/demo";
// import { LoadData } from '@/hooks/useListLoadClass'
// import { ref } from 'vue'

const afterLoadData = (data: any) => {
    console.log(789, data);
    data.data.data.map((v: any) => {
        v.name = '你猜'
    })
}
// let a = new LoadDataClass(demo)
// const search = ref('demo')
// let { list } = LoadData({
//     api: demo,
//     afterLoadData,
//     options: {
//         search: search.value
//     }
// })
// console.log("list", list);

</script> 
 
<template>
    <view>
        <HeaderXcx :title="'列表测试页面'"></HeaderXcx>
        <List :api="demo" :afterLoadData="afterLoadData">
            <template v-slot="{ item, index }">
                {{ index }} ---- {{ item }}
            </template>
        </List>
    </view>
</template>

<style lang="scss" scoped></style>