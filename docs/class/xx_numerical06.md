---
outline: deep
---
# 6. 以Horner法求多項式的值

**Horner 法**：以 Horner 法求多項式 $f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0$ 的值。

在上面這個計算式中，我們先將 $a_nx^n, a_{n-1}x^{n-1}, \cdots, a_1x, a_0$ 各自獨立計算後再相加，這個簡單的計算式也就是 $n(n+1)/2+n$ 次的乘算與 $n$ 次的加算的計算式。這個計算式也可寫成：

<img src="/img/fig6-1.png" style="width:60%; display:block; margin:0 auto">

這個計算式的具體範例為 $a_0=1, a_1=2, a_2=3, a_3=4, a_4=5$ 的多項式 $f(x)=5x^4+4x^3+3x^2+2x+1$。

結果為：

$$\begin{aligned}
f_4 &= f_3 \cdot x + a_0 \\
f_3 &= f_2 \cdot x + a_1 \\
f_2 &= f_1 \cdot x + a_2 \\
f_1 &= f_0 \cdot x + a_3 \\
f_0 &= a_4
\end{aligned}$$

將其轉成一般式，即為下列的組合：

$$\left\{\begin{array}{l}
f_i = f_{i-1} \cdot x + a_{n-i} \\[4pt]
f_0 = a_n
\end{array}\right.$$

這種方式稱為 Horner 法。這個方法僅能以 $n$ 次的乘算與 $n$ 次的加算進行多項式的計算。下列的程式中 $a_0 \sim a_n$ 與 a[0] ～ a[n] 相對應。

**程式** 

<CppRunner>

```cpp:line-numbers
/*
 * --------------------------
 * Horner 方法                *
 * --------------------------
 */

#include <stdio.h>

double fn(double,double *,int);

int main()
{
    static double a[]={1,2,3,4,5};    /* 係數 f(x)=5x⁴+4x³+3x²+2x+1 */
    double x;

    for (x=1;x<=5;x++)
        printf("fn(%f)=%f\n",x,fn(x,a,4));
}

double fn(double x,double a[],int n)
{
    double p;
    int i;

    p=a[n];
    for (i=n-1;i>=0;i--)
        p=p*x+a[i];
    return p;
}
```

</CppRunner>

**執行結果**

```
fn(1.000000)=15.000000
fn(2.000000)=129.000000
fn(3.000000)=547.000000
fn(4.000000)=1593.000000
fn(5.000000)=3711.000000
```

## 參考　漸進式排列組合的範例

① **階乘**

$$\left\{\begin{array}{l}
n! = n \cdot (n-1)! \\[4pt]
0! = 1
\end{array}\right.$$

② **冪乘**

$$\left\{\begin{array}{l}
x^n = x \cdot x^{n-1} \\[4pt]
x^0 = 1
\end{array}\right.$$

③ **費氏（Fibonacci）數列**

費氏數列 1,1,2,3,5,8,13,21,34,55... 為

$$\left\{\begin{array}{l}
F_n = F_{n-1} + F_{n-2} \\[4pt]
F_1 = F_2 = 1
\end{array}\right.$$

④ **泰勒展開式**（請參閱第 2 章 2-3）

將 $e^x$ 以泰勒展開式展開後，則

$$e^x = 1 + \frac{x}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

這時的第 $n$ 項 $E_n$ 為

$$\left\{\begin{array}{l}
E_n = \dfrac{x}{n} \cdot E_{n-1} \\[10pt]
E_0 = 1
\end{array}\right.$$

## 參考　Pascal（巴斯卡）三角形



<p style="text-align:center">圖 1.1</p>



## 問題

1. 以內插法寫一程式，以求 $\sqrt{n}$ 的近似值，$n$ 為任意正整數。

2. 寫一程式，以求正弦函數 SIN 的近似值。

   註：$\text{SIN}(x) = \displaystyle\sum_{n=0}^{\infty} \dfrac{(-1)^n x^{2n+1}}{(2n+1)!} = \dfrac{x}{1!} - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dfrac{x^7}{7!} + \cdots$

3. 寫一程式，以便能快速求得 $x^n$，設 $x = 2.7$，$n$ 為任意正整數。

   註：若將 $n$ 以二進位表示為 $a_m a_{m-1} \cdots a_0$（$n = a_m 2^m + a_{m-1} 2^{m-1} + \cdots + a_1 2 + a_0$），則 $x^n = x^{a_m 2^m} x^{a_{m-1} 2^{m-1}} \cdots x^{a_1 2} x^{a_0}$，所以如果能依序求出 $a_0, a_1, a_2, \cdots, a_m$，則可在 $m$ 步裏算出 $x^n$，這裏的 $m$ 並不需要預先知道。

4. 將解聯立方程式的演算法則改寫成程式。
