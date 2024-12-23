<template>
    <div class="login-container">
        <div class="login-card">
            <!-- 返回按钮 -->
            <button class="back-button" @click="goBack">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="title">登录</h1>
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { ElMessage } from 'element-plus'


const username = ref('');
const password = ref('');
const router = useRouter();

// 模拟登录处理
const handleSubmit = () => {
    if (username.value === 'admin' && password.value === 'admin') {
        // 登录成功后跳转到后台页面
        ElMessage({
            message: '登录成功!',
            type: 'success',
        })
        router.push('/manage');
    } else {
        ElMessage.error('用户名或密码错误!!!')
    }
};

// 返回首页
const goBack = () => {
    router.push('/');
};
</script>

<style scoped>
/* 登录页面容器，确保其占满视口 */
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* 占满视口高度 */
    margin: 0;
}

/* 登录卡片样式 */
.login-card {
    background-color: white;
    padding: 2.5rem 3rem;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
    margin-top: 5%;
    position: relative;
    /* 使返回按钮定位在卡片内 */
}

/* 返回按钮样式 */
.back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    color: #007bff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.back-button:hover {
    color: #0056b3;
}

.title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: #555;
}

input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #007bff;
}

input::placeholder {
    color: #bbb;
}

/* 按钮样式 */
.login-button {
    width: 100%;
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    /* 按钮悬停时的微小上移效果 */
}

.login-button:active {
    transform: translateY(2px);
    /* 按钮点击时的下沉效果 */
}

/* 响应式设计 */
@media (max-width: 480px) {
    .login-card {
        padding: 2rem 2.5rem;
        max-width: 100%;
    }

    .title {
        font-size: 1.5rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    input,
    .login-button {
        font-size: 1rem;
    }
}
</style>
