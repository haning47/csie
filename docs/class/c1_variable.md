---
outline: deep
---
# c1. 變數、範圈型迴圈

## 1. for(auto &i:s)、const

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

## 2. static、const

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

