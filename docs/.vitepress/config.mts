import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/csie/',
  title: "csie",
  description: "computer science",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '教材文件', link: '/markdown-examples' },
	  { text: '網路資源',  
		items: [
		  { text: '程式語言', link: '/programming/index' },
		  { text: '演算法', link: '/algorithms/index' },
		  { text: '資料結構', link: '/data-structures/index' }
		]
	  }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
