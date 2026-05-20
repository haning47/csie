---
outline: deep
---

# 3. 圖形走訪

## ➢ 深度優先搜尋（DFS Depth-First-Search）

![DFS 圖形範例](/img/fig_a4-3-1.png){width=80%}

走訪順序：1→2→4→8→5→6→3→7

演算法：（堆疊）
a. 設定頂點 v 已走訪過
b. 如 v 存在一個鄰接頂點 w 未走訪過，則遞迴呼叫函數 dfs(w)

![堆疊走訪過程示意](/img/fig_a4-3-2.png){width=80%}

---

### – DFS 鄰接陣列_陣列遞迴

[0401DFS_Matrix_Recursive.cpp](https://onlinegdb.com/)

![DFS 鄰接陣列範例圖](/img/fig_a4-3-3.png){width=60%}

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
bool v[N+1]={};                                  // visited旗標
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

[老鼠走迷宮](https://onlinegdb.com/) [一個路徑](https://onlinegdb.com/) [所有路徑](https://onlinegdb.com/)

---

### – DFS 鄰接陣列_STL

[0402DFS_Matrix_STL_Satck.cpp](https://onlinegdb.com/)

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
bool v[N+1]={};                                  // 查訪旗標 0
int main(){
    int i,j;
    bool visit;
    cin>>i;                                      //設定起始節點
    stack<int> s;
    s.push(i);v[i]=1;
    while (!s.empty()){                          //一直做到 stack空為止
        i=s.top();                               //把top設為起點
        visit=false;
        for (j=1;j<=N;j++){                      //找此點尚未走訪過的鄰小連接點壓進stack
            if (a[i][j]==1 && v[j]==0){          //壓入stack
                s.push(j);                       //印出已造訪過的點
                cout << i << ">" << j << "   ";
                v[j]=1;                          //設為已造訪
                visit=true;                      //設為有尚未造訪的連接點
                break;                           //找到就離開迴圈
            }
        }
        if (visit==false) s.pop();               //都沒有尚未走訪過的連接點，則pop掉
    }
}
```

</CppRunner>

**執行結果：**（輸入起點 1）
```
1>2   2>3   3>5   5>4   5>6   6>7   7>8
```

---

### – DFS 鄰接串列_Vector

[0403DFS_List_vector.cpp](https://onlinegdb.com/)　　8 個節點，7 條邊，無向圖

![DFS 鄰接串列 Vector 圖形](/img/fig_a4-3-5.png){width=60%}

![鄰接串列結構與走訪結果](/img/fig_a4-3-4.png){width=80%}

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int n,m,i,j,s,e,start;
vector<int> a[100];

void DFS(int s, int *it, bool *v);

int main(){
    cin >> n >> m;
    int it[n]={};
    bool v[n]={};
    for(i=0;i<n;i++) a[i].push_back(i);          //初始化Adjacency Lists
    for(i=0;i<m;i++){
        cin >> s >> e;
        a[s].push_back(e);                        //建立鄰接串列 Adjacency Lists
        a[e].push_back(s);
    }
    for (i=0;i<n;i++){
        sort(a[i].begin()+1,a[i].end());          //排序每列的資料
    }
    for (i=0;i<n;i++){
        for (j=0;j<(int)a[i].size();j++){
            cout << a[i][j] << " ";               //印出Adjacency Lists的資料
        }
        cout<<"\n";
    }
    cin >> start;                                 //輸入起點
    DFS(start,it,v);
}
void DFS(int s, int *it, bool *v){
    int t;
    v[s]=1;                                       //設為已走訪
    cout << s <<" ";
    for(i=it[s];i<(int)a[s].size();i++){          //走訪每一個與s連接的Adjacency Lists
        t=a[s][i];
        if(v[t]==false){                          //沒有走訪過
            it[s]=i;
            DFS(t,it,v);
        }
    }
}
```

</CppRunner>

---

### – DFS 鄰接串列_Point

[0404DFS_List_Ptr.cpp](https://onlinegdb.com/)

![DFS 鄰接串列 Point 有向圖](/img/fig_a4-3-6.png){width=60%}

8 個節點，7 條邊，有向圖

執行結果（沒有將 List 中由小到大串接，走訪順序僅為其中一條）

<CppRunner has-stdin>

```cpp:line-numbers
//Adjacency list 有向圖
#include<iostream>
#include<stdlib.h>
using namespace std;
struct node{                                      //Linklist結構 node
    int value;
    node *next;
}*mp[100],*now[100],*in;                         //設定3個node結構變數

void DFS(int s, bool v[]);
int main(){
    int i,start;
    int s,e,n,m;
    cin >>n>>m;
    for(i=0;i<n;i++){
        mp[i]=new node;
        mp[i]->value=i;
        mp[i]->next=NULL;
        now[i]=mp[i];
    }
    for (i=0;i<m;i++){
        cin>>s>>e;                               //每條邊的起點node s 終點node e
        in=new node;                             //輸入一個新的節點 in
        in->value=e;                             //設定 in 的值
        in->next=NULL;                           //新節點指向下一個節點為 NULL（大寫）
        now[s]->next=in;                         //把now的下一個節點指向in
        now[s]=in;                               //now移到in
    }
    for(i=0;i<n;i++){
        while(mp[i] != NULL){                    //輸出LinkList中所有值
            cout << mp[i]->value << " ";
            mp[i]=mp[i]->next;
        }
        cout<<"\n";
    }
    cin>>start;
    bool v[n]={};
    DFS(start,v);
}
void DFS(int s, bool v[]){
    node *t;
    v[s]=true;
    cout << s << " ";
    t=mp[s]->next;
    while(t != NULL){
        if(v[t->value]==false){
            DFS(t->value,v);
        }
        t=t->next;
    }
}
```

</CppRunner>

---

## 練習題

無向圖

![練習題無向圖](/img/fig_a4-3-7.png){width=60%}

執行結果：
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
