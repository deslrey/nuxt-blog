<template>
    <div class="article-container">
        <div class="article-card">
            <!-- 文章内容区域 -->

            <div class="article-content">
                <!-- 渲染 HTML 内容 -->
                <div v-html="articleContent"></div>
            </div>

            <!-- 右侧目录 -->
            <div class="toc">
                <h2>目录</h2>
                <ul>
                    <!-- 渲染目录，支持层级关系 -->
                    <li v-for="(heading, index) in headings" :key="index">
                        <a @click.prevent="scrollToHeading(heading.id)">{{ heading.text }}</a>
                        <ul v-if="heading.children && heading.children.length > 0">
                            <li v-for="(subHeading, subIndex) in heading.children" :key="subIndex">
                                <a @click.prevent="scrollToHeading(subHeading.id)">&emsp;{{ subHeading.text }}</a>
                                <ul v-if="subHeading.children && subHeading.children.length > 0">
                                    <li v-for="(subSubHeading, subSubIndex) in subHeading.children" :key="subSubIndex">
                                        <a @click.prevent="scrollToHeading(subSubHeading.id)">&emsp;&emsp;{{
                                            subSubHeading.text }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, } from 'vue';
// const route = useRoute();
// const articleName = computed(() => route.params.name);

const articleContent = ref('');
const headings = ref([]);

const api = {
    getArticleData: '/deslre/article/getId',
    getArticle: '/deslre/article/getArticle',
};

// 从后端获取文章数据
const getArticleData = async (id) => {
    try {
        const formData = new FormData();
        formData.append('id', id);

        const { data: result, error } = await useFetch(api.getArticleData, {
            baseURL: 'http://localhost:8080',
            method: 'post',
            body: formData,
        });

        console.log('result ======> ', result.value);


        if (result.value.code !== 200) {
            console.error('获取文章失败', error);
            articleContent.value = '<p>文章加载失败，请稍后再试。</p>';
            return;
        }

        // 后端直接返回解析后的 HTML
        articleContent.value = result.value.message;

        // 提取标题生成目录
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = articleContent.value;

        const headingsArray = [];
        let currentLevel = [];
        tempDiv.querySelectorAll('h1, h2, h3').forEach((heading) => {
            const id = heading.getAttribute('id');
            const text = heading.textContent || '';
            const depth = parseInt(heading.tagName[1]);

            const headingObj = { id, text, children: [] };
            if (depth === 1) {
                headingsArray.push(headingObj);
                currentLevel = headingsArray;
            } else if (depth === 2) {
                currentLevel = headingsArray[headingsArray.length - 1].children || [];
                currentLevel.push(headingObj);
            } else if (depth === 3) {
                currentLevel = currentLevel[currentLevel.length - 1].children || [];
                currentLevel.push(headingObj);
            }
        });

        headings.value = headingsArray;
    } catch (err) {
        console.error('加载文章失败', err);
        articleContent.value = '<p>文章加载失败，请稍后再试。</p>';
    }

};

const title = ref('')

const getArticle = async (id) => {

    const formData = new FormData();
    formData.append('id', id);

    const { data: result, error } = await useFetch(api.getArticle, {
        baseURL: 'http://localhost:8080',
        method: 'post',
        body: formData,
    });

    if (result.value.code !== 200) {
        console.log('getArticle  error======> ', error);

        return
    }
    let data = result.value.data
    title.value = data.title
    console.log('title ======> ', title.value);

}

getArticleData(1);
getArticle(1)

// 滚动到指定的标题
const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const offsetPosition = element.offsetTop - (document.querySelector('nav')?.clientHeight || 0);
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};
</script>

<style scoped>
@import 'highlight.js/styles/github.css';

.article-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
    max-width: 70%;
    margin: 0 auto;
}

.article-card {
    display: flex;
    gap: 50px;
    width: 100%;
    flex-grow: 1;
    padding-left: 10%;
    padding-top: 25%;
}

.article-content {
    flex-grow: 1;
    max-width: 75%;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.toc {
    position: sticky;
    top: 40px;
    width: 300px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 90vh;
    overflow-y: auto;
}

.toc h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.toc ul {
    list-style-type: none;
    padding: 0;
}

.toc li {
    margin: 8px 0;
}

.toc a {
    text-decoration: none;
    color: #007bff;
    font-size: 1rem;
}

.toc a:hover {
    text-decoration: underline;
}
</style>