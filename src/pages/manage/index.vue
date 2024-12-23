<template>
    <div>
        <h1>我是文章管理界面</h1>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 20px; margin-right: 10%;">
            <el-button type="primary" @click="dialogVisible = true">添加文章</el-button>
        </div>
        <el-table size="large" stripe
            :data="filterTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            style="width: 80%; margin: 0 auto;">
            <el-table-column align="center" prop="id" label="ID" />
            <el-table-column align="center" prop="title" label="标题" />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" prop="storagePath" label="存储地址" />
            <el-table-column align="center" prop="tags" label="标签" />
            <el-table-column align="center" prop="category" label="分类" />
            <el-table-column align="center" prop="createdDate" label="创建日期" />
            <el-table-column align="center" label="操作">
                <template #header>
                    <el-input v-model="search" size="large" placeholder="搜索标题或者描述" style="width: 100%;" />
                </template>
                <template #default="scope">
                    <el-button size="default" @click="handleEdit(scope.$index, scope.row)"
                        style="margin-right: 10px;">编辑</el-button>
                    <el-switch v-model="scope.row.isVisible"
                        @change="handleVisibilityChange(scope.$index, scope.row)" />
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background layout="prev, pager, next, sizes, jumper" :total="tableData.length"
                v-model:page-size="pageSize" v-model:current-page="currentPage" />
        </div>

        <el-dialog title="添加文章" v-model="dialogVisible">
            <el-form :model="newArticle" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="newArticle.title" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="newArticle.description" />
                </el-form-item>
                <el-form-item label="存储地址">
                    <el-input v-model="newArticle.storagePath" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="newArticle.tags" />
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="newArticle.category" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addArticle">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface Article {
    id: number;
    title: string;
    description: string;
    storagePath: string;
    tags: string;
    category: string;
    createdDate: string;
    isVisible: boolean;
}

const search = ref('');
const currentPage = ref(1);
const pageSize = ref(5);
const dialogVisible = ref(false);
const newArticle = ref<Article>({
    id: 0,
    title: '',
    description: '',
    storagePath: '',
    tags: '',
    category: '',
    createdDate: '',
    isVisible: true,
});
const tableData = ref([
    {
        id: 1,
        title: '如何使用 Nuxt 构建博客',
        description: '这是一篇关于使用 Nuxt.js 构建个人博客的文章。',
        storagePath: '/articles/nuxt-blog',
        tags: 'Nuxt,博客,前端',
        category: '前端开发',
        createdDate: '2024-12-01',
        isVisible: true,
    },
    {
        id: 2,
        title: '学习 Element Plus 的基础',
        description: '介绍 Element Plus 的核心组件和使用方法。',
        storagePath: '/articles/element-plus',
        tags: 'Element Plus,UI,前端',
        category: '前端开发',
        createdDate: '2024-12-15',
        isVisible: false,
    },
]);

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase()) ||
            data.description.toLowerCase().includes(search.value.toLowerCase())
    )
);

const handleEdit = (index: number, row: Article) => {
    console.log('Edit:', index, row);
};

const handleVisibilityChange = (index: number, row: Article) => {
    console.log('Visibility Changed:', index, row);
};

const addArticle = () => {
    const newId = tableData.value.length ? tableData.value[tableData.value.length - 1].id + 1 : 1;
    tableData.value.push({ ...newArticle.value, id: newId });
    dialogVisible.value = false;
    Object.assign(newArticle.value, {
        id: 0,
        title: '',
        description: '',
        storagePath: '',
        tags: '',
        category: '',
        createdDate: '',
        isVisible: true,
    });
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
}

.el-table {
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.el-table th {
    background-color: #f5f7fa;
    color: #333;
    font-weight: bold;
}

.el-table td {
    color: #555;
    padding: 12px 8px;
}

.el-input {
    margin-bottom: 10px;
}

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin: 20px 10%;
}
</style>