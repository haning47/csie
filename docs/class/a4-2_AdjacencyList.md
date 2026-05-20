---
outline: deep
---

# a4-2　鄰接串列 Adjacency Lists

鄰接串列表示法用在**稀疏矩陣**（邊數遠少於節點數平方時），比鄰接陣列更節省空間。

## 一、 鄰接串列_Point（結構指標）

（有向圖）輸入資料：第一列 n 個點、m 條邊，第二列以後為 m 條邊的資料

![鄰接串列_Point 輸入與圖示](/img/fig_a4-2-1.png){width=80%}

使用結構指標 [0302AdjacencyListPoint.cpp](https://onlinegdb.com/)

<CppRunner has-stdin>

```cpp:line-numbers
//Adjacency List 有向圖，使用指標建立鄰接串列
#include<iostream>
using namespace std;
struct node{                      //LinkList結構 node
    int value;
    node *next;
}*mp[100],*now[100],*in;          //設定3個node結構變數

int main(){
    int i;
    int n,m,s,e;
    cin >>n>>m;
    for(i=0;i<n;i++){
        mp[i]=new node;           //mp:設定Graph節點值
        mp[i]->value=i;           //now:每個節點目前連結的node
        mp[i]->next=NULL;
        now[i]=mp[i];
    }
    for(i=0;i<m;i++){
        cin>>s>>e;                //每條邊的起點node s 終點node e
        in=new node;              //輸入一個新的節點 in
        in->value=e;              //設定 in 的值
        in->next=NULL;            //新節點指向下一個節點為 NULL（大寫）
        now[s]->next=in;          //把now的下一個節點指向in
        now[s]=in;                //now移到in
    }
    /* 加以下設可建立無向圖
        in=new node;
        in->value=s;
        in->next=NULL;
        now[e]->next=in;
        now[e]=in;
    */
    for(i=0;i<n;i++){
        while(mp[i] != NULL){     //印出LinkList中所有值
            cout << mp[i]->value << " ";
            mp[i]=mp[i]->next;
        }
        cout <<"\n";
    }
}
```
</CppRunner>

**試測資料輸入 (8個點 ７條邊）**
```
8 7
0 1 0 2 0 3 7 0 1 5 1 4 3 6
```
---

## 二、 鄰接串列_Vector

（無向圖）輸入資料：第一列 n 個點、m 條邊，第二列以後為 m 條邊的資料

![鄰接串列_Vector 輸入與圖示](/img/fig_a4-2-2.png){width=80%}

使用 Vector [0303AdjacencyListVector.cpp](https://onlinegdb.com/Ya-OfC2mUq)

<CppRunner has-stdin>

```cpp:line-numbers
//Adjacency List 無向圖，使用vector建立鄰接串列
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
    int n,m,i,j,s,e,start;
    cin >> n >> m;                //輸入有n個點 m條邊
    vector<int> a[n];
    //vector<vector<int>> a(n);   //或這樣設定

    for(i=0;i<n;i++) a[i].push_back(i); //初始化鄰接串列

    for(i=0;i<m;i++){
        cin >> s >> e;
        a[s].push_back(e);       //建立鄰接串列 Adjacency Lists
        a[e].push_back(s);       //無向圖互相串
    }

    for(i=0;i<n;i++){
        sort(a[i].begin()+1,a[i].end()); //排序裡面的資料
    }

    for(i=0;i<n;i++){
        for(j=0;j<a[i].size();j++)
            cout<< a[i][j] << " ";       //印出Adjacency Lists的資料
        cout<<"\n";
    }
}
```

</CppRunner>

**試測資料輸入 (8個點 10條邊)**

```
8 10
0 1 0 2 1 3 1 4 2 6 2 5 7 4 7 3 7 6 7 5

```
