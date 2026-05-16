---
outline: deep
---

# A3-2　空間切割

## n 個平面最多可以把空間分割為幾個區域 
這是一道遞迴的幾何題，解題思路是先解決「平面版本」，再推廣到「空間版本」。

---

## 一、先解子問題：n 條線最多把平面分割成幾個區域？

### 數學公式解

$$C_{n+1}^{2} + 1 \quad \text{或} \quad \frac{n^2+n+2}{2}$$

參考：[高一下數學1-1進階 05直線將平面分成幾個區域 | 數學 | 均一教育平台](https://www.youtube.com/watch?v=dBm1nsiv9Yg)

### 遞迴解

[0211遞迴_n條線分割平面.cpp](https://onlinegdb.com/WBeA_u9oH)

```
nline(n) = 1               （n = 0，即 0 條線 = 1 個區域）
nline(n) = nline(n-1) + n  （n > 0）
```

**說明：**  
加入第 n 條線時，若它與前面 n−1 條線都相交（且交點各不同），就會被切成 n 段，每段多切出一個新區域，共多出 n 個區域。

| n |  區域數(舊+新) |  nline(n) |
|:---:|:---:|:---:|
| 0 | 1 |1|
| 1 | 1 + 1  | 2 |
| 2 | 2 + 2  | 4 |
| 3 | 4 + 3  | 7 |
| 4 | 7 + 4  | 11|

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
using namespace std;

int nline(int n){
    if(n==0) return 1;
    return nline(n-1)+n;
}

int main(){
    int n;
    cin>>n;
    cout << nline(n) << endl;
    return 0;
}
```

</CppRunner>

---

## 二、主問題：n 個平面最多把空間分割成幾個區域？

[0212遞迴_n平面空間分割.cpp](https://onlinegdb.com/Pvk5bS7WM)

### 遞迴推導

```
f(n) = f(n-1) + 加入第 n 個平面可多出的區域數
```

**關鍵觀察：** 第 n 個平面會與前面 n−1 個平面各產生一條交線，共產生 **n−1 條交線**。這 n−1 條線在第 n 個平面上最多分割出 `nline(n-1)` 個區域，這些區域將把空間切出同樣數量的新區域。

$$f(n) = f(n-1) + \text{nline}(n-1)$$

**例：** 加上第 3 個平面，與前 2 個平面產生 2 條交線，2 條線把第 3 個平面分成 nline(2) = 4 個區域，因此增加 4 個空間區域。
<img src="/img/fig_a3-2-1.png" alt="n條線分割平面與空間分割示意" width="60%">

| n | 新增區域 nline(n-1) | f(n) |
|:---:|:---:|:---:|
| 0 | — | 1 |
| 1 | nline(0) = 1 | 2 |
| 2 | nline(1) = 2 | 4 |
| 3 | nline(2) = 4 | 8 |
| 4 | nline(3) = 7 | 15 |

[3D 模型視覺化](https://haning47.github.io/AR/4plane/)

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
using namespace std;

int nline(int n){
    if(n==0) return 1;
    return nline(n-1)+n;
}

int f(int n){
    if(n==0) return 1;
    return f(n-1)+nline(n-1);
}

int main(){
    int n;
    cin>>n;
    cout << f(n) << endl;
    return 0;
}
```

</CppRunner>
