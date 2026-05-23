---
outline: deep
---

# 五、動態規劃法(Dynamic Programming)

## 概念

1. 表格式的設計
2. 將大問題定義為子問題的組合，由子問題建構出大問題

## DP(Dynamic Programming)三件事

1. 訂邊界值
2. 找出遞迴關係式
3. 找出所有可能的解

## 簡單範例1：求 N!

解：用陣列存A[i]的值

```
For i  1 to n
    A[i]=A[i-1]*i
```

| A[0] | A[1] | A[2] | A[3] | A[4] | A[5] | A[6] | A[7] |
|------|------|------|------|------|------|------|------|
| 1 | 1 | 2 | 6 | 24 | 120 | 720 | … |

邊界條件

$$\begin{aligned}
A[0] &= 1 \\
A[1] &= A[0]*1 \\
A[2] &= A[1]*2 \\
A[3] &= A[2]*3 \\
A[4] &= A[3]*4 \\
A[5] &= A[4]*5 \ldots
\end{aligned}$$

## 簡單範例 2：求 Fibonacci No

解：$F_0=0$，$F_1=1$，$F_n= F_{n-1}+F_{n-2}$（$n \geq 2$）

![Fibonacci 遞迴樹（重覆計算）](/img/fig_a5-0.png){width=60%}

1. 用 Recursion：$O(2^n)$ 以指數成長，耗時
2. 用 DP

| A[0] | A[1] | A[2] | A[3] | A[4] | A[5] | A[6] | A[7] | A[8] |
|------|------|------|------|------|------|------|------|------|
| 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | … |

邊界條件　$A[0]=0$，$A[1]=1$

$$\begin{aligned}
A[2] &= A[1]+A[0] \\
A[3] &= A[2]+A[1] \\
A[4] &= A[2]+A[1] \ldots
\end{aligned}$$

**遞迴解：求函式值**

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<cstdlib>
using namespace std;
long long Fib(int n){
    if (n==0) return 0;
    else if (n==1) return 1;
    else return Fib(n-1)+Fib(n-2);
}

int main()
{
    int i,N;
    cin>>N;
    for (i=2;i<N+1;i++)
        cout<<Fib(i)<<endl;
}
```

</CppRunner>

**DP 解：存陣列值**

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<cstdlib>
using namespace std;

int main()
{
    int N,i;
    cin >>N;
    long long F[N];
    F[0]=0;F[1]=1;
    for (i=2;i<N+1;i++){
        F[i]=F[i-1]+F[i-2];
        cout<<F[i]<<endl;
    }
}
```

</CppRunner>
