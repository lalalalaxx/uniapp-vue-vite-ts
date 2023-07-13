<script setup lang="ts">
// 组件相关
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
import Notice from '@/components/Notice/Notice.vue'
import Empty from '@/components/Empty/Empty.vue';
// api相关
import { imgUrl, goToPage } from '@/utils/Main'
// store数据
import userStore from '@/store/user'
const userInfo = userStore()
// 菜单功能和通知提示功能
import { getAllInfo, noticeType, noticeNum, list } from './useExpire'
import type { listInt } from './useExpire'
// 获取接口数据
getAllInfo()

// 菜单跳转
const goToList = (item: listInt) => {
	goToPage({
		url: "/pages/list/list",
		mode: "navigateTo",
		params: {
			title: item.name,
			id: item.id
		},
	});
};

</script>
<template>
	<view class="index">
		<view class="index_top_box" ref="topBox">
			<!-- 背景盒子 -->
			<image class="login_bg" src="@/static/imgs/index_bg.png" mode="scaleToFill"></image>
			<HeaderXcx :leftTxt="'业务数据提示系统'" :textColor="'#fff'" :goBack="false"></HeaderXcx>
			<view class="index_main_box">
				<!-- 姓名 -->
				<view class="name_row flex AI-center">
					<view class="name">
						{{ userInfo.user.username }}
					</view>
					<!-- <view class="tag_box">
						职位
					</view> -->
				</view>
				<!-- 通知行 -->
				<Notice :noticeType="noticeType" :noticeNum="noticeNum"></Notice>
			</view>
		</view>
		<!-- 主要的菜单列表 -->
		<scroll-view class="index_bottom_box" :scroll-y="true">
			<view class="index_bottom_list" v-if="list?.length > 0">
				<view class="index_bottom_item flex AI-center JC-space-between" v-for="(item, index) in list" :key="index"
					@click="goToList(item)">
					<view class="index_bottom_item_left flex AI-center">
						<view class="item_icon">
							<image :src="item.icon ?? imgUrl({ str: 'yjaq' })" mode="widthFix"></image>
						</view>
						<view class="title overT">
							{{ item.name }}
						</view>
					</view>
					<view class="item_more">
						<u-icon name="arrow-right" color="#666666" size="20"></u-icon>
					</view>
				</view>
			</view>
			<Empty v-else></Empty>
		</scroll-view>
	</view>
</template>

<style scoped lang="scss">
.index {
	.index_top_box {
		height: 450rpx;
		position: relative;

		.login_bg {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -1;
		}

		.index_main_box {
			padding: 0 32rpx;

			.name_row {
				margin: 30rpx 0;

				.name {
					font-size: $font-size-40;
					font-weight: 700;
					color: rgba(255, 255, 255, 1);
					margin-right: 10rpx;
					max-width: 45%;
				}

				.tag_box {
					max-width: 45%;
					font-size: $font-size-28;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					border-radius: 4rpx;
					background: linear-gradient(90deg, #0065F2 0%, #00A2E8 100%);
					padding: 6rpx 10rpx;
					max-width: 45%;
				}
			}
		}
	}

	.index_bottom_box {
		height: calc(100vh - 450rpx);
		background-color: #FFFFFF;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		margin-top: -45rpx;
		padding: 30rpx 36rpx;
		width: 100%;
		box-sizing: border-box;

		.index_bottom_list {
			padding: 20rpx;

			.index_bottom_item {
				border-radius: 20rpx;
				background: linear-gradient(136.9deg, #EDF4FC 0%, #F7FBFF 100%);
				border: 2rpx solid #FFFFFF;
				box-shadow: 0rpx 0rpx 10rpx rgba(0, 100, 240, .3);
				padding: 28rpx 40rpx;
				margin-bottom: 24rpx;
				width: 100%;
				box-sizing: border-box;

				.index_bottom_item_left {
					width: calc(100% - 50rpx);

					.item_icon {
						width: 75rpx;
						// height: 86rpx;
						margin-right: 34rpx;
					}

					.title {
						max-width: calc(100% - 90rpx);
						font-size: $font-size-32;
						font-weight: 600;
						color: rgba(51, 51, 51, 1);
					}
				}

				.item_more {}

			}
		}

	}
}
</style>