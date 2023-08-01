import { ref, reactive, computed, watch } from "vue";
import { onReachBottom } from "@dcloudio/uni-app";
/* 
 * @description: 分页请求
 * @fileName: useListLoadClass.ts 
 * @author: lxx
 * @date: 2023-07-08 08:55:52
 * @version: V1.0.0 
 * loading状态
 * @param {*} Query 请求函数
 * @param {*} LoadData 加载数据方法
 * @param {*} ReLoad (isClear?: boolean) 刷新列表数据 isClear 传入true时将请求参数（queryParams）还原初始化状态
*/

export function usePagingLoad(Query: any) {
    // 下拉加载
    onReachBottom(() => {
        console.log("onReachBottom");
        loadMore();
    });

    let isLoading = ref(false);
    let queryParams = reactive({} as any);

    queryParams = {
        page: 1,
        limit: 10,
    };

    let total = ref(0);

    let list = ref([]);
    // 无更多数据了
    const isNoData = computed(() => {
        if (queryParams.page * queryParams.limit >= total.value) {
            return true;
        } else {
            return false;
        }
    });
    // 显示暂无数据
    const isEmpty = computed(() => {
        if (total.value == 0) {
            return true;
        } else {
            return false;
        }
    });

    interface optionInt {
        key: string;
        val: any;
    }

    const LoadData = async (afterLoadData?: any, option?: optionInt[]) => {
        let obj: any = {};
        console.log("option", option);
        if (option && option?.length > 0) {
            option?.map((item) => {
                obj[item?.key] = item.val;
            });
        }
        // , ...rest: any[]
        // if (rest.length > 0) {
        //   rest.map((item) => {
        //     obj[item?.key] = item?.val;
        //   });
        // }
        queryParams = reactive({ ...queryParams, ...obj });

        uni.showLoading({
            title: "加载中...",
        });
        isLoading.value = true;
        const res = await Query(queryParams);
        total.value = res?.data?.total;

        // 数据加载完成后 设置 after 钩子
        afterLoadData && afterLoadData(res.data);
        console.log("res.data", res.data);

        list.value = list.value.concat(res?.data?.data);
        uni.hideLoading();
        uni.stopPullDownRefresh();
        isLoading.value = false;
    };

    //   const afterLoadData = (data: any) => {
    //     console.log(data);
    //   };

    const ReLoad = (option?: optionInt[], isClear?: boolean) => {
        isLoading.value = false;
        list.value = [];
        if (isClear) {
            queryParams = reactive({
                page: 1,
                limit: 10,
            });
        } else {
            queryParams.page = 1;
        }
        let obj: any = {};
        if (option && option?.length > 0) {
            option?.map((item) => {
                obj[item?.key] = item.val;
            });
        }
        queryParams = reactive({ ...queryParams, ...obj });
        LoadData();
    };

    const loadMore = () => {
        if (isNoData.value || isLoading.value) return; // 无数据或者加载中不进行加载
        queryParams.page += 1;
        LoadData();
    };

    return {
        list,
        LoadData,
        ReLoad,
        isNoData,
        isEmpty,
        isLoading,
    };
}