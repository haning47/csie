import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/csie/',
  title: "資訊科技教學網",
  description: "computer science",
  head: [
	[
		'script',
		{ async: '', src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }
	]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '教材文件', link: '/markdown-examples' },
	    { text: '網路資源',  
        items: [
          { text: '程式語言', link: '/class/book' },
          { text: '演算法', link: '/algorithms/index' },
          { text: '資料結構', link: '/data-structures/index' }
        ]
	    },
      { text: '資訊競賽',  
        items: [
          { text: '試題', link: '/class/bookx' },
          { text: '榮譽榜', link: '/algorithms/index' },
          { text: '升學表現', link: '/data-structures/index' }
        ]
	    }
    ],

    sidebar: [
      {
        text: '教材文件',
        collapsed: true,
        items: [
          { text: '108課網科友課本', link: '/class/book' },
          { text: '高一C++', link: '/api-examples' },
          { text: '高二進階程式設計', link: '/api-examples' }
        ]
      },
      {
        text: '網路資源',
        collapsed: true,
        items: [
          { text: '程式語言', link: '/class/book' },
          { text: '演算法', link: '/api-examples' },
          { text: '資料結構', link: '/api-examples' }
        ]
      },
    ],
	footer: {
		message: 'Powered by Vitepress',
		copyright: 'Copyright © 2026 haning Chen'
	},	

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
