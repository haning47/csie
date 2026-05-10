---
outline: deep
---

# 數值計算篇

科學家和工程師所做的計算，大都與數值有關，要解的是數值問題（numerical problem）。以電子計算機解數值問題，就是將實數資料輸入，利用電子計算機做快速的加減乘除等運算，將求出的實數結果輸出，這樣的演算過程，統稱為數值計算（numerical computation）。

數值資料的準確度，受到表示它的位元數所左右，因此一般數值計算多少都有誤差。影響誤差大小的因素很多，例如計算前所收集之數值資料的準確度，計算機內部表示法所用的位元數；每次運算產生的誤差（如四捨五入）；多次運算所累積而衍生的更大誤差；以有限的執行步驟不能夠無限制的提高精確度等，可見數值計算的精確度是很難預估的。

數值計算不但求快，而不產生太大的誤差也是重要的課題。本章並不深入探討數值計算的誤差，主要是介紹一些基本的數值問題，以及解決它們的數值計算方法。

## 1. 求多項式的函數值

多項式是最基本的函數，n 次多項式可以寫成：

p(x) = a₀xⁿ + a₁xⁿ⁻¹ + ⋯ + aₙ₋₁x + aₙ

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

p(x) = ((⋯((a₀x + a₁)x + a₂)x + ⋯)x + aₙ₋₁)x + aₙ

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
    double a[11], x, p;

    cout << "DEG OF POLYNOMIAL? ";
    cin >> n;

    for (int i = 0; i <= n; i++) {
        cout << "COEFFICIENT? ";
        cin >> a[i];
    }

    cout << "VALUE OF X=? ";
    cin >> x;

    p = a[0];
    for (int i = 1; i <= n; i++) {
        p = p * x + a[i];
    }

    cout << "VALUE OF POLYN AT X = " << x << " IS " << p << endl;

    return 0;
}
```

</CppRunner>

如果多項式為 P(x) = x³ + 3x² + 3x + 1，要求 P(1.5) 的值。則程式的執行情形如下：

```
DEG OF POLYNOMIAL? 3
COEFFICIENT? 1.0
COEFFICIENT? 3.0
COEFFICIENT? 3.0
COEFFICIENT? 1.0
VALUE OF X=? 1.5
VALUE OF POLYN AT X = 1.5 IS 15.625
```
