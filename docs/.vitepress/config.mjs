import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "my personal blog",
  description: "learning note",

  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "第一篇笔记", link: "/first-note" }
    ],
    // 左侧侧边栏
    sidebar: [
      {
        text: "学习笔记",
        items: [
          { text: "第一篇笔记", link: "/first-note" }
        ]
      }
    ]
  }
})
