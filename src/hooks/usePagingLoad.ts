import { ref, reactive, computed } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
/**
 * loading状态
 * @param {*} request url请求
 * @param {*} form 不同页面传入的表单
 * @returns
 */

export function usePagingLoad(Query : any) {
	// 下拉加载
	onReachBottom(() => {
		console.log('onReachBottom');
		loadMore()
	})

	let isLoading = ref(false)
	const queryParams = reactive({
		page: 1,
		limit: 10
	})
	let total = ref(0)
	let list = reactive([])
	// 无更多数据了
	const isNoData = computed(() => {
		if (queryParams.page * queryParams.limit >= total.value) {
			return true
		} else {
			return false
		}
	})
	// 显示暂无数据
	const isEmpty = computed(() => {
		if (total.value == 0) {
			return true
		} else {
			return false
		}
	})

	const LoadData = () => {
		uni.showLoading({
			title: '加载中...'
		});
		isLoading.value = true;
		Query(queryParams).then((res : any) => {
			console.log(1111111111, res);
			// 数据加载完成后 设置 after 钩子
			total.value = res?.data?.data?.total;
			afterLoadData && afterLoadData(res.data);
			list = list.concat(res.data.items);
		}).catch().finally(() => {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			isLoading.value = false;
		})
	}

	const afterLoadData = (data : any) => {
		console.log(data);
	}

	const ReLoad = () => {
		isLoading.value = false;
		list = [];
		queryParams.page = 1;
		LoadData();
	}

	const loadMore = () => {
		if (isNoData.value || isLoading.value) return; // 无数据或者加载中不进行加载
		queryParams.page += 1
		LoadData()
	}

	return {
		LoadData,
		ReLoad,
		isNoData,
		isEmpty,
		isLoading
	};
}