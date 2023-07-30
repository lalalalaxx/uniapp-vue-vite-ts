<script lang="ts" setup>
/*
 * @description: 头部组件
 * @fileName: Header.vue
 * @params
 * @author: lxx
 * @date: 2023-07-17 09:32:09
 * @version: V1.0.0
 */
import { ref, watchEffect } from 'vue'

const props = defineProps({
    // 头部高度 默认为44px （微信小程序不可用）
    headerHeight: {
        type: Number,
        default: 44,
    },
    // 是否显示左侧内容
    leftIconShow: {
        type: Boolean,
        default: true,
    },
    // 样式部分
    backgroundColor: {
        type: String,
        // default: "linear-gradient(90deg, rgba(10, 207, 254, 1) 0%, rgba(74, 92, 255, 1) 100%)",
        default: "transparent",
    },
    backgroundColor2: {
        type: String,
        default: "transparent",
    },
    textColor: {
        type: String,
        default: "#fff",
    },
    textFontSize: {
        type: Number,
        default: 30
    },
    title: {
        type: String,
        default: "标题",
    },
    textAlign: {
        type: String,
        default: 'left'
    },
    // 是否需要生成和头部高度相同的盒子
    isShowHeaderBox: {
        type: Boolean,
        default: true,
    },
    positionState: {
        type: String,
        default: "fixed",
    },
    isShowShadow: {
        type: Boolean,
        default: false
    },
    isBackIcon: {
        type: Boolean,
        default: true
    }
});

let { statusBarHeight } = uni.getSystemInfoSync();
// #ifdef MP-WEIXIN
// 胶囊状态
let menuButton = uni.getMenuButtonBoundingClientRect();
// 微信头部宽度
let wxHeaderWidth = menuButton.left
// 上边距
statusBarHeight = menuButton.top;
// #endif

const headerHeightRef = ref(0)
watchEffect(() => {
    headerHeightRef.value = props.headerHeight
    // #ifdef MP-WEIXIN
    // 中间高度
    headerHeightRef.value = menuButton.height;
    // #endif
})





// 返回上一页(如没有页面返回首页)
const goBack = () => {
    uni.navigateBack();
};
const goHome = () => {
    uni.reLaunch({
        url: "/pages/index/index",
    });
};
</script>

<template>
    <view class="header">
        <view class="header_main" :style="{
            boxShadow: isShowShadow ? '0 0 8rpx -3rpx #333' : '0 0 0 0 #333',
            background: backgroundColor,
            color: textColor,
            position: positionState,
        }">
            <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
            <!-- 标准的左中右结构 -->
            <!-- #ifndef MP-WEIXIN -->
            <view class="header flex AI-center JC-space-between" :style="{ height: headerHeightRef + 'px' }">
                <view class="header_left flex AI-center JC-space-between">
                    <view class="icon flex AI-center" @click="goBack" v-if="leftIconShow">
                        <!-- <image src="../../static/pubImgs/backW.png" mode="widthFix"></image> -->
                        <image :src="isBackIcon
                            ? '../../static/pubImgs/back.png'
                            : '../../static/pubImgs/backW.png'" mode="widthFix"></image>
                    </view>
                    <view class="left_slot">
                        <slot name="left"></slot>
                    </view>
                </view>
                <view class="header_center">
                    <view class="title" :style="{ fontSize: textFontSize + 'rpx' }">
                        {{ title }}
                    </view>
                    <view class="title">
                        <slot name="center"></slot>
                    </view>
                </view>
                <view class="header_right flex AI-center JC-center">
                    <slot name="right"></slot>
                </view>
            </view>
            <!-- #endif -->
            <!-- 左右结构 -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="wx_header flex AI-center" :style="{ height: headerHeightRef + 'px', width: wxHeaderWidth + 'px' }">
                <view class="wx_header_left  flex AI-center">
                    <view class="icon flex AI-center" @click="goBack" v-if="leftIconShow">
                        <image :src="isBackIcon
                            ? '../../static/pubImgs/back.png'
                            : '../../static/pubImgs/backW.png'
                            " mode="widthFix"></image>
                    </view>
                    <view>
                        <slot name="left"></slot>
                    </view>
                </view>
                <view class="wx_header_txt flex AI-center">
                    <view class="title" :style="{ fontSize: textFontSize + 'rpx' }">
                        {{ title }}
                    </view>
                    <!-- <view class="title"> -->
                    <slot name="center"></slot>
                    <!-- </view> -->
                </view>
            </view>
            <!-- #endif -->

        </view>
        <!-- 填充头部防止塌陷 -->
        <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
        <view v-if="isShowHeaderBox" :style="{ height: headerHeightRef + 'px', background: backgroundColor2 }"></view>
    </view>
</template>

<style lang="scss" scoped>
.header {
    padding: 0 20rpx 10rpx;
}

.header_main {
    width: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 0 20rpx 10rpx;

    .header {
        padding: 0 16rpx;
        box-sizing: border-box;

        .header_left {
            width: 20%;

            .icon {
                width: 48rpx;
            }

            .left_txt {
                font-size: 22rpx;
                line-height: 22rpx;
            }
        }

        .header_center {
            width: 60%;
            text-align: center;
            font-size: 28rpx;

            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .header_right {
            width: 20%;
        }
    }

    .wx_header {

        .wx_header_left {
            height: 100%;

            .icon {
                width: 48rpx;

                image {
                    vertical-align: middle;
                    width: 100%;
                }
            }
        }

        .wx_header_txt {
            flex: 1;
            height: 100%;
            padding-left: 26rpx;

            .title {
                width: 100%;
                line-height: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 28rpx;
            }
        }
    }
}
</style>
