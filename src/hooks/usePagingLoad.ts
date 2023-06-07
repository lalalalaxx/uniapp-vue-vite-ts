import { reactive, ref, type Ref } from 'vue'

interface queryParamsInt {
	page : number,
	limit : number
}

interface PromiseInt {
	data: PromiseDataInt
}

interface PromiseDataInt {
	total: Ref<number>,
	items: object[]
}


export function usePagingLoad(fun: void) {
	const queryParams = reactive<queryParamsInt>({
		page: 1,
		limit: 10
	})
	let list = reactive([])
	let total = ref<number>(0)
	
	const afterLoadData = (data: any)=>{
		console.log(data);
	}

	const LoadData = () => {
		uni.showLoading({
			title: '加载中...'
		})
		fun(queryParams).then(res => {
			total = res.data?.total
			afterLoadData && afterLoadData(res.data)
			list = res.data.items
		})
	}
	
}