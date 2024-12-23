<!-- pages/login.vue -->
<template>
    <div class="login-card">
        <h1 class="title">登录页面</h1>
        <!-- 登录表单 -->
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" v-model="username" placeholder="请输入用户名" required />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
            </div>
            <div class="form-group">
                <button type="submit" class="login-button">登录</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

// 模拟登录处理
const handleSubmit = () => {
    if (username.value === 'admin' && password.value === 'admin') {
        // 登录成功后跳转到后台页面
        router.push('/manage');
    } else {
        alert('用户名或密码错误');
    }
};
</script>

<style scoped>
/* 登录页面容器 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
}

/* 登录卡片样式 */
.login-card {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.title {
    text-align: center;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

input:focus {
    border-color: #007bff;
}

.login-button {
    width: 100%;
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>