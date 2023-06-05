import { request } from "@/utils/http";

export function demo() {
    return request.http({
        url: '/index', 
        data: {aa: 1},   
        isSinglePost: true // 是否是单例模式默认可不传de
    })
} 