<script setup lang="ts">
// 组件
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
import Empty from '@/components/Empty/Empty.vue'
import InfoItem from '@/components/InfoItem/InfoItem.vue'
// api
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { list, getList, num } from './useDeadline'

onLoad(() => {
	getList()
})
// 排序按钮开始
const isAsc = ref<boolean>(false)
const changeSort = () => {
	isAsc.value = !isAsc.value
	getList(isAsc.value ? 1 : 0)
}
// 排序按钮结束
const timeFilter = (num: number) => {
	return Math.abs(num)
}
</script>
<template>
	<view class="list_box">
		<HeaderXcx :isWhiteBack="true" :leftTxt="'期限预警'" backGround="#ffffff"></HeaderXcx>
		<view class="list_top_select flex AI-center JC-space-between">
			<view class="sort_btn flex AI-center JC-space-between" @click="changeSort">
				{{ isAsc ? '期限降序' : '期限正序' }}
				<view class="icon_box flex AI-center JC-center" :class="{ icon_des: isAsc }">
					<u-icon name="arrow-up-fill" size="12"></u-icon>
				</view>
			</view>
			<view class="top_select_left">
				共有
				<text>{{ num }}</text>
				条信息
			</view>
		</view>
		<view class="list_bottom_box">
			<u-collapse :accordion="true" :border="false">
				<u-collapse-item title="已到期" name="aqgl" class="collapse_item">
					<view class="sub_list_box" v-if="list.level_four.length > 0">
						<InfoItem :list="list.level_four">
							<template v-slot="{ item }">
								<view class="sub_item flex AI-center JC-space-between">
									<view class="name overT">
										{{ item.work_unit }} -
										<text>
											{{ item.name }}
										</text>
									</view>
									<view class="time overT">
										已到期{{ timeFilter(item.days_diff) }}天
									</view>
								</view>
							</template>
						</InfoItem>
					</view>
					<Empty style="margin: 15rpx 0;" v-else></Empty>
				</u-collapse-item>
				<u-collapse-item title="即将到期" name="aqgl" class="collapse_item">
					<view class="sub_list_box" v-if="list.level_three.length > 0">
						<InfoItem :list="list.level_three">
							<template v-slot="{ item }">
								<view class="sub_item flex AI-center JC-space-between">
									<view class="name overT">
										{{ item.work_unit }} -
										<text>
											{{ item.name }}
										</text>
									</view>
									<view class="time overT time_orange">
										{{ item.days_diff }}天
									</view>
								</view>
							</template>
						</InfoItem>
					</view>
					<Empty v-else></Empty>
				</u-collapse-item>
				<u-collapse-item title="期限不足100天" name="aqgl" class="collapse_item">
					<view class="sub_list_box" v-if="list.level_two.length > 0">
						<InfoItem :list="list.level_two">
							<template v-slot="{ item }">
								<view class="sub_item flex AI-center JC-space-between">
									<view class="name overT">
										{{ item.work_unit }} -
										<text>
											{{ item.name }}
										</text>
									</view>
									<view class="time time_yellow overT">
										{{ item.days_diff }}天
									</view>
								</view>
							</template>
						</InfoItem>
					</view>
					<Empty v-else></Empty>

				</u-collapse-item>
				<u-collapse-item title="期限100天以上" name="aqgl" class="collapse_item">
					<view class="sub_list_box" v-if="list.level_one.length > 0">
						<InfoItem :list="list.level_one">
							<template v-slot="{ item }">
								<view class="sub_item flex AI-center JC-space-between">
									<view class="name overT">
										{{ item.work_unit }} -
										<text>
											{{ item.name }}
										</text>
									</view>
									<view class="time overT time_green">
										{{ item.days_diff }}天
									</view>
								</view>
							</template>
						</InfoItem>
					</view>
					<Empty v-else></Empty>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
</template>
<style scoped lang="scss">
.list_box {
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

		.sort_btn {
			font-size: $font-size-28;
			color: rgba(51, 51, 51, 1);
			padding-right: 30rpx;
			position: relative;

			.icon_box {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-40%);
				transition: all .3s;
			}

			.icon_des {
				transform: translateY(-40%) scaleY(-1);
			}
		}
	}

	.list_bottom_box {

		:deep(.u-collapse-item) {
			background: rgba(230, 230, 230, 1);
			border-bottom: 1rpx solid #fff;



			&:nth-child(1) {
				background: rgba(230, 23, 0, 1);

				.u-cell {
					background: rgba(230, 23, 0, 1);
				}
			}

			&:nth-child(2) {
				background: rgba(237, 119, 0, 1);

				.u-cell {
					background: rgba(237, 119, 0, 1);
				}
			}

			&:nth-child(3) {
				background: rgba(255, 200, 0, 1);

				.u-cell {
					background: rgba(255, 200, 0, 1);
				}
			}

			&:nth-child(4) {
				background: rgba(0, 224, 75, 1);

				.u-cell {
					background: rgba(0, 224, 75, 1);
				}
			}

			.u-cell__title-text {
				color: #ffffff;
			}
		}

		:deep(.u-icon__icon) {
			color: #ffffff;
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
					max-width: 69%;

					text {
						color: rgba(102, 102, 102, 1);
					}
				}

				.time {
					max-width: 30%;
					font-size: $font-size-32;
					color: rgba(227, 0, 0, 1);
				}

				.time_orange {
					color: rgba(232, 117, 2, 1);
				}

				.time_black {
					color: rgba(0, 0, 0, 1);
				}

				.time_green {
					color: rgba(0, 204, 68, 1);
				}

				.time_yellow {
					color: rgba(227, 159, 0, 1);
				}

			}
		}
	}
}
</style>