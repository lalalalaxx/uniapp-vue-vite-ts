// 定义组合式API仓库
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { getPrefixName } from '@/config'
import { goToPage } from '@/utils/util'
import type { userInfoInt } from '@/apis/login/type'
import { loginApi } from '@/apis/login/index'
interface userInfoStoreInt {
    token: string
    user: any
}

// 创建小仓库
export default defineStore(
    getPrefixName('user'),
    () => {
        const userInfo = ref<userInfoStoreInt>({
            token: '',
            user: {}
        })
        const token = computed(() => {
            return userInfo.value.token || 'token'
        })
        const user = computed(() => {
            return userInfo.value.user
        })
        // 登录
        async function login(params: userInfoInt) {
            const loginRes: any = await loginApi(params)

            userInfo.value = loginRes.data
            uni.showToast({
                title: '登录成功',
                icon: 'none',
                success: () => {
                    setTimeout(() => {
                        goToPage({
                            url: '/pages/index/index',
                            mode: 'redirectTo'
                        })
                    }, 2000)
                }
            })
        }
        // 退出登录
        function logOut() {
            uni.showToast({
                icon: 'none',
                title: '退出成功',
                mask: true,
                success() {
                    setTimeout(() => {
                        userInfo.value = {
                            token: '',
                            user: {}
                        }
                        uni.clearStorageSync()
                        goToPage({
                            url: '/pages/login/login',
                            mode: 'reLaunch'
                        })
                    }, 2000)
                }
            })
        }
        return {
            token,
            user,
            userInfo,
            logOut,
            login
        }
    },
    {
        unistorage: {
            serializer: {
                // 序列化，默认为 JSON.stringify
                serialize(v) {
                    return JSON.stringify(v)
                },
                // 反序列化，默认为 JSON.parse
                deserialize(v) {
                    return JSON.parse(v)
                }
            }
        } // 开启后对 state 的数据读写都将持久化
        // unistorage: {
        //     key: 'userInfo', // 缓存的键，默认为该 store 的 id，这里是 main,
        //     paths: ['userInfo.token'], // 需要缓存的路径，这里设置 foo 和 nested 下的 data 会被缓存
        //     // 初始化恢复前触发
        //     beforeRestore(ctx: any) {
        //         console.log(ctx)
        //     },
        //     // 初始化恢复后触发
        //     afterRestore(ctx: any) {
        //         console.log('ctx', ctx)
        //     },

        // },
    }
)
