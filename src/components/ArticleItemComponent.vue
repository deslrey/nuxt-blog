<template>
    <div class="article-container">
        <!-- 文章列表 -->
        <div v-for="(article, index) in paginatedArticles" :key="index" class="article-box">
            <!-- 使用查询参数 id 和 title -->
            <NuxtLink :to="`/article/${article.title}`" class="article-box" @click="selectArticle(article.id)">
                <!-- 左侧图片 -->
                <div class="article-image">
                    <!-- 如果没有指定图片，则使用默认图片 -->
                    <img src="../assets/images/cs.jpg" alt="Article Image" />
                </div>

                <!-- 右侧内容 -->
                <div class="article-content">
                    <h2 class="article-title">{{ article.title }}</h2>
                    <p class="article-description">{{ article.description }}</p>
                    <div class="article-meta">
                        <span class="article-date">{{ article.formattedDate }}</span>
                        <span class="article-category">{{ article.category }}</span>
                    </div>
                    <div class="article-tags">
                        <span v-for="(tag, index) in article.tags" :key="index" class="article-tag">{{ tag }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <!-- 分页 -->
        <div class="pagination">
            <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" class="pagination-btn">上一页</button>
            <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
                class="pagination-btn">下一页</button>

            <!-- 分页跳转输入框 -->
            <div class="page-jump">
                <span>跳转到：</span>
                <input v-model.number="jumpPage" type="number" min="1" :max="totalPages" @blur="jumpToPage" />
                <button @click="jumpToPage" class="pagination-btn">跳转</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import { useArticleStore } from '~/stores/articleStore'; // 引入 Pinia store

const articleStore = useArticleStore();

// 存储选中的文章 ID
const selectArticle = (id: number) => {
    articleStore.setSelectedArticleId(id);
};

interface Article {
    id: number;
    title: string;
    description: string;
    imageUrl?: string; // 可选的 imageUrl
    tags: string[];
    category: string;
    date: string;
    formattedDate?: string;
}

const articles = ref<Article[]>([
    { id: 1, title: '文章1', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-01' },
    { id: 2, title: '文章2', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-02' },
    { id: 3, title: '文章3', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-03' },
    { id: 4, title: '文章4', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-04' },
    { id: 5, title: '文章5', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-05' },
    { id: 6, title: '文章6', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-06' },
    { id: 7, title: '文章7', description: '这是一篇文章的简短描述', imageUrl: '', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-07' },
]);

const itemsPerPage = 6; // 每页显示  篇文章
const currentPage = ref(1); // 当前页码
const jumpPage = ref(1); // 跳转页码

// 格式化日期，示例代码
const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('zh-CN', options);
};

// 给每篇文章添加格式化日期
articles.value.forEach((article) => {
    article.formattedDate = formatDate(article.date);
});

// 分页后的文章列表
const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return articles.value.slice(start, end);
});

// 总页数
const totalPages = computed(() => {
    return Math.ceil(articles.value.length / itemsPerPage);
});

// 分页跳转
const goToPage = (page: number) => {
    if (page < 1) {
        currentPage.value = 1;
    } else if (page > totalPages.value) {
        currentPage.value = totalPages.value;
    } else {
        currentPage.value = page;
    }
};

// 跳转到指定页面
const jumpToPage = () => {
    if (jumpPage.value < 1) {
        currentPage.value = 1;
    } else if (jumpPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
    } else {
        currentPage.value = jumpPage.value;
    }
    jumpPage.value = currentPage.value; // 保证输入框显示当前页码
};
</script>

<style scoped>
/* 外部容器：每行只显示一个文章项 */
.article-container {
    display: grid;
    grid-template-columns: 1fr;
    /* 只显示一列 */
    gap: 24px;
    justify-items: center;
    margin: 0 auto;
    width: 100%;
    /* max-width: 800px; */
    /* 最大宽度限制 */
    padding-top: 20%;
}

/* 文章盒子样式 */
.article-box {
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.3);
    /* 设置透明背景 */
    backdrop-filter: blur(10px);
    /* 设置模糊效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    width: 100%;
    max-width: max-content;
    /* 最大宽度 */
    margin: 0 auto;
    padding: 12px;
    /* 给盒子添加一点内边距 */
}

.article-box:hover {
    transform: scale(1.05);
}

/* 图片样式 */
.article-image {
    width: 270px;
    /* 图片宽度 */
    height: 160px;
    /* 图片高度 */
    margin-right: 16px;
    /* 图片和内容之间的间隔 */
}

.article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 右侧内容样式 */
.article-content {
    width: 600px;
    /* 内容区域宽度 */
    height: 160px;
    /* 内容区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
}

/* 标题样式 */
.article-title {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    color: #333;
}

/* 描述样式 */
.article-description {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
    flex-grow: 1;
}

/* 元数据样式 */
.article-meta {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
}

/* 标签样式 */
.article-tags {
    margin-top: 16px;
}

.article-tag {
    background-color: #007bff;
    color: white;
    padding: 6px 12px;
    /* 增大标签的大小 */
    border-radius: 16px;
    font-size: 14px;
    /* 增大标签字体 */
    margin-right: 12px;
    display: inline-block;
}

/* 分类样式 */
.article-category {
    margin-left: 8px;
}

/* 分页样式 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination-btn {
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 14px;
}

.pagination-btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

.page-jump input {
    width: 50px;
    padding: 5px;
    margin: 0 5px;
    text-align: center;
}
</style>
