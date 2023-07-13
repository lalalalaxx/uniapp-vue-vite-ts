<script setup lang="ts">
// 组件
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
import Empty from '@/components/Empty/Empty.vue'
import InfoItem from '@/components/InfoItem/InfoItem.vue'
// api
import { onLoad } from '@dcloudio/uni-app'
import { ref, watch, nextTick } from 'vue'
import { getMenuList, list, listNum, collapseOpen, userList, collapseValue } from './useList'

const title = ref<string>('标题')
onLoad((e) => {
	title.value = e?.title
	getMenuList({ pid: e?.id })
})
// 重新初始化展开面板高度
const collapse = ref();
watch(() => userList, () => {
	nextTick(() => {
		setTimeout(() => {
			collapse.value.init()
		}, 200)
	})
}, { deep: true })



</script>
<template>
	<view class="list_box">
		<HeaderXcx :isWhiteBack="true" :leftTxt="title" backGround="#ffffff"></HeaderXcx>
		<!-- 筛选 -->
		<view class="screen_sub_box flex AI-center flex-wrap-wrap" v-if="0">
			<view class="sub_item" v-for="i in 5">
				运输作业
				<view class="close_box flex AI-center JC-center">
					<u-icon name="close" color="#ffffff"></u-icon>
				</view>
			</view>
		</view>
		<view class="list_top_select flex AI-center JC-space-between">
			<view class="top_select_left">
				共有
				<text>{{ listNum }}</text>
				条信息
			</view>
			<view class="select_btn">
				筛选
			</view>
		</view>
		<view class="list_bottom_box">
			<u-collapse :accordion="true" :value="collapseValue" :border="false" @open="collapseOpen" ref="collapse">
				<u-collapse-item :title="item.name" :name="item.id" v-for="(item, index) in list" :key="index">
					<view class="sub_list_box" v-if="userList.length > 0">
						<InfoItem :list="userList">
							<template v-slot="{ item }">
								<view class="sub_item flex AI-center JC-space-between">
									<view class="name overT">
										{{ item.name }} -
										<text>
											{{ item.work_unit }}
										</text>
									</view>
									<view class="time overT"
										:class="{ time_black: item.days_diff >= 80, time_orange: item.days_diff >= 20 && item.days_diff < 80 }">
										{{ item.days_diff }}天
									</view>
								</view>
							</template>
						</InfoItem>
					</view>
					<Empty v-else></Empty>
				</u-collapse-item>
			</u-collapse>
			<Empty v-if="list.length == 0"></Empty>
		</view>
	</view>
</template>
<style scoped lang="scss">
.list_box {

	.screen_sub_box {
		margin-top: 24rpx;
		padding: 0 40rpx;

		.sub_item {
			font-size: $font-size-26;
			border-radius: 100rpx;
			background: rgba(255, 255, 255, 1);
			border: 1rpx solid rgba(0, 101, 242, 1);
			margin: 0 30rpx 24rpx 0;
			padding: 10rpx 32rpx;
			color: rgba(0, 101, 242, 1);
			position: relative;

			.close_box {
				position: absolute;
				right: 0;
				top: 0;
				width: 30rpx;
				height: 30rpx;
				background: rgba(102, 102, 102, 1);
				padding: 6rpx;
				border-radius: 50%;
				transform: translate(50%, -50%);
			}
		}
	}

	.list_top_select {
		padding: 0 40rpx;
		height: 94rpx;

		.top_select_left {
			font-size: $font-size-28;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);

			text {
				color: rgba(0, 119, 255, 1);
			}
		}

		.select_btn {
			border-radius: 4rpx;
			background: linear-gradient(90deg, rgba(0, 101, 242, 1) 0%, rgba(0, 162, 232, 1) 100%);
			font-size: $font-size-28;
			color: rgba(255, 255, 255, 1);
			padding: 10rpx 20rpx;
		}
	}

	.list_bottom_box {

		:deep(.u-collapse-item) {
			background: rgba(230, 230, 230, 1);
			border-bottom: 1rpx solid #fff;
		}

		:deep(.u-collapse-item__content) {
			background-color: #ffffff;
		}

		:deep(.u-collapse-item__content__text) {
			padding: 0;
		}

		.sub_list_box {
			.sub_item {
				padding: 0 24rpx;
				height: 94rpx;
				border-bottom: 1px solid rgba(230, 230, 230, 1);

				&:nth-last-child(1) {
					border-bottom: none;
				}

				.name {
					font-size: $font-size-32;
					color: rgba(51, 51, 51, 1);
					max-width: 70%;

					text {
						color: rgba(102, 102, 102, 1);
					}
				}

				.time {
					max-width: 25%;
					font-size: $font-size-32;
					color: rgba(227, 0, 0, 1);
				}

				.time_orange {
					color: rgba(232, 117, 2, 1);
				}

				.time_black {
					color: rgba(0, 0, 0, 1);
				}
			}
		}
	}
}
</style>