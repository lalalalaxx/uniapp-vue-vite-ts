// 定义组合式API仓库
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { Prefix } from "@/config";
import { goToPage } from "@/utils/Main"
import type { userInfoInt } from '@/apis/login/type'
import { loginApi } from '@/apis/login/index'
interface userInfoStoreInt {
    token: string;
    user: {
        username: string;
    };
}

// 创建小仓库
let useUserStore = defineStore("user", () => {
    let userInfo = reactive<userInfoStoreInt>({
        token: uni.getStorageSync(`${Prefix}token`) || "",
        user: uni.getStorageSync(`${Prefix}user`)
            ? JSON.parse(uni.getStorageSync(`${Prefix}user`))
            : {},
    });
    let token = computed(() => {
        return userInfo.token;
    });
    let user = computed(() => {
        return userInfo.user;
    });
    // 设置userInfo
    const setUserInfo = (user: userInfoStoreInt) => {
        userInfo.token = user.token;
        userInfo.user = user.user;
        uni.setStorageSync(`${Prefix}token`, user.token);
        uni.setStorageSync(`${Prefix}user`, JSON.stringify(user.user));
    };
    // 登录
    async function login(userInfo: userInfoInt) {
        const loginRes: any = await loginApi(userInfo)
		console.log("loginRes",loginRes);
        setUserInfo(loginRes.data)
        uni.showToast({
            title: '登录成功',
            icon: "none",
            success: () => {
                setTimeout(() => {
                    goToPage({
                        url: '/pages/index/index',
                        mode: "redirectTo"
                    })
                }, 2000)
            }
        })
    }
    // 退出登录
    function logOut() {
        uni.showToast({
            icon: "none",
            title: "退出成功",
            mask: true,
            success() {
                setTimeout(() => {
                    uni.clearStorageSync()
                    setUserInfo({
                        token: '',
                        user: {
                            username: ''
                        }
                    })
                    goToPage({
                        url: '/pages/login/login',
                        mode: "reLaunch"
                    })
                }, 2000)
            }
        })
    }
    return {
        token,
        user,
        setUserInfo,
        logOut,
        login
    };
});

export default useUserStore;