<script lang="ts" setup>
/*
 * @description: 头部组件
 * @fileName: Header.vue
 * @params
 * @author: lxx
 * @date: 2023-07-17 09:32:09
 * @version: V1.0.0
 */
const props = defineProps({
    // 头部高度 默认为88rpx
    headerHeight: {
        type: [String, Number],
        default: 88,
    },
    // 是否显示左侧内容
    leftIconShow: {
        type: Boolean,
        default: true,
    },
    leftTxtShow: {
        type: Boolean,
        default: false,
    },
    leftTxt: {
        type: String,
        default: "首页",
    },
    // 样式部分
    backgroundColor: {
        type: String,
        default:
            "linear-gradient(90deg, rgba(10, 207, 254, 1) 0%, rgba(74, 92, 255, 1) 100%)",
    },
    backgroundColor2: {
        type: String,
        default: "transparent",
    },
    textColor: {
        type: String,
        default: "#fff",
    },
    title: {
        type: String,
        default: "标题",
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
});
const { statusBarHeight } = uni.getSystemInfoSync();

// 返回上一页
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
            background: backgroundColor,
            color: textColor,
            position: positionState,
        }">
            <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
            <view class="header flex AI-center JC-space-between" :style="{ height: headerHeight + 'rpx' }">
                <view class="header_left flex AI-center JC-space-between">
                    <view class="icon flex AI-center" @click="goBack" v-if="leftIconShow">
                        <image src="../../static/pubImgs/backW.png" mode="widthFix"></image>
                    </view>
                    <view class="left_txt" @click="goHome" v-if="leftTxtShow">
                        {{ leftTxt }}
                    </view>
                    <view class="left_solt">
                        <slot name="left"></slot>
                    </view>
                </view>
                <view class="header_center">
                    <view class="title">
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
        </view>
        <!-- 填充头部防止塌陷 -->
        <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
        <view v-if="isShowHeaderBox" :style="{ height: headerHeight + 'rpx', background: backgroundColor2 }"></view>
    </view>
</template>

<style lang="scss" scoped>
.header_main {
    width: 100%;
    z-index: 9999;
    top: 0;
    left: 0;

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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 24rpx;
        }

        .header_right {
            width: 20%;
        }
    }
}
</style>
