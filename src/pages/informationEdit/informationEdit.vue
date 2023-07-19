<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import HeaderXcx from '@/components/Header/HeaderXcx.vue'
import { formatterDate } from '@/utils/Main'
import type { infoInt } from '@/pages/information/type'
// api
import { getDetail, updateInfo } from '@/apis/information'
import { onLoad } from '@dcloudio/uni-app'
const info = ref<infoInt>({
	id: 0,
	name: '',
	gender: '男',
	education_level: '',
	post: '',
	id_card: '',
	phone: null,
	work_unit: '',
	job_category: '',
	delete_time: null,
	update_time: '',
	become_time: null,
	category_id: null,
	is_remind: 0,
	days_diff: null,
})
onLoad((e) => {
	getDetail({ id: e?.id }).then((res: any) => {
		res.data.become_time = formatterDate(res.data.become_time)
		info.value = res.data
		// let time:number = Number(info.value.become_time) 
		// info.value.become_time = Number(formatterDate(time))
	})
})


// 到期日期弹框开始
const show = ref<boolean>(false)
const dateTime = ref<number | null>(null)
dateTime.value = Number(new Date())
const cancel = () => {
	show.value = false
}
const confirm = (e: any) => {
	console.log(e, formatterDate(e.value))
	info.become_time = Number(formatterDate(e.value))
	console.log("info", info);
	show.value = false
}
// 到期日期弹框结束
const uForm1 = ref()
// 表单验证等
const rules = {
	'is_remind': {
		type: 'number',
		required: true,
		message: '请选择是否到期提醒',
		trigger: ['blur', 'change']
	},
	'name': {
		type: 'string',
		required: true,
		message: '请输入姓名',
		trigger: ['blur', 'change']
	},
	'gender': {
		type: 'string',
		required: true,
		message: '请输入性别',
		trigger: ['blur', 'change']
	},
	'id_card': {
		type: 'string',
		required: true,
		message: '请输入身份证号码',
		trigger: ['blur', 'change']
	},
	'education_level': {
		type: 'string',
		required: true,
		message: '请输入文化水平',
		trigger: ['blur', 'change']
	},
	'job_category': {
		type: 'string',
		required: true,
		message: '请输入作业类型',
		trigger: ['blur', 'change']
	},
	'post': {
		type: 'string',
		required: true,
		message: '请输入岗位',
		trigger: ['blur', 'change']
	},
	'phone': {
		type: 'number',
		required: true,
		message: '请输入电话号码',
		trigger: ['blur', 'change']
	},
	'become_time': {
		type: 'string',
		required: true,
		message: '请选择到期日期',
		trigger: ['change', 'blur']
	},
}

// 加载动画
const isShowLoading = ref(true)
onMounted(() => {
	setTimeout(() => {
		isShowLoading.value = false
		uForm1.value.setRules(rules)
	}, 400)
})

// 提交表单
const submit = () => {
	// console.log('uForm', uForm);
	uForm1.value.validate().then((res: any) => {
		uni.$u.toast('校验通过')
		updateInfo(info.value).then(resApi => {
			console.log('resApi', resApi);
		})
	}).catch((error: any) => {
		uni.$u.toast('校验失败')
	})
}

</script>
<template>
	<view class="edit_box">
		<HeaderXcx :isWhiteBack="true" :leftTxt="'人员信息编辑'" backGround="#ffffff"></HeaderXcx>
		<view class="edit_form">
			<!-- 加载页 -->
			<u-loading-page :loading="isShowLoading" bg-color="rgba(0,0,0,1)"></u-loading-page>
			<u-form labelPosition="top" label-width="100" :model="info" :rules="rules" ref="uForm1">
				<u-form-item label="到期提醒" prop="is_remind" borderBottom ref="item1">
					<u-radio-group v-model="info.is_remind" placement="row">
						<u-radio :customStyle="{ marginRight: '8px' }" label="开启" :name="1">
						</u-radio>
						<u-radio :customStyle="{ marginRight: '8px' }" label="关闭" :name="0">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="姓名" prop="name" borderBottom ref="item1">
					<u-input v-model="info.name" placeholder="请输入姓名" border="none"></u-input>
				</u-form-item>
				<u-form-item label="性别" prop="gender" borderBottom ref="item1">
					<u-radio-group v-model="info.gender" placement="row">
						<u-radio :customStyle="{ marginRight: '8px' }" label="男" name="男">
						</u-radio>
						<u-radio :customStyle="{ marginRight: '8px' }" label="女" name="女">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="身份证号" prop="id_card" borderBottom ref="item1">
					<u-input type="number" placeholder="请输入身份证号" v-model="info.id_card" border="none"></u-input>
				</u-form-item>
				<u-form-item label="文化水平" prop="education_level" borderBottom ref="item1">
					<u-input v-model="info.education_level" placeholder="请输入文化水平" border="none"></u-input>
				</u-form-item>
				<u-form-item label="作业类别" prop="job_category" borderBottom ref="item1">
					<u-input v-model="info.job_category" placeholder="请输入作业类别" border="none"></u-input>
				</u-form-item>
				<u-form-item label="岗位" prop="post" borderBottom ref="item1">
					<u-input v-model="info.post" border="none" placeholder="请输入岗位"></u-input>
				</u-form-item>
				<u-form-item label="联系电话" prop="phone" borderBottom ref="item1">
					<u-input type="number" v-model="info.phone" placeholder="请输入联系电话" border="none"></u-input>
				</u-form-item>
				<u-form-item label="到期时间" prop="become_time" borderBottom ref="item1" @click="show = true">
					<u-input v-model="info.become_time" disabled disabledColor="#ffffff" placeholder="请选择到期时间"
						border="none"></u-input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
			</u-form>

			<u-datetime-picker :show="show" v-model="dateTime" mode="date" @confirm="confirm"
				@cancel="cancel"></u-datetime-picker>
			<view class="save_box">
				<view class="save_btn" @click="submit">
					保存
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
.edit_box {
	// background: rgba(242, 242, 242, 1);
	min-height: 100vh;
	position: relative;

	:deep(.u-transition) {
		z-index: 99;
	}

}

.edit_form {
	padding: 50rpx 30rpx 120rpx;

	.save_box {
		position: fixed;
		// bottom: 40rpx;
		// left: 40rpx;
		left: 0;
		bottom: 0;
		padding: 20rpx;
		width: 100%;
		background-color: #ffffff;
		z-index: 2;

		.save_btn {
			border-radius: 1000rpx;
			background: linear-gradient(90deg, rgba(0, 101, 242, 1) 0%, rgba(0, 162, 232, 1) 100%);
			font-size: $font-size-32;
			color: rgba(255, 255, 255, 1);
			padding: 16rpx 0;
			width: calc(100% - 80rpx);

			text-align: center;
		}
	}
}
</style>