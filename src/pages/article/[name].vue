<template>
    <div>
        <h1>文章详情</h1>
        <p>文章 ID: {{ articleId }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useArticleStore } from '~/stores/articleStore'; // 引入 Pinia store

const articleStore = useArticleStore();
const articleId = computed(() => articleStore.getSelectedArticleId); // 获取文章 ID
</script>

<style lang="css">
/* 这里可以加入样式 */
</style>