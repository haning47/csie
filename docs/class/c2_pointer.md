---
outline: deep
---
# c2　指標（Pointer）

> 指標是 C/C++ 中最核心也最容易讓初學者卡關的概念。  
> 理解指標，就是真正理解「記憶體」在電腦中如何運作。

## 一、 什麼是指標？

程式中的每個變數都存放在記憶體的某個位置，這個位置有一個**位址（address）**。

**指標就是一個「存放位址的變數」。**

```cpp
int x = 42;      // 變數 x，值為 42
int *p = &x;     // 指標 p，存放 x 的位址
```

| 變數 | 值 | 說明 |
|------|-----|------|
| `x` | `42` | 普通整數變數 |
| `p` | `0x7fff...`（某個位址） | 指向 x 的指標 |
| `*p` | `42` | 透過指標取得 x 的值 |


## 二、 宣告與語法

**宣告指標**

```cpp
int    *p;   // 指向 int 的指標
double *q;   // 指向 double 的指標
char   *s;   // 指向 char 的指標（常用於字串）
```

::: tip `*` 的位置
`int* p` 和 `int *p` 效果相同，建議靠近變數名：`int *p`，  
原因：`int* a, b;` 中只有 `a` 是指標，`b` 不是。
:::

**兩個關鍵運算子**

| 運算子 | 名稱 | 用途 | 範例 |
|--------|------|------|------|
| `&` | 取址運算子 | 取得變數的位址 | `p = &x` |
| `*` | 解參考運算子 | 透過指標存取值 | `*p = 10` |

<CppRunner wrap>

```cpp:line-numbers
int x = 5;
int *p = &x;    // p 存放 x 的位址

cout << x;      // 5
cout << *p;     // 5（解參考，等同讀 x）
cout << p;      // 0x7ffc8a92c434 (x的位址)

*p = 99;        // 透過指標修改 x 的值
cout << x;      // 99
```
</CppRunner>

**記憶體示意圖**

```
位址         內容       存放的變數 
--------   --------   ------------
0x1000  →  [ 42 ]    ← x (x=42)
0x1004  →  [0x1000]  ← p（存放 x 的位址）
```

`p` 本身也是一個變數，它的值是另一個變數的位址。


## 三、 指標與函式

**傳值 vs. 傳址**

C++ 預設是 **傳值（call by value）** ，函式內的修改不會影響原變數：

```cpp:line-numbers
void addOne(int n) {
    n += 1;  // 只改副本，無效
}
int x = 5;
addOne(x);
cout << x;  // 仍然是 5
```

使用指標可以達到 **傳址（call by address）** 的效果：

```cpp:line-numbers
void addOne(int *n) {
    *n += 1;  // 透過指標修改原本的變數
}
int x = 5;
addOne(&x);
cout << x;  // 6 ✓
```

**常見應用：[swap](#call-by-value-、-call-by-address-、-call-by-reference) [陣列的傳遞](#陣列的傳遞)**


## 四、 指標與陣列

**陣列名稱本身就是指向第一個元素的指標：**

```cpp:line-numbers
int arr[] = {10, 20, 30};
cout << arr[0];    // 10
cout << *arr;      // 10（等同 arr[0]）
cout << *(arr+1);  // 20（等同 arr[1]）
cout << *(arr+2);  // 30（等同 arr[2]）
```

**指向陣列位址的指標計算**

```cpp:line-numbers
int *p = arr;
p++;           // p 移動到下一個 int（往後移 4 bytes）
cout << *p;    // 20
```

::: warning 注意
指標加 1 並非位址加 1，而是「加上該型別的大小」。  
`int *` 加 1 → 位址加 4（bytes）。
:::

## 五、 NULL 指標

不指向任何東西的指標應初始化為 `nullptr`：
<CppRunner wrap>

```cpp:line-numbers
int *p = nullptr;
int  x=5; 
p=&x;
if (p != nullptr) 
    cout << *p;  // 安全才解參考

```
</CppRunner>


::: danger 危險操作
對 `nullptr` 或未初始化的指標做解參考，會造成**執行時期錯誤（Segmentation Fault）**。
:::


## 六、 動態記憶體配置

使用 `new` / `delete` 在 **堆積（heap）** 上配置記憶體：

**配置變數**

```cpp:line-numbers
int *p = new int;  // 配置一個 int 的空間
*p = 42;
cout << *p;        // 42
delete p;          // 釋放記憶體，避免洩漏
p = nullptr;       // 養成好習慣
```
**配置陣列**

```cpp:line-numbers
int n = 5;
int *arr = new int[n];

for (int i = 0; i < n; i++) {
    arr[i] = i * 10;
}

delete[] arr;
arr = nullptr;
```
**記憶體 Stack（堆疊）vs Heap（堆積）**

| 　　特性　　 | 固定陣列 (`int arr[100];`) | 動態配置 (`int* arr = new int[100];`) |
|------|---------------------------|---------------------------------------|
| 記憶體區塊 | Stack（堆疊） | Heap（堆積） |
| 配置時間 | 編譯期就決定大小與存活週期 | 執行期根據需求動態決定大小 |
| 管理方式 | 自動管理。離開該 function 的作用域（`{}`）後，系統會自動釋放。 | 手動管理。必須開發者自己寫 `delete[]` 釋放，否則會造成記憶體洩漏（Memory Leak）。 |
| 記憶體大小 | 空間較小（通常只有幾 MB），宣告太大的陣列會導致 Stack Overflow。 | 空間非常大（幾乎取決於你電腦的實體記憶體大小）。 |
| 存取速度 | 非常快（結構單純，CPU 有硬體優化）。 | 稍慢（需要透過指標尋找地址，且配置時需要尋找空閒記憶體）。 |

💡 2種記憶體配置的比較

```cpp:line-numbers
void myFunction() {
    // 1. 固定陣列：在 Stack 上
    // 離開這個 function 時，這 400 bytes (100 * 4) 的空間會自動被回收。
    int stackArray[100];

    // 2. new 陣列：在 Heap 上
    // 指標變數 heapArray 本身在 Stack 上，但它指向的 400 bytes 空間在 Heap 上。
    int* heapArray = new int[100];

    // Heap 的記憶體不會自動釋放，必須手動 delete！
    delete[] heapArray;
} // stackArray 在delete後消失，如果上面沒寫 delete，Heap 空間就會漏掉（Leak）長期導致記憶體空間不足
```

> 傳統的固定陣列隸屬於 Stack，由系統自動控制，安全且快速，但容量小；而使用 new 配置的陣列隸屬於 Heap，由你自由控制，容量大，但必須自己負責收拾（delete）。  

:::info 冷知識：
在 C++ 中用 new 在記憶體的 Heap 上配置空間，作業系統底層完全不會用到二元樹那套 Heap 演算法。它們只是名字相同  
:::

**常見錯誤整理**

| 錯誤 | 說明 | 正確寫法 |
|------|------|----------|
| 野指標（dangling pointer） | 指向已釋放的記憶體 | `delete` 後立刻設為 `nullptr` |
| 記憶體洩漏（memory leak） | `new` 了卻忘記 `delete` | 每個 `new` 都要對應一個 `delete` |
| 解參考空指標 | 對 `nullptr` 使用 `*` | 使用前先檢查是否為 `nullptr` |
| 陣列越界 | `*(arr+100)` 超出範圍 | 確認索引範圍 |
| 未初始化指標 | 宣告後未指向合法位址就解參考 | 指向現有變數 `int *p = &x;` 或動態配置 `int *p = new int;` |


## 七、 參數傳遞
### Call By Value 、 Call By Address 、 Call by Reference

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
void myswapV (float,float);
void myswapR (float&,float&);
void myswapA (float*,float*);
int main()
{
    float x=2.5,y=3.6;
    myswapV(x,y);
    myswapR(x,y);
    myswapA(&x,&y);

    cout << " x="<< x << " y=" << y ;
}

void myswapV(float a,float b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
    cout << "Call by Value\n a="<< a << " b=" << b <<"\n";
}

void myswapR(float &a,float &b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
    cout << "Call by Reference\n a="<< a << " b=" << b <<"\n";
}

void myswapA(float *a,float *b)
{
    float temp;
    temp=*a;
    *a=*b;
    *b=temp;
    cout << "Call by Address\n a="<< *a << " b=" << *b <<"\n";
}
```

</CppRunner>

### 傳值呼叫 (Call by Value)

```cpp:line-numbers
void myswapV(float a,float b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
}
```

![Call by Value 記憶體示意圖](/img/fig_c4_call_value.png){width=50%}

### 傳址呼叫 (Call by Address)

```cpp:line-numbers
void myswapA(float *a,float *b)
{
    float temp;
    temp=*a;
    *a=*b;
    *b=temp;
}
```

![Call by Address 記憶體示意圖](/img/fig_c4_call_address.png){width=50%}

### 傳參考呼叫 (Call by Reference)

```cpp:line-numbers
void myswapR(float &a,float &b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
}
```

![Call by Reference 記憶體示意圖](/img/fig_c4_call_reference.png){width=50%}

蔡明志[「指標的藝術」](https://www.books.com.tw/products/E050025036?sloc=main)

---

### 陣列的傳遞

[1003陣列傳遞.cpp](https://onlinegdb.com/xU1LVs3vB)

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
void Arr1(int[]);   //[]表示引數是陣列 call By Address
void Arr2(int *);   // * 傳指標  call By Address
void Arr3(int (&)[5] );  //傳參考  call By Reference
int main(){
    int a[5]={62,25,44,17,91},i;
    cout << "原始值 :    a= " << a <<"\n";
    cout << "            &a = " << &a[0] << " ";
    for(i=0;i<5;i++) cout << &a[i]<<" ";
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "陣列參數 :    ";
    Arr1(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "指標參數 :    ";
    Arr2(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "位址參數 :    ";
    Arr3(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";
}

void Arr1(int ar1[]){
    ar1[0]=10;
    ar1[1]=20;
    cout << " ar1= " << ar1 <<"\n";
    cout << "          &ar1= "<< &ar1 << " ";
    for(int i=0;i<5;i++) cout<<&ar1[i]<<" ";
}

void Arr2(int *ar2){
    ar2[0]=30;
    ar2[1]=40;
    cout << " ar2= " << ar2 <<"\n";
    cout << "          &ar2= "<< &ar2<< " ";
    for(int i=0;i<5;i++) cout<<&ar2[i]<<" ";
}

void Arr3(int (&ar3)[5]){
    ar3[0]=50;
    ar3[1]=60;
    cout << " ar3= " << ar3 <<"\n";
    cout << "          &ar3= "<< &ar3<< " ";
    for(int i=0;i<5;i++) cout<<&ar3[i]<<" ";
}
```

</CppRunner>

執行結果：

![執行結果](/img/fig_c4_call_result.png){width=90%}

![ar1 及 ar2 的傳遞方式](/img/fig_c4_call_ar1ar2.png){width=85%}

![ar3 的傳遞方式](/img/fig_c4_call_ar3.png){width=85%}

**二維陣列的指標傳遞**   
[C 語言入門 | 28 - 05 | 使用指標陣列在函式間傳遞二維陣列](https://www.youtube.com/watch?v=ZkBZmyk17Q8)  
[C 語言入門 | 28 - 06 | 在函式間傳遞任意長寬的二維陣列](https://www.youtube.com/watch?v=WTGv2eqcgcQ)

[1004二維陣列傳遞.cpp](https://onlinegdb.com/EWjzfPW2R)

<CppRunner>

```cpp:line-numbers
#include<iostream>
#include<cstring>
using namespace std;
void r(int *,int *,int *); //傳陣列[0]的address 攤平成一維

int main(){
    int a[2]={1,2};
    int b[2][2]={1,2,3,4};
    int c[2][2][2]={1,2,3,4,5,6,7,8};
    r(a,*b,**c); //* a一維 b二維 c三維
}

void r(int *a,int *b,int *c){
    cout <<a[1]<<" " <<b[3]<<" "<<c[7];
    return;
}
```

</CppRunner>

### [Template](https://allen501pc.wordpress.com/2011/01/04/cc-%E9%97%9C%E6%96%BC%E9%99%A3%E5%88%97%E6%96%BC%E5%87%BD%E5%BC%8F%E4%B8%AD%EF%BC%8C%E7%95%B6%E5%81%9A%E5%8F%83%E6%95%B8%E5%82%B3%E9%81%9E%E7%9A%84%E5%A4%9A%E7%A8%AE%E5%81%9A%E6%B3%95/)

1005Template 陣列傳遞.cpp

<CppRunner>

```cpp:line-numbers
#include <iostream>
using namespace std;

template<typename T1,size_t N>
void fn1D(T1 (&arr)[N]){
    for(size_t i=0; i<N; ++i)
        arr[i]+=1; //陣列值+1
}

template<typename T2,size_t X,size_t Y>
void fn2D(T2 (&arr)[X][Y]){
    for(size_t i=0; i<X; ++i)
        for(size_t j=0; j<Y; ++j)
            arr[i][j]+=1 ; //陣列值+1
}

int main(){
    int arr1D[3]= {1,2,3};
    int arr2D[3][2] = { {1,2},{3,4},{5,6}};
    fn1D(arr1D); //傳1維陣列
    for(int i=0; i<3; ++i)
        cout << arr1D[i] ;
    cout <<"\n";
    fn2D(arr2D); //傳2維陣列
    for(int i=0; i<3; i++)
        for(int j=0; j<2; j++)
            cout <<arr2D[i][j];
    cout <<"\n";
    return 0;
}
```

</CppRunner>

---

## 八、 總結

```
變數名  →  值
&變數名 →  位址（可存入指標）
*指標   →  該位址的值（解參考）
```

學習指標的關鍵在於：**區分「位址」與「值」是不同的東西**。  


## 九、 練習題 

1. 寫一個函式 `void doubleValue(int *n)`，將傳入的整數乘以 2。
2. 使用動態記憶體配置建立一個大小為 `n` 的整數陣列，填入 1 到 n，再釋放。
3. 解釋以下程式碼的輸出：
    <CppRunner wrap>

   ```cpp:line-numbers
   int a = 1, b = 2;
   int *p = &a;
   *p = 10;
   p = &b;
   *p = 20;
   cout << a << " " << b;  // ?
   ```
    </CppRunner>

---