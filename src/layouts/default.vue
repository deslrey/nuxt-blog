<template>
    <div class="layout">
        <!-- 固定导航栏，只有在不是登录页面时显示 -->
        <nav v-if="!isLoginRoute" :class="{ 'scrolled': isScrolled }">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <i class="fas fa-home"></i> 首页
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/archive">
                        <i class="fas fa-archive"></i> 归档
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/sort">
                        <i class="fas fa-sitemap"></i> 分类
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/label">
                        <i class="fas fa-tags"></i> 标签
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">
                        <i class="fas fa-user"></i> 关于
                    </NuxtLink>
                </li>

                <!-- 修改了后台图标为控制面板（fa-tachometer-alt） -->
                <li>
                    <NuxtLink to="/login">
                        <i class="fas fa-tachometer-alt"></i> 后台
                    </NuxtLink>
                </li>
            </ul>
        </nav>

        <!-- 内容区域 -->
        <main>
            <NuxtPage />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const isScrolled = ref(false);
const route = useRoute();
const isLoginRoute = ref(false);

// 监听页面滚动，设置导航栏是否变为固定
const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;  // 滚动超过50px时改变状态
};

// 监听路由变化，判断当前是否是登录页面
watchEffect(() => {
    isLoginRoute.value = route.path === '/login';
});

// 添加滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 移除滚动事件监听
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 固定导航栏，设置透明背景和凹凸效果 */
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
    /* 半透明渐变背景 */
    padding: 1.5rem 4rem;
    /* 增加导航栏的上下和左右内边距 */
    z-index: 10;
    backdrop-filter: blur(10px);
    /* 背景模糊效果 */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 100%;
    max-width: 1200px;
    /* 最大宽度，确保居中 */
    margin: 0 auto;
    /* 居中对齐 */
}

/* 改变导航栏背景色和阴影效果，滚动时触发 */
nav.scrolled {
    background-color: rgba(255, 255, 255, 1);
    /* 滚动时背景变为不透明 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* 增加阴影效果 */
}

nav ul {
    list-style: none;
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    /* 确保列表项占满整个导航栏宽度 */
}

nav li {
    display: inline-block;
    transition: transform 0.3s ease-in-out;
}

/* 导航链接 */
nav li a {
    color: #333;
    text-decoration: none;
    font-weight: 700;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    /* 对齐图标和文字 */
    gap: 8px;
    /* 图标和文字之间的间隔 */
    transition: color 0.3s ease-in-out;
}

/* 图标样式 */
nav li i {
    font-size: 1.2em;
    /* 调整图标大小 */
}

/* 悬停时的颜色变化 */
nav li a:hover {
    color: #007BFF;
    text-decoration: underline;
}

/* 悬停时的放大效果 */
nav li:hover {
    transform: scale(1.1);
}


/* 内容区域 */
main {
    flex-grow: 1;
    padding: 20px;
    margin-top: 100px;
    /* 确保内容区从导航栏下方开始 */
}

/* 响应式设计 */
@media (max-width: 768px) {
    nav {
        padding: 1.5rem 2.5rem;
        /* 在小屏幕上适当增加内边距 */
    }

    nav ul {
        flex-direction: column;
        align-items: center;
    }

    nav li {
        margin: 12px 0;
    }

    nav li a {
        font-size: 18px;
        /* 在小屏幕上减小字体 */
    }
}
</style>
