<template>
    <div class="sort-page">
        <h1 class="page-title">文章分类</h1>
        <div v-for="(articles, category) in groupedArticles" :key="category" class="category-section">
            <!-- 分类标题，点击切换折叠状态 -->
            <div class="category-header" @click="toggleCategory(category)">
                <span class="toggle-icon">
                    {{ isExpanded(category) ? '🔽' : '▶️' }}
                </span>
                <h2 class="category-title">{{ category }}</h2>
            </div>

            <!-- 折叠内容 -->
            <ul v-show="isExpanded(category)" class="article-list">
                <li v-for="article in articles" :key="article.id" class="article-item"
                    @click="handleClick(article.id, article.title)">
                    {{ article.title }}
                </li>
            </ul>

        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useArticleStore } from '@/stores/articleStore'; // 引入 Pinia 的文章 Store
import { useRouter } from 'vue-router';

// 路由和 Store 实例
const router = useRouter();
const articleStore = useArticleStore();

// 模拟文章数据
const articles = ref([]);

// API 请求地址
const api = "/deslre/article/getArticles";

// 获取数据并处理
const addData = async () => {
    const { data: result } = await $fetch(api, {
        baseURL: 'http://localhost:8080',
    });
    articles.value = result;
};

onMounted(() => {
    addData();
});

// 按分类分组文章
const groupedArticles = computed(() => {
    const groups = {};
    articles.value.forEach((article) => {
        const category = article.category || '未分类';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(article);
    });
    return groups;
});

// 控制分类折叠状态
const expandedCategories = ref(new Set());

// 切换分类展开/收起
const toggleCategory = (category) => {
    if (expandedCategories.value.has(category)) {
        expandedCategories.value.delete(category);
    } else {
        expandedCategories.value.add(category);
    }
};

// 判断分类是否展开
const isExpanded = (category) => expandedCategories.value.has(category);

// 文章点击处理逻辑
const handleClick = (id, title) => {
    // 存储文章 ID 到 Pinia
    articleStore.setSelectedArticleId(id);

    // 跳转到详情页
    router.push(`/article/${encodeURIComponent(title)}`);
};
</script>


<style scoped>
/* 页面整体样式 */
.sort-page {
    border-radius: 10px;
    padding: 20px;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
    width: 50%;
    margin-left: 25%;
    margin-top: 5%;
}

/* 页面标题 */
.page-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
}

/* 分类标题 */
.category-header {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #c6cfda;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
}

.category-header:hover {
    background-color: #acd0ff;
}

/* 分类名称 */
.category-title {
    font-size: 1.2rem;
    margin: 0;
    margin-left: 10px;
    /* 增加标题与图标的间距 */
}

/* 切换图标 */
.toggle-icon {
    font-size: 1.2rem;
}

/* 文章列表 */
.article-list {
    list-style: none;
    padding: 0;
    margin: 10px 0 20px;
    transition: all 0.3s ease;
}

/* 单个文章项 */
.article-item {
    padding: 10px;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.article-item:hover {
    background-color: #f0f0f0;
}
</style>
