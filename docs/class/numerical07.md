---
outline: deep
---

# 7. 漸近式求巴斯卡三角形

使用排列組合求 $_nC_r$ 之程式，畫出 Pascal 三角形。

**程式** 

<CppRunner>

```cpp:line-numbers
/*
 * --------------------------------
 * Pascal 三角形                   *
 * --------------------------------
 */

#include <stdio.h>
#define N 12

long combi(int,int);

int main()
{
    int n,r,t;

    for (n=0;n<=N;n++){
        for (t=0;t<(N-n)*3;t++)        /* 空白 */
            printf(" ");
        for (r=0;r<=n;r++)
            printf("%3ld    ",combi(n,r));
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

從這個圖可以得知下列重要的關係式是成立的：

$$_nC_r = {}_{n-1}C_{r-1} + {}_{n-1}C_r$$

而這個計算式並不稱為 Pascal 三角形。用這個計算式求出 $_nC_r$ 的程式如 5. 漸近式-排列組合 章節所示。
