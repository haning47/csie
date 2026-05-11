---
outline: deep
---

# 5. 漸近式－排列組合

**${}_nC_r$ 求解**：求由 $n$ 個之中選出 $r$ 個數字排列組合的數值 $— {}_nC_r$

設有 $a, b, c$ 三個數字，我們從中取 2 個數字組成 $ab$、$ac$ 與 $bc$ 三個數字組。通常我們將這種由 $n$ 個數字選出 $r$ 個數字組的數寫成 ${}_nC_r$，並定義成下列的式子。而此處的 $n!$ 為 $n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1$ 的值。$C$ 則為 Combination 的首個字母。

$$_nC_r = \frac{n!}{r!\,(n-r)!}$$

如直接這樣計算下去，對於大的 $n$ 值而言，$n!$ 會有發生溢位的危險。如下列例子：

$$_{10}C_5 = \frac{10!}{5!\cdot 5!} = \frac{3628800}{120 \cdot 120} = 252$$

結果計算出來的值即使沒有溢位，但如為 int 型態時，則在 $10!$ 時會發生溢位。

${}_nC_r$ 也可寫成：

$$\left\{\begin{array}{ll}
{}_nC_r = \dfrac{n-r+1}{r} \cdot {}_nC_{r-1} & \text{（漸進式）} \\[10pt]
{}_nC_0 = 1 & \text{（0次的值）}
\end{array}\right.$$

漸進式是指定義本身（${}_nC_r$）時，以低於本身 1 次的（${}_nC_{r-1}$）來標示，而 0 次（${}_nC_0$）則定義成特定的值。

這種漸進式製作成程式時，可使用反覆方式或遞迴呼叫（第 4 章 4-1）等兩種方式。這裏使用反覆方式來製作程式。以反覆方式來製作程式時，須將 0 次的值設定成初始值，再將係數（$(n-r+1)/r$）的 $r$ 值由 1 開始反覆 +1，然後依序計算。


<img src="/img/fig5-1.png" style="width:60%; display:block; margin:0 auto">

使用這個方法以後，$n$ 即使再大也不會溢位了。

**程式**

<CppRunner>

```cpp:line-numbers
/*
 * --------------------------------
 * 漸進式(nCr排列組合的計算)       *
 * --------------------------------
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
    int i;
    long p=1;

    for (i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
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
