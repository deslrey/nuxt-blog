<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="首页" name="home">
            <home-page />
        </el-tab-pane>
        <el-tab-pane label="归档" name="archive">
            <archive-page />
        </el-tab-pane>
        <el-tab-pane label="分类" name="sort">
            <sort-page />
        </el-tab-pane>
        <el-tab-pane label="标签" name="lable">
            <lable-page />
        </el-tab-pane>
        <el-tab-pane label="关于" name="about">
            <about-page />
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>


import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import HomePage from '../home/HomePage.vue';
import AboutPage from '../about/AboutPage.vue';
import ArchivePage from '../archive/ArchivePage.vue';
import LablePage from '../label/LablePage.vue';
import SortPage from '../sort/SortPage.vue';



const activeName = ref('home')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style>
.demo-tabs>.el-tabs__content {

    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>