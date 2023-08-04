import { request } from '@/utils/http'

export function demo(data?: any) {
    return request.http({
        url: 'lxx/list',
        data
    })
}
