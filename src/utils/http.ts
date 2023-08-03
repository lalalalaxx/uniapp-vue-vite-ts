import useUserStore from '../store/user'
import { goToPage } from '@/utils/Main'
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
            url = import.meta.env.VITE_APP_BASE_PRE + url

            const header = {
                'content-type': 'application/json',
                Authorization: '',
            }
            if (userStore.token) {
                header['Authorization'] = 'Bearer' + userStore.token
            }
            // console.log("url", import.meta.env, url);
            uni.request({
                url,
                header,
                data,
                method: isPost ? 'POST' : 'GET',
                success(res) {
                    const data = res.data as Response
                    if (res.statusCode === 200) {
                        console.log('data', data)
                        if (data.code === 200) {
                            // 成功
                            resolve(res.data)
                        } else if (data.code === 1005) {
                            uni.showToast({ title: data.msg, icon: 'none' })
                            setTimeout(() => {
                                goToPage({
                                    url: '/pages/login/login',
                                    mode: 'navigateTo',
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
                    console.log('complete')
                    _this.isLock = false
                },
            })
        })
    },
}

export const request = requestObj
