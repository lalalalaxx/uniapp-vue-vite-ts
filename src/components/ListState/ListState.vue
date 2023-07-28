/**
* 传参说明
* @param imgUrl 默认图
* @param imgIsShow 默认图是否展示
* @param tips 默认提示语
*/
<script lang="ts" setup>
const props = defineProps({
    // 分页加载数据有无下一页
    isNoData: {
        type: Boolean,
        default: false
    },
    // 正在加载中
    isLoading: {
        type: Boolean,
        default: false
    },
    // 暂无数据
    isEmpty: {
        type: Boolean,
        default: false
    },
    // 暂无数据使用
    imgUrl: {
        type: String,
        default: '../../static/pubImgs/empty.png'
    },
    imgIsShow: {
        type: Boolean,
        default: true
    },
    tips: {
        type: String,
        default: '暂无数据~'
    }
})
</script>


<template>
    <view class="list_state_box">
        <view class="empty" v-if="isEmpty">
            <slot>
                <view class="img" v-if="imgIsShow">
                    <image :src="imgUrl" mode="widthFix"></image>
                </view>
            </slot>
            <view class="txt">
                {{ tips }}
            </view>
        </view>
        <view class="list_state" v-else>
            <view class="txt" v-if="isLoading">正在努力加载更多~</view>
            <view class="txt" v-else-if="isNoData && isNoData == true">已加载全部~</view>
            <view class="txt" v-if="!isLoading && !isNoData">上拉加载更多~</view>
        </view>
    </view>
</template>
<style lang="scss">
.list_state_box {
    .list_state {
        margin: 30rpx 0;

        .txt {
            text-align: center;
            color: #666;
            margin: 10rpx 0;
            font-size: 28rpx;
        }
    }

    .empty {
        .txt {
            font-size: 26rpx;
            color: #666;
            text-align: center;
        }

        .img {
            width: 70%;
            // max-height: 300rpx;
            margin: 0 auto;
            text-align: center;

            image {
                width: 100%;
                // height: 100%;
            }
        }
    }
}
</style>