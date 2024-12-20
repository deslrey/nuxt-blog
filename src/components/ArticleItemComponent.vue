<template>
    <div class="article-container">
        <!-- 文章列表 -->
        <div v-for="(article, index) in paginatedArticles" :key="index" class="article-box">
            <NuxtLink :to="`/article/${encodeURIComponent(article.title)}`" class="article-box"
                @click.prevent="navigateToArticle(article)">
                <!-- 左侧图片 -->
                <div class="article-image">
                    <img :src="article.imageUrl" alt="Article Image" />
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
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Article {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    category: string;
    date: string;
    formattedDate?: string;
}

const articles = ref<Article[]>([
    { title: '文章 1', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-01' },
    { title: '文章 2', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-02' },
    { title: '文章 3', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-03' },
    { title: '文章 4', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-04' },
    { title: '文章 5', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-05' },
    { title: '文章 6', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-06' },
    { title: '文章 7', description: '这是一篇文章的简短描述', imageUrl: 'https://via.placeholder.com/150', tags: ['技术', '编程'], category: '前端开发', date: '2024-12-07' },
]);

const itemsPerPage = 5; // 每页显示 5 篇文章
const currentPage = ref(1); // 当前页码

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

// 路由实例
const router = useRouter();

// 跳转到文章详情
const navigateToArticle = (article: Article) => {
    router.push({
        name: 'article',
        params: { title: article.title },
    });
};

// 处理页码变化
const handlePageChange = (page: number) => {
    currentPage.value = page;
};
</script>

<style scoped>
/* 外部容器：使用 flex 居中 */
.article-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* 文章盒子样式 */
.article-box {
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 16px 0;
    overflow: hidden;
    text-decoration: none;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    max-width: 800px;
    width: 100%;
}

.article-box:hover {
    transform: scale(1.03);
}

.article-image img {
    width: 300px;
    height: 150px;
    object-fit: cover;
}

.article-content {
    padding: 16px;
    flex-grow: 1;
}

.article-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: #333;
}

.article-description {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
}

.article-meta {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
}

.article-tags {
    margin-top: 12px;
}

.article-tag {
    background-color: #007bff;
    color: white;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 12px;
    margin-right: 8px;
    display: inline-block;
}

.article-category {
    margin-left: 8px;
}

/* 分页容器样式 */
.pagination-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    /* 确保分页居中 */
    margin-top: 20px;
    /* 上方间距 */
}

.el-pagination {
    display: flex;
    justify-content: center;
    max-width: 100%;
    /* 防止宽度超出 */
    width: auto;
    /* 根据内容自适应宽度 */
    padding: 0 20px;
    /* 给分页组件两侧加一些间距，避免紧贴边缘 */
}
</style>