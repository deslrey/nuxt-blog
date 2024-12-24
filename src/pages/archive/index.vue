<template>
    <div id="board">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 m-auto">
                    <!-- 控制宽度并居中 -->
                    <div class="list-group">
                        <!-- 显示文章总数 -->
                        <p class="h4">共计 {{ totalArticles }} 篇文章</p>
                        <hr />

                        <!-- 按年份分组渲染文章 -->
                        <div v-for="(yearArticles, year) in groupedArticles" :key="year">
                            <p class="h5">{{ year }}</p>
                            <a v-for="article in yearArticles" :key="article.id" :href="`/article/${article.title}`"
                                class="list-group-item list-group-item-action">
                                {{ article.updateTime.slice(5) }} <!-- 只显示 MM-DD -->
                                <div class="list-group-item-title">{{ article.title }}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

// 文章数据
const articles = ref([])

// API 请求地址
const api = "/deslre/article/getArticles"

// 格式化日期
const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

// 获取数据并处理
const addData = async () => {
    const { data: result } = await $fetch(api, {
        baseURL: 'http://localhost:8080',
    })


    articles.value = result.map((article) => ({
        ...article,
        updateTime: formatDate(article.updateTime), // 格式化日期
    }))
}

// 按日期排序（从新到旧）
const sortedArticles = computed(() => {
    return articles.value.sort(
        (a, b) => new Date(b.updateTime) - new Date(a.updateTime)
    )
})

// 按年份分组并排序文章
const groupedArticles = computed(() => {
    const groups = {}
    // 将文章按年份分组
    sortedArticles.value.forEach((article) => {
        const year = article.updateTime.split('-')[0] // 提取年份
        if (!groups[year]) {
            groups[year] = []
        }
        groups[year].push(article) // 添加到对应年份分组
    })
    // 对年份分组排序，从新到旧
    const sortedGroups = {}
    Object.keys(groups)
        .sort((a, b) => b - a) // 按年份从新到旧
        .forEach((year) => {
            sortedGroups[year] = groups[year]
        })
    return sortedGroups
})

// 统计文章总数
const totalArticles = computed(() => sortedArticles.value.length)

// 获取文章数据
onMounted(() => {
    addData()
})

</script>


<style scoped>
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
    margin-top: 5%;
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