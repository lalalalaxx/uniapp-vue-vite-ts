<script setup lang="ts">
/* 
 * @description: 分页组件
 * @fileName: List.vue
 * @params  api : 数据请求的apiFunction
 * @author: lxx
 * @date: 2023-07-28 11:36:23"
 * @version: V1.0.0 
*/
import { LoadData } from '@/hooks/useListLoadClass'
import { ref } from 'vue'

type listPropsInt = {
    api: Function,
    afterLoadData?: Function
}

const props = withDefaults(defineProps<listPropsInt>(), {})
const emit = defineEmits(['afterLoad'])

const inputTxt = ref('789')
let { list, isLoading, ReLoad, isEmpty, isNoData } = LoadData({
    api: props.api,
    afterLoadData: props.afterLoadData,
    options: {
        search: inputTxt.value,
        des: false
    }
})
console.log("list", list);

function inputChange() {
    console.log("123456789");
    ReLoad(false)
}



</script>
<template>
    <input type="text" v-model="inputTxt" @change="inputChange">
    <view v-for="(item, index) in list" :key="index">
        <slot v-bind:item="item" v-bind:index="index"></slot>
    </view>
    <ListState :isEmpty="isEmpty" :isLoading="isLoading" :isNoData="isNoData"></ListState>
</template>
<style lang="scss" scoped></style>