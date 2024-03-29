<script lang="ts" setup>
/*
 * @description: 头部组件
 * @fileName: Header.vue
 * @params
 * @author: lxx
 * @date: 2023-07-16 09:32:09
 * @version: V1.0.2
 */
import { goToPage } from '@/utils/util'
import { ref, watchEffect, type CSSProperties } from 'vue'

type headerInt = {
    // 头部高度 默认为44px （微信小程序不可用）
    headerHeight?: number
    // 是否显示左侧内容
    leftIconShow?: boolean
    // 样式部分
    backgroundColor?: string
    backgroundColor2?: string
    textColor?: string
    textFontSize?: number
    title: string
    // 是否需要生成和头部高度相同的盒子
    isShowHeaderBox?: boolean
    positionState?: string
    isShowShadow?: boolean
    isBlackIcon?: boolean
}

const props = withDefaults(defineProps<headerInt>(), {
    // 头部高度 默认为44px （微信小程序不可用）
    headerHeight: 44,
    // 是否显示左侧内容
    leftIconShow: true,
    // 样式部分
    backgroundColor: 'linear-gradient(90deg, rgba(10, 207, 254, 1) 0%, rgba(74, 92, 255, 1) 100%)',
    backgroundColor2: 'transparent',
    textColor: '#fff',
    textFontSize: 34,
    title: '标题',
    // 是否需要生成和头部高度相同的盒子
    isShowHeaderBox: true,
    positionState: 'fixed',
    isShowShadow: false,
    isBlackIcon: false
})

let { statusBarHeight } = uni.getSystemInfoSync()
// #ifdef MP-WEIXIN
// 胶囊状态
let menuButton = uni.getMenuButtonBoundingClientRect()
// 微信头部宽度
let wxHeaderWidth = menuButton.left
// 上边距
statusBarHeight = menuButton.top
// #endif

// padding的高度（防止头部塌陷）
const fillBoxHeight = ref(statusBarHeight + 5)

// 设置header的高度
const headerHeightRef = ref(0)
watchEffect(() => {
    headerHeightRef.value = props.headerHeight
    // #ifdef MP-WEIXIN
    // 中间高度
    headerHeightRef.value = menuButton.height
    // #endif
})

const style = computed(() => {
    // console.log(props.positionState === 'fixed')
    return {
        boxShadow: props.isShowShadow ? '0 0 8rpx -3rpx #333' : '0 0 0 0 #333',
        background: props.backgroundColor,
        color: props.textColor,
        position: props.positionState
    } as CSSProperties
})
// 返回上一页(如没有页面返回首页)
const goBack = () => {
    if (getCurrentPages().length <= 1) {
        goToPage({
            url: '/pages/index/index',
            mode: 'redirectTo'
        })
    } else {
        uni.navigateBack()
    }
}
</script>

<template>
    <view class="header_box">
        <view class="header_main" :style="style">
            <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
            <!-- 标准的左中右结构 -->
            <!-- #ifndef MP-WEIXIN -->
            <view class="header flex-center-between" :style="{ height: headerHeightRef + 'px' }">
                <view class="header_left flex-center-between">
                    <slot name="left" v-if="leftIconShow">
                        <view class="icon flex" @click="goBack">
                            <image :src="isBlackIcon ? '../../static/pubImgs/back.png' : '../../static/pubImgs/backW.png'" mode="widthFix"></image>
                        </view>
                    </slot>
                </view>
                <view class="header_center">
                    <view class="title" :style="{ fontSize: textFontSize + 'rpx' }">
                        {{ title }}
                    </view>
                    <slot name="center"></slot>
                </view>
                <view class="header_right flex">
                    <slot name="right"></slot>
                </view>
            </view>
            <!-- #endif -->
            <!-- 左右结构 -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="wx_header flex" :style="{ height: headerHeightRef + 'px', width: wxHeaderWidth + 'px' }">
                <view class="wx_header_left flex">
                    <slot name="left">
                        <view class="icon flex" @click="goBack" v-if="leftIconShow">
                            <image :src="isBlackIcon ? '../../static/pubImgs/back.png' : '../../static/pubImgs/backW.png'" mode="widthFix"></image>
                        </view>
                    </slot>
                </view>
                <view class="wx_header_txt flex">
                    <view class="title" :style="{ fontSize: textFontSize + 'rpx' }">
                        {{ title }}
                    </view>
                    <slot name="center"></slot>
                </view>
            </view>
            <!-- #endif -->
        </view>
        <!-- 填充头部防止塌陷 -->
        <view class="status_bar" :style="{ height: fillBoxHeight + 'px' }"></view>
        <view v-if="isShowHeaderBox" :style="{ height: headerHeightRef + 'px', background: backgroundColor2 }"></view>
    </view>
</template>

<style lang="scss" scoped>
.header_box {
    // padding: 0 20rpx 5rpx;
}

.header_main {
    width: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 5rpx 20rpx 5rpx;
    box-sizing: border-box;

    .header {
        // padding: 0 16rpx;
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
