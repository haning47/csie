---
outline: deep
---

# 1. LinkList 建立鏈結串列

**例如建立 v[]={1,2,3}**

::: warning 說明  
node的結構，宣告3個node 結構變數  
root ： 根  
now  ： 目前  
in 　： 新進
:::

```cpp
struct node{
    int value;
    node *next;
}*root,*now,*in;
```

<img src="/img/fig_a4-1-1.png" alt="LinkList建立鏈結串列示意" width="100%">

[0301LinkList.cpp](https://onlinegdb.com/JUX2Sf1AC)

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<cstdlib>
using namespace std;

struct node{                    //LinkList結構 node
    int value;
    node *next;
}*root,*now,*in;               //設定3個node結構變數

int main(){
    int v;
    root=NULL;                  //設 root 為空

    while(cin >> v){            //輸入Ctrl-z停止 (EOF)
        in=new node;            //輸入一個新的節點 in
        in->value=v;            //設定 in 的值
        in->next=NULL;          //新節點指向下一個節點為 NULL（大寫）
        if (root==NULL)         //第一個節點把root指向in
            root=in;
        else
            now->next=in;       //把now的下一個節點指向in

        now=in;                 //現有的 now變成 in，一直串下去
    }
    now=root;                   //指向root

    while (now != NULL){        //印出LinkList中所有值
        cout << now->value << " ";
        now=now->next;
    }
}
```

</CppRunner>
