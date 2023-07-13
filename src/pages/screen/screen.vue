<script setup lang="ts">
import { ref } from 'vue'
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
const value = ref('')

const change = () => {

}
</script>
<template>
	<view class="screen_box">
		<HeaderXcx :isWhiteBack="true" :leftTxt="'筛选'" :isBoxShadow="false" backGround="#ffffff"></HeaderXcx>
		<view class="screen_list">
			<view class="screen_item" v-for="v in 2">
				<view class="screen_title">
					作业类别
				</view>
				<view class="screen_sub_box flex AI-center flex-wrap-wrap">
					<view class="sub_item" v-for="i in 5">
						运输作业
					</view>
				</view>
			</view>

			<view class="screen_title">
				关键字
			</view>
			<u-input placeholder="请输入姓名/公司名/关键字" border="surround" v-model="value" @change="change"></u-input>
			<view class="search_btn">
				搜索
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
.screen_box {
	background: rgba(242, 242, 242, 1);
	min-height: 100vh;
	position: relative;

}

.screen_list {
	padding: 40rpx;
	height: 100%;

	:deep(.u-input) {
		background-color: #ffffff;
	}

	.screen_title {
		font-size: $font-size-32;
		color: rgba(17, 17, 17, 1);
		font-weight: 600;
		margin-bottom: 24rpx;
	}

	.screen_item {

		.screen_sub_box {
			.sub_item {
				font-size: $font-size-26;
				border-radius: 100rpx;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid rgba(0, 101, 242, 1);
				margin: 0 30rpx 24rpx 0;
				padding: 10rpx 32rpx;
			}
		}
	}

	.search_btn {
		border-radius: 1000rpx;
		background: linear-gradient(90deg, rgba(0, 101, 242, 1) 0%, rgba(0, 162, 232, 1) 100%);
		font-size: $font-size-32;
		color: rgba(255, 255, 255, 1);
		padding: 16rpx 0;
		width: calc(100% - 80rpx);
		position: absolute;
		bottom: 40rpx;
		left: 40rpx;
		text-align: center;
	}
}
</style>