// stores/articleStore.ts
import { defineStore } from 'pinia';

export const useArticleStore = defineStore('article', {
    state: () => ({
        selectedArticleId: null as number | null, // 存储当前选中的文章 ID（数字类型）
    }),
    actions: {
        setSelectedArticleId(id: number) {
            this.selectedArticleId = id;
        },
    },
    getters: {
        getSelectedArticleId: (state) => state.selectedArticleId,
    },
});
