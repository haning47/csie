---
outline: deep
---

# a5-3　0/1 背包

有一背包載重 $C$ 公斤，每個物體的 Profit 不同，分別為 $P_1, P_2, \ldots, P_n$，重量是 $W_1, W_2, \ldots, W_n$，如何挑選可使背包有最大利益？

## 定義

令 $f(j, l)$ 為背物體 $j+1, j+2, \ldots, n$ 其載重 $\leq l$ 的解

起始值：$f(n, l) = 0$，$f(j, 0) = 0$，$f(j, <0) = -\infty$

$$\left\{\begin{array}{ll}
f(j, l) = f(j+1, l) & \text{不背 } j+1 \text{ 物} \\[10pt]
f(j, l) = f(j+1, l-W_{j+1}) + P_{j+1} & \text{背 } j+1 \text{ 物}
\end{array}\right.$$

兩者挑其中較有利的。

## 範例

$n=5$，$l=10$

|   | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 重 $W$ | 3 | 4 | 2 | 1 | 5 |
| 值 $P$ | 5 | 10 | 2 | 4 | 8 |

![背包 DP 計算過程（含回溯標示）](/img/fig_a5-3-knapsack.jpeg)

---
不挑：前一狀態（上面一列）；挑：$A(W - W_j) + j$；如果一樣大，2 者都記

![背包 DP 表格（含箭頭回溯）](/img/fig_a5-3-table.png)



$$A[10] = \text{挑}2 + A[6] = \text{挑}2 + \text{挑}4 + A[5] = \text{挑}2 + \text{挑}4 + \text{挑}5 + A[0] \Rightarrow \text{挑 2、4、5}$$
