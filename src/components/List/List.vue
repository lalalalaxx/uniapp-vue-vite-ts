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
import { toRefs } from 'vue'

type listPropsInt = {
    api: Function
    afterLoadData?: Function
    isNeedSearch?: boolean
    options?: any
}

const props = withDefaults(defineProps<listPropsInt>(), {
    api: () => {},
    isNeedSearch: true,
    options: () => {},
})

const inputTxt = ref('')
let { options, api, afterLoadData } = toRefs(props)
if (props.isNeedSearch) {
    let obj = { search: inputTxt.value }
    options.value = { ...obj, ...options }
}

let { list, isLoading, isEmpty, isNoData, ReLoad } = LoadData({
    api: api.value,
    afterLoadData: afterLoadData?.value,
    options: options.value,
})

const inputChange = debounce(() => {
    console.log('input change')
    ReLoad(false)
})
</script>
<template>
    <view class="search_box" v-if="isNeedSearch">
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
