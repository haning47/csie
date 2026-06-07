# 指標（Pointer）

> 指標是 C/C++ 中最核心也最容易讓初學者卡關的概念。  
> 理解指標，就是真正理解「記憶體」在電腦中如何運作。

## 什麼是指標？

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

---

## 宣告與語法

### 宣告指標

```cpp
int    *p;   // 指向 int 的指標
double *q;   // 指向 double 的指標
char   *s;   // 指向 char 的指標（常用於字串）
```

::: tip `*` 的位置
`int* p` 和 `int *p` 效果相同，建議靠近變數名：`int *p`，  
原因：`int* a, b;` 中只有 `a` 是指標，`b` 不是。
:::

### 兩個關鍵運算子

| 運算子 | 名稱 | 用途 | 範例 |
|--------|------|------|------|
| `&` | 取址運算子 | 取得變數的位址 | `p = &x` |
| `*` | 解參考運算子 | 透過指標存取值 | `*p = 10` |

<CppRunner wrap>

```cpp
int x = 5;
int *p = &x;    // p 存放 x 的位址

cout << x;      // 5
cout << *p;     // 5（解參考，等同讀 x）
cout << p;      // 0x7ffc8a92c434 (x的位址)

*p = 99;        // 透過指標修改 x 的值
cout << x;      // 99
```
</CppRunner>

---

## 記憶體示意圖

```
位址        內容
--------    -------
0x1000  →  [ 42 ]    ← x (x=42)
0x1004  →  [0x1000]  ← p（存放 x 的位址）
```

`p` 本身也是一個變數，它的值是另一個變數的位址。

---

## 指標與函式

### 傳值 vs. 傳址

C++ 預設是 **傳值（call by value）** ，函式內的修改不會影響原變數：

```cpp
void addOne(int n) {
    n += 1;  // 只改副本，無效
}

int x = 5;
addOne(x);
cout << x;  // 仍然是 5
```

使用指標可以達到 **傳址（call by address）** 的效果：

```cpp
void addOne(int *n) {
    *n += 1;  // 透過指標修改原本的變數
}

int x = 5;
addOne(&x);
cout << x;  // 6 ✓
```

### 常見應用：swap

<CppRunner >

```cpp
#include<iostream>
using namespace std;

void swapA(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
int main(){
    int x = 3, y = 7;
    swapA(&x, &y);
    cout << x << " " << y;  // 7 3
}

```
</CppRunner>
---

## 指標與陣列

陣列名稱本身就是指向第一個元素的指標：

```cpp
int arr[] = {10, 20, 30};

cout << arr[0];    // 10
cout << *arr;      // 10（等同 arr[0]）
cout << *(arr+1);  // 20（等同 arr[1]）
cout << *(arr+2);  // 30（等同 arr[2]）
```

### 指標算術

```cpp
int *p = arr;

p++;           // p 移動到下一個 int（往後移 4 bytes）
cout << *p;    // 20
```

::: warning 注意
指標加 1 並非位址加 1，而是「加上該型別的大小」。  
`int *` 加 1 → 位址加 4（bytes）。
:::

---

## NULL 指標

不指向任何東西的指標應初始化為 `nullptr`：

```cpp
int *p = nullptr;

if (p != nullptr) {
    cout << *p;  // 安全才解參考
}
```

::: danger 危險操作
對 `nullptr` 或未初始化的指標做解參考，會造成**執行時期錯誤（Segmentation Fault）**。
:::

---

## 動態記憶體配置

使用 `new` / `delete` 在**堆積（heap）**上配置記憶體：

```cpp
int *p = new int;  // 配置一個 int 的空間
*p = 42;
cout << *p;        // 42
delete p;          // 釋放記憶體，避免洩漏
p = nullptr;       // 養成好習慣
```

### 配置陣列

```cpp
int n = 5;
int *arr = new int[n];

for (int i = 0; i < n; i++) {
    arr[i] = i * 10;
}

delete[] arr;
arr = nullptr;
```

---

## 常見錯誤整理

| 錯誤 | 說明 | 正確寫法 |
|------|------|----------|
| 野指標（dangling pointer） | 指向已釋放的記憶體 | `delete` 後立刻設為 `nullptr` |
| 記憶體洩漏（memory leak） | `new` 了卻忘記 `delete` | 每個 `new` 都要對應一個 `delete` |
| 解參考空指標 | 對 `nullptr` 使用 `*` | 使用前先檢查是否為 `nullptr` |
| 陣列越界 | `*(arr+100)` 超出範圍 | 確認索引範圍 |
| 未初始化指標 | 宣告後未指向合法位址就解參考 | 指向現有變數 `int *p = &x;` 或動態配置 `int *p = new int;` |

---

## 小結

```
變數名  →  值
&變數名 →  位址（可存入指標）
*指標   →  該位址的值（解參考）
```

學習指標的關鍵在於：**時刻區分「位址」與「值」是不同的東西**。  
多畫記憶體示意圖，追蹤每個變數「存放的是什麼」，指標就不再神秘。

---

## 練習題

1. 寫一個函式 `void doubleValue(int *n)`，將傳入的整數乘以 2。
2. 使用動態記憶體配置建立一個大小為 `n` 的整數陣列，填入 1 到 n，再釋放。
3. 解釋以下程式碼的輸出：
    <CppRunner wrap>

   ```cpp
   int a = 1, b = 2;
   int *p = &a;
   *p = 10;
   p = &b;
   *p = 20;
   cout << a << " " << b;  // ?
   ```
    </CppRunner>