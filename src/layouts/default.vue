<!-- layouts/default.vue -->
<template>
    <div class="layout">
        <!-- 固定导航栏 -->
        <nav>
            <ul>
                <li>
                    <NuxtLink to="/">首页</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">归档</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/archive">分类</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/label">标签</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">关于</NuxtLink>
                </li>
            </ul>
        </nav>

        <!-- 内容区域 -->
        <main>
            <NuxtPage />
        </main>
    </div>
</template>

<style scoped>
/* 固定导航栏，设置透明背景和凹凸效果 */
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.8);
    /* 半透明白色背景 */
    padding: 1rem 3rem;
    /* 增大左右内边距 */
    z-index: 10;
    /* 确保导航栏在顶部 */
    backdrop-filter: blur(10px);
    /* 背景模糊效果 */
    border-radius: 8px;
    /* 可选：使角落圆润 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);
    /* 凹凸效果 */
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    /* 平滑过渡 */
}

/* 导航栏中的列表 */
nav ul {
    list-style: none;
    display: flex;
    gap: 40px;
    /* 增加项之间的间隔 */
    justify-content: center;
    /* 水平居中 */
    margin: 0;
    padding: 0;
}

/* 导航项 */
nav li {
    display: inline-block;
}

/* 导航链接 */
nav li a {
    color: #333;
    text-decoration: none;
    font-weight: 700;
    /* 字体加粗 */
    font-size: 18px;
    /* 增大字体 */
    text-transform: uppercase;
    /* 使文字大写 */
    letter-spacing: 2px;
    /* 增加字母间距 */
    transition: color 0.3s ease-in-out;
    /* 平滑过渡效果 */
}

/* 悬停效果 */
nav li a:hover {
    color: #007BFF;
    /* 悬停时颜色变蓝 */
    text-decoration: underline;
    /* 添加下划线效果 */
}

/* 当页面滚动时，改变导航栏的样式 */
.layout.scrolled nav {
    background-color: rgba(255, 255, 255, 1);
    /* 滚动时背景变为不透明 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* 增加阴影效果 */
}

/* 内容区域，透明背景，模糊效果，撑满剩余空间 */
main {
    flex-grow: 1;
    /* 让内容区域占满剩余空间 */
    padding: 20px;
    /* background-color: rgba(255, 255, 255, 0.2); */
    /* 半透明背景 */
    overflow-y: auto;
    /* 内容超过时显示滚动条 */
    margin-top: 60px;
    /* 确保内容区从导航栏下方开始 */
    /* backdrop-filter: blur(3px); */
    /* 背景模糊效果 */
    border-radius: 8px;
    /* 可选：使角落圆润 */
}

/* 响应式设计 */
@media (max-width: 768px) {
    nav {
        padding: 1rem 2rem;
        /* 在小屏幕上减少内边距 */
    }

    nav ul {
        flex-direction: column;
        /* 垂直排列导航项 */
        align-items: center;
        /* 垂直方向居中 */
    }

    nav li {
        margin: 12px 0;
        /* 增加导航项之间的垂直间距 */
    }

    nav li a {
        font-size: 16px;
        /* 在小屏幕上减小字体 */
    }
}
</style>