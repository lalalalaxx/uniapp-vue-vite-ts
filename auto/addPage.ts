const fs = require('fs')

const pagesStr = fs.readFileSync('./src/pages.json', 'utf-8');
const pagesJson = JSON.parse(pagesStr);
// Pages页面
const Pages = pagesJson.pages.map((i) => {
    return {
        type: 'Pages',
        name: i.name,
        path: `/${i.path}`,
        title: i.style?.navigationBarTitleText
    };
});
// 二级页面
const subPages = pagesJson.subPackages.flatMap((i) => {
    return i.pages.map((x) => {
        return {
            type: 'subPage',
            name: x.name,
            path: `/${i.root}/${x.path}`,
            title: x.style?.navigationBarTitleText
        };
    });
});
// 当前已有页面
// const pages = [...Pages, ...subPages];
// 当前已创建文件
const filesList = fs.readdirSync('./src/pages');
const filesSubList = fs.readdirSync('./src/subpackage/pages');

// 获取需要新增的页面  =>取差集
let newPages = Pages.filter((i) => !filesList.includes(i.name));
const newSubPages = subPages.filter((i) => !filesSubList.includes(i.name));

newPages = [...newPages, ...newSubPages]

// 添加新路由
function addPages(pages) {
    for (const page of pages) {
        // 待修改根据path 路径生成
        const { name, title, type } = page;
        let dirPath = ''
        switch (type) {
            case 'Pages':
                // 主包
                dirPath = `./src/pages/${name}`;
                break;
            case 'subPage':
                // 分包
                dirPath = `./src/subpackage/pages/${name}`;
                break;
            default:
                break;
        }
        // if (name.toLowerCase().indexOf("list") != -1) {
        //     console.log(22222222);

        // } else {
        //     console.log(33333333);
        // }

        // return
        fs.mkdirSync(dirPath);
        const filePath = `${dirPath}/${name}.vue`;
        const createStream = fs.createWriteStream(filePath);

        const template =
            `<script setup lang="ts">
	import HeaderXcx from '@/components/Header/HeaderXcx.vue'
</script>
<template>
	<view class="">
	<HeaderXcx :leftTxt="'标题'" :textColor="'#fff'" :goBack="false"></HeaderXcx>
	${title}
	</view>
</template>
<style lang="scss" scoped></style>`;
        createStream.write(template);
        createStream.end();
        console.log('\x1B[34m', `pages ${name} created successfully.`);
    }
    console.log('\x1B[32m%s\x1B[39m', '\n All files are created successfully.\n');
}

addPages(newPages);