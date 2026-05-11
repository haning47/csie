---
outline: deep
---

# 8. 遞迴求巴斯卡三角形

**練習問題 $_nC_r$ 的遞迴**：以遞迴求 $_nC_r$。

如同第 1 章 1-1 的 Pascal 三角形中所提到的，$_nC_r$ 可定義成：

$$\left\{\begin{array}{ll}
{}_nC_r = {}_{n-1}C_{r-1} + {}_{n-1}C_r & (n>r>0) \\[4pt]
{}_rC_0 = {}_rC_r = 1 & (r=0 \text{ 或 } n=r)
\end{array}\right.$$

上列式子如以圖形表示，則為，

<img src="/img/fig8-1.png" style="width:60%; display:block; margin:0 auto">

<p style="text-align:center">圖 8-1　Pascal 三角形</p>

$_rC_0=1$ 為 ${}_{n-1}C_{r-1}$ 的呼叫出口，$_rC_r=1$ 為 ${}_{n-1}C_r$ 的呼叫出口。

**程式** 

<CppRunner>

```cpp:line-numbers
/*
 * ------------------------
 * nCr 的計算（遞迴版）    *
 * ------------------------
 */

#include <stdio.h>

long combi(int,int);

int main()
{
    int n,r;

    for (n=0;n<=5;n++) {
        for (r=0;r<=n;r++)
            printf("%d C %d=%ld  ",n,r,combi(n,r));
        printf("\n");
    }
}

long combi(int n,int r)
{
    if (r==0 || r==n)
        return 1L;
    else
        return combi(n-1,r)+combi(n-1,r-1);
}
```

</CppRunner>

**執行結果**

```
0 C 0=1
1 C 0=1   1 C 1=1
2 C 0=1   2 C 1=2   2 C 2=1
3 C 0=1   3 C 1=3   3 C 2=3   3 C 3=1
4 C 0=1   4 C 1=4   4 C 2=6   4 C 3=4   4 C 4=1
5 C 0=1   5 C 1=5   5 C 2=10  5 C 3=10  5 C 4=5   5 C 5=1
```
