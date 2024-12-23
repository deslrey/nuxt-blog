import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isLoginRoute: false,  // 登录页面状态
    isManageRoute: false, // 后台管理页面状态
    isScrolled: false,    // 滚动状态
  }),
  actions: {
    setLoginRoute(status: boolean) {
      this.isLoginRoute = status;
    },
    setManageRoute(status: boolean) {
      this.isManageRoute = status;
    },
    setScrolled(status: boolean) {
      this.isScrolled = status;
    },
  },
});
