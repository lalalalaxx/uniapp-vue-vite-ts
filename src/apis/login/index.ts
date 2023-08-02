import { request } from '@/utils/http'
import type { userInfoInt } from './type'
export function loginApi(data: userInfoInt) {
    return request.http({
        url: '/api/login',
        data,
        isSinglePost: true, // 是否是单例模式默认可不传de
    })
}
