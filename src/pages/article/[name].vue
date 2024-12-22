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
                    <li v-for="(heading, index) in headings" :key="index">
                        <a :href="`#${heading.id}`">{{ heading.text }}</a>
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
  # 我是一级标题
  
  哈哈哈哈
  
  ![image-20241222141338297](data.assets/image-20241222141338297.png)
  
  ## 我是二级标题
  
  这里是二级标题的内容
  
  ![image-20241222141316088](../../assets/md/data.assets/image-20241222141316088.png)
  
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  # 另一个一级标题
  
  内容部分
  `;

// 获取动态路由中的 article 名称
const route = useRoute();
const articleName = computed(() => route.params.name as string);

// 存储解析后的 HTML 内容
const articleContent = ref<string>('');

// 存储文章的标题（用于生成目录）
const headings = ref<{ id: string; text: string }[]>([]);

// 加载并解析 Markdown 文件
const loadArticle = async () => {
    try {
        // 设置 marked 解析选项
        const renderer = new marked.Renderer();
        // 自定义 heading 渲染方法
        let headingCount: { [key: string]: number } = {};  // 用于跟踪每个标题的计数

        // 自定义 heading 渲染方法
        renderer.heading = ({ tokens, depth }) => {
            const token = tokens[0];

            // 判断 token 类型是否为文本类型
            if (token.type === 'text') {
                let titleText = token.text;

                // 确保 text 是字符串
                if (typeof titleText !== 'string') {
                    titleText = String(titleText);
                }

                // 使用文本生成 id，并确保它是小写并且空格替换为 -
                let id = titleText.toLowerCase().replace(/\s+/g, '-');

                // 检查该 id 是否已存在，若存在则为其添加计数器
                if (headingCount[id]) {
                    headingCount[id]++;
                    id = `${id}-${headingCount[id]}`;
                } else {
                    headingCount[id] = 1;
                }

                // 返回带有 id 的标题 HTML
                return `<h${depth} id="${id}">${titleText}</h${depth}>`;
            }

            // 如果没有找到有效的标题文本，返回一个默认的标题
            return `<h${depth}>${tokens.map((token: any) => token.text).join('')}</h${depth}>`;
        };

        // 解析 Markdown 内容
        const htmlContent = await marked(markdownText, { renderer });
        articleContent.value = htmlContent;

        // 提取标题并生成目录
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const headingsArray: { id: string; text: string }[] = [];
        tempDiv.querySelectorAll('h1, h2').forEach((heading) => {
            const id = heading.getAttribute('id');
            headingsArray.push({ id: id!, text: heading.textContent || '' });
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
    /* padding: 20px; */
    padding-top: 25%;
    gap: 30px;
    width: 100%;
    /* 容器宽度占满屏幕 */
    max-width: 1300px;
    /* 最大宽度限制 */
    margin: 0 auto;
    /* 保证容器居中 */
}

.article-card {
    display: flex;
    gap: 30px;
    width: 100%;
    flex-grow: 1;
    /* 让内容区域和目录区域能够合理分配空间 */
}

.article-content {
    flex-grow: 1;
    /* 文章内容区域占据剩余空间 */
    max-width: 75%;
    /* 设置文章内容区域宽度为 75% */
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.toc {
    position: sticky;
    top: 20px;
    width: 250px;
    /* 固定目录宽度 */
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 90vh;
    /* 目录最大高度为视口高度 */
    overflow-y: auto;
    /* 目录内容溢出时可以滚动 */
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