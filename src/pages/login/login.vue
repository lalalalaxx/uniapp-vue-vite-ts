<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import type { userInfoInt } from '@/apis/login/type'
import useUserStore from '@/store/user'
import { debounce } from '@/utils/util'
// vuex数据相关
const userStore = useUserStore()
// 表单数据
const userInfo = ref<userInfoInt>({
    username: 'admin',
    password: 'admin'
})
// 规则
const rules = {
    username: {
        type: 'string',
        required: true,
        message: '请输入账号',
        trigger: ['blur', 'change']
    },
    password: {
        type: 'string',
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change']
    }
}
// 密码输入框的类型切换
let inputType = ref<number>(1)
const clickChangeInput = (type: number) => {
    if (inputType.value !== type) {
        inputType.value = type
    }
}

// 表单
const uForms = ref()
// 提交表单
const submit = debounce(() => {
    // userStore.aaa = '11111111111111'
    // return
    uForms.value
        .validate()
        .then(() => {
            console.log('login')
            // uni.$u.toast('校验通过')
            userStore.login(userInfo.value)
        })
        .catch((errors: any) => {
            console.log('errors', errors)
            // uni.$u.toast('校验失败')
        })
})
// 生命周期等-------------------------------------------
onReady(() => {
    uForms.value.setRules(rules)
})
</script>
<template>
    <view class="login">
        <image class="login_bg" src="@/static/imgs/login_bg.png" mode="aspectFill"></image>
        <Header :title="'登录'" :left-icon-show="false" :background-color="'transparent'" :go-back="false"></Header>
        <view class="login_main flex JC-center flexDc">
            <view class="login_mian_title">标题一</view>
            <view class="login_mian_sub_title">业务数据提示系统</view>
            <u-form :model="userInfo" label-width="10" :rules="rules" ref="uForms">
                <u-form-item class="form_item" prop="username" ref="item1">
                    <u-input
                        placeholder-style="color: #ffffff"
                        color="#ffffff"
                        v-model="userInfo.username"
                        border="none"
                        placeholder="请输入账号"
                    ></u-input>
                </u-form-item>
                <u-form-item class="form_item" prop="password" ref="item1">
                    <u-input
                        placeholder-style="color: #ffffff"
                        color="#ffffff"
                        v-model="userInfo.password"
                        border="none"
                        :type="inputType == 1 ? 'password' : 'text'"
                        placeholder="请输入密码"
                    >
                        <template #suffix>
                            <u-icon name="eye-fill" v-if="inputType == 2" color="#fff" size="18" @click="clickChangeInput(1)"></u-icon>
                            <u-icon name="eye-off" v-else color="#fff" size="18" @click="clickChangeInput(2)"></u-icon>
                        </template>
                    </u-input>
                </u-form-item>
            </u-form>
            <view class="submit_btn" @click="submit">
                <!-- :customStyle="{ 'fontSize': '18px' }" -->
                <u-button shape="circle" icon-color="#fff" text="登录"></u-button>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .login_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .login_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        width: 100%;
        padding: 0 64rpx;
        box-sizing: border-box;

        .login_mian_title {
            font-size: $font-size-40;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
        }

        .login_mian_sub_title {
            font-size: 60rpx;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin: 20rpx 0 140rpx;
        }

        :deep(.u-form-item__body__right) {
            border-radius: 100rpx;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10rpx);
            padding: 14rpx 20rpx;
        }

        :deep(.u-button__text) {
            background-image: -webkit-linear-gradient(360deg, #0065f2, #00a2e8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        :deep(.u-form-item__body__right__message) {
            font-weight: 600;
            font-size: 26rpx;
        }

        .submit_btn {
            margin-top: 110rpx;
            // :deep(.button__text){
            // 	font-size: 16px;
            // }
        }
    }
}
</style>
