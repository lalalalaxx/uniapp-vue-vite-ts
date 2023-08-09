import useUserStore from '../store/user'
import { goToPage } from '@/utils/util'
interface Response {
    code: number
    data: object
    msg: string
}

const requestObj = {
    isLock: false,
    http({ url = '', data = {}, isPost = true, isSinglePost = false }) {
        const _this = this
        const userStore = useUserStore()
        return new Promise(function (resolve, reject) {
            if (isSinglePost && _this.isLock) {
                reject({ message: '加载中' })
            }
            _this.isLock = true
            // #ifdef H5
            url = import.meta.env.VITE_APP_BASE_PRE + url
            // #endif
            // #ifndef H5
            url = import.meta.env.VITE_APP_BASE_URL + url
            // #endif

            const header = {
                'content-type': 'application/json',
                Authorization: ''
            }
            if (userStore.token) {
                header['Authorization'] = 'Bearer' + userStore.token
            }
            uni.request({
                url,
                header,
                data,
                method: isPost ? 'POST' : 'GET',
                success(res) {
                    const data = res.data as Response
                    if (res.statusCode === 200) {
                        if (data.code === 200) {
                            // 成功
                            resolve(res.data)
                        } else if (data.code === 1005) {
                            uni.showToast({ title: data.msg, icon: 'none' })
                            setTimeout(() => {
                                goToPage({
                                    url: '/pages/login/login',
                                    mode: 'navigateTo'
                                })
                            }, 1000)
                        } else {
                            uni.showToast({ title: data.msg, icon: 'none' })
                            reject(res.data)
                        }
                    } else {
                        uni.showToast({ title: '响应错误', icon: 'none' })
                        reject({ message: '响应错误' })
                    }
                },
                fail(err) {
                    console.log('fail', err)
                    uni.showToast({ title: '网络错误', icon: 'none' })
                    reject({ message: '网络错误' })
                },
                complete() {
                    _this.isLock = false
                }
            })
        })
    }
}

export const request = requestObj
