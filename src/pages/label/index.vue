<template>
    <div class="tags-page">
        <h1 class="page-title">标签云</h1>
        <div class="tagcloud text-center">
            <a v-for="tag in tags" :key="tag.name" :href="'/tags/' + encodeURIComponent(tag.name)"
                :style="{ fontSize: tag.fontSize + 'px', color: tag.color }" class="tag-item">
                {{ tag.name }}
            </a>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

// 模拟标签数据
const tags = ref([]);

// API 请求地址
const api = "/deslre/article/getArticles";

// 获取标签数据并随机设置样式
const addData = async () => {
    const { data: result } = await $fetch(api, {
        baseURL: 'http://localhost:8080',
    });

    // 收集所有标签并去重
    const tagSet = new Set();
    result.forEach((article) => {
        if (article.tags) {
            // 拆分标签字符串并去掉多余空格
            const splitTags = article.tags.split('、').map(tag => tag.trim());
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

// 生成随机颜色
const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    /* 圆角效果 */
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
    padding: 5px 10px;
    border-radius: 5px;
    transition: transform 0.2s ease, color 0.2s ease;
}

.tag-item:hover {
    transform: scale(1.1);
    color: #0056b3;
}
</style>
