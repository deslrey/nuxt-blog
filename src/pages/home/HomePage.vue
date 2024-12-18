<template>
    <el-container style="height: 100vh;">
        <!-- Header Section with Frosted Glass Effect -->
        <el-header class="header" style="padding: 0;">
            <el-menu :default-active="activeMenu" mode="horizontal" background-color="transparent" text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" @click="goHome">首页</el-menu-item>
                <el-menu-item index="2" @click="goArchives">归档</el-menu-item>
                <el-menu-item index="3">关于我</el-menu-item>
            </el-menu>
        </el-header>

        <!-- Main Content with Background Image and Overlay -->
        <el-main class="main" style="padding: 20px; color: #fff;">
            <div class="background-overlay">
                <h1>文章列表</h1>
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(post, index) in posts" :key="index">
                        <el-card :body-style="{ padding: '20px' }">
                            <h3>{{ post.title }}</h3>
                            <p>{{ post.description }}</p>
                            <el-button type="primary" @click="goToPost(post.id)">阅读更多</el-button>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeMenu = ref('1') // 默认选中的菜单项
const router = useRouter()

// 模拟的文章数据
const posts = ref([
    { id: 1, title: '我的第一篇博客', description: '这是我写的第一篇博客，内容讲述了如何开始一个博客项目...' },
    { id: 2, title: '如何使用 Nuxt.js', description: '在这篇文章中，我将介绍如何使用 Nuxt.js 创建一个博客...' },
    { id: 3, title: 'Element UI 简介', description: 'Element UI 是一个基于 Vue.js 的桌面端组件库，适合构建管理系统...' },
])

const goHome = () => {
    router.push('/')
}

const goArchives = () => {
    router.push('/archives')
}

const goToPost = (postId: number) => {
    router.push(`/post/${postId}`)
}
</script>

<style scoped>
/* 背景图和遮罩层 */
.main {
    position: relative;
    background-image: url('../../assets/images/default.jpg');
    /* 替换为你自己的背景图 */
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    /* 遮罩层，透明度可调整 */
    z-index: 3;
    /* 确保遮罩层在背景图下 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

/* 标题栏透明磨砂效果 */
.header {
    backdrop-filter: blur(15px);
    /* 增强模糊效果 */
    background-color: rgba(255, 255, 255, 0.1);
    /* 增加透明度和白色调 */
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    /* 更强的阴影效果，提升凹凸感 */
    padding: 0 20px;
    position: fixed;
    /* 固定在页面顶部 */
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    /* 确保标题栏在所有内容之上 */
}

h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 30px;
    z-index: 1;
    /* 确保标题在遮罩层和背景图上层 */
}

/* 调整菜单项的样式 */
.el-menu {
    border: none;
    /* 去掉菜单的边框 */
}

.el-menu-item {
    font-weight: bold;
    /* 菜单项文字加粗 */
}

.el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    /* 鼠标悬停时有微透明效果 */
}
</style>