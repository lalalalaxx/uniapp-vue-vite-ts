<script setup lang="ts">
/*
 * @description: 全局弹框组件
 * @fileName: lx_dialog.vue
 * @author: liuxi <2399270194@qq.com>
 * @date: 2023-08-17 20:58:15"
 * @version: V1.0.0
 */
const visible = ref(true)
const isAddClose = ref(false)
function hideDialog() {
    isAddClose.value = true
    setTimeout(() => {
        visible.value = false
        uni.navigateBack()
    }, 200)
}

function confirm() {
    hideDialog()
}

const title = ref('')
onLoad((query: any) => {
    console.log(query)
    title.value = query.title
})
</script>
<template>
    <!-- <view class="aaa">1231154561521</view> -->
    <view class="lx_dialog">
        <view class="lx_mask"></view>
        <view class="lx_dialog_main_box flex">
            <view class="lx_dialog_main" v-show="visible" :class="{ lx_close_dialog: isAddClose }">
                <view class="lx_title">{{ title }}</view>
                <view class="lx_content">这是一段文字介绍哦~</view>
                <view class="lx_footer flex-center">
                    <button class="confirm_btn" @click="confirm">确定</button>
                    <button class="cancel_btn" @click="hideDialog">取消</button>
                </view>
            </view>
        </view>
    </view>
</template>
<style>
page {
    background-color: transparent;
}
</style>
<style scoped lang="scss">
.lx_dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .lx_mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .lx_dialog_main_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        @keyframes open {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        @keyframes close {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }

        .lx_dialog_main {
            width: 80vw;
            background-color: #fff;
            border-radius: 16rpx;
            padding: 0;
            box-sizing: border-box;
            animation: open 0.5s;
            .lx_title {
                padding: 50rpx;
                font-size: $font-size-32;
                font-weight: 700;
                color: #606266;
                text-align: center;
            }
            .lx_content {
                font-size: $font-size-30;
                color: #606266;
                text-align: center;
                padding: 0 50rpx 50rpx;
            }
            .lx_footer {
                border-top: 1rpx solid #d6d7d9;
                .confirm_btn,
                .cancel_btn {
                    width: 50%;
                    padding: 0;
                    border-radius: 8rpx;
                    cursor: pointer;
                    background-color: transparent;
                    &:hover {
                        background-color: #f2f2f2;
                    }
                    &::after {
                        border: none;
                    }
                }
                .confirm_btn {
                    color: #2979ff;
                }
                .cancel_btn {
                    color: #606266;
                }
            }
        }
        // 窗口关闭
        .lx_close_dialog {
            animation: close 0.5s;
        }
    }
}
</style>
