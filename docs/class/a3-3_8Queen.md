---
outline: deep
---

# A3-3　N 個皇后問題（N-Queen Problem）

能否在一個 N×N 的西洋棋盤上放置 N 個皇后，使每一個皇后都不會攻擊到其他皇后？（同一列、同一行、同一斜線都算攻擊）

參考資料：[回溯法 Backtracking、分支定界法 Branch and Bound](https://medium.com/@ralph-tech/%E6%BC%94%E7%AE%97%E6%B3%95%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-%E5%9B%9E%E6%BA%AF%E6%B3%95-backtracking-%E5%88%86%E6%94%AF%E5%AE%9A%E7%95%8C%E6%B3%95-branch-and-bound-29165391c377)

---

## 一、兩種解法比較

| 方法 | 策略 | 搜尋量（N=4） | 搜尋量（N=8） |
|:---|:---|:---:|:---:|
| **暴力法** | 每行嘗試全部 N 個欄位（含重複），放完才驗 | 4⁴ = 256 | 8⁸ = 16,777,216 |
| **回溯法** | 每放一個就驗行列斜線，衝突立即剪枝 | 60 個節點 | 約 2,057 個節點 |

> 暴力法的 for 迴圈對每一行都從 0 跑到 N-1，完全不限制欄位是否重複，所以是 $N^N$。回溯法透過提早剪枝大幅縮小搜尋空間。

---

## 二、4-Queen 回溯法狀態樹

### 暴力法：全部放完才驗證

<img src="/img/fig_a3-3-1.svg" alt="暴力法示意" width="90%">

### 回溯法：發現衝突立即剪枝

以 4×4 棋盤為例，每個節點代表「將皇后放在第幾列（0–3）」。紅色節點與前面皇后衝突，立即停止，不再往下搜尋；金色⭐為找到的解。

<img src="/img/fig_a3-3-2.svg" alt="4-Queen 回溯法狀態樹" width="90%">

4-Queen 共有 **2 組解**：`[1, 3, 0, 2]` 和 `[2, 0, 3, 1]`（數字代表每一行的皇后放在第幾列，從 0 開始）。

---

## 三、程式碼

### 方法一：暴力法

[0213N-queen暴力.cpp](https://onlinegdb.com/3LJ-0RfpC)

每一行嘗試**全部 N 個欄位**（欄位可重複），全部放完後才一次驗證所有皇后是否互相衝突。搜尋量為 $N^N$，N=8 時高達 1677 萬次。

<CppRunner>

```cpp:line-numbers
/* 暴力法：每行試遍全部欄位（含重複），放完才驗 */
#include<iostream>
#include<cmath>
#define N 4          // 改成 8 即為 8-Queen
using namespace std;

int queen[N];
int count=0;

bool queen_ok(int i){   // 檢查第 i 個皇后是否與前面衝突
    for(int k=0; k<i; k++)
        if(queen[i]==queen[k] || abs(queen[i]-queen[k])==abs(i-k))
            return false;
    return true;
}

void N_Queen(int i){
    if(i == N){
        // 所有皇后都放完，現在才統一驗證
        for(int k=1; k<N; k++)
            if(!queen_ok(k)) return;
        count++;
        for(int q=0; q<N; q++) cout << queen[q] << " ";
        cout << "\n";
    } else {
        for(int q=0; q<N; q++){   // 試遍 0~N-1 所有欄，不限制重複
            queen[i]=q;
            N_Queen(i+1);         // 不做任何檢查，直接往下放
        }
    }
}

int main(){
    N_Queen(0);
    cout << "共 " << count << " 組解\n";
    return 0;
}
```

</CppRunner>

---

### 方法二：回溯法（含剪枝）

[0214N_queen_回溯.cpp](https://onlinegdb.com/GmcIG9q-W)

每放一個皇后**立即**檢查是否與前面皇后衝突，衝突則停止往下搜尋（剪枝），大幅減少搜尋量。

<CppRunner>

```cpp:line-numbers
/* 回溯法：每放一個皇后立即檢查，衝突就剪枝 */
#include<iostream>
#include<cmath>
#define N 4          // 改成 8 即為 8-Queen
using namespace std;

int queen[N];
int count = 0;

bool queen_ok(int i){   // 檢查第 i 個皇后是否與前面衝突
    for(int k = 0; k < i; k++){
        if(queen[i] == queen[k] ||          // 同一列
           abs(queen[i]-queen[k]) == abs(i-k))  // 同斜線
            return false;
    }
    return true;
}

void N_Queen(int i){
    if(i == N){
        // 已安全放完所有皇后，此為一組解
        count++;
        for(int q = 0; q < N; q++)
            cout << queen[q] << " ";
        cout << "\n";
    } else {
        for(int q = 0; q < N; q++){
            queen[i] = q;
            if(queen_ok(i))         // ← 剪枝：衝突就不再往下
                N_Queen(i+1);
        }
    }
}

int main(){
    N_Queen(0);
    cout << "共 " << count << " 組解\n";
    return 0;
}
```

</CppRunner>

::: tip 兩者的關鍵差異
- **暴力法**：`for(q=0; q<N; q++)` 不做任何限制，每行試遍全部欄位 → $N^N$ 條路徑，放完才驗
- **回溯法**：`if(queen_ok(i))` 每放一個就即時驗行、欄、斜線，衝突就立刻停止 → 大幅剪枝

只差一行 `if`，搜尋量從 $N^N$ 降到幾千個節點！
:::

---

## 四、8-Queen 的解

8×8 棋盤共有 **92 組解**，將上面程式的 `#define N 4` 改成 `#define N 8` 即可求出所有解。

```
範例解之一：1 5 8 6 3 7 2 4
```

意思是：第1行皇后在第1列、第2行在第5列、第3行在第8列……依此類推。
<table>
  <tr>
    <td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td></td><td></td><td></td><td></td><td>2</td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td></td><td></td><td>3</td><td></td><td></td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>4</td>  
  </tr>
  <tr>
    <td></td><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td></td><td>6</td><td></td><td></td><td></td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td></td><td></td><td></td><td>7</td><td></td><td></td>  
  </tr>
  <tr>
    <td></td><td></td><td>8</td><td></td><td></td><td></td><td></td><td></td>  
  </tr>
</table>
類似題：走迷宮問題