---
outline: deep
---

# a4-4　BFS 廣度優先搜尋 (Breadth-first search)

![BFS 示意圖](/img/fig_a4-3-1.png){width=50%}

走訪順序：1→2→3→4→5→6→7→8

演算法：（佇列）

a. 設定頂點 v 已走訪過  
b. 將頂點 v 存入 queue  
c. 如果迴路不是空的：  
```
    1. 取出 queue 中的點 v      
    2. 將所有鄰接 v 但尚未走訪過的點 w 放入 queue，並設定 w 為走訪過  
    3. 執行直到 queue 空了為止
```

![Queue 運作示意](/img/fig_a4-4-6.png){width=60%}

[https://hackmd.io/@qR5cY2d3Ql2AdYtLfHFxVg/BkxmExS8J4?type=view](https://hackmd.io/@qR5cY2d3Ql2AdYtLfHFxVg/BkxmExS8J4?type=view)

---

## – BFS 鄰接陣列_陣列

<u>**[0501BFS_Matrix_Arr_Queue.cpp]**</u>


<CppRunner has-stdin>

```cpp
/* BFS Use Queue by Array*/
#include <iostream>
using namespace std;
constexpr int N=6 ;                      /* 節點的數量為 6 */
int a[N+1][N+1]={{0,0,0,0,0,0,0},       /* 相鄰矩陣 (6x6) */
                 {0,0,1,1,0,0,0},        /* 1 連接 2, 3    */
                 {0,1,0,0,1,1,0},        /* 2 連接 1, 4, 5 */
                 {0,1,0,0,0,0,1},        /* 3 連接 1, 6    */
                 {0,0,1,0,0,0,0},        /* 4 連接 2       */
                 {0,0,1,0,0,0,1},        /* 5 連接 2, 6    */
                 {0,0,0,1,0,1,0}};       /* 6 連接 3, 5    */
bool v[N+1]={};                          /* 查訪旗標，預設全為 0 */
int queue[100];                          /* 陣列實作的佇列 */
int dequeue = 0;                         /* 移出資料的索引 */
int enqueue = 0;                         /* 存入資料的索引 */
int main(){
    int i, j,n;
    cin>>n;
    // 初始化：將起點 n 放入行列並標記已查訪 (Enqueue)
    queue[enqueue++] = n;
    v[n] = 1;
    // 只要 dequeue 不等於 enqueue，代表行列內還有資料
    while (dequeue != enqueue) {
        i = queue[dequeue++];            /* 從前端取出節點(Dequeue) */
        for (j = 1; j <= N; j++) {
            if (a[i][j] == 1 && v[j] == 0) {
                cout << i << ">" << j << "   ";
                queue[enqueue++] = j;    /* 存入行列尾端(Enqueue) */
                v[j] = 1;               /* 標記為已查訪 */
            }
        }
    }
    return 0;
}
```

</CppRunner>

執行結果：

```
1
1>2      1>3      2>4      2>5      3>6
```

![執行結果圖](/img/fig_a4-4-7.png)

`queue[enqueue++]=j` 表示 `queue[enqueue]=j ; enqueue++;`

---

## – BFS 鄰接陣列_STL

<u>**[0502BFS_Matrix_STL_Queue.cpp]**</u>


<CppRunner has-stdin>

```cpp
/* BFS Use STL Queue */
#include <iostream>
#include<queue>
constexpr int N=6 ;                      /* 節點的數量 */
using namespace std;
int a[N+1][N+1]={{0,0,0,0,0,0,0},       /* 相鄰矩陣 (6x6) */
                 {0,0,1,1,0,0,0},        /* 1 連接 2, 3    */
                 {0,1,0,0,1,1,0},        /* 2 連接 1, 4, 5 */
                 {0,1,0,0,0,0,1},        /* 3 連接 1, 6    */
                 {0,0,1,0,0,0,0},        /* 4 連接 2       */
                 {0,0,1,0,0,0,1},        /* 5 連接 2, 6    */
                 {0,0,0,1,0,1,0}};       /* 6 連接 3, 5    */
bool v[N+1]={};                          /* 查訪旗標歸 0 */
queue<int> q;

int main()
{
    int i,j;
    cin>>i;                              //輸入訪問起點
    q.push(i);v[i]=1;
    while (!q.empty()){                  //一直做到 queue空為止
        i=q.front();                     //front設為起點
        q.pop();                         //移出queue
        for (j=1;j<=N;j++)               //找此點尚未造訪過的連接點拉進queue
            if (a[i][j]==1 && v[j]==0){
                q.push(j);
                v[j]=1;                  //設為已造訪過
                cout << i << ">" << j << "   ";
            }
    }}
```

</CppRunner>

執行結果：

```
1
1>2      1>3      2>4      2>5      3>6
```

![執行結果圖](/img/fig_a4-4-7.png)

---

## – BFS 鄰接串列_STL

**<u>[0503BFS_List_vector.cpp（無向圖）]</u>**


<CppRunner has-stdin>

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
vector <int> a[100],q;                   //a 節點鄰, Queue BFS的佇列
void BFS(int,bool*);
int main(){
    int n,m,i,j,s,e,start;
    cin >> n >> m;                        // 輸入有n個點 m條邊
    bool v[n]={};                         // V:走訪過
    for (i=0;i<n;i++) a[i].push_back(i); //初始化鄰接串列
    for (i=0;i<m;i++){
        cin >> s >> e;
        a[s].push_back(e);               //建立鄰接串列 Adjacency Lists
        a[e].push_back(s);
    }
    for (i=0;i<n;i++){
        sort(a[i].begin()+1,a[i].end()); //排序裡面的資料
    }
    for (i=0;i<n;i++){
        for (j=0;j<a[i].size();j++)
            cout<< a[i][j] << " ";       //印出Adjacency Lists的資料
        cout<<"\n";
    }
    cin >> start;   //起點
    q.push_back(start); //進人點加進queue
    v[start]=1;     //進人點設為放進queue
    BFS(start,v);
}
void BFS(int s,bool *v){
    if (!q.empty()){                      //如果queue不是空的
        cout << s << " ";  //印出queue最前面元素(起點)
        for (int i=1;i<a[s].size();i++)   //s點所有沒在queue的連接點都放進queue
            if (v[a[s][i]]!=1){
                q.push_back(a[s][i]);
                v[a[s][i]]=1;             //設為放進queue
            }
        q.erase(q.begin());               //dequeue
        if (!q.empty()) 
            BFS(q[0],v);                  // 遞迴呼叫進人點設為queue頭
    }
}
```

</CppRunner>


![執行結果、圖與鄰接串列](/img/fig_a4-4-8.png)

[https://zh.wikipedia.org/wiki/Vector\_(STL)](https://zh.wikipedia.org/wiki/Vector_(STL))

---

## – BFS 鄰接串列_結構指標

<u>**[0504BFS_List_Ptr.cpp（有向圖）]**</u>

<details>
<summary>點我打開程式</summary>

<CppRunner has-stdin>

```cpp
//Adjacency List 有向圖
#include<iostream>
#include<queue>
using namespace std;

struct node{                             //LinkList結構 node
    int value;
    node *next;
}*mp[100],*now[100],*in;                //設定3個node結構變數
    void BFS(int,int[]);
    queue <int> q;

int main(){
    int i,start;
    int n,m,s,e;
    cin >>n>>m;                          //n個節點 m條邊
    int v[n]={0};                        //v記錄是否已放置queue
    for(i=0;i<n;i++){
        mp[i]=new node;                  //mp:設定Graph節點值 now:每個節點對應目前連結的node
        mp[i]->value=i;
        mp[i]->next=NULL;
        now[i]=mp[i];
    }
    for (i=0;i<m;i++){
        cin>>s >>e;                      //每條邊的起點node s 終點node e
        in=new node;                     //輸入 一條新的節點 in
        in->value=e;                     //設定 in 的值
        in->next=NULL;                   //新節點指向下一個節點為 NULL（大寫）
        now[s]->next=in;                 //把now的下一個節點指向in
        now[s]=in;                       //now移到in
    /* 加此段可建立無向圖
        in=new node;                     //輸入 一條新的節點 in
        in->value=s;                     //設定 in 的值
        in->next=NULL;                   //新節點指向下一個節點為 NULL（大寫）
        now[e]->next=in;                 //把now的下一個節點指向in
        now[e]=in;                       //now移到in
    */
    }
    for(i=0;i<n;i++){
        now[i]=mp[i];
        while (now[i] != NULL){          //印出LinkList中所有值
            cout << now[i]->value << " ";
            now[i]=now[i]->next;
        }
        cout <<"\n";
    }
    cin>>start;
    q.push(start);    //進入點加進queue
    v[start]=1;       //進入點設為放進queue
    BFS(start,v);
}

void BFS(int s,int v[]){
    while(!q.empty()){
        cout <<s<< " ";                  //印出進入點
        q.pop();                         //dequeue
        while (mp[s]->next!=NULL){       //判斷是否到list最末點
            mp[s]=mp[s]->next;           //走下一點
            if (v[mp[s]->value]!=1)      //若未放進queue
                q.push(mp[s]->value),v[mp[s]->value]=1;   // enqueue，並將此點設為走訪過
        }
        if (!q.empty())
            s=q.front();    //進入點設為queue頭
    }
}
```

</CppRunner>

</details>

輸入： 8個點 10條邊 走訪起點 1
```
8 10 
0 1 0 2 1 3 1 4 2 6 2 5 7 4 7 3 7 6 7 5
1
```
執行結果：
```
1 3 4
```

![執行結果、有向圖與鄰接串列](/img/fig_a4-4-9.png)
