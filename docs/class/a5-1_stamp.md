---
outline: deep
---

# a5-1　郵票問題

## 郵票問題
郵票面額為 1, 2, 4, 5 四種，欲買 8 元則最少兌換幾張？

![R[i] = Min 遞迴定義](/img/fig_a5-1-formula.png)

求兌換 1, 2, 4, 5 元之前一種狀態的最小值 +1

邊界值　$A[0]=0$，$A[1]=1$，$A[2]=1$，$A[4]=1$，$A[5]=1$，$A[<0]=\infty$

![郵票兌換 DP 表](/img/fig_a5-1-stamp-table.png)

## 找零錢問題

有 1 元、3 元、4 元三種硬幣，要找 10 元，求硬幣的最少個數

### (1) Greedy Method（貪進法）

$$10 \div 4 = 2 \cdots 2 \Rightarrow 2 \text{ 個 4 元}$$
$$2 \div 3 = 0 \cdots 2 \Rightarrow 0 \text{ 個 3 元}$$
$$2 \div 1 = 2 \cdots 0 \Rightarrow 2 \text{ 個 1 元}$$

共 $2+2=4$ 個（**但並不是最佳解**）

### (2) DP

![找零錢 DP 表（含推導路徑）](/img/fig_a5-1-coin-table.png)

![回溯說明](/img/fig_a5-1-explain.png)

## 程式解法
### 1. 列出 dp 陣列中的值
<details><summary>展開程式</summary>
<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;
int main() {
    int k, N;
    cin >> k >> N;  // k種面額 兌換N元
    const int INF = 1000000000;
    vector<int> dp(N + 1, INF); // 將dp陣列值預設為無限大 
    dp[0] = 0;     // 邊界條件：金額 0 元需要 0 張郵票
    vector<int> coins(k);  //面額
    for (int i = 0; i < k; i++) {
        cin >> coins[i];            // 讀取面額 
        if (coins[i] <= N)  
            dp[coins[i]] = 1;      // 設定 面額<=N時 dp[面額]=1
    }
    sort(coins.begin(), coins.end());   // 將面額由小到大排序
                                       
    for (int i = 1; i <= N; i++) {      // 計算dp陣列 
        if (dp[i] == 1) continue;       //面額最少張數是1 不用算
        for (int coin : coins) 
            if (i >= coin && dp[i - coin] != INF)    //兌換面額張數比小
                dp[i] = min(dp[i], dp[i - coin] + 1);                 
    }
    for (int i = 0; i <= N; i++) 
        if (dp[i] == INF) cout << "INF ";
         else cout << dp[i] << " ";
    return 0;
}
```
</CppRunner>
</details>

```
輸入 第一列 面額數、兌換金額。第二列 面額
3 10
1 3 4
輸出 列出dp陣列的值
0 1 2 1 1 2 2 2 2 3 3 
```

### 2. 找出所有可能的解
#### 方法一：用 dp 陣列回推所有組合。
若 dp[當前金額]=dp[當前金額-面額]+1  表示找到一種面額是答案的一部分
<details><summary>展開程式</summary>
<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

void find_all_paths(int amount, vector<int>& path, const vector<int>& dp, const vector<int>& coins) {
    // 當金額扣到 0 時，代表成功回推出一組完美解
    if (amount == 0) {
        for (int i = 0; i < path.size(); i++) 
            cout << path[i] << " ";
        cout << "\n";
        return;
    }
    // 依序嘗試每一種面額
    for (int coin : coins) {
        // 滿足條件：剩餘金額夠扣，且符合 dp[當前] == dp[當前-coin] + 1
        if (amount >= coin && dp[amount] == dp[amount - coin] + 1) {
            path.push_back(coin);                           // 記錄這張面額
            find_all_paths(amount - coin, path, dp, coins); // 繼續往回推導前一個狀態
            path.pop_back();                                // 移除，換嘗試其他同樣符合最優解的面額
        }
    }
}

int main() {
    int k, N;
    cin >> k >> N;  // k種面額 兌換N元
    const int INF = 1000000000;
    vector<int> dp(N + 1, INF); // 將dp陣列值預設為無限大 
    dp[0] = 0;     // 邊界條件：金額 0 元需要 0 張郵票
    vector<int> coins(k);  //面額
    for (int i = 0; i < k; i++) {
        cin >> coins[i];            // 讀取面額 
        if (coins[i] <= N)  
            dp[coins[i]] = 1;      // 設定 面額<=N時 dp[面額]=1
    }
    sort(coins.begin(), coins.end());   // 將面額由小到大排序
                                        
    for (int i = 1; i <= N; i++) {      // 計算dp陣列 
        if (dp[i] == 1) continue;       //面額最少張數是1 不用算
        for (int coin : coins) 
            if (i >= coin && dp[i - coin] != INF)    //兌換面額張數比小
                dp[i] = min(dp[i], dp[i - coin] + 1);                 
    }
    for (int i = 0; i <= N; i++) 
        if (dp[i] == INF) cout << "INF ";
         else cout << dp[i] << " ";
    cout << "\n"; 

    vector<int> path; // 用來記錄當前拆解出的面額組合
    if (dp[N] != INF) 
        find_all_paths(N, path, dp, coins); // 把 N、路徑、dp、coins 傳進去開始回推
    return 0;
}
```

</CppRunner>
</details>

#### 方法二：用 DFS 從根到葉就是一組解
![找零錢回推樹](/img/fig_a5-1-tree.jpeg){width=60%}
- ✓ DFS 走訪一次，從根節點到葉節點即一組解
- ✓ 計算可兌換的張數 4+3+3、3+3+4、3+4+3 視為相同，即 2 個 3 元、1 個 4 元  

##### (1) 建立鄰接串列
![找零錢 DP 表（含推導路徑）](/img/fig_a5-1-coin-table.png)
| 頂點 (當前金額 $i$) | 鄰接節點列表 `(from_node, weight)` | 說明（對應圖中記錄） |
| :---: | :--- | :--- |
| **0** | *空 (起點)* | `A[0] = 0` |
| **1** | `(0, 1)` | `A0+1` |
| **2** | `(1, 1)` | `A1+1` |
| **3** | `(0, 3)` | `A0+3` |
| **4** | `(0, 4)` | `A0+4` |
| **5** | `(4, 1)`, `(1, 4)` | `A4+1`, `A1+4` |
| **6** | `(3, 3)` | `A3+3` |
| **7** | `(4, 3)`, `(3, 4)` | `A4+3`, `A3+4` |
| **8** | `(4, 4)` | `A4+4` |
| **9** | `(8, 1)`, `(6, 3)`, `(5, 4)` | `A8+1`, `A6+3`, `A5+4` |
| **10** | `(7, 3)`, `(6, 4)` | `A7+3`, `A6+4` |
| **11** | `(8, 3)`, `(7, 4)` | `A8+3`, `A7+4` |

##### (2) 建立鄰接陣列

|   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 2 | ∞ | 1 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 3 | 3 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 4 | 4 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 5 | ∞ | 4 | ∞ | ∞ | 1 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 6 | ∞ | ∞ | ∞ | 3 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 7 | ∞ | ∞ | ∞ | 4 | 3 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 8 | ∞ | ∞ | ∞ | ∞ | 4 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ |
| 9 | ∞ | ∞ | ∞ | ∞ | ∞ | 4 | 3 | ∞ | 1 | ∞ | ∞ |
| 10 | ∞ | ∞ | ∞ | ∞ | ∞ | ∞ | 4 | 3 | ∞ | ∞ | ∞ |


**執行結果**

輸入：面額數　面額　兌換金額

![執行結果](/img/fig_a5-1-output.png)
