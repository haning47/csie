---
outline: deep
---

# a4-3　深度優先搜尋 (Depth-First-Search)



![DFS 圖形範例](/img/fig_a4-3-1.png){width=50%}

走訪順序：1→2→4→8→5→6→3→7

演算法：（堆疊）  
a. 設定頂點 v 已走訪過  
b. 如 v 存在一個鄰接頂點 w 未走訪過，則遞迴呼叫函數 dfs(w)

![堆疊走訪過程示意](/img/fig_a4-3-2.png){width=40%}

---

### – DFS 鄰接陣列_陣列遞迴

![DFS 鄰接陣列範例圖](/img/fig_a4-3-3.png){width=25%} 

[0401DFS_Matrix_Recursive.cpp](https://onlinegdb.com/GcI6oK1R_)

<CppRunner has-stdin>

```cpp:line-numbers
/* DFS Use Recursive */
#include <iostream>
using namespace std;
constexpr int N=8 ;                              // 節點數
int a[N+1][N+1]={{0,0,0,0,0,0,0,0,0},           // 鄰接矩陣
                 {0,0,1,0,0,0,0,0,0},
                 {0,1,0,1,1,0,0,0,0},
                 {0,0,1,0,0,1,0,1,0},
                 {0,0,1,0,0,1,0,0,0},
                 {0,0,0,1,1,0,1,0,0},
                 {0,0,0,0,0,1,0,1,1},
                 {0,0,0,1,0,0,1,0,1},
                 {0,0,0,0,0,0,1,1,0}};
bool v[N+1]={};                                  // visited 歸 0
void dfs(int);
int main(){
    int i,n;
    cin>>n;
    dfs(n);                                      //節點 n 為起點
}
void dfs(int i){
    int j;
    v[i]=1;                                      //i為起點，設為已訪過
    for (j=1;j<=N;j++){
        if (a[i][j]==1 && v[j]==0){              //有連接而且沒走訪過的點
            cout << i << ">" << j << "   ";
            dfs(j);                              //起點移到下一點
        }
    }
}
```

</CppRunner>

**執行結果：**（輸入起點 1）
```
1>2   2>3   3>5   5>4   5>6   6>7   7>8
```
---

### – DFS 鄰接陣列_STL

[0402DFS_Matrix_STL_Satck.cpp](https://onlinegdb.com/nJEws9qGp1)

<CppRunner has-stdin>

```cpp:line-numbers
/* DFS Use STL Stack */
#include <iostream>
#define N 8                                      /* 節點的數量 */
#include<stack>
using namespace std;

int a[N+1][N+1]={{0,0,0,0,0,0,0,0,0},
                 {0,0,1,0,0,0,0,0,0},
                 {0,1,0,1,1,0,0,0,0},
                 {0,0,1,0,0,1,0,1,0},
                 {0,0,1,0,0,1,0,0,0},
                 {0,0,0,1,1,0,1,0,0},
                 {0,0,0,0,0,1,0,1,1},
                 {0,0,0,1,0,0,1,0,1},
                 {0,0,0,0,0,0,1,1,0}};
bool v[N+1]={};                                  // 查訪旗標歸 0
int main(){
    int i,j;
    bool visit;
    cin>>i;                                      // i 設定起始節點
    stack<int> s;
    s.push(i);v[i]=1;
    while (!s.empty()){                          //一直做到 stack空為止
        i=s.top();                               //把top設為起點
        visit=false;
        for (j=1;j<=N;j++){               //找此點尚未走訪過的最小連接點壓進stack
            if (a[i][j]==1 && v[j]==0){          
                s.push(j);                       //壓入stack
                cout << i << ">" << j << "   ";  //印出已造訪過的點
                v[j]=1;                          //設為已造訪
                visit=true;                      //設為有尚未造訪的連接點
                break;                           //找到就離開迴圈
            }
        }
        if (visit==false) s.pop();        //都沒有尚未走訪過的連接點，則pop掉
    }
}
```

</CppRunner>

**執行結果：**（輸入起點 1）
```
1>2   2>3   3>5   5>4   5>6   6>7   7>8
```
類似題：
[老鼠走迷宮](https://openhome.cc/zh-tw/algorithm/basics/maze/) [一個路徑](https://www.onlinegdb.com/-JE8jli61) [所有路徑](https://www.onlinegdb.com/NTeRLt9jw) (參考自 openhome.cc)
<details><summary>一個路徑程式</summary>
<CppRunner>

```cpp:line-numbers
#include <iostream>
#define SIZE 7

typedef struct {
    int x; 
    int y;
} Point;

Point pt(int, int);
int visit(int[][SIZE], Point, Point);
void print(int[][SIZE]);

int main(void) { 
    int maze[SIZE][SIZE] = {{2, 2, 2, 2, 2, 2, 2}, 
                            {2, 0, 0, 0, 0, 0, 2}, 
                            {2, 0, 2, 0, 2, 0, 2}, 
                            {2, 0, 0, 2, 0, 2, 2}, 
                            {2, 2, 0, 2, 0, 2, 2}, 
                            {2, 0, 0, 0, 0, 0, 2}, 
                            {2, 2, 2, 2, 2, 2, 2}}; 

    if(!visit(maze, pt(1, 1), pt(5, 5))) {
        printf("\n沒有找到出口！\n"); 
    }
    print(maze);
    
    return 0; 
}

Point pt(int x, int y) {
    Point p = {x, y};
    return p;
}

int visit(int maze[][SIZE], Point start, Point end) {
    if(!maze[start.x][start.y]) {
         maze[start.x][start.y] = 1;
         if(!maze[end.x][end.y] && 
            !(visit(maze, pt(start.x, start.y + 1), end) || 
              visit(maze, pt(start.x + 1, start.y), end) ||
              visit(maze, pt(start.x, start.y - 1), end) || 
              visit(maze, pt(start.x - 1, start.y), end))) {
                 maze[start.x][start.y] = 0;
         }
    }
    return maze[end.x][end.y];
    
}

void print(int maze[][SIZE]) {
    int i, j;
    for(i = 0; i < SIZE; i++) { 
        for(j = 0; j < SIZE; j++) switch(maze[i][j]) {
            case 0 : printf("  "); break;
            case 1 : printf("0 "); break;
            case 2 : printf("| "); 
        }
        printf("\n"); 
    }     
}

```
</CppRunner>

</details>
<details><summary>所有路徑程式</summary>
<CppRunner>

```cpp:line-numbers
#include <iostream>
#define SIZE 9

typedef struct {
    int x;
    int y;
} Point;

Point pt(int, int);
void visit(int[][SIZE], Point, Point);
void print(int[][SIZE]);

int main(void) {
    int maze[SIZE][SIZE] = {{2, 2, 2, 2, 2, 2, 2, 2, 2},
                            {2, 0, 0, 0, 0, 0, 0, 0, 2},
                            {2, 0, 2, 2, 0, 2, 2, 0, 2},
                            {2, 0, 2, 0, 0, 2, 0, 0, 2},
                            {2, 0, 2, 0, 2, 0, 2, 0, 2},
                            {2, 0, 0, 0, 0, 0, 2, 0, 2},
                            {2, 2, 0, 2, 2, 0, 2, 2, 2},
                            {2, 0, 0, 0, 0, 0, 0, 0, 2},
                            {2, 2, 2, 2, 2, 2, 2, 2, 2}};

    visit(maze, pt(1, 1), pt(7, 7));

    return 0;
}

Point pt(int x, int y) {
    Point p = {x, y};
    return p;
}

void visit(int maze[][SIZE], Point start, Point end) {
    if(!maze[start.x][start.y]) {
         maze[start.x][start.y] = 1;
         if(maze[end.x][end.y])
            print(maze);
         else{
            visit(maze, pt(start.x, start.y + 1), end);
            visit(maze, pt(start.x + 1, start.y), end);
            visit(maze, pt(start.x, start.y - 1), end);
            visit(maze, pt(start.x - 1, start.y), end);
         }
         maze[start.x][start.y] = 0;
    }
}

void print(int maze[][SIZE]) {
    int i, j;
    for(i = 0; i < SIZE; i++) {
        for(j = 0; j < SIZE; j++) switch(maze[i][j]) {
            case 0 : printf("  "); break;
            case 1 : printf("O "); break;
            case 2 : printf("| ");
        }
        printf("\n");
    }
    printf("\n");
}

```
</CppRunner>

</details>

### – DFS 鄰接串列_Vector

[0403DFS_List_vector.cpp](https://www.onlinegdb.com/B4jcQjh2B)　　8 個節點，7 條邊，無向圖

![鄰接串列結構與走訪結果](/img/fig_a4-3-4.png){width=1000%}

<CppRunner has-stdin>

```cpp:line-numbers
/*測資 8個點7條邊 無向圖列出List， 及從1開始的DFS */
/* 8 7 0 1 0 2 0 3 7 0 1 5 1 4 3 6 1           */
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
vector <vector<int>> a(100);      //設定節點數 (二維vector的寫法)             
void DFS(int,int*,bool*);
int main(){
	int n,m,i,j,s,e,start;
	cin >> n >> m;                          //輸入有n個點 m條邊
	int it[n]={};                           //it:走訪指標  v:走訪過
    bool v[n]={};
	for (i=0;i<n;i++) a[i].push_back(i);    //初始化鄰接串列
	for (i=0;i<m;i++){
		cin >> s >> e;
		a[s].push_back(e);                  //建立鄰接串列 Adjacency Lists
		a[e].push_back(s);
	}
	for (i=0;i<n;i++)
		sort(a[i].begin()+1,a[i].end());    //排序裡面的資料
	for (i=0;i<n;i++){
		for (j=0;j<a[i].size();j++)
			cout<< a[i][j] << " ";          //印出Adjacency Lists的資料
		cout<<"\n";
	}
	cin >> start;                           //輸入從哪一點開始走訪
	DFS(start,it,v);
}
void DFS(int s,int *it,bool *v){
	int t;
    cout << s << " ";
    v[s]=1;                          //進入點設為走訪過
    it[s]++;                         //指標+1 判斷下一個點
    while (it[s]<a[s].size()){       // 判斷沒有超過該點連接數
        t=it[s];                     // t 下一個連接點的位置
        if (v[a[s][t]]!=1)           // 如果下一個連接點沒有走訪過
            DFS(a[s][t],it,v);       // dfs走訪下一點
        it[s]++;                     // 走訪指標+1 不走訪 繼續判斷下一點
    }
}
```

</CppRunner>

---

### – DFS 鄰接串列_Pointer

[0404DFS_List_Ptr.cpp](https://onlinegdb.com/upo30EtYI)

![DFS 鄰接串列 Point 有向圖](/img/fig_a4-3-5.png){width=40%}

8 個節點，7 條邊，有向圖

<CppRunner has-stdin>

```cpp:line-numbers
//Adjacency List 有向圖 8 7 0 1 0 2 0 3 7 0 1 5 1 4 3 6 1
#include<iostream>
using namespace std;
struct node{					//LinkList結構 node
	int value;
	node *next;
}*mp[100],*now[100],*in;        //設定3個node結構變數
void DFS(int,int[]);
int main(){
	int i,start;
	int n,m,s,e;
	cin >>n>>m;                 //n個節點 m條邊
	int v[n]={0};
	for(i=0;i<n;i++){
       mp[i]=new node;          //mp:設定Graph節點值 now:每個節點目前連結的node
       mp[i]->value=i;
       mp[i]->next=nullptr;
       now[i]=mp[i];
    }
	for (i=0;i<m;i++){
        cin>>s>>e;             //每條邊的起點node s 終點node e
        in=new node;           //輸入一個新的節點 in
    	in->value=e;           //設定 in 的值
		in->next=nullptr;         //新節點指向下一個節點為 NULL (大寫)
		now[s]->next=in;       //把now的下一個節點指向in
        now[s]=in;             //now移到in
/* 加此段可建立無向圖*/
/*
        in=new node;           //輸入一個新的節點 in
    	in->value=s;           //設定 in 的值
		in->next=nullptr;         //新節點指向下一個節點為 NULL (大寫)
		now[e]->next=in;       //把now的下一個節點指向in
        now[e]=in;             //now移到in
*/
	}
	for(i=0;i<n;i++){
         now[i]=mp[i];
         while (now[i] != nullptr){       //印出LinkList中所有值
            cout << now[i]->value << " ";
            now[i]=now[i]->next;
        }
        cout <<"\n";
	}
	cin>>start;
	DFS(start,v);
}
void DFS(int s,int v[]){
        cout <<s<< " ";
        v[s]=1;                         //進入點設為走訪過
        mp[s]=mp[s]->next;              // 走訪指標+1
     	while (mp[s]!=nullptr){         // 判斷沒有超過該點連接數
			if (v[mp[s]->value]!=1)     // 如果下一個連接點沒有走訪過
				  DFS(mp[s]->value,v);  // 遞迴dfs
			mp[s]=mp[s]->next;          // 走訪指標+1 不走訪 繼續判斷下一點
		}
}
```

</CppRunner>

---

輸入：
``` 
8 7 
0 1 0 2 0 3 7 0 1 5 1 4 3 6 
1
```

執行結果（沒有將 List 中由小到大串接，走訪順序僅為其中一條）
```
0 1 2 3 
1 5 4 
2 
3 6 
4 
5 
6 
7 0 
1 5 4 
```

## 練習題

無向圖

![練習題無向圖](/img/fig_a4-3-6.png){width=50%}

**輸入：8個節點 10條邊 節點4為起點**

```
8 10
0 1 0 2 1 3 1 4 2 6 2 5 7 4 7 3 7 6 7 5 
4
```
**執行結果：**
```
0 1 2
1 0 3 4
2 0 5 6
3 1 7
4 1 7
5 2 7
6 2 7
7 3 4 5 6
4 1 0 2 5 7 3 6
```
