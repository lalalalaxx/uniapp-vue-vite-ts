<script setup lang="ts">
// 组件
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
import Notice from '@/components/Notice/Notice.vue'
// api
import { getDetail, deleteInfo } from '@/apis/information'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { infoInt } from './type'
import { formatterDate, goToPage } from '@/utils/Main'

const info = ref<infoInt>({
	id: 0,
	name: '',
	gender: '',
	education_level: '',
	post: '',
	id_card: '',
	work_unit: '',
	job_category: '',
	delete_time: 0,
	update_time: '',
	become_time: null,
	category_id: 0,
	is_remind: 0,
	days_diff: 0,
	phone: '',
})
onLoad((e) => {
	getDetail({ id: e?.id }).then((res: any) => {
		info.value = res.data
	})
})

// 拨打电话
const callClick = () => {
	uni.makePhoneCall({
		phoneNumber: info.value.phone
	});
}
// 删除
const deleteInfoClick = () => {
	uni.showModal({
		title: '提示',
		content: '确认要删除吗？',
		success: function (res) {
			if (res.confirm) {
				console.log('用户点击确定');
				deleteInfo({ id: info.value.id }).then((resInfo: any) => {
					uni.showToast({
						title: resInfo?.data?.msg,
						success: () => {
							setTimeout(() => {
								uni.navigateBack({ delta: 1 })
							}, 1500)
						}
					})
				})

			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});

}
// 编辑
const goEdit = () => {
	goToPage({
		url: '/pages/informationEdit/informationEdit',
		params: {
			id: info.value.id
		}
	})
}

</script>
<template>
	<view class="information_box">
		<HeaderXcx :isWhiteBack="true" :isBoxShadow="false" :leftTxt="'人员信息'" backGround="#ffffff"></HeaderXcx>
		<view class="information_main">
			<view class="notice_box">
				<!-- 通知行 -->
				<Notice :noticeTxt="'培训期限还有3天到期'"></Notice>
			</view>
			<view class="title_box">
				到期提醒 <text>{{ info.is_remind == 1 ? '开启中' : '已关闭' }}</text>
			</view>

			<view class="form_box flex JC-space-between flex-wrap-wrap">
				<view class="form_item">
					<view class="label">
						姓名：
					</view>
					<view class="title">
						{{ info.name }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						性别：
					</view>
					<view class="title">
						{{ info.gender }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						身份证号：
					</view>
					<view class="title">
						{{ info.id_card }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						学历：
					</view>
					<view class="title">
						{{ info.education_level }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						作业类别：
					</view>
					<view class="title">
						{{ info.job_category }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						岗位：
					</view>
					<view class="title">
						{{ info.post }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						联系电话：
					</view>
					<view class="title">
						{{ info.phone }}
					</view>
				</view>
				<view class="form_item">
					<view class="label">
						认证日期：
					</view>
					<view class="title">
						{{ formatterDate(info.become_time) }}
					</view>
				</view>
			</view>
			<view class="btn_box">
				<view class="btn_edit_row flex AI-center JC-space-between">
					<view class="btn_edit" @click="deleteInfoClick">
						删除
					</view>
					<view class="btn_edit" @click="goEdit">
						编辑
					</view>
				</view>
				<view class="search_btn" @click="callClick">
					拨打电话
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
.information_box {
	background-color: rgba(242, 242, 242, 1);
	min-height: 100vh;
	position: relative;

}

.information_main {
	padding: 50rpx 30rpx;

	.title_box {
		margin: 50rpx 0 30rpx;
		font-size: $font-size-32;
		font-weight: 600;
		color: rgba(17, 17, 17, 1);
		border-bottom: 1rpx solid rgba(222, 222, 222, 1);
		padding-bottom: 24rpx;

		text {
			color: rgba(0, 150, 50, 1);
		}
	}

	.form_box {
		.form_item {
			width: 49%;
			margin-top: 48rpx;

			.label {
				font-size: $font-size-28;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}

			.title {
				font-size: $font-size-32;
				color: rgba(51, 51, 51, 1);
			}
		}
	}


	.btn_box {
		position: absolute;
		left: 30rpx;
		bottom: 40rpx;
		width: calc(100% - 60rpx);

		.btn_edit_row {
			width: 100%;

			.btn_edit {
				width: calc((100% - 32rpx) / 2);
				border-radius: 1000rpx;
				background: linear-gradient(90deg, rgba(209, 0, 0, 1) 0%, rgba(232, 77, 0, 1) 100%);
				height: 80rpx;
				color: #ffffff;
				line-height: 80rpx;
				text-align: center;

				&:nth-child(2) {
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(0, 101, 242, 1);
					color: rgba(0, 101, 242, 1);
				}
			}
		}

		.search_btn {
			border-radius: 1000rpx;
			background: linear-gradient(90deg, rgba(0, 101, 242, 1) 0%, rgba(0, 162, 232, 1) 100%);
			font-size: $font-size-32;
			color: rgba(255, 255, 255, 1);
			padding: 16rpx 0;
			width: 100%;
			text-align: center;
			margin-top: 30rpx;
		}
	}
}
</style>