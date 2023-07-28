// 定义组合式API仓库
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { Prefix } from "@/config";
interface userInfoInt {
    token: string;
    user: {
        username: string;
    };
}
// 创建小仓库
let useUserStore = defineStore("user", () => {
    let userInfo = reactive<userInfoInt>({
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
    const setUserInfo = (user: userInfoInt) => {
        userInfo.token = user.token;
        userInfo.user = user.user;
        uni.setStorageSync(`${Prefix}token`, user.token);
        uni.setStorageSync(`${Prefix}user`, JSON.stringify(user.user));
    };
    //  退出登录
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
        logOut
    };
});

export default useUserStore;