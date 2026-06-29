---
outline: deep
---
# c1　變數、範圈型迴圈

## 一、 for(auto &i:s)、const

🔥 **auto / auto& / const auto& 速查表**

| 寫法 | 是否拷貝 | 能否修改原資料 | 效率 | 什麼時候用 |
|---|---|---|---|---|
| `auto i` | ✅ 會拷貝 | ❌ 不行 | ❌ 較慢 | 型別很小、只是臨時用 |
| `auto& i` | ❌ 不拷貝 | ✅ 可以 | ✅ 快 | 要修改元素 |
| `const auto& i` | ❌ 不拷貝 | ❌ 不行 | ⭐ 最佳 | 只讀（最常用）|

>[!Tip] 說明
>`for (auto i : v)`    // i 是「複製品」<br>
>`for (auto& i : v)`   // i 是「原本元素本人」<br>
>`const` 變數不可被修改

[1007for\_auto.cpp](https://onlinegdb.com/)

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
int main(){
    string s="hello";
    for( auto i:s){     //s沒改
        i=toupper(i);
        cout <<i;
    }
    cout <<"\n"<<s<<"\n";
    for(auto& i:s){     //s也改了
        i=toupper(i);
        cout <<i;
    }
    cout <<"\n"<<s;
}
```

</CppRunner>


**輸出：**

```
HELLO
hello
HELLO
HELLO
```

## 二、 static、const

**<u>1007static.cpp</u>**

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
void boo(const int);
int main(){
    int n=5;
    boo(n);
}
//static每次呼叫保留上一次的值
void boo(const int n){
    static int num=0;
    if(num==n) return;
    cout<<"num="<<num++<<"\n";
    boo(n);
}
```

</CppRunner>


**輸出：**

```
num=0
num=1
num=2
num=3
num=4
```

要重覆呼叫函數來計數，但每次呼叫要累加不能歸零，即使用 `static` 靜態變數

## 三、 constexpr(Constant Expression) 和 #define 比較

| | `#define` | `constexpr` |
|---|---|---|
| 編譯期常數 | ✅ | ✅ |
| 型別 | ❌ 無型別 | ✅ 有型別 |
| 除錯資訊 | ❌ 偵錯器只看到數字 | ✅ 可看到變數名稱 |
| 可用於陣列大小 | ✅ | ✅ |
| C++ 建議 | ❌ 不建議 | ✅ 建議使用 |

`#define` 是前置處理器的文字替換，沒有型別。`constexpr` 是編譯期常數，值在編譯時就確定，不能是執行時才知道的值：

```cpp
int n;
cin >> n;
constexpr int x = n;  // ❌ 編譯錯誤，n 執行時才知道
const int y = n;      // ✅ const 可以，執行時決定也行
```

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;

#define LEN 5
constexpr int SIZE = 5;

int arr1[LEN];              // 全域陣列，#define 可設定大小
int arr2[SIZE];             // 全域陣列，constexpr 也可以

#define COUNT 10            // 無型別，10 是 int
constexpr double RATE = 10; // 明確是 double

int main(){
    cout << COUNT / 3 << "\n";  // 3　　（整數除法）
    cout << RATE  / 3 << "\n";  // 3.333（浮點除法，型別不同結果不同）
}
```

</CppRunner>

**輸出：**

```
3
3.33333
```

::: tip 建議
C++ 中常數優先使用 `constexpr`（或 `const`），避免使用 `#define`。`#define` 僅在需要條件編譯（`#ifdef`）時使用。
:::
