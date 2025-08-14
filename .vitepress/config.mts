import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "剑指前端 Offer",
  description: "前端面试高频题指南",
  lang: "zh-CN",
  lastUpdated: true,
  base: process.env.NODE_ENV === "production" ? "/interview/" : "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",

    nav: [
      { text: "首页", link: "/" },
      {
        text: "模拟面试题",
        items: [
          { text: "模拟题一", link: "/mock-test-1" },
          { text: "模拟题二", link: "/mock-test-2" },
          { text: "模拟题三", link: "/mock-test-3" },
          { text: "模拟题四", link: "/mock-test-4" },
        ],
      },
      {
        text: "知识分类",
        items: [
          { text: "JavaScript 基础", link: "/javascript/" },
          { text: "浏览器相关", link: "/browser/" },
          { text: "网络协议", link: "/network/" },
          { text: "前端框架", link: "/frameworks/" },
          { text: "工程化", link: "/engineering/" },
          { text: "算法与数据结构", link: "/algorithms/" },
        ],
      },
    ],

    sidebar: {
      "/": [
        {
          text: "模拟面试题",
          collapsed: false,
          items: [
            { text: "模拟题一", link: "/mock-test-1" },
            { text: "模拟题二", link: "/mock-test-2" },
            { text: "模拟题三", link: "/mock-test-3" },
            { text: "模拟题四", link: "/mock-test-4" },
          ],
        },
      ],
      "/javascript/": [
        {
          text: "JavaScript 基础",
          collapsed: false,
          items: [
            { text: "数据类型", link: "/javascript/data-types" },
            { text: "作用域与闭包", link: "/javascript/scope-closure" },
            { text: "原型与继承", link: "/javascript/prototype-inheritance" },
            { text: "异步编程", link: "/javascript/async-programming" },
            { text: "ES6+ 新特性", link: "/javascript/es6-features" },
          ],
        },
      ],
      "/browser/": [
        {
          text: "浏览器相关",
          collapsed: false,
          items: [
            { text: "浏览器渲染原理", link: "/browser/rendering" },
            { text: "跨域问题", link: "/browser/cors" },
            { text: "存储机制", link: "/browser/storage" },
            { text: "性能优化", link: "/browser/performance" },
            { text: "安全相关", link: "/browser/security" },
          ],
        },
      ],
      "/network/": [
        {
          text: "网络协议",
          collapsed: false,
          items: [
            { text: "HTTP/HTTPS", link: "/network/http" },
            { text: "TCP/UDP", link: "/network/tcp-udp" },
            { text: "WebSocket", link: "/network/websocket" },
            { text: "DNS解析", link: "/network/dns" },
            { text: "缓存策略", link: "/network/cache" },
          ],
        },
      ],
      "/frameworks/": [
        {
          text: "前端框架",
          collapsed: false,
          items: [
            { text: "React", link: "/frameworks/react" },
            { text: "Vue", link: "/frameworks/vue" },
            { text: "状态管理", link: "/frameworks/state-management" },
            { text: "路由系统", link: "/frameworks/routing" },
            { text: "组件设计", link: "/frameworks/component-design" },
          ],
        },
      ],
      "/engineering/": [
        {
          text: "工程化",
          collapsed: false,
          items: [
            { text: "构建工具", link: "/engineering/build-tools" },
            { text: "模块化", link: "/engineering/modularity" },
            { text: "代码规范", link: "/engineering/code-standards" },
            { text: "测试", link: "/engineering/testing" },
            { text: "部署与CI/CD", link: "/engineering/deployment" },
          ],
        },
      ],
      "/algorithms/": [
        {
          text: "算法与数据结构",
          collapsed: false,
          items: [
            { text: "数组与字符串", link: "/algorithms/array-string" },
            { text: "链表", link: "/algorithms/linked-list" },
            { text: "树与图", link: "/algorithms/tree-graph" },
            { text: "排序算法", link: "/algorithms/sorting" },
            { text: "动态规划", link: "/algorithms/dynamic-programming" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/your-repo/interview" },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    outline: {
      label: "页面导航",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",

    lastUpdatedText: "最后更新时间",
  },
});
