/*
 * @description: 分页请求
 * @fileName: useListLoadClass.ts
 * @author: lxx
 * @date: 2023-07-08 08:55:52
 * @version: V1.0.0
 */
import { ref, computed } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'

class LoadDataClass {
    // 请求参数
    static queryParams = {
        page: 1,
        limit: 10
    }
    // 列表数据
    list = ref<any[]>([])
    total = ref(0)
    // 前置处理方法
    afterLoadData: Function | undefined
    // 请求方法
    Query: Function
    // 加载状态参数
    isLoading = ref(false)
    // 无更多数据了
    isNoData = computed(() => {
        if (LoadDataClass.queryParams.page * LoadDataClass.queryParams.limit >= this.total.value) {
            return true
        } else {
            return false
        }
    })
    // 显示暂无数据
    isEmpty = computed(() => {
        if (this.total.value === 0) {
            return true
        } else {
            return false
        }
    })

    constructor(apiFunctions: Function, afterLoadData?: Function, options: any = {}) {
        this.Query = apiFunctions
        this.afterLoadData = afterLoadData
        console.log('options', options)
        // 存在额外参数拼接
        this.setParams(options)
    }
    // 加载数据
    LoadData = async () => {
        uni.showLoading({
            title: '加载中...'
        })
        this.isLoading.value = true
        const res = await this.Query(LoadDataClass.queryParams)
        this.afterLoadData && this.afterLoadData(res)
        this.total.value = res.data.total
        this.list.value = this.list.value.concat(res.data.items)

        uni.hideLoading()
        uni.stopPullDownRefresh()
        this.isLoading.value = false
    }
    /**
     * 添加额外参数刷新
     * @param options: 参数
     * @param isClear: 是否清空数据 false
     */
    setParams = (options: any, isClear: boolean = false) => {
        if (isClear) {
            this.queryParamsReset()
        } else {
            LoadDataClass.queryParams.page = 1
        }
        this.list.value = []
        LoadDataClass.queryParams = Object.assign(LoadDataClass.queryParams, options)
        // 加载数据
        this.LoadData()
    }
    // 加载更多
    LoadMore = () => {
        if (this.isNoData.value || this.isLoading.value) return // 无数据或者加载中不进行加载
        LoadDataClass.queryParams.page += 1
        this.LoadData()
    }
    // 重置参数
    queryParamsReset = () => {
        LoadDataClass.queryParams = {
            page: 1,
            limit: 10
        }
    }

    /**
     * 刷新
     * @param isClear: 是否清空数据
     */
    ReLoad = (isClear: boolean = false) => {
        this.isLoading.value = false
        this.list.value = []
        if (isClear) {
            this.queryParamsReset()
        } else {
            LoadDataClass.queryParams.page = 1
        }
        this.LoadData()
    }
}
/**
 * 分页加载数据方法
 * @param api: ListAPI 方法
 * @param afterLoadData: res数据前置处理方法
 * @returns
 */
interface LoadDataInt {
    api: Function
    afterLoadData?: Function
    options?: any
}

export function LoadData({ api, afterLoadData, options }: LoadDataInt) {
    const data = new LoadDataClass(api, afterLoadData, options)

    // 下拉加载
    onReachBottom(() => {
        console.log('onReachBottom')
        data.LoadMore()
    })
    return {
        list: data.list,
        isLoading: data.isLoading,
        isNoData: data.isNoData,
        isEmpty: data.isEmpty,
        ReLoad: data.ReLoad,
        setParams: data.setParams
    }
}
