<script lang="ts" setup>
	import Header from '@/components/Header/Header.vue'
	import ListState from '@/components/ListState/ListState.vue'
	import { ref, reactive, computed } from 'vue'
	import { onReachBottom } from '@dcloudio/uni-app'
	import { demo } from '@/apis/demo'


	// onReachBottom(() => {
	// 	console.log('onReachBottom');
	// 	loadMore()
	// })

	// let isLoading = ref(false)
	// const queryParams = reactive({
	// 	page: 1,
	// 	limit: 10
	// })
	// let total = ref(0)
	// let list = reactive([])
	// // 无更多数据了
	// const isNoData = computed(() => {
	// 	if (queryParams.page * queryParams.limit >= total.value) {
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// })
	// // 显示暂无数据
	// const isEmpty = computed(() => {
	// 	if (total.value == 0) {
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// })

	// const LoadData = () => {
	// 	uni.showLoading({
	// 		title: '加载中...'
	// 	});
	// 	isLoading.value = true;
	// 	demo(queryParams).then((res : any) => {
	// 		console.log(1111111111, res);
	// 		// 数据加载完成后 设置 after 钩子
	// 		total.value = res?.data?.total;
	// 		afterLoadData && afterLoadData(res.data);
	// 		list = list.concat(res.data.items);
	// 	}).catch().finally(() => {
	// 		uni.hideLoading();
	// 		uni.stopPullDownRefresh();
	// 		isLoading.value = false;
	// 	})
	// }

	// const afterLoadData = (data : any) => {
	// 	console.log(data);
	// }

	// const ReLoad = () => {
	// 	isLoading.value = false;
	// 	list = [];
	// 	queryParams.page = 1;
	// 	LoadData();
	// }
	// const loadMore = () => {
	// 	queryParams.page += 1
	// 	LoadData()
	// }
	// LoadData()
	import { usePagingLoad } from '@/hooks/usePagingLoad'
	const { isEmpty, isNoData, isLoading, LoadData } = usePagingLoad(demo)
	
	LoadData()
</script>

<template>
	<view>
		<Header></Header>
		<view v-for="i in 50">
			这是测试页面
		</view>
		<ListState :isEmpty="isEmpty" :isLoading="isLoading" :isNodata="isNoData"></ListState>
	</view>
</template>

<style lang="scss" scoped>

</style>