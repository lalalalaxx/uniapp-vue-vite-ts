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
import { debounce } from '@/utils/Main'

type listPropsInt = {
    api: Function,
    afterLoadData?: Function
}

const props = withDefaults(defineProps<listPropsInt>(), {})

const inputTxt = ref('')
let { list, isLoading, isEmpty, isNoData, ReLoad } = LoadData({
    api: props.api,
    afterLoadData: props.afterLoadData,
    options: {
        search: inputTxt.value,
        des: false
    }
})

const inputChange = debounce(() => {
    console.log('input change');
    ReLoad(false)
})

</script>
<template>
    <view class="search_box">
        <u-search placeholder="请输入搜索内容" v-model="inputTxt" @change="inputChange" :show-action="false"></u-search>
    </view>
    <view v-for="(item, index) in list" :key="index">
        <slot v-bind:item="item" v-bind:index="index"></slot>
    </view>
    <ListState :isEmpty="isEmpty" :isLoading="isLoading" :isNoData="isNoData"></ListState>
</template>
<style lang="scss" scoped>
.search_box {
    padding: 10rpx 20rpx;
}
</style>