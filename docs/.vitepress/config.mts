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
          { text: '高一講義', link: '/class/grade10' }
        ]
      },
	    { text: '網路資源',  
        items: [
          { text: '免費字型', link: '/resource/fonts' },
          { text: '程式設計', link: '/resource/coding' }
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
          { text: '高一講義', link: '/class/grade10' }
        ]
      },
      {
        text: '網路資源',
        collapsed: true,
        items: [
          { text: '免費字型', link: '/resource/fonts' },
          { text: '程式設計', link: '/resource/coding' }
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
