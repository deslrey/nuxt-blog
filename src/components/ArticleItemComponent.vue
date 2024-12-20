<template>
    <!-- 使用 NuxtLink 跳转并传递 articleId -->
    <NuxtLink :to="`/article?id=${articleId}`" class="article-box">
        <!-- 左侧图片 -->
        <div class="article-image">
            <img :src="imageUrl" alt="Article Image" />
        </div>

        <!-- 右侧内容 -->
        <div class="article-content">
            <!-- 文章标题 -->
            <h2 class="article-title">{{ title }}</h2>

            <!-- 文章描述 -->
            <p class="article-description">{{ description }}</p>

            <!-- 文章日期 -->
            <div class="article-date">
                <span>发布于: {{ formattedDate }}</span>
            </div>

            <!-- 文章标签 -->
            <div class="article-tags">
                <span v-for="(tag, index) in tags" :key="index" class="article-tag">{{ tag }}</span>
            </div>

            <!-- 文章分类 -->
            <div class="article-category">
                <span>分类: {{ category }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// 示例数据
const articleId = ref(1); // 假设文章ID
const imageUrl = ref('https://via.placeholder.com/150'); // 图片地址
const title = ref('文章标题'); // 文章标题
const description = ref('这是一篇文章的简短描述，用来概括文章的主要内容。'); // 文章描述
const date = ref('2024-12-20'); // 文章发布日期
const tags = ref(['技术', '编程', 'Vue3']); // 文章标签
const category = ref('前端开发'); // 文章分类

// 格式化日期
const formattedDate = computed(() => {
    const dateObj = new Date(date.value);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.article-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
    text-decoration: none;
    /* 去除链接的下划线 */
    transition: background-color 0.3s ease;
}

/* 左侧图片 */
.article-image img {
    max-width: 150px;
    height: auto;
    border-radius: 8px;
    margin-right: 20px;
}

/* 右侧内容 */
.article-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
}

/* 文章标题 */
.article-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

/* 文章描述 */
.article-description {
    font-size: 1rem;
    color: #666;
    margin: 0;
}

/* 日期 */
.article-date {
    font-size: 0.9rem;
    color: #888;
}

/* 标签 */
.article-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.article-tag {
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
}

/* 分类 */
.article-category {
    font-size: 0.9rem;
    color: #888;
}

/* 鼠标悬停效果 */
.article-box:hover {
    background-color: #f0f0f0;
    /* 鼠标悬停时改变背景颜色 */
}
</style>