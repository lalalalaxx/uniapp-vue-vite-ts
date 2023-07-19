<script setup lang="ts">
	import HeaderXcx from '@/components/Header/HeaderXcx.vue'
</script>
<template>
	<view class="index">
		<HeaderXcx :leftTxt="'首页'" :textColor="'#000'" :goBack="false"></HeaderXcx>
		首页
	</view>
</template>

<style scoped lang="scss">
	.index {}
</style>