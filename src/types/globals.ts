// 全局变量
export interface globalObjInt {
    goToPage: (option: goToPageInt) => void
}
// 跳转类型
type pageMode = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

// 公用跳转
export interface goToPageInt {
    url: string
    mode?: pageMode
    params?: any
}

// 公共的图片路径
export interface imgUrlInt {
    str: string
    path?: string
    suffix?: string
}
