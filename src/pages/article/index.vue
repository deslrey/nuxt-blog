<template>
    <div class="article-detail">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
            <span>发布于: {{ article.date }}</span>
            <span>分类: {{ article.category }}</span>
        </div>
        <div class="article-description">
            <p>{{ article.description }}</p>
        </div>
        <div class="article-content">
            <p>{{ article.content }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// 获取路由参数中的 articleId
const route = useRoute();
const articleId = route.query.id; // 使用 query 参数来获取 id

const article = ref({
    title: '',
    date: '',
    category: '',
    description: '',
    content: ''
});

// 使用假的数据模拟文章内容
onMounted(() => {
    // 假设根据 articleId 从数据库或后端获取文章
    // 这里只是模拟，根据不同的 articleId 返回不同的数据
    if (articleId === '1') {
        article.value = {
            title: '假数据文章 1',
            date: '2024-12-20',
            category: '前端开发',
            description: '这是文章1的简短描述。',
            content: '这是文章1的详细内容。内容很长很长，模拟真实文章。'
        };
    } else if (articleId === '2') {
        article.value = {
            title: '假数据文章 2',
            date: '2024-12-21',
            category: '后端开发',
            description: '这是文章2的简短描述。',
            content: '这是文章2的详细内容。内容很长很长，模拟真实文章。'
        };
    } else {
        article.value = {
            title: '默认文章',
            date: '2024-12-22',
            category: '全栈开发',
            description: '这是默认文章的简短描述。',
            content: '这是默认文章的详细内容。内容很长很长，模拟真实文章。'
        };
    }
});
</script>

<style scoped>
.article-detail {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.article-meta {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 20px;
}

.article-description {
    margin-bottom: 20px;
    font-size: 1rem;
    color: #666;
}

.article-content {
    font-size: 1.2rem;
    color: #333;
}
</style>