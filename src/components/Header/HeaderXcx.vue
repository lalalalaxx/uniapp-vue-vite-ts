<script lang="ts" setup>
/*
 * @description: 小程序头部
 * @fileName: HeaderXcx.vue
 * @params
 * @author: lxx
 * @date: 2023-07-17 09:32:45
 * @version: V1.0.0
 */
import { ref, onMounted } from 'vue'
// 顶部菜单高度
let menuHeight = ref<number>(44)
// 空白占位高度
let placeHeight = ref<number>(0)
// 上边距
let paddingTop = ref<number>(0)
// 下边距
let paddingBot = ref<number>(0)

defineProps({
    // 状态栏文字颜色
    statusColor: {
        type: String,
        default: 'black',
    },
    // 是否固定
    fixed: {
        type: Boolean,
        default: false,
    },
    // 背景色
    backGround: {
        type: String,
        default: 'transparent',
    },
    textColor: {
        type: String,
        default: '#000',
    },
    goBack: {
        type: Boolean,
        default: true,
    },
    centerText: {
        type: String,
        default: '',
    },
    leftTxt: {
        type: String,
        default: '',
    },
    // 白色返回按钮
    isWhiteBack: {
        type: Boolean,
        default: false,
    },
    // 是否需要阴影
    isBoxShadow: {
        type: Boolean,
        default: true,
    },
})

// 获取状态栏高度
const getStatusHeight = () => {
    uni.getSystemInfo({
        success: function (res: any) {
            // #ifdef MP-WEIXIN
            // 胶囊状态
            let menuButton = uni.getMenuButtonBoundingClientRect()
            // 中间高度
            menuHeight.value = menuButton.height
            // 空白占位高度
            placeHeight.value = menuButton.top + (menuButton.top - res?.statusBarHeight) + menuButton.height
            // 上边距
            paddingTop.value = menuButton.top
            paddingBot.value = menuButton.top - res?.statusBarHeight
            // #endif
        },
    })
}

// 左边返回
const leftTap = () => {
    uni.navigateBack()
}
onMounted(() => {
    getStatusHeight()
})
</script>
<template>
    <view class="headers" :class="{ box_shadow: isBoxShadow }">
        <!-- 头部内容 -->
        <view
            class="headers_box"
            :class="{ top_fixed: fixed }"
            :style="{
                color: textColor,
                height: menuHeight + 'px',
                paddingTop: paddingTop + 'px',
                paddingBottom: paddingBot + 'px',
                background: backGround,
            }"
        >
            <view class="action">
                <view class="flex AI-center">
                    <image
                        :src="isWhiteBack ? '../../static/pubImgs/back.png' : '../../static/pubImgs/backW.png'"
                        mode=""
                        class="goback"
                        v-if="goBack"
                        @tap="leftTap"
                    ></image>
                    <view class="left_txt overT">
                        {{ leftTxt }}
                    </view>
                </view>
                <slot name="left" />
            </view>
            <view class="centerBox" v-if="centerText">
                {{ centerText }}
            </view>
        </view>
        <!-- 占位 -->
        <view class="place" :style="{ height: placeHeight }" v-if="fixed"></view>
    </view>
</template>

<style lang="scss" scoped>
.box_shadow {
    box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.2);
}

.headers {
    padding-bottom: 10rpx;

    .status {
        width: 100%;
    }

    .headers_box {
        background-color: transparent;
        box-sizing: content-box !important;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 999;

        // padding: 0 20px;
        .action {
            position: absolute;
            padding-left: 18px;
            max-width: 65%;
            font-size: 40rpx;

            .goback {
                width: 48rpx;
                height: 48rpx;
            }

            .left_txt {
                padding-left: 10rpx;
                flex: 1;
            }
        }

        .centerBox {
            margin: 0 auto;
            font-size: 34rpx;
        }
    }

    .top_fixed {
        position: fixed;
        left: 0;
    }
}
</style>
