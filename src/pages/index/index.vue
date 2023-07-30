<script setup lang="ts">
import Header from "@/components/Header/Header.vue";
import { reactive } from "vue"
</script>
<template>
    <view class="index">
        <Header :title="'首页'" :isShowShadow="true" :textColor="'#000'" :textAlign="'center'" :goBack="false"></Header>
        首页
    </view>
</template>

<style scoped lang="scss">
.index {}
</style>
