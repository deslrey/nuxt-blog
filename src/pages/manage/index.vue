<template>
    <div>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 20px; margin-right: 10%;">
            <el-button type="primary" @click="dialogVisible = true">添加文章</el-button>
            <el-button type="danger" @click="quitLogin">退出</el-button>
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
                    <!-- 开关绑定 isVisible 并监听变化 -->
                    <el-switch v-model="scope.row.isVisible" @change="handleVisibilityChange(scope.row)" />

                </template>
            </el-table-column>

        </el-table>
        <div class="pagination-container">
            <el-pagination background layout="prev, pager, next, sizes, jumper" :total="tableData.length"
                v-model:page-size="pageSize" v-model:current-page="currentPage" />
        </div>

        <el-dialog :title="isEditing ? '编辑文章' : '添加文章'" v-model="dialogVisible">
            <el-form :model="currentArticle" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="currentArticle.title" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="currentArticle.description" />
                </el-form-item>
                <el-form-item label="存储地址">
                    <el-input v-model="currentArticle.storagePath" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="currentArticle.tags" />
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="currentArticle.category" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetDialog">取消</el-button>
                <el-button type="primary" @click="isEditing ? updateArticle() : addArticle()">提交</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script setup>
import { Notification } from '#build/imports';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');
const currentPage = ref(1);
const pageSize = ref(6);
const dialogVisible = ref(false);

const newArticle = ref({
    id: 0,
    title: '',
    description: '',
    storagePath: '',
    tags: '',
    category: '',
    createdDate: '',
    isVisible: true
});

const tableData = ref([]); // 初始化为空数组

// 筛选表格数据
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase()) ||
            data.description.toLowerCase().includes(search.value.toLowerCase())
    )
);

const fetchArticles = async () => {
    try {
        const { data: result } = await $fetch('/deslre/article/getList', {
            baseURL: 'http://localhost:8080',
        });
        // 转换 exist 为布尔值
        tableData.value = result.map((item) => ({
            ...item,
            isVisible: item.exist === 1,
        }));
    } catch (error) {
        alert('获取文章数据失败，请稍后重试！');
    }
};


const isEditing = ref(false);
const currentArticle = ref({});

// 点击编辑按钮
const handleEdit = (index, row) => {
    isEditing.value = true;
    dialogVisible.value = true;
    currentArticle.value = { ...row }; // 将当前行数据复制到编辑表单
};

const resetDialog = () => {
    isEditing.value = false;
    dialogVisible.value = false;
    currentArticle.value = {};
};


// 更新文章数据
const updateArticle = async () => {
    try {
        const formData = new FormData();
        formData.append('id', currentArticle.value.id);
        formData.append('title', currentArticle.value.title);
        formData.append('description', currentArticle.value.description);
        formData.append('storagePath', currentArticle.value.storagePath);
        formData.append('tags', currentArticle.value.tags);
        formData.append('category', currentArticle.value.category);
        formData.append('exist', currentArticle.value.exist);

        await $fetch('/deslre/article/updateArticle', {
            method: 'POST',
            baseURL: 'http://localhost:8080',
            body: formData,
        });

        // 更新表格数据
        const index = tableData.value.findIndex((item) => item.id === currentArticle.value.id);
        if (index !== -1) {
            tableData.value[index] = { ...currentArticle.value };
        }

        Notification.success("文章更新成功!")
        dialogVisible.value = false;
    } catch (error) {
        console.error('更新文章失败:', error);
        Notification.error('更新文章失败，请稍后重试！')
    }
};


const addArticle = async () => {
    try {
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append('title', newArticle.value.title);
        formData.append('description', newArticle.value.description);
        formData.append('storagePath', newArticle.value.storagePath);
        formData.append('tags', newArticle.value.tags);
        formData.append('category', newArticle.value.category);
        // 发送请求
        await $fetch('/deslre/article/addArticle', {
            method: 'POST',
            baseURL: 'http://localhost:8080',
            body: formData,
        });

        // 添加成功后更新前端表格数据
        const newId = tableData.value.length ? tableData.value[tableData.value.length - 1].id + 1 : 1;
        tableData.value.push({ ...newArticle.value, id: newId });
        dialogVisible.value = false;

        // 重置表单
        Object.assign(newArticle.value, {
            id: 0,
            title: '',
            description: '',
            storagePath: '',
            tags: '',
            category: '',
            createTime: '',
            updateTime: '',
            isVisible: true,
        });

        Notification.success('文章添加成功！');
    } catch (error) {
        console.error('添加文章失败:', error);
        Notification.error('添加文章失败，请稍后重试！');
    }
};



const handleVisibilityChange = async (row) => {
    try {
        const formData = new FormData();
        formData.append('id', row.id);
        formData.append('exist', row.isVisible);
        // 调用后端接口更新状态
        await $fetch('/deslre/article/updateExist', {
            method: 'POST',
            baseURL: 'http://localhost:8080',
            body: formData,
        });
        // 请求成功后的操作
        Notification.success(`文章ID ${row.id} 的显示状态已更新为：${row.isVisible ? "开启" : "关闭"}`)
    } catch (error) {
        // 如果失败，则恢复原状态
        Notification.error(`更新失败，恢复原状态: ${error}`)
        row.isVisible = !row.isVisible;
    }
};


// 退出登录
const quitLogin = () => {
    alert('退出登录成功！');
    router.push('/');
};

// 初始化加载数据
onMounted(() => {
    fetchArticles();
});
</script>

<style scoped>
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

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin: 20px 10%;
}
</style>