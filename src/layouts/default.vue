<!-- layouts/default.vue -->
<template>
    <div>
        <!-- 导航栏 -->
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
nav {
    background-color: #333;
    padding: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

nav li a {
    color: white;
    text-decoration: none;
}

main {
    padding: 20px;
    background-color: #f9f9f9;
}
</style>