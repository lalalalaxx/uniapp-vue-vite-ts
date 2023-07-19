
<script lang="ts" setup>
import { computed } from 'vue';
// api相关
import { goToPage } from '@/utils/Main'

/**
* 传参说明
* @param imgUrl 默认图
* @param imgIsShow 默认图是否展示
* @param tips 默认提示语
*/

const props = defineProps({
	// 类型不同程度的颜色提示
	noticeType: {
		type: Number,
		default: 1
	},
	// 提示内容
	noticeTxt: {
		type: String,
		default: ''
	},
	// 通知数量
	noticeNum: {
		type: Number,
		default: 0
	}
})
const noticeContent = computed(() => {
	switch (props.noticeType) {
		case 0:
			return `有 ${props.noticeNum} 个培训已到期`
		case 1:
			return `有 ${props.noticeNum} 个培训即将到期`
		case 2:
			return `有 ${props.noticeNum} 个培训期限不足100天`
		case 3:
			return `所有培训期限在100天以上`
		default:
			return '请传入内容'
	}
})

// 通知条立即查看跳转
const goToNotice = () => {
	goToPage({
		url: '/pages/deadline/deadline'
	})
} 
</script>
<template>
	<view class="notice_row flex AI-center JC-space-between"
		:class="{ notice_row_green: noticeType == 3, notice_row_yellow: noticeType == 2, notice_row_red: noticeType == 0 }">
		<view class="notice_left flex AI-center">
			<view class="notice_icon">
				<image src="@/static/imgs/notice_icon.png" mode="widthFix"></image>
			</view>
			<view class="notice_txt" v-if="noticeTxt">
				{{ noticeTxt }}
			</view>
			<view class="notice_txt" v-else>
				{{ noticeContent }}
			</view>
		</view>
		<view class="watch_btn flex AI-center" @click="goToNotice" v-if="!noticeTxt">
			立即查看
			<image class="more_icon" src="@/static/pubImgs/backW.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.notice_row {
	border-radius: 20rpx;
	background: linear-gradient(90deg, rgba(227, 76, 0, .75) 0%, rgba(255, 126, 61, .75) 100%);
	border: 2rpx solid #FFFFFF;
	box-shadow: 0rpx 0rpx 10rpx #FF833B;
	backdrop-filter: blur(10rpx);
	padding: 22rpx 25rpx;

	.notice_left {
		.notice_icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}

		.notice_txt {
			line-height: 1;
			font-size: $font-size-32;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);

			// text {
			// 	font-weight: 600;
			// }
		}
	}


	.watch_btn {
		font-size: $font-size-24;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);

		.more_icon {
			transform: scaleX(-1);
			width: 34rpx;
			height: 34rpx;
		}
	}
}

.notice_row_red {
	background: linear-gradient(90deg, rgba(209, 0, 0, .75) 0%, rgba(232, 77, 0, .75) 100%);
	box-shadow: 0rpx 0rpx 10rpx rgba(209, 0, 0, 1);
}

.notice_row_yellow {
	background: linear-gradient(90deg, rgba(227, 178, 0, .75) 0%, rgba(255, 207, 61, .75) 100%);
	box-shadow: 0rpx 0rpx 10rpx rgba(227, 178, 0, 1);
}

.notice_row_green {
	background: linear-gradient(90deg, rgba(0, 201, 0, .75) 0%, rgba(86, 232, 53, .75) 100%);
	box-shadow: 0rpx 0rpx 10rpx rgba(0, 201, 0, 1);
}
</style>