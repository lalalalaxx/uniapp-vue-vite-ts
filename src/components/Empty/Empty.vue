/**
* 传参说明
* @param imgUrl 默认图
* @param imgIsShow 默认图是否展示
* @param tips 默认提示语
*/
<script lang="ts" setup>
	const props = defineProps({
		imgUrl : {
			type: String,
			default: '../../static/pubImgs/empty.png'
		},
		isImgShow: {
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
	<view class="empty">
		<slot>
			<view class="img" v-if="isImgShow">
				<image :src="imgUrl" mode="widthFix"></image>
			</view>
		</slot>
		<view class="txt">
			{{ tips }}
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.empty {
		width: 100vw;
		padding: 24rpx 0;
		.txt {
			font-size: 26rpx;
			color: #666;
			text-align: center;
		}

		.img {
			width: 70%;
			margin: 0 auto;
			text-align: center;

			image {
				width: 100%;
			}
		}
	}
</style>