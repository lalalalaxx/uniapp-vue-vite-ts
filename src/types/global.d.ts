/* eslint-disable prettier/prettier */
declare global {
    type pageMode = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

    interface goToPageInt {
        url: string
        mode?: pageMode
        params?: {
            [n: string]: string | number | boolean
        }
    }

    /**
     * 公共的路径
     * @author shenname <shenname@163.com>
     * @license MIT
     * @param { string } fileName 文件名称
     * @param { string } filePath 文件路径
     * @example
     * fileName: images.png
     * filePath: images
     */
    interface imgUrlInt {
        fileName: string
        filePath?: string
    }
}

export { }
