import { request } from '@/utils/http'

export function demo(data?: any) {
    return request.http({
        url: '/api/list',
        data,
        isSinglePost: true, // 是否是单例模式默认可不传de
    })
}
