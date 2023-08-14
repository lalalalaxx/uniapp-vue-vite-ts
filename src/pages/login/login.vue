<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import type { userInfoInt } from '@/apis/login/type'
import useUserStore from '@/store/user'

const userStore = useUserStore()

const type = ref<boolean>(false)
const getType = computed(() => {
    return type.value ? 'text' : 'password'
})

const formRef = ref()
const loginForm = ref<userInfoInt>({
    username: '',
    password: '',
    code: ''
})

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
    },
    code: {
        type: 'string',
        required: true,
        message: '请输入验证码',
        trigger: ['blur', 'change']
    }
}
const login = uni.$util.debounce(() => {
    formRef
        .value!.validate()
        .then(() => {
            uni.showLoading({ title: '提交中...' })
            userStore.login(loginForm.value).then(() => {
                uni.hideLoading()
                uni.showToast({
                    title: '登录成功',
                    icon: 'none',
                    success: () => {
                        setTimeout(() => {
                            uni.$util.goToPage({ url: 'pages/index/index' })
                        }, 2000)
                    }
                })
            })
        })
        .catch((errors: any) => {
            console.log('errors', errors)
        })
}, 400)

onReady(() => {
    formRef.value.setRules(rules)
})
</script>
<template>
    <view class="login">
        <image class="login_bg" src="@/static/bg.jpeg" mode="aspectFill" />
        <view class="flex column login-content">
            <u-form ref="formRef" :model="loginForm" :rules="rules" :label-width="20" style="width: 86%">
                <u-form-item prop="username" left-icon="account" :border-bottom="false">
                    <u-input v-model="loginForm.username" placeholder="请输入账号" border="none" />
                </u-form-item>
                <u-form-item prop="password" left-icon="lock" :border-bottom="false">
                    <u-input v-model="loginForm.password" :type="getType" placeholder="请输入密码" border="none" />
                    <template #right>
                        <u-icon :name="`eye-${type ? 'fill' : 'off'}`" @tap="type = !type" />
                    </template>
                </u-form-item>
                <u-button class="submit-btu" @tap="login" shape="circle" color="#31d0ab" text="登 录" />
            </u-form>
        </view>
    </view>
</template>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    &_bg {
        width: 100%;
        height: 100%;
    }

    &-content {
        width: 100%;
        height: 0%;
        box-sizing: border-box;
        border-radius: 50% 50% 0 0 /3%;
        background-color: rgba(0, 0, 0, 0.6);
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        animation: move 0.6s forwards;

        @keyframes move {
            from {
                height: 00%;
            }

            to {
                height: 90%;
            }
        }

        .submit-btu {
            margin-top: 30rpx;
        }
    }

    :deep(.u-form-item) {
        height: 130rpx;
        .u-form-item__body {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            padding: 20rpx;

            &__left {
                margin-right: 12rpx;
            }

            .u-icon__icon {
                font-size: 36rpx !important;
                color: #31d0ab !important;
            }

            .uni-input-input {
                color: #fff;

                &::placeholder {
                    color: #fff;
                }
            }
        }

        .u-form-item__body__right__message {
            margin: 10rpx 40rpx !important;
        }
    }
}
</style>
