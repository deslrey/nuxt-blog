<template>
    <el-container style="height: 100vh;">
        <!-- 头部 -->
        <el-header class="header">
            <div class="logo">个人博客</div>
            <div class="menu">
                <ul>
                    <li @click="handleMenuSelect(1)" :class="{ active: activeMenu === 1 }">
                        <el-icon>
                            <HomeFilled />
                        </el-icon>首页
                    </li>
                    <li @click="handleMenuSelect(2)" :class="{ active: activeMenu === 2 }">
                        <el-icon>
                            <Files />
                        </el-icon>归档
                    </li>
                    <li @click="handleMenuSelect(3)" :class="{ active: activeMenu === 3 }">
                        <el-icon>
                            <Grid />
                        </el-icon>分类
                    </li>
                    <li @click="handleMenuSelect(4)" :class="{ active: activeMenu === 4 }">
                        <el-icon>
                            <PriceTag />
                        </el-icon>标签
                    </li>
                    <li @click="handleMenuSelect(5)" :class="{ active: activeMenu === 5 }">
                        <el-icon>
                            <UserFilled />
                        </el-icon>关于
                    </li>
                </ul>
            </div>
        </el-header>

        <!-- 主体内容 -->
        <el-main class="main">
            <div class="blog-content">
                <div class="post-list">
                    <el-card v-for="post in posts" :key="post.id" class="post-card" shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>{{ post.title }}</span>
                            <span class="post-date">{{ post.date }}</span>
                        </div>
                        <div class="post-content">
                            <p>{{ post.excerpt }}</p>
                            <el-button type="primary" @click="viewPost(post.id)">查看详情</el-button>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-main>

        <!-- 底部 -->
        <el-footer>
            <div class="footer-content">
                <span>© 2024 个人博客 | 版权所有</span>
            </div>
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { HomeFilled, UserFilled, Files, Grid, PriceTag } from '@element-plus/icons-vue'; // 使用Element Plus的图标

// 类型声明
interface Post {
    id: number;
    title: string;
    excerpt: string;
    date: string;
}

const activeMenu = ref<number>(1);

// 假数据，模拟博客文章
const posts = ref<Post[]>([
    { id: 1, title: '我的第一篇博客', excerpt: '这是一篇关于我如何开始编写博客的文章...', date: '2024-01-01' },
    { id: 2, title: 'Nuxt.js 入门教程', excerpt: 'Nuxt.js 是一个非常强大的框架，本文将带你了解它的基础知识...', date: '2024-02-01' },
    { id: 3, title: '如何优化前端性能', excerpt: '性能优化是前端开发中的重要环节，本文将分享一些常见的优化技巧...', date: '2024-03-01' },
    { id: 4, title: '我的第一篇博客', excerpt: '这是一篇关于我如何开始编写博客的文章...', date: '2024-01-01' },
    { id: 5, title: 'Nuxt.js 入门教程', excerpt: 'Nuxt.js 是一个非常强大的框架，本文将带你了解它的基础知识...', date: '2024-02-01' },
    { id: 6, title: '如何优化前端性能', excerpt: '性能优化是前端开发中的重要环节，本文将分享一些常见的优化技巧...', date: '2024-03-01' },
    { id: 7, title: '我的第一篇博客', excerpt: '这是一篇关于我如何开始编写博客的文章...', date: '2024-01-01' },
    { id: 8, title: 'Nuxt.js 入门教程', excerpt: 'Nuxt.js 是一个非常强大的框架，本文将带你了解它的基础知识...', date: '2024-02-01' },
    { id: 9, title: '如何优化前端性能', excerpt: '性能优化是前端开发中的重要环节，本文将分享一些常见的优化技巧...', date: '2024-03-01' },
    { id: 10, title: '我的第一篇博客', excerpt: '这是一篇关于我如何开始编写博客的文章...', date: '2024-01-01' },
    { id: 11, title: 'Nuxt.js 入门教程', excerpt: 'Nuxt.js 是一个非常强大的框架，本文将带你了解它的基础知识...', date: '2024-02-01' },
    { id: 12, title: '如何优化前端性能', excerpt: '性能优化是前端开发中的重要环节，本文将分享一些常见的优化技巧...', date: '2024-03-01' },
    { id: 13, title: '我的第一篇博客', excerpt: '这是一篇关于我如何开始编写博客的文章...', date: '2024-01-01' },
    { id: 14, title: 'Nuxt.js 入门教程', excerpt: 'Nuxt.js 是一个非常强大的框架，本文将带你了解它的基础知识...', date: '2024-02-01' },
    { id: 15, title: '如何优化前端性能', excerpt: '性能优化是前端开发中的重要环节，本文将分享一些常见的优化技巧...', date: '2024-03-01' },
]);

// 跳转到文章详情
const viewPost = (postId: number) => {
    console.log('查看文章 ID:', postId);
    // 这里你可以根据 postId 跳转到文章详情页，比如：
    // $router.push(`/posts/${postId}`);
};

// 选择菜单时的处理
const handleMenuSelect = (index: number) => {
    activeMenu.value = index;
    console.log('选择的菜单项:', index);
};
</script>

<style scoped>
/* 避免出现页面的滚动条 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 头部样式 */
.el-header {
    background-color: transparent;
    color: white;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}

.el-header .logo {
    font-size: 24px;
    font-weight: bold;
    padding-left: 25%;
}

/* 菜单样式 */
.menu {
    background: transparent !important;
    z-index: 3;
    border: none;
    margin-bottom: 0;
}

.menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
}

.menu li {
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;
}

/* hover 样式：鼠标悬停时显示绿色 */
.menu li:hover {
    background-color: transparent;
    color: rgb(45, 168, 217);
}

/* active 样式：选中时的样式 */
.menu li.active {
    background-color: transparent;
    color: white;
    /* 选中时显示白色字体 */
}

/* 鼠标悬停时不会覆盖选中的字体颜色 */
.menu li.active:hover {
    color: rgb(45, 168, 217);
}

.menu li el-icon {
    margin-right: 5px;
}

/* 主体内容 */
.el-main {
    padding: 0;
    background: url('../../assets/images/default.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    overflow: auto;
    padding-top: 10%;
    height: auto;
    /* 确保内容自适应 */
}

/* 背景的遮罩层 */
.el-main::before {
    content: '';
    position: fixed;
    /* 让遮罩层固定在视口上 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    /* 遮罩层颜色和透明度 */
    z-index: 1;
    /* 确保遮罩层位于所有内容之下 */
    pointer-events: none;
    /* 确保遮罩层不会影响到页面内容的点击事件 */
}



.blog-content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    color: white;
    z-index: 2;
}

/* 主体部分滚动支持 */
.el-main {
    overflow-y: auto;
    /* 增加垂直滚动支持 */
}


/* 帖子列表 */
.post-list {
    display: grid;
    grid-template-columns: 1fr;
    /* 每行显示一个帖子 */
    gap: 20px;
}


.post-card {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
}

.post-date {
    font-size: 12px;
    color: #aaa;
}

/* 页脚内容 */
.footer-content {
    text-align: center;
    padding: 10px 0;
    background-color: #f5f5f5;
}

.el-footer {
    background-color: #fff;
    border-top: 1px solid #eaeaea;
}
</style>
