---
outline: deep
---

# a5-5　最小成本擴張樹 MST（Minimum Spanning Tree）
<PasswordGate password="sssh">

## ➢ Prim 演算法

1. 開始時設定 $U = \{1\}$
2. 每一步驟都找一個最小邊 $(u, v)$，$u \in U$，$v \in V - U$
3. 把 $v$ 加入 $U$ 中
4. 重覆 2–3 直到 $U = V$

### 執行步驟

![Prim 演算法：原圖 → 選擇邊(1,2)](/img/fig_a5-5-prim1.png)

![Prim 演算法：選擇邊(1,4) → 選擇邊(4,7)](/img/fig_a5-5-prim2.png)

![Prim 演算法：選擇邊(2,5) → 選擇邊(3,4)](/img/fig_a5-5-prim3.png)

![Prim 演算法：選擇邊(3,6) → 完成](/img/fig_a5-5-prim4.png)

---

## ➢ Kruskal 演算法

1. 設定一個邊的集合 $V$，一開始為空集合
2. 將所有的邊依成本加以排序
3. 選擇一個最小成本之邊，檢查其和集合 $V$ 內之邊是否會構成迴路，若否，則將該邊加入集合 $V$ 中
4. 重覆上述步驟直到所有邊均檢查完畢

### 執行步驟

![Kruskal 演算法：選擇邊(1,2) => 加入V，V={(1,2)}](/img/fig_a5-5-kruskal1.png)

![Kruskal 演算法：選擇邊(4,7) => 加入V；選擇邊(3,6) => 加入V](/img/fig_a5-5-kruskal2.png)

![Kruskal 演算法：選擇邊(1,4) => 加入V；選擇邊(2,5) => 加入V](/img/fig_a5-5-kruskal3.png)

![Kruskal 演算法：選擇邊(5,7) => 不加入V；選擇邊(3,4) => 加入V](/img/fig_a5-5-kruskal4.jpeg)

### Kruskal 過程表

![Kruskal 演算法執行過程表格](/img/fig_a5-5-kruskal-table.png)
</PasswordGate >