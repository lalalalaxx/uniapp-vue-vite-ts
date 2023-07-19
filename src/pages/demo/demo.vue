<script lang="ts" setup>
	import Header from "@/components/Header/Header.vue";
	import ListState from "@/components/ListState/ListState.vue";
	import { demo } from "@/apis/demo";
	import { ref } from 'vue'
	import { usePagingLoad } from "@/hooks/usePagingLoad";
	const { isEmpty, isNoData, isLoading, LoadData, ReLoad, list } = usePagingLoad(demo);

	const afterLoadData = (data : any) => {
		console.log("afterLoadData", data);
		// data.data.items[1] = 100000
	}
	const inputTxt = ref('')
	const inputChange = () => {
		ReLoad({ key: "search", val: inputTxt.value })
	}
	LoadData(afterLoadData, { key: "search", val: "222" });
</script>

<template>
	<view>
		<Header :title="'列表测试页面'"></Header>
		<input type="text" v-model="inputTxt" @change="inputChange">
		<view style="height: 25vh" v-for="(item,index) in list"> 这是测试页面 {{ item.name }} - {{ index }}</view>
		<ListState :isEmpty="isEmpty" :isLoading="isLoading" :isNodata="isNoData"></ListState>
	</view>
</template>

<style lang="scss" scoped></style>