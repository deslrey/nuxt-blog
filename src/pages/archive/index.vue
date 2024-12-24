<template>
    <div id="board">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 m-auto"> <!-- 控制宽度并居中 -->
                    <div class="list-group">
                        <!-- 显示文章总数 -->
                        <p class="h4">共计 {{ totalArticles }} 篇文章</p>
                        <hr>

                        <!-- 按年份分组渲染文章 -->
                        <div v-for="(yearArticles, year) in groupedArticles" :key="year">
                            <p class="h5">{{ year }}</p>

                            <a v-for="article in yearArticles" :key="article.date" :href="`/article/${article.title}`"
                                class="list-group-item list-group-item-action">
                                <time>{{ article.date.slice(5) }}</time>
                                <div class="list-group-item-title">{{ article.title }}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// 文章数据
const articles = ref([
    { date: '2024-08-09', title: 'CentOS7离线安装Python3环境' },
    { date: '2024-07-11', title: 'CentOS安装RabbitMQ' },
    { date: '2024-02-26', title: 'Neo4j基础命令' },
    { date: '2024-02-08', title: 'Redis实现自增ID' },
    { date: '2024-02-07', title: 'Linux配置Neo4j' },
    { date: '2024-02-03', title: '黑马点评' },
    { date: '2024-01-29', title: '测试' }
])

// 按日期排序（从新到旧）
const sortedArticles = computed(() => {
    return articles.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// 按年份分组文章
const groupedArticles = computed(() => {
    const groups: Record<string, { date: string, title: string, year: string }[]> = {}
    sortedArticles.value.forEach((article) => {
        const year = article.date.split('-')[0]
        if (!groups[year]) {
            groups[year] = []
        }
        groups[year].push({ ...article, year })
    })
    return groups
})

// 统计文章总数
const totalArticles = computed(() => sortedArticles.value.length)
</script>

<style lang="css" scoped>
/* 背景和居中样式 */
.container {
    background: #f8f9fa;
    /* 背景色 */
    border-radius: 10px;
    /* 圆角效果 */
    padding: 20px;
    /* 内边距 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    width: 50%;
    margin-left: 25%;
    margin-top: 10%;
}

.list-group-item {
    display: flex;
    justify-content: flex-start;
    /* 确保所有项都左对齐 */
    align-items: center;
    padding: 15px;
    text-align: left;
    /* 让内容左对齐 */
    text-decoration: none;
    /* 去掉默认的下划线 */
}

.list-group-item a {
    text-decoration: none;
    /* 去掉链接的下划线 */
    color: inherit;
    /* 保持颜色一致 */
}

.list-group-item a:visited {
    color: inherit;
    /* 确保点击后的链接颜色不变 */
}

.list-group-item-title {
    font-size: 1.1rem;
    color: #001029;
    margin-left: 10px;
    /* 给标题一个间隔，防止与时间过于紧凑 */
}

.list-group-item a:hover .list-group-item-title {
    text-decoration: none;
    /* 确保悬停时也没有下划线 */
}

.time {
    font-weight: bold;
    color: #000000;
}

.row {
    margin-top: 30px;
}

.col-md-8 {
    max-width: 100%;
    /* 限制最大宽度 */
}
</style>
