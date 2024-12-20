<template>
    <div class="article-container">
        <NuxtLink :to="`/article/${encodeURIComponent(title)}`" class="article-box" @click.prevent="navigateToArticle">
            <!-- 左侧图片 -->
            <div class="article-image">
                <img :src="imageUrl" alt="Article Image" />
            </div>

            <!-- 右侧内容 -->
            <div class="article-content">
                <h2 class="article-title">{{ title }}</h2>
                <p class="article-description">{{ description }}</p>
                <div class="article-meta">
                    <span class="article-date">{{ formattedDate }}</span>
                    <span class="article-category">{{ category }}</span>
                </div>
                <div class="article-tags">
                    <span v-for="(tag, index) in tags" :key="index" class="article-tag">{{ tag }}</span>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const articleId = ref(1);  // 文章 ID
const title = ref('文章标题');
const description = ref('这是一篇文章的简短描述');
const imageUrl = ref('https://via.placeholder.com/150');
const tags = ref(['技术', '编程']);
const category = ref('前端开发');
const date = ref('2024-12-20');

// 格式化日期
const formattedDate = computed(() => {
    const dateObj = new Date(date.value);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
});

// 获取路由实例
const router = useRouter();

const navigateToArticle = () => {
    router.push({
        name: 'article',
        params: { title: title.value },
        query: { id: articleId.value.toString() }
    });
};
</script>

<style scoped>
/* 外部容器：使用 flex 居中 */
.article-container {
    display: flex;
    justify-content: center;
    padding: 10px;
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
    /* 最大宽度限制 */
    width: 100%;
    /* 使盒子填满可用空间，但不超过 max-width */
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
</style>