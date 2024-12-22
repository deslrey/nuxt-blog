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
}

.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 400px;
    text-align: center;
    max-width: 100%;
    position: relative;
    margin-top: 15%;
    /* 将卡片往下移动 80px */

}

.avatar {
    position: absolute;
    top: -110px;
    left: 50%;
    transform: translateX(-50%);
    /* padding: 5px; */
    /* 添加渐变边框和阴影效果 */
    border-radius: 60%;
    /* border: 6px solid transparent; */
    /* background: linear-gradient(45deg, #ff6ec7, #ff6347); */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    /* 动画 */
}

/* 添加一个悬浮效果 */
.avatar img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease;
    /* 动画效果 */
}

.avatar img:hover {
    transform: scale(1.1);
    /* 鼠标悬停时头像放大 */
}

.profile-info h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 50px;
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
