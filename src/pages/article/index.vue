<template>
    <div v-if="article" class="article-detail">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <span class="article-category">{{ article.category }}</span>
        </div>
        <p class="article-description">{{ article.description }}</p>
        <div class="article-content">{{ article.content }}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// 获取路由信息
const route = useRoute();
const articleTitle = route.params.title as string;  // 获取传递的文章名称
const articleId = route.query.id as string;  // 获取传递的文章 ID

// 文章内容
const article = ref<{ title: string; description: string; content: string; date: string; category: string } | null>(null);

// 根据 ID 从 API 或假数据中获取文章内容
onMounted(async () => {
    // 模拟根据 articleId 从 API 获取文章数据
    const articleData = await fetchArticleData(articleId);
    article.value = articleData;
});

// 模拟获取文章数据的函数
const fetchArticleData = async (id: string) => {
    // 这里只是模拟，你可以根据 id 从后端获取文章数据
    const fakeData = {
        1: { title: '文章标题 1', date: '2024-12-20', category: '前端开发', description: '这是文章1的描述', content: '这是一篇长文章的内容' },
        2: { title: '文章标题 2', date: '2024-12-21', category: '后端开发', description: '这是文章2的描述', content: '这是一篇长文章的内容' }
    };
    return fakeData[id] || { title: '', date: '', category: '', description: '', content: '' };
};
</script>

<style scoped>
.article-detail {
    max-width: 900px;
    margin: 30px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.article-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
}

.article-meta {
    font-size: 14px;
    color: #999;
    margin-bottom: 12px;
}

.article-description {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
}

.article-content {
    font-size: 16px;
    line-height: 1.8;
    color: #444;
}
</style>