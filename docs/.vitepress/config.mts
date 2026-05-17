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
          { text: '108課綱科友課本', link: '/class/k_book' },
          { text: 'C++程式設計', link: '/class/c0_cpp'},       
          { text: '早期教材', link: '/class/k_past' }
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
          { text: '108課網科友課本', link: '/class/k_book' },
          { text: 'C++程式設計', link:'/class/c0_cpp',
                    collapsed: true,
            items:[
              {text: '數值計算篇',link: '/class/b0_numerical',
                    collapsed: true,
               items:[
                {text: '1. 求多項式函數值',link: '/class/b1_numerical01'},
                {text: '2. 漸近式-排列組合',link: '/class/b2_numerical02'},
                {text: '3. 漸進式-求次方',link: '/class/b3_numerical03'},
                {text: '4. 求方程式的根',link: '/class/b4_numerical04'},                
                {text: '5. 解聯立方程式',link: '/class/b5_numerical05'}
               ]
              },
              {text: '資料結構及演算法篇',link: '/class/a0_algorithm', 
                      collapsed: true,
               items:[
                {text: '一. 排序',link: '/class/a1-0_sort',collapsed: true,
                    items:[
                      {text: 'a1-1. ShellSort',link: '/class/a1-1_shellsort'},
                      {text: 'a1-2. SelectSort',link: '/class/a1-2_selectsort'},
                      {text: 'a1-3. MergeSort',link: '/class/a1-3_mergesort'},
                      {text: 'a1-4. HeapSort',link: '/class/a1-4_heapsort'},                
                      {text: 'a1-5. QuickSort',link: '/class/a1-5_quicksort'},
                      {text: 'a1-6. RadixSort',link: '/class/a1-6_radixsort'}, 
                      {text: 'a1-7. STL_sort',link: '/class/a1-7_STLsort'}              
                    ]    
                },
                {text: '二. 搜尋',link: '/class/a2_search'},
                {text: '三. 遞迴',collapsed: true,
                     items:[
                      {text: 'a3-1. 河內塔',link: '/class/a3-1_hanoi'},
                      {text: 'a3-2. 空間切割',link: '/class/a3-2_space'},
                      {text: 'a3-3. 八個皇后',link: '/class/a3-3_8Queen'},
                      {text: 'a3-4. 分治法',link: '/class/a3-4_D&C'}                                 
                    ]         
                },
                {text: '四. 圖論',link: '/class/a4-0_graph'},
                {text: '五. 動態規劃',link: '/class/DP'}
               ]
              },
              {text: '附錄',link: '/class/appendix' ,
                       collapsed: true,
               items:[
                {text: 'STL介紹',link: '/class/c1_STL'},
                {text: '參考資料',link: '/class/reference'}
               ]
              }
            ]
          },
          { text: '早期教材', link: '/class/k_past' }
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
