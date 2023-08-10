import type { goToPageInt, imgUrlInt } from '@/types/globals'

// 公共跳转方法
/**
 * @params url 路径
 * @params mode 模式 "navigateTo" | "redirectTo" | "reLaunch" | "switchTab"
 * @params params 参数
 * @author lx
 * */
export const goToPage = (option: goToPageInt) => {
    let urls = option.url
    // 判断option
    if (option.hasOwnProperty('params') && option.params) {
        urls += '?'
        for (const key in option.params) {
            urls += key + '=' + option.params[key] + '&'
        }
        urls = urls.substring(0, urls.length - 1)
    }

    if (!option.hasOwnProperty('mode')) {
        option.mode = 'navigateTo'
    }
    // console.log("urls", urls);
    switch (option.mode) {
        case 'navigateTo':
            uni.navigateTo({
                url: urls
            })
            break
        case 'redirectTo':
            uni.redirectTo({
                url: urls
            })
            break
        case 'reLaunch':
            uni.reLaunch({
                url: urls
            })
            break
        case 'switchTab':
            uni.switchTab({
                url: urls
            })
            break
    }
}

/**
 * 公用图片路径处理
 * @params str: string 图片名称
 * @params path?: string 路径(imgs)
 * @params suffix?: string 后缀(png)
 * @author lx
 * @example imgUrl({str: 'demo'})
 * */

export const imgUrl = (obj: imgUrlInt) => {
    return `/static/${obj.path ?? 'imgs'}/${obj.str}.${obj.suffix ?? 'png'}`
}

/**
 * 时间戳转年月日
 * @params date: string 时间戳
 * @params format: string 时间格式默认为YYYY-MM-DD | YYYY-MM-DD hh:mm:ss
 * @author lx
 * @example formatterDate('1689415188')
 * */
export const formatterDate = (date: number, format: string = 'YYYY-MM-DD') => {
    let formatterDate = ''
    if (String(date).length === 10) {
        date = date * 1000
    }
    const dates = new Date(Number(date))
    const year = dates.getFullYear()
    const month = String(dates.getMonth() + 1).padStart(2, '0')
    const day = String(dates.getDate()).padStart(2, '0')
    const hours = String(dates.getHours()).padStart(2, '0')
    const minutes = String(dates.getMinutes()).padStart(2, '0')
    const seconds = String(dates.getSeconds()).padStart(2, '0')
    formatterDate = `${year}-${month}-${day}`
    switch (format) {
        case 'YYYY-MM-DD hh:mm:ss':
            formatterDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            break
        case 'YYYY-MM':
            formatterDate = `${year}-${month}`
            break
        default:
            break
    }
    return formatterDate
}

/**
 * 防抖
 * @param fun
 * @param wait
 */
export function debounce(fun: Function, wait: number = 1000) {
    let timer: any
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun()
            timer = null
        }, wait)
    }
}

/**
 * 节流
 * @param fun
 * @param wait
 */
export function throttle(fun: Function, wait: number = 1000) {
    let timers: any
    return function () {
        if (!timers) {
            timers = setTimeout(() => {
                fun()
                timers = null
            }, wait)
        }
    }
}

/**
 * 公用域名路径
 * @params str: string 图片名称
 * @author lx
 * @example imgUrl("/upload/aa.png")
 * */
export const pubUrl = (url: string) => {
    return import.meta.env.VITE_APP_BASE_URL + url
}
