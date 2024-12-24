<template>
    <div class="tags-page">
        <h1 class="page-title">标签云</h1>
        <div class="tagcloud text-center">
            <a v-for="tag in tags" :key="tag.name" @click.prevent="handleTagClick(tag.name)"
                :style="{ fontSize: tag.fontSize + 'px', color: tag.color }" class="tag-item">
                {{ tag.name }}
            </a>
        </div>

        <!-- 弹窗 -->
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h2>相关文章 - {{ activeTag }}</h2>
                <ul class="article-list">
                    <li v-for="article in filteredArticles" :key="article.id" class="article-item"
                        @click="navigateToArticle(article.id, article.title)">
                        {{ article.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore'


// 模拟标签数据
const tags = ref([]);
const articles = ref([]); // 保存所有文章数据
const filteredArticles = ref([]); // 当前筛选出的文章
const activeTag = ref(""); // 当前激活的标签
const showModal = ref(false); // 弹窗显示状态

const articleStore = useArticleStore()
const router = useRouter();

// API 请求地址
const api = "/deslre/article/getArticles";

// 获取数据并处理
const addData = async () => {
    const { data: result } = await $fetch(api, {
        baseURL: 'http://localhost:8080',
    });

    articles.value = result;

    // 收集所有标签并去重
    const tagSet = new Set();
    result.forEach((article) => {
        if (article.tags) {
            const splitTags = article.tags.split('、').map((tag) => tag.trim());
            splitTags.forEach((tag) => tagSet.add(tag));
        }
    });

    // 转化为数组并为每个标签设置样式
    tags.value = Array.from(tagSet).map((tag) => ({
        name: tag,
        fontSize: 15, // 固定字体大小，也可以改为随机数
        color: randomColor(), // 随机颜色
    }));
};

// 点击标签处理
const handleTagClick = (tag) => {
    activeTag.value = tag;

    // 筛选出包含该标签的文章
    filteredArticles.value = articles.value.filter((article) =>
        article.tags.split('、').map((t) => t.trim()).includes(tag)
    );

    // 显示弹窗
    showModal.value = true;
};


// 跳转到文章详情
const navigateToArticle = (id, title) => {
    articleStore.setSelectedArticleId(id)
    router.push(`/article/${title}`);
};

// 生成随机颜色
const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 关闭弹窗
const closeModal = () => {
    showModal.value = false;
};

onMounted(() => {
    addData();
});
</script>

<style scoped>
/* 页面整体样式 */
.tags-page {
    text-align: center;
    padding: 20px;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
    width: 50%;
    margin-left: 25%;
    margin-top: 5%;
    border-radius: 10px;
}

/* 页面标题 */
.page-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
}

/* 标签云样式 */
.tagcloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

/* 单个标签样式 */
.tag-item {
    text-decoration: none;
    /* 移除下划线 */
    color: black;
    /* 设置默认颜色为黑色 */
    padding: 5px 10px;
    border-radius: 5px;
    transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    display: inline-block;
    /* 确保浮动效果在块状元素上有效 */
}

.tag-item:hover {
    transform: translateY(-5px);
    /* 实现浮动效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* 添加悬停时的阴影 */
    color: #0056b3;
    /* 悬停时改变文字颜色 */
}



/* 弹窗覆盖层 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 弹窗内容 */
.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: left;
}

/* 文章列表 */
.article-list {
    list-style: none;
    /* 移除默认列表样式 */
    padding: 0;
    margin: 20px 0;
}

/* 文章列表项 */
.article-item {
    list-style: none;
    /* 去除默认样式 */
    margin-bottom: 10px;
    /* 下方间距 */
    cursor: pointer;
    /* 鼠标悬停时显示指针 */
    color: black;
    /* 默认文字颜色 */
    text-decoration: none;
    /* 去除下划线 */
    padding: 10px 15px;
    /* 内边距 */
    background-color: #f9f9f9;
    /* 默认背景颜色 */
    border-radius: 5px;
    /* 圆角 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* 轻微阴影 */
    transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    display: block;
    /* 一行显示一个 */
}

/* 鼠标悬停效果 */
.article-item:hover {
    transform: translateY(-3px);
    /* 悬浮上移 */
    background-color: #f0f8ff;
    /* 悬停时背景颜色变淡蓝 */
    color: #0056b3;
    /* 悬停时文字颜色 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    /* 加强阴影 */
}
</style>
