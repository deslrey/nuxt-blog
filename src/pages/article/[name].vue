<template>
    <div class="article-container">
        <div class="article-card">
            <!-- 文章内容区域 -->
            <div class="article-content">
                <h1>文章详情</h1>
                <p>文章名称: {{ articleName }}</p>

                <!-- 渲染 Markdown 解析后的 HTML 内容 -->
                <div v-html="articleContent"></div>
            </div>

            <!-- 右侧目录 -->
            <div class="toc">
                <h2>目录</h2>
                <ul>
                    <!-- 渲染目录，支持层级关系 -->
                    <li v-for="(heading, index) in headings" :key="index">
                        <a :href="`#${heading.id}`">{{ heading.text }}</a>
                        <ul v-if="heading.children && heading.children.length > 0">
                            <li v-for="(subHeading, subIndex) in heading.children" :key="subIndex">
                                <a :href="`#${subHeading.id}`">&emsp;{{ subHeading.text }}</a>
                                <ul v-if="subHeading.children && subHeading.children.length > 0">
                                    <li v-for="(subSubHeading, subSubIndex) in subHeading.children" :key="subSubIndex">
                                        <a :href="`#${subSubHeading.id}`">&emsp;&emsp;{{ subSubHeading.text }}</a>
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

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked'; // 引入 marked 库用于解析 Markdown

// 模拟 Markdown 数据
const markdownText = `
  # 下载安装启动RabbitMQ
  ## 下载RabbitMQ
  ### 安装Erlang
  ### 安装Socat
  ### 安装RabbitMQ
  ## 启动RabbitMQ服务
  # RabbitMQWeb管理界面及授权操作
  `;

// 获取动态路由中的 article 名称
const route = useRoute();
const articleName = computed(() => route.params.name as string);

// 存储解析后的 HTML 内容
const articleContent = ref<string>('');

// 存储文章的标题（用于生成目录）
const headings = ref<{ id: string; text: string; children?: any[] }[]>([]);

// 加载并解析 Markdown 文件
const loadArticle = async () => {
    try {
        // 设置 marked 解析选项
        const renderer = new marked.Renderer();
        let headingCount: { [key: string]: number } = {};  // 用于跟踪每个标题的计数

        // 自定义 heading 渲染方法
        renderer.heading = ({ tokens, depth }) => {
            const token = tokens[0];

            if (token.type === 'text') {
                let titleText = token.text;

                if (typeof titleText !== 'string') {
                    titleText = String(titleText);
                }

                let id = titleText.toLowerCase().replace(/\s+/g, '-');

                if (headingCount[id]) {
                    headingCount[id]++;
                    id = `${id}-${headingCount[id]}`;
                } else {
                    headingCount[id] = 1;
                }

                // 返回带有 id 的标题 HTML
                return `<h${depth} id="${id}">${titleText}</h${depth}>`;
            }

            return `<h${depth}>${tokens.map((token: any) => token.text).join('')}</h${depth}>`;
        };

        // 解析 Markdown 内容
        const htmlContent = await marked(markdownText, { renderer });
        articleContent.value = htmlContent;

        // 提取标题并生成层级目录
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const headingsArray: any[] = [];
        let currentLevel: any[] = [];
        let prevDepth = 1;

        tempDiv.querySelectorAll('h1, h2, h3').forEach((heading) => {
            const id = heading.getAttribute('id');
            const text = heading.textContent || '';
            const depth = parseInt(heading.tagName[1]);

            const headingObj = { id, text, children: [] };

            if (depth === 1) {
                // 一级标题
                headingsArray.push(headingObj);
                currentLevel = headingsArray;
            } else if (depth === 2) {
                // 二级标题
                currentLevel = headingsArray[headingsArray.length - 1].children || [];
                currentLevel.push(headingObj);
            } else if (depth === 3) {
                // 三级标题
                currentLevel = currentLevel[currentLevel.length - 1].children || [];
                currentLevel.push(headingObj);
            }
        });

        headings.value = headingsArray;

    } catch (error) {
        console.error('加载文章失败:', error);
        articleContent.value = '<p>文章加载失败，请稍后再试。</p>';
    }
};

// 页面加载后调用 loadArticle
onMounted(() => {
    loadArticle();
});
</script>

<style lang="css" scoped>
.article-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
}

.article-card {
    display: flex;
    gap: 30px;
    width: 100%;
    flex-grow: 1;
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
    top: 20px;
    width: 250px;
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