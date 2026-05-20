---
outline: deep
---

# a3-1　河內塔（Tower of Hanoi）

河內塔是遞迴的經典問題。目標是將左邊柱子上的 n 個圓盤，全部移動到右邊柱子上，過程中一次只能移動一個圓盤，且大盤不能放在小盤上。

<img src="/img/fig_a3-1-1.png" alt="河內塔三步驟示意圖" width="80%">

---

## 一、遞迴三步驟

將 n 個盤子從 peg1 移到 peg3（以 peg2 為中轉）：

| 步驟 | 動作 |
|:---:|:---|
| **第一步驟** | 將上方 n−1 個盤子，從 peg1 **經由** peg3，搬到 peg2 |
| **第二步驟**（終止條件） | 將最底下那個（最大）盤子，從 peg1 搬到 peg3 |
| **第三步驟** | 將 n−1 個盤子，從 peg2 **經由** peg1，搬到 peg3 |

::: tip 關鍵觀念
三步驟中，第一和第三步驟都是「同樣問題的縮小版（n−1 個盤子）」，這正是遞迴的核心：**把大問題拆成相同結構的小問題**。
:::

---

## 二、時間複雜度 O(2ⁿ)

移動 n 個盤子所需的最少步數 T(n)：

T(1)=1　　T(2)=3　　T(3)=7　　……　　T(n)=?

### 方法一：觀察規律展開

```
T(1) = 1
T(2) = 2T(1) + 1 = 2 + 1
T(3) = 2T(2) + 1 = 2(2+1) + 1 = 2² + 2¹ + 1
T(4) = 2T(3) + 1 = 2³ + 2² + 2¹ + 1
……
T(n) = 2ⁿ⁻¹ + 2ⁿ⁻² + … + 2⁰ = 2ⁿ − 1
```

### 方法二：遞迴展開

[0209遞迴河內塔 BigO.cpp](https://onlinegdb.com/2sc94kQmO)

```
T(n) = 2T(n-1) + 1
     = 2(2T(n-2)+1) + 1
     = 2(2(2T(n-3)+1)+1) + 1
     ……
     = 2ⁿ⁻¹ + 2ⁿ⁻² + … + 2⁰
     = 2ⁿ − 1
```

> 每多一個盤子，步數就加倍再加一，時間複雜度為 **O(2ⁿ)**。

---

## 三、遞迴函式

`0210hanoi_string.cpp`

演算法：

```
若 (n == 1)
    印出盤子 1 從 a 移到 c
否則
    執行 hanoi(n-1, a, c, b)
    印出盤子 n 從 a 移到 c
    執行 hanoi(n-1, b, a, c)
```

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
using namespace std;

void hanoi(int n, string a, string b, string c){
    if(n==1){
        cout << "盤子 1 從 " << a << " 移到 " << c << "\n";
    } else {
        hanoi(n-1, a, c, b);
        cout << "盤子 " << n << " 從 " << a << " 移到 " << c << "\n";
        hanoi(n-1, b, a, c);
    }
}

int main(){
    int n;
    cin >> n;
    hanoi(n, "peg1", "peg2", "peg3");
    return 0;
}
```

</CppRunner>

**輸入：**
```
3
```
**輸出：**
```
盤子 1 從 peg1 移到 peg3
盤子 2 從 peg1 移到 peg2
盤子 1 從 peg3 移到 peg2
盤子 3 從 peg1 移到 peg3
盤子 1 從 peg2 移到 peg1
盤子 2 從 peg2 移到 peg3
盤子 1 從 peg1 移到 peg3
```

共 2³ − 1 = **7** 步，與公式吻合。

---

## 四、TOI 競賽題目



- 202203-A3 河內塔　[題目](https://tpmso.org/toi/wp-content/uploads/question/202203/Hanoi.pdf)　[投影片](https://tpmso.org/toi/wp-content/uploads/question/202203/Hanoi.odp)
- 201912-A1 倉庫整理　[題目](https://tpmso.org/toi/wp-content/uploads/question/201912/A1-Warehouse.pdf)　[投影片](https://tpmso.org/toi/wp-content/uploads/question/201912/A1-Warehouse.pptx)
