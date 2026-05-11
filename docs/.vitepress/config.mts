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
  markdown: {
    math: true
  },
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
          { text: 'C++程式設計', link: '/class/cpp'},       
          { text: '早期教材', link: '/class/past' }
        ]
      },
	    { text: '網路資源',  
        items: [
          { text: '免費字型', link: '/resource/fonts' },
          { text: '程式設計', link: '/resource/coding' },
          { text: '人工智慧', link: '/resource/AI' }
        ]
	    },
      { text: '資訊競賽',  
        items: [
          { text: '試題', link: '/Exam/ExamTest' },
          { text: '榮譽榜', link: '/Exam/ExamPrize' },
          { text: '升學表現', link: '/Exam/ExamUni' }
        ]
	    },
      { text: '技術文件',  
        items: [
          { text: 'Markdown Extension Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples.md' },
          { text: 'VitePress Quick start', link: 'https://vitepress.dev/guide/getting-started' }         
        ]
	    },
      { text: '友情連結',  
        items: [
          { text: '松高數位學習課程平台', link: 'http://course.sssh.tp.edu.tw:8080/moodle/' },
          { text: '元宇宙沈浸式體驗', link: 'https://haning6.wixsite.com/meta' },
          { text: '教學部落格-資訊學科能力訓練', link: 'https://haning47.vercel.app/'},
          { text: '電腦教學網', link: 'https://haning47.github.io/homepage/News/News.html'}      
        ]
	    }
    ],

    sidebar: [
      {
        text: '教材文件',
        collapsed: true,
        items: [
          { text: '108課網科友課本', link: '/class/book' },
          { text: 'C++程式設計', link:'/class/cpp',
                    collapsed: true,
            items:[
              {text: '數值計算篇',link: '/class/numerical',
                    collapsed: true,
               items:[
                {text: '1. 求多項式函數值',link: '/class/numerical01'},
                {text: '2. 求方程式的根',link: '/class/numerical02'},
                {text: '3. 解聯立方程式',link: '/class/numerical03'},
                {text: '4. 漸進式-求次方',link: '/class/numerical04'},
                {text: '5. 漸近式-排列組合',link: '/class/numerical05'},
                {text: '6. 以Horner求多項式的值',link: '/class/numerical06'},
                {text: '7. 漸近式-求巴斯卡三角形',link: '/class/numerical07'},
                {text: '8. 遞迴求巴斯卡三角形',link: '/class/numerical08'}
               ]
              },
              {text: '資料結構及演算法篇',link: '/class/algorighm', 
                      collapsed: true,
               items:[
                {text: '一. 排序',link:  '/class/sort'},
                {text: '二. 搜尋',link: '/class/search'},
                {text: '三. 遞迴',link: '/class/recursive'},
                {text: '四. 圖論',link: '/class/graphy'},
                {text: '五. 動態規劃',link: '/class/DP'}
               ]
              },
              {text: '附錄',link: '/class/appendix' ,
                       collapsed: true,
               items:[
                {text: 'STL介紹',link: '/class/STL'},
                {text: '參考資料',link: '/class/reference'}
               ]
              }
            ]
          },
          { text: '早期教材', link: '/class/past' }
        ]
      },
      {
        text: '網路資源',
        collapsed: true,
        items: [
          { text: '免費字型', link: '/resource/fonts' },
          { text: '程式設計', link: '/resource/coding' },
          { text: '人工智慧', link: '/resource/AI' }
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
