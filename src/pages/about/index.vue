<template>
    <div class="about-container">
        <div class="profile-card">
            <div class="avatar">
                <img src="https://avatars.githubusercontent.com/u/117587778?v=4" alt="Avatar" />
            </div>
            <div class="profile-info">
                <h2>{{ nickname }}</h2>
                <p>{{ bio }}</p>
                <a :href="githubLink" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 个人信息数据
const nickname = ref("Deslre");
const bio = ref("前端开发工程师,专注于Vue.js和Nuxt.js开发。");
const githubLink = ref("https://github.com/deslrey");
</script>

<style lang="css" scoped>
.about-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    /* 使容器占满整个视口 */
    /* background-color: #f7f7f7; */
    /* padding: 20px; */
}

.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 350px;
    /* 更宽的卡片 */
    text-align: center;
    max-width: 100%;
}

.avatar img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 3px solid #f1f1f1;
}

.profile-info h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
}

.profile-info p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.6;
}

.profile-info a {
    font-size: 1.1rem;
    color: #007bff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}

.profile-info a:hover {
    text-decoration: underline;
}

.profile-info i {
    margin-right: 8px;
    font-size: 2.5rem;
}
</style>
