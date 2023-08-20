<script setup lang="ts">
onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>

<style lang="scss">
// // 引入静态资源
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-plus/index.scss';
</style>
