<script setup lang="ts">
/*
 * @description: 分页组件
 * @fileName: List.vue
 * @params
 * @author: lxx
 * @date: 2023-07-28 11:36:23"
 * @version: V1.0.0
 */
import ListState from '@/components/ListState/ListState.vue'
import { usePagingLoad } from '@/hooks/usePagingLoad'
import { toRefs, ref } from 'vue'
/*
 * @params api : 数据请求的apiFunction
 * @author: lxx
 */
type listPropsInt = {
    api: Function
}

const props = withDefaults(defineProps<listPropsInt>(), {})
const { api } = toRefs(props)
const emit = defineEmits(['afterLoad'])

const { isEmpty, isNoData, isLoading, list, LoadData, ReLoad } = usePagingLoad(api.value)

const afterLoadData = (data: any) => {
    console.log('afterLoadData', data)
    emit('afterLoad', data)
}
// 搜索相关
const inputTxt = ref('')
const inputChange = () => {
    ReLoad([{ key: 'search', val: inputTxt.value }])
}
LoadData(afterLoadData, [{ key: 'search', val: '222' }])
</script>
<template>
    <input type="text" v-model="inputTxt" @change="inputChange" />
    <view v-for="(item, index) in list" :key="index">
        <slot v-bind:item="item"></slot>
    </view>
    <ListState :is-empty="isEmpty" :is-loading="isLoading" :is-no-data="isNoData"></ListState>
</template>
<style lang="scss" scoped></style>
