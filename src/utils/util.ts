/**
 * 判断是否为空对象
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param {*} object 源对象
 * @returns { boolean }
 */
export const isEmptyObject = (object: any): boolean => {
    return Object.keys(object).length === 0
}

/**
 * 判断是否为对象
 * @param {*} object
 */
/**
 * 判断是否为对象
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param {*} object 源对象
 * @returns { boolean }
 */
export const isObject = (object: any): boolean => {
    return Object.prototype.toString.call(object) === '[object Object]'
}

/**
 * 判断是否为数组
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param {*} object 源对象
 * @returns { boolean }
 */
export const isArray = (object: any): boolean => {
    return Object.prototype.toString.call(object) === '[object Array]'
}

/**
 * 判断是否为空
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param {*} value 源对象
 * @returns { boolean }
 */
export const isEmpty = (value: any): boolean => {
    if (isArray(value)) {
        return value.length === 0
    }
    if (isObject(value)) {
        return isEmptyObject(value)
    }
    return !value
}

/**
 * 获取组件类型
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param { Component } _comp 组件实例
 * @example
 * useCompRef(Header)
 */
export const useCompRef = <T extends abstract new (...args: any) => any>(_comp: T) => {
    return ref<InstanceType<T>>()
}

/**
 * 公共跳转方法
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param { object } object 跳转参数
 * @param { string } object.url 跳转路径
 * @param { "navigateTo" | "redirectTo" | "reLaunch" | "switchTab" } [object.mode=navigateTo] 跳转模式
 * @param { object } object.params 跳转传参
 * @example
 * goToPage({ 'pages/index/index', navigateTo, {'id': 1} })
 * @returns { void }
 */
export const goToPage = ({ url, mode = 'navigateTo', params = {} }: goToPageInt): void => {
    if (!url || url.length === 0) {
        throw Error('"url" is a required parameter')
    }

    const urlEncode = (params: any = {}) => {
        const result = []
        for (const k in params) {
            if (!params[k]) continue
            result.push(k + '=' + params[k])
        }

        return result.join('&')
    }

    const queryStr = !isEmpty(params) ? '?' + urlEncode(params) : ''
    const obj = { url: `/${url}${queryStr}` }

    switch (mode) {
        case 'navigateTo':
            uni.navigateTo(obj)
            break
        case 'redirectTo':
            uni.redirectTo(obj)
            break
        case 'reLaunch':
            uni.reLaunch(obj)
            break
        case 'switchTab':
            uni.switchTab(obj)
            break
        default:
            throw Error(`${mode} navigateTo does not exist`)
    }
}

/**
 * 格式化时间戳（多格式）
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param { number } time 长度为 10 | 13 的时间戳
 * @param { string } [format=yyyy-MM-dd] format 转换格式
 * @example
 * formatTime(1691744378556, 'yyyy-MM-dd HH:mm:ss')
 * @returns { string }
 */

export const formatTime = (time: number, format: string = 'yyyy-MM-dd HH:mm:ss'): string => {
    const len = time.toString().trim().length
    if (len !== 10 && len !== 13) {
        throw Error('"time" is a error parameter')
    }

    time = len !== 13 ? time * 1000 : time

    if (!time) return ''
    const date = new Date(time)
    const M = (date.getMonth() + 1).toString()
    const d = date.getDate().toString()
    const H = date.getHours().toString()
    const m = date.getMinutes().toString()
    const s = date.getSeconds().toString()
    const timeObject: {
        [n: string]: string
    } = {
        yyyy: date.getFullYear().toString(),
        MM: M.padStart(2, '0'),
        dd: d.padStart(2, '0'),
        HH: H.padStart(2, '0'),
        mm: m.padStart(2, '0'),
        ss: s.padStart(2, '0'),
        M: M,
        d: d,
        H: H,
        m: m,
        s: s
    }
    const reg = new RegExp(Object.keys(timeObject).join('|'), 'g')
    const res = format.replace(reg, (k) => {
        return timeObject[k]
    })
    return res
}

/**
 * 防抖函数
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param {function} fn
 * @param {umber} [wait=1000] wait
 * @returns { void }
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, wait: number = 1000): ((...args: Parameters<T>) => void) => {
    let timer: number | null

    return function (this: any, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

/**
 * 节流函数
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param { function } fn
 * @param { number } [wait=1000] wait
 */
export const throttle = <T extends (...args: any[]) => any>(fn: T, wait: number = 1000) => {
    let timer: number = Date.now()
    return function (this: any, ...args: Parameters<T>) {
        if (Date.now() - timer >= wait) {
            fn.apply(this, args)
            timer = Date.now()
        }
    }
}

/**
 * 获取文件相对路径、URL
 * @author shenname <shenname@163.com>
 * @license MIT
 * @param { string } fileName 文件名称 | 相对路径
 * @param { string } [filePath=images] filePath 文件在 /static 下的路径 获取URL时不传
 * @example
 * imgUrl('a.png')
 * imgUrl('a.png', '/public/')
 * imgUrl('/upload/images/img.png')
 * @returns {string}
 */
export const fileUrl = (fileName: string, filePath: string = 'images'): string => {
    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(fileName)) {
        return import.meta.env.VITE_APP_BASE_URL + fileName
    } else {
        return `/static/${filePath}/${fileName}`
    }
}

export default {
    goToPage,
    formatTime,
    debounce,
    throttle,
    fileUrl
}
