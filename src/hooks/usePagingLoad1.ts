import { ref, unref } from "vue";

/**
 * loading状态
 * @param {*} request url请求
 * @param {*} form 不同页面传入的表单
 * @returns
 */

interface obj {
	request : any;
	form : any;
}
export function usePagingLoad(obj : obj) {
	const { request, form } = obj;
	//分页
	const pageNum = ref(1);
	const total = ref(0); //总页数
	const pageSize = ref(16); //每页多少条
	const pages = ref(0);
	const tableData = ref([]);

	// 加载状态
	const loading = ref(true);
	const code = ref(500);

	// 获取列表数据
	const getDataGrid = async (params : any) => {
		loading.value = true;
		request(params).then(
			(res : {
				data : {
					code : number;
					data : {
						total : number;
						pageNum : number;
						pageSize : number;
						pages : number;
						list : any;
					};
					errorMsg ?: string;
				};
			}) => {
				code.value = res.data.code;
				if (res.data && res.data.code === 200) {
					console.log("200");
					total.value = res.data.data.total;
					pageNum.value++;
					pageSize.value = res.data.data.pageSize;
					pages.value = res.data.data.pages;
					tableData.value = res.data.data.list;
				} else if (
					res.data.code === 400 &&
					res.data.errorMsg === "暂无记录！"
				) {
					total.value = 0; //没有数据时分页页数置为1
				} else {
					// ElMessage.error("内部服务器错误：" + res.data.errorMsg);
					console.log("内部服务器错误");
				}
				// 数据设置完后再设置loading为false
				loading.value = false;
				console.log('tableData.value1111', tableData.value);

			}
		)
			.catch((error : any) => {
				console.log(error);
				loading.value = false;
				// ElMessage.error("列表数据显示失败");
				console.log("列表数据显示失败");
			});
	};
	getDataGrid(form);

	function loadDataGrid() {
		if (form) form.pageNum = pageNum.value;
		getDataGrid(form);
		// router.push({ path: router.currentRoute.value.path, query: { pageNum: pageNum.value } });
	}

	return {
		pageNum,
		total,
		pageSize,
		pages,
		loading,
		tableData,
		loadDataGrid,
	};
}