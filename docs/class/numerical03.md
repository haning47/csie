---
outline: deep
---

## 3 解聯立方程式

現在來考慮如何解下面的聯立方程式：

$$\begin{aligned}
a_{11}x_1 + a_{12}x_2 + a_{13}x_3 + \cdots + a_{1n}x_n &= a_{1,\,n+1} \\
a_{21}x_1 + a_{22}x_2 + a_{23}x_3 + \cdots + a_{2n}x_n &= a_{2,\,n+1} \\
a_{31}x_1 + a_{32}x_2 + a_{33}x_3 + \cdots + a_{3n}x_n &= a_{3,\,n+1} \\
\vdots \qquad\qquad\qquad \vdots \qquad\qquad\qquad \vdots &\quad \vdots \\
a_{n1}x_1 + a_{n2}x_2 + a_{n3}x_3 + \cdots + a_{nn}x_n &= a_{n,\,n+1}
\end{aligned}$$

其中 $a_{ij}$，$1 \leq i, j \leq n$，為輸入的係數；$x_i$，$1 \leq i \leq n$，為輸出的解。

如果把任一個方程式換成該方程式減去一個常數乘另一個方程式，並不會改變聯立方程式的解，例如第 $i$ 個方程式可以改成

$$\begin{array}{rl}
& a_{i1}x_1 + a_{i2}x_2 + a_{i3}x_3 + \cdots + a_{in}x_n = a_{i,\,n+1} \\
- & c(a_{j1}x_1 + a_{j2}x_2 + a_{j3}x_3 + \cdots + a_{jn}x_n = a_{j,\,n+1}) \\ \hline
& (a_{i1}-ca_{j1})x_1 + (a_{i2}-ca_{j2})x_2 + (a_{i3}-ca_{j3})x_3 + \cdots \\
& \quad (a_{in}-ca_{jn})x_n = a_{i,\,n+1} - ca_{j,\,n+1}
\end{array}$$

利用上述的方法，想辦法把原來的聯立方程式改寫成底下的形式（注意方程式左邊的項數越來越少）：

$$\begin{aligned}
a_{11}x_1 + a_{12}x_2 + a_{13}x_3 + \cdots + a_{1n}x_n &= a_{1,\,n+1} \\
a_{22}x_2 + a_{23}x_3 + \cdots + a_{2n}x_n &= a_{2,\,n+1} \\
a_{33}x_3 + \cdots + a_{3n}x_n &= a_{3,\,n+1} \\
&\vdots \\
a_{nn}x_n &= a_{n,\,n+1}
\end{aligned}$$

這樣一來，從最後的方程式可先算出 $x_n$ 的值為 $a_{n,n+1}/a_{nn}$。然後由上一個方程式算出 $x_{n-1}$ 的值為 $(a_{n-1,\,n+1} - a_{n-1,\,n}x_n)/a_{n-1,n-1}$，⋯⋯直到由第一個方程式求出 $x_1$ 的值。換言之，若已算出 $x_n, x_{n-1}, \cdots, x_{i+1}$ 的值，由第 $i$ 個方程式可求出 $x_i$ 的值為 $(a_{i,\,n+1} - a_{i,\,i+1}x_{i+1} - \cdots - a_{in}x_n)/a_{ii}$。

為了方便說明，我們用以下的係數陣列來表示聯立方程式：

$$\begin{array}{ccccc}
a_{11} & a_{12} & a_{13} & \cdots & a_{1n} & a_{1,n+1} \\
a_{21} & a_{22} & a_{23} & \cdots & a_{2n} & a_{2,n+1} \\
a_{31} & a_{32} & a_{33} & \cdots & a_{3n} & a_{3,n+1} \\
\vdots & \vdots & \vdots & & \vdots & \vdots \\
a_{n1} & a_{n2} & a_{n3} & \cdots & a_{nn} & a_{n,n+1}
\end{array}$$

因為第一行中的 $a_{21}, a_{31}, \cdots, a_{n1}$ 都要變成 $0$，而 $a_{i1}-(a_{i1}/a_{11})a_{11}=0$，如果把第 $i$ 列換成該列減掉 $(a_{i1}/a_{11})$ 乘以第一列，即 $a_{ij}$ 設定為 $a_{ij}-(a_{i1}/a_{11})a_{1j}$，$2 \leq i \leq N$，$2 \leq j \leq N+1$，則陣列就變成下面形式：

<img src="/img/fig3-1.png" style="width:50%; display:block; margin:0 auto">

接著在框起來的部分又可重覆上述的步驟，第三列以後都減去 $(a_{i2}/a_{22})$ 乘以第二列，即 $a_{ij}$ 設定為 $a_{ij}-(a_{i2}/a_{22})a_{2j}$，$3 \leq i \leq N$，$3 \leq j \leq N+1$，陣列變成：

<img src="/img/fig3-2.png" style="width:50%; display:block; margin:0 auto">

如此，每次處理的陣列範圍都縮小一點，重覆 $n-1$ 次後，整個陣列就變成所要的形式：

$$\begin{array}{cccccc}
a_{11} & a_{12} & a_{13} & \cdots & a_{1n} & a_{1,n+1} \\
0 & a_{22} & a_{23} & \cdots & a_{2n} & a_{2,n+1} \\
0 & 0 & a_{33} & \cdots & a_{3n} & a_{3,n+1} \\
\vdots & \vdots & \vdots & & \vdots & \vdots \\
0 & 0 & 0 & \cdots & a_{nn} & a_{n,n+1}
\end{array}$$

若以二維陣列 $A(N, N+1)$ 代表係數，而以一維陣列 $X(N)$ 代表聯立方程式的解，演算法則初步構想如下：

```
輸入係數到陣列 A
用 FOR 迴路（K 由 1 遞增到 N-1）重覆底下步驟：
  更改第 K+1 列到第 N 列
X(N) = A(N, N+1) / A(N, N)
用 FOR 迴路（I 由 N-1 遞減到 1）重覆底下步驟：
  計算 X(I)
輸出陣列 X
```

「更改第 K+1 列到第 N 列」可寫成

```
用 FOR 迴路（I 由 K+1 遞增到 N）重覆底下步驟：
  更改第 I 列
```

「更改第 I 列」部分又可進一步改寫成

```
用 FOR 迴路（J 由 K+1 遞增到 N+1）重覆底下步驟：
  A(I,J) = A(I,J) - (A(I,K) / A(K,K)) * A(K,J)
```

而「計算 X(I)」則可改寫成

```
SUM = 0
用 FOR 迴路（J 由 I+1 遞增到 N）重覆底下步驟：
  SUM = SUM + A(I, J) * X(J)
X(I) = (A(I, N+1) - SUM) / A(I, I)
```

整個演算法則為：

```
輸入係數到陣列 A
用 FOR 迴路（K 由 1 遞增到 N-1）重覆底下步驟：
  用 FOR 迴路（I 由 K+1 遞增到 N）重覆底下步驟：
    用 FOR 迴路（J 由 K+1 遞增到 N+1）重覆底下步驟：
      A(I,J) = A(I,J) - (A(I,K) / A(K,K)) * A(K,J)
X(N) = A(N, N+1) / A(N, N)
用 FOR 迴路（I 由 N-1 遞減到 1）重覆底下步驟：
  SUM = 0
  用 FOR 迴路（J 由 I+1 遞增到 N）重覆底下步驟：
    SUM = SUM + A(I, J) * X(J)
  X(I) = (A(I, N+1) - SUM) / A(I, I)
輸出陣列 X
```

## 問題

1. 以內插法寫一程式，以求 $\sqrt{n}$ 的近似值，$n$ 為任意正整數。

2. 寫一程式，以求正弦函數 SIN 的近似值。

   註：$\text{SIN}(x) = \displaystyle\sum_{n=0}^{\infty} \dfrac{(-1)^n x^{2n+1}}{(2n+1)!} = \dfrac{x}{1!} - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dfrac{x^7}{7!} + \cdots$

3. 寫一程式，以便能快速求得 $x^n$，設 $x = 2.7$，$n$ 為任意正整數。

   註：若將 $n$ 以二進位表示為 $a_m a_{m-1} \cdots a_0$（$n = a_m 2^m + a_{m-1} 2^{m-1} + \cdots + a_1 2 + a_0$），則 $x^n = x^{a_m 2^m} x^{a_{m-1} 2^{m-1}} \cdots x^{a_1 2} x^{a_0}$，所以如果能依序求出 $a_0, a_1, a_2, \cdots, a_m$，則可在 $m$ 步裏算出 $x^n$，這裏的 $m$ 並不需要預先知道。

4. 將解聯立方程式的演算法則改寫成程式。
