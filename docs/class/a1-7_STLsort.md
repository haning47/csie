---
outline: deep
---

# a1-7　使用 STL Sort

C++ 標準函式庫（STL）提供了功能強大的 `sort()` 函式，使用前需引入 `<algorithm>` 標頭檔，能以最少的程式碼完成各種排序需求。

---

## 一、基本用法

```cpp
sort(起始位址, 結束位址);          // 預設升冪
sort(起始位址, 結束位址, 比較函式); // 自訂排序規則
```
- 預設按**升冪**（小到大）排列
- 傳入比較函式可自訂升降冪或多鍵排序

---

## 二、一維陣列排序

[0206Sort_STL.cpp](https://onlinegdb.com/GUK2nd-xb)

<CppRunner>

```cpp:line-numbers
#include <iostream>
#include <algorithm>    //務必引用 algorithm
using namespace std;

int main()
{
    int x[5]={15,20,5,1,65};
    int lenx=sizeof(x)/sizeof(int);

    cout<<"排序前：x=";
    for(int i=0;i<lenx;i++) cout<<x[i]<<" ";cout<<"\n";

    cout<<"升冪排序後：x=";
    sort(x,x+lenx);         //排序x陣列
    for(int i=0;i<lenx;i++) cout<<x[i]<<" ";cout<<"\n";

    cout<<"降冪排序後：x=";
    reverse(x,x+lenx);      //把x陣列內容反轉
    for(int i=0;i<lenx;i++) cout<<x[i]<<" ";cout<<"\n";

    cout<<"less 升冪  ：";
    sort(x,x+lenx,less<int>());
    for(int i=0;i<lenx;i++) cout<<x[i]<<" ";cout<<"\n";

    cout<<"greater 降冪：";
    sort(x,x+lenx,greater<int>());
    for(int i=0;i<lenx;i++) cout<<x[i]<<" ";cout<<"\n";
}
```

</CppRunner>

**執行結果：**
```
排序前：x=15 20 5 1 65
升冪排序後：x=1 5 15 20 65
降冪排序後：x=65 20 15 5 1
less 升冪    :1 5 15 20 65
greater 降冪:65 20 15 5 1
```

::: info 常用比較器
| 比較器 | 效果 |
|:---|:---|
| `less<T>()` | 升冪（預設，小到大） |
| `greater<T>()` | 降冪（大到小） |
| 自訂函式 | 多鍵排序、特殊規則 |
:::

---

## 三、二維陣列排序（struct + cmp）

[0207Sort二維.cpp](https://www.onlinegdb.com/edit/rCHE40BCM)

當資料有多個欄位時，可用 `struct` 搭配自訂比較函式 `cmp` 進行多鍵排序。

<CppRunner>

```cpp:line-numbers
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

struct node{
    int a;
    int b;
} ;

bool cmp1 (int c,int d) {    //用sort排序一維陣列  a>b降冪  a<b 升冪
    return c>d;
}

bool cmp2(node p,node q){
    if (p.a==q.a) return p.b<q.b; //如果第一項相同就用第二項升冪
    else return p.a<q.a;          //否則就第一項升冪
}

int main() {
    int i,lenk,lens;
    node k[]={{1,3},{1,4},{5,7},{3,8},{0,9}};
    int s[]={1,3,1,4,5,7,3,8,0,8,0,9};
    lenk=sizeof(k)/(2*sizeof(int));  //求node長度
    lens=sizeof(s)/sizeof(int);  //求陣列長度

    sort(k,k+lenk,cmp2);
    for(i=0;i<lenk;i++) cout <<k[i].a <<" " <<k[i].b << "\n";
    sort(s,s+lens,cmp1);
    for(i=0;i<lens;i++) cout << s[i] << " "; cout<<"\n";

    char n[]="ajflwk";
    sort(n,n+strlen(n),cmp1);
    cout << n<< "\n";
    sort(n,n+strlen(n),greater<char>());  //greater降冪
    cout << n<< "\n";
}
```

</CppRunner>

**執行結果：**
```
0 9
1 3
1 4
3 8
5 7
9 8 8 7 5 4 3 3 1 1 0 0
wlkjfa
wlkjfa
```

---

## 四、練習題：統計出現次數並排序

[0208Sort二維算次數.cpp](https://onlinegdb.com/txrhN6BL-)

**題目：** 記錄 0–9 各數字出現的次數，以次數**由高至低**排列；若次數相同，**數字小的**在前面。

**輸入：**
```
2 0 0 2 3 3 8 4 0 1
```

**輸出：**
```
6 8
7 4
4 3
5 3
0 2
3 2
9 1
1 0
2 0
8 0
```

::: warning 注意
輸入的 10 個數字代表數字 0–9 各自出現的**次數**（例如第一個 2 表示數字 0 出現 2 次）。
:::

<CppRunner has-stdin>

```cpp:line-numbers
/*記錄0-9出現的次數，以次數高至低排列。若次數一樣，數字小的在前面*/
#include<iostream>
#include<algorithm>
using namespace std;

struct node{
    int a,b;
};

bool cmp(node p,node q){        //compare函數
    if (p.b==q.b) return p.a<q.a;
    else return p.b>q.b;
}

int main(){
    int a[10]={2,0,0,2,3,3,8,4,0,1}; //記錄 0-9出現的次數
    int i;
    node k[10];
    for (i=0;i<10;i++){  //用2維陣列記錄次數
        k[i].a=i;
        k[i].b=a[i];
    }
    sort(k,k+10,cmp);  //用2維陣列排序
    for (i=0;i<10;i++)
    cout << k[i].a <<" " <<k[i].b << "\n";
}
```

</CppRunner>

---

## 五、延伸：APCS 題目練習

**APCS 1050305 No.3 — 線段覆蓋長度**

[題目 PDF](https://apcs.csie.ntnu.edu.tw/wp-content/uploads/2018/12/1050305APCSImplementation.pdf)

本題可用兩種方法解決：

- 方法 1：[cmp](https://onlinegdb.com/KuROmIv0V)
- 方法 2：[map](https://onlinegdb.com/5K_CNjd27)
