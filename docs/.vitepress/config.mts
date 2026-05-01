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
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首頁', link: '/' },
      { text: '教材文件',  
        items: [
          { text: '108課綱科友課本', link: '/class/book' },
          { text: '演算法', link: '/algorithms/index' },
          { text: '資料結構', link: '/markdown-examples' }
        ]
      },
	    { text: '網路資源',  
        items: [
          { text: '程式語言', link: '/class/book' },
          { text: '演算法', link: '/algorithms/index' },
          { text: '資料結構', link: '/data-structures/index' }
        ]
	    },
      { text: '資訊競賽',  
        items: [
          { text: '試題', link: '/Exam/ExamTest' },
          { text: '榮譽榜', link: '/Exam/ExamPrize' },
          { text: '升學表現', link: '/Exam/ExamUni' }
        ]
	    }
    ],

    sidebar: [
      {
        text: '教材文件',
        collapsed: true,
        items: [
          { text: '108課網科友課本', link: '/class/book' },
          { text: '免費字型', link: '/class/fonts' },
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
      {
        text: '資訊競賽',
        collapsed: true,
        items: [
          { text: '試題', link: '/Exam/ExamTest' },
          { text: '榮譽榜', link: '/Exam/ExamPrize' },
          { text: '升學表現', link: '/Exam/ExamUni' }
        ]
      }
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
