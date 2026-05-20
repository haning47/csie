---
outline: deep
---
# 1. 漸進式 - 求多項式的函數值

多項式是最基本的函數，n 次多項式可以寫成：

$p(x) = a₀xⁿ + a₁xⁿ⁻¹ + ⋯ + aₙ₋₁x + aₙ$

求多項式的函數值就是把係數 a₀, a₁, ⋯, aₙ 和變數 x 的值輸入，求出 p(x) 的值。最平常的方法是求出每一項的值，並累加起來。如果以陣列 A 儲存各項的係數值，以 X 儲存變數值，以 Y 代表 X 的乘冪，而以 P 代表結果，則其演算法則如下：

```
輸入多項式的次數 N
輸入係數值到 A(0), A(1), ⋯, A(N)
輸入變數值到 X
設定 P 為 A(N)
設定 Y 為 X
使用 FOR 迴路（I 由 N－1 遞減到 0）重覆底下步驟：
  P = P + A(I) * Y
  Y = Y * X
輸出 P
```

在這個計算方法當中，每求一項就要做兩次乘法，總共要做 2n 次乘法，其實另外有一個更快的方法，總共只要做 n 次乘法就可以了。如果把多項式寫成

$p(x) = ((⋯((a₀x + a₁)x + a₂)x + ⋯)x + aₙ₋₁)x + aₙ$

利用以上的式子，由 a₀ 開始，每次乘上 x 後加上下一項的係數，直到乘上 x 再加上 aₙ，計算就完成了，其演算法則如下：

```
輸入多項式的次數 N
輸入係數值到 A(0), A(1), ⋯, A(N)
輸入變數值到 X
設定 P 為 A(0)
使用 FOR 迴路（I 由 1 遞增到 N）重覆底下步驟：
  P = P * X + A(I)
輸出 P
```

程式如下：

<CppRunner has-stdin>

```cpp:line-numbers
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;    //輸入最高次方
    double a[n+1], x, p;   
    for (int i = 0; i <= n; i++) 
        cin >> a[i];    //輸入係數 a[0]是最高次方的係數 
    cin >> x;   //輸入x值
    p = a[0];
    for (int i = 1; i <= n; i++) 
        p = p * x + a[i];
    cout << "p(" << x << ")=" << p ;
    return 0;
}
```

</CppRunner>

如果多項式為 $P(x) = x³ + 3x² + 3x + 1$，要求 $P(1.5)$ 的值。則程式的執行情形如下：

```
3
1 3 3 1 
1.5
p(1.5)=15.625
```
這種方式稱為 Horner 法 , 為漸進式解題方法的範例 
<img src="/img/fig2-5.png" style="width:60%; display:block; margin:0 auto">
假設係數為 $a_0=5, a_1=4, a_2=3, a_3=2, a_4=1$ 的多項式 $f(x)=5x^4+4x^3+3x^2+2x+1$。

拆解為：  

$$\begin{aligned}
f(x) &=(((5x+4)x+3)x+2)x+1 \\
f_0 &= a_0 \\
f_1 &= f_0 \cdot x + a_1 \\
f_2 &= f_1 \cdot x + a_2 \\
f_3 &= f_2 \cdot x + a_3 \\
f_4 &= f_3 \cdot x + a_4 
\end{aligned}$$

通用關係式為：

$$\left\{\begin{array}{l}
f_i = f_{i-1} \cdot x + a_{i} \\[4pt]
f_0 = a_0
\end{array}\right.$$