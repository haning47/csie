---
outline: deep
---

# 二元樹（Binary Tree）

## 一、 二元樹的走訪

<img src="/img/fig_a4-5-1.png" alt="二元樹範例" width="60%">

1. 中序走訪：左→根→右
   1-2-3-4-5-6-7-8-9
2. 前序走訪：根→左→右
   5-4-2-1-3-6-8-7-9
3. 後序走訪：左→右→根
   1-3-2-4-7-9-8-6-5

**二元樹搜尋 VS 二分搜尋**

例如要搜尋 8
- 二分搜尋：3次
- 二元樹走訪：必先走訪左子樹

---

**二元樹必考題：**

若一顆二元樹用中序(in-order)走訪為 D、B、G、E、H、A、C、I、F，以前序(pre-order)走訪為A、B、D、E、G、H、C、F、I，則用後序走訪為何？

解：

<img src="/img/fig_a4-5-2.png" alt="前序中序推後序" width="60%"><br>  
<img src="/img/fig_a4-5-3.png" alt="ABCDEFGHI二元樹" width="50%">

後序(左右根) D、G、H、E、B、I、F、C、A

---

## 二、 運算式的表示法

| | 中序表示法 | 前序表示法 | 後序表示法 |
|---|---|---|---|
| 1 | A+B | +AB | AB+ |
| 2 | (A+B)/C | /+ABC | AB+C/ |
| 3 | (A+B)*(C+D) | *+AB+CD | AB+CD+* |
| 4 | A+B*(C+D) | +A*B+CD | ABCD+*+ |

<img src="/img/fig_a4-5-4.png" alt="A+B運算式樹" width="25%">

```
中序 A+B
前序 +AB
後序 AB+
```

後序可不用考慮運算子的 priority

---

## 三、 中序轉後序

1. 將運算式完全加上括號
2. 遇左括號和符號Push進Stack，遇運算元輸出
3. 遇右括號Pop出符號至左括號
4. 重覆2-3

例 `((((a/b)-c)+(d*e))-(a*c))`

| | Stack | Output |
|---|---|---|
| 1 | `((((` | a |
| 2 | `((((/` | ab |
| 3 | `(((` | ab/ |
| 4 | `(((-` | ab/c |
| 5 | `((` | ab/c- |
| 6 | `((+(` | ab/c- |
| 7 | `((+(*` | ab/c-de |
| 8 | `((+` | ab/c-de* |
| 9 | `(` | ab/c-de*+ |
| 10 | `(-*` | ab/c-de*+ac |
| 11 | | ab/c-de*+ac*- |

---

## 四、 中序運算式的計算（不加括號）

1. 使用運算元Stack 和運算子 Stack
2. 運算子的priority 比stack 中的高者，push 進運算子stack
3. 運算子的priority 比stack 中低或相同者，先 pop出stack中的運算子，再 pop 2個運算元加以計算
4. 算完結果push 進運算元的stack
5. 把原來要放的運算子push 進運算子 stack
6. 重覆2-5 到stack 空白

例：`a-b*c+d`

<img src="/img/fig_a4-5-5.png" alt="a-b*c+d 計算步驟1-2" width="70%">

<img src="/img/fig_a4-5-6.png" alt="a-b*c+d 計算步驟3-5" width="70%">

---

例 `3+7*2-4/5` 的後置式(postfix)　[101 北市賽]

解答：

<img src="/img/fig_a4-5-7.png" alt="3+7*2-4/5 解答步驟1-3" width="70%">

<img src="/img/fig_a4-5-8.png" alt="3+7*2-4/5 解答步驟4-6" width="70%">

---

### 作業

1. 輸入後序表示法之運算式，求出算式值
   - 輸入: `9 2 3 5 + * +`
   - 輸出: `25`
2. 輸入中序表示法之運算式，求出算式值
   - 輸入: `(6+2*3)*(8-5)-(8/2+3)`
   - 輸出: `29`

---

## 五、 二元樹鏈結串列結構

設定 root、 now、 in、 up 4 個node結構變數

<img src="/img/fig_a4-5-9.png" alt="node結構" width="30%">

```cpp
struct node{
    int value;
    node *left;
    node *right;
}*root,*now,*in,*up;
```

N=NULL

<img src="/img/fig_a4-5-10.png" alt="二元樹鏈結串列（含NULL節點）" width="80%">

[https://web.ntnu.edu.tw/~algo/BinaryTree.html](https://web.ntnu.edu.tw/~algo/BinaryTree.html)

---

### 前序、中序、後序　走訪

[0601LinkListbinarytree.cpp](https://onlinegdb.com/VRlWPXcqlf)

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;

struct node{                    //LinkList結構 node
    int value;
    node *left;
    node *right;
}*root,*now,*in,*up;           //設定4個node結構變數 root[根] now[目前] up[上層] in[新增]

void visit(node *);             //宣告visit函式原型

int main(){
    int i=0,v[]={5,4,1,3,6,8,9,7,2};
    root=NULL;                  //設 root 為空

    while(i<sizeof(v)/sizeof(int)){
        in=new node;            //輸入一個新的節點 in
        in->value=v[i];         //設定 in 的值
        in->left=NULL;          //新節點指向左子樹下一個節點為 NULL（大寫）
        in->right=NULL;         //新節點指向右子樹下一個節點為 NULL（大寫）

        if (root==NULL)         //第一個節點把root指向in
            root=in;
        else{
            now=root;           //從root開始往下找要放置的位置
            while(now !=NULL){  //找到插入點附近 now=NULL
                up=now;
                if (in->value < now->value)
                    now=now->left;          //in值比較小走左子樹
                else
                    now=now->right;         //in值比較大走右子樹
            }
            if (in->value < up->value)
                up->left=in;               //把上層的左子樹指向in
            else
                up->right=in;              //把上層的右子樹指向in
        }
        i++;
    }
    visit(root);                //走訪
}

void visit(node *ptr)
{
    if ( ptr != NULL )          // 終止條件
    {
        //cout << ptr->value << "\n";      前序
        visit(ptr->left);                // 走左子樹
        cout << ptr->value << "\n";      // 列印節點內容；放中間中序，前後序參考上下
        visit(ptr->right);               // 走右子樹
        //cout << ptr->value << "\n";      後序
    }
}
```

</CppRunner>
