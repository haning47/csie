---
outline: deep
---
# a5-5　最小成本擴張樹 MST（Minimum Spanning Tree）

## 什麼是最小生成樹？

給定一個**加權無向連通圖** $G = (V, E)$，**最小生成樹（MST）** 是一棵包含所有頂點的樹，且所有邊的權重總和最小。

## 方法一：Prim 演算法

### 核心概念

Prim 演算法採用**貪心策略**，從任一頂點出發，每次從「已選集合 U」到「未選頂點 V−U」之間，挑選**權重最小的邊**加入生成樹，逐步擴張直到包含所有頂點。

### 演算步驟

1. 初始化：選定起始頂點，令 $U = \{起始頂點\}$
2. 每一步：在所有滿足 $u \in U,\ v \in V - U$ 的邊 $(u, v)$ 中，選出**最小權重**的邊
3. 將頂點 $v$ 加入 $U$，並將邊 $(u, v)$ 加入 MST
4. 重複步驟 2～3，直到 $U = V$
![Prim](/img/fig_a5-5-prim.png){width=80%}


## 方法二：Kruskal 演算法

### 核心概念

Kruskal 演算法同樣採用**貪心策略**，但角度不同：它以**邊**為主角，先將所有邊依權重由小到大排序，再依序嘗試加入每條邊。加入時檢查是否會形成環；若會，則略過；若不會，則加入生成樹。

判斷是否成環，實作上常使用 **Union-Find（並查集）** 資料結構。

### 演算步驟

1. 初始化：建立空的 MST 邊集合，每個頂點各自為一個獨立集合
2. 將所有邊依**權重由小到大**排序
3. 依序取出每條邊 $(u, v)$：
   - 若 $u$ 與 $v$ **不在同一集合** → 加入 MST，合併兩集合
   - 若 $u$ 與 $v$ **已在同一集合** → 加入會形成環，**略過**
4. 重複步驟 3，直到 MST 包含 $|V| - 1$ 條邊  

![kruskal](/img/fig_a5-5-kruskal.png){width=90%}
### 排序結果

| 順序 | 邊 | 權重 |集合|
|:----:|-----|:----:|:---|
| 1 | (D, E) | 1 |{D,E}.|
| 2 | (A, E) | 2 |{A,D,E}.|
| 3 | (B, D) | 3 |{A,D,E,B}.|
| 4 | (A, B) | 4 |A B 已在集合裡，會構成迴路，固不挑選|
| 5 | (A, C) | 4 |{A,E,D,B,C}所有節點都在集合裡，生成結束|
| 6 | (B, E) | 5 |
| 7 | (E, C) | 7 |
| 8 | (C, D) | 8 |

### 圖解過程

本圖以 6 個頂點的無向加權圖為例。所有頂點初始各自獨立（各為一棵樹），演算法將邊依權重由小到大逐一考慮，加入不產生迴路的邊，直到所有頂點連通為止。

**邊依權重排序：** $(3,4)=1$、$(1,3)=2$、$(5,6)=2$、$(2,4)=3$、$(1,2)=4$、$(3,5)=5$、$(4,6)=7$

---

**初始狀態：** 所有頂點各自獨立，邊依權重排序準備逐一考慮。

![Kruskal 初始圖](/img/fig_a5-5-k0.svg){width=45%}

---

**步驟 1：考慮邊 $(3,4)=1$**

3 和 4 在**不同集合** → **加入**！合併後集合：$\{1\},\{2\},\{3,4\},\{5\},\{6\}$

![步驟1：加入邊(3,4)=1](/img/fig_a5-5-k1.svg){width=45%}

---

**步驟 2：考慮邊 $(1,3)=2$**

1 和 3 在**不同集合** → **加入**！合併後集合：$\{1,3,4\},\{2\},\{5\},\{6\}$

![步驟2：加入邊(1,3)=2](/img/fig_a5-5-k2.svg){width=45%}

---

**步驟 3：考慮邊 $(5,6)=2$**

5 和 6 在**不同集合** → **加入**！合併後集合：$\{1,3,4\},\{2\},\{5,6\}$

![步驟3：加入邊(5,6)=2](/img/fig_a5-5-k3.svg){width=45%}

---

**步驟 4：考慮邊 $(2,4)=3$**

2 和 4 在**不同集合** → **加入**！合併後集合：$\{1,2,3,4\},\{5,6\}$

![步驟4：加入邊(2,4)=3](/img/fig_a5-5-k4.svg){width=45%}

---

**步驟 5：考慮邊 $(1,2)=4$**

1 和 2 **已在同一集合** $\{1,2,3,4\}$ → 加入會形成環，**略過**！

**步驟 6：考慮邊 $(3,5)=5$**

3 和 5 在**不同集合**（$\{1,2,3,4\}$ 與 $\{5,6\}$）→ **加入**！所有頂點連通，MST 完成！

![步驟5略過(1,2)=4，步驟6加入(3,5)=5，MST完成](/img/fig_a5-5-k5.svg){width=45%}

$$\text{MST 邊集} = \{(3,4)=1,\ (1,3)=2,\ (5,6)=2,\ (2,4)=3,\ (3,5)=5\}$$

$$\text{總權重} = 1 + 2 + 2 + 3 + 5 = \mathbf{13}$$

---

## 兩種方法比較

| 比較項目 | Prim 演算法 | Kruskal 演算法 |
|----------|------------|----------------|
| 主要對象 | **頂點**（逐步擴展集合 U） | **邊**（依序嘗試每條邊） |
| 排序需求 | 不需要事先排序 | 需要將所有邊排序 |
| 輔助結構 | 優先佇列（Priority Queue） | 並查集（Union-Find） |
| 適合情境 | **稠密圖**（邊多） | **稀疏圖**（邊少） |
| 時間複雜度 | $O(E \log V)$（使用二元堆） | $O(E \log E)$ |
| 結果唯一性 | 若邊權重皆不同，MST 唯一 | 若邊權重皆不同，MST 唯一 |

> 💡 **重要觀念**：對同一張圖，Prim 和 Kruskal 演算法得到的 MST **邊集合不一定相同**，但總權重相同。


## 練習題目：  
**輸入：**  
第一列輸入 n m代表n個點 m條邊。  
第二列以後是m條邊的連接及權重，例如1 2 4代表1 2  之間連線的權重是4 。  

**輸出：**  
邊集合依權重排序 例如 (3,4)=1 (1,3)=2 及總權重  
無法連通時，顯示無法建立MST  

<details>
<summary><u><b> Kruskal範例程式</b></u></summary>
<CppRunner has-stdin>

```cpp:line-numbers
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
};

int parent[100005], rnk[100005];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}

bool unite(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return false;
    if (rnk[px] < rnk[py]) swap(px, py);
    parent[py] = px;
    if (rnk[px] == rnk[py]) rnk[px]++;
    return true;
}

int main() {
    int n, m;
    cin >> n >> m;

    if (m < n - 1) {
        cout << "邊數不足，圖一定不連通\n";
        return 0;
    }

    vector<Edge> edges(m);
    for (auto& e : edges)
        cin >> e.u >> e.v >> e.w;

    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });

    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rnk[i] = 0;
    }

    vector<Edge> mst;
    int totalWeight = 0;

    for (auto& e : edges) {
        if (unite(e.u, e.v)) {
            mst.push_back(e);
            totalWeight += e.w;
        }
        if ((int)mst.size() == n - 1) break;
    }

    if ((int)mst.size() < n - 1) {
        cout << "圖不連通，無法建立 MST\n";
        return 0;
    }

    for (auto& e : mst)
        cout << "(" << e.u << "," << e.v << ")=" << e.w << "\n";
    cout << "總權重=" << totalWeight << "\n";

    return 0;
}
```
</CppRunner>

</details>

<details>

<summary><u><b>Prim範例程式</b></u></summary>

<CppRunner has-stdin>

```cpp:line-numbers

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef tuple<int,int,int> tiii;  // (權重, 來源, 目標)

int main() {
    int n, m;
    cin >> n >> m;

    if (m < n - 1) {
        cout << "邊數不足，圖一定不連通\n";
        return 0;
    }

    vector<vector<pair<int,int>>> adj(n + 1);

    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({w, v});
        adj[v].push_back({w, u});
    }

    vector<bool> inMST(n + 1, false);
    priority_queue<tiii, vector<tiii>, greater<tiii>> pq;

    // 從節點 1 開始
    inMST[1] = true;
    for (auto [w, v] : adj[1])
        pq.push({w, 1, v});

    vector<tiii> mst;
    int totalWeight = 0;

    while (!pq.empty() && (int)mst.size() < n - 1) {
        auto [w, u, v] = pq.top();
        pq.pop();

        if (inMST[v]) continue;  // v 已加入 MST，跳過

        inMST[v] = true;
        mst.push_back({w, u, v});
        totalWeight += w;

        for (auto [nw, nv] : adj[v])
            if (!inMST[nv])
                pq.push({nw, v, nv});
    }

    if ((int)mst.size() < n - 1) {
        cout << "圖不連通，無法建立 MST\n";
        return 0;
    }

    for (auto [w, u, v] : mst)
        cout << "(" << u << "," << v << ")=" << w << "\n";
    cout << "總權重=" << totalWeight << "\n";

    return 0;
}
```
</CppRunner>

</details>

**輸入測資**
```
4 5
1 2 3
1 3 2
2 3 1
2 4 4
3 4 5
```
**輸出**
```
(2,3)=1
(1,3)=2
(2,4)=4
總權重=7
```
## 並查集(DSU)完整追蹤範例
<details>
<summary>有連通的線為 (1,2) (3,4) (1,3) (5,6) (1,5)</summary>

```
5 — 1 — 3  
|   |   |  
6   2   4
```

### 資料結構

```cpp
int parent[7]; // 1-indexed
int rnk[7];

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]); // 路徑壓縮
    return parent[x];
}

bool unite(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return false;
    if (rnk[px] < rnk[py]) swap(px, py);
    parent[py] = px;                        // 矮的根接到高的根
    if (rnk[px] == rnk[py]) rnk[px]++;     // 等高才升
    return true;
}
```

### 初始狀態

6 個獨立節點，`parent[i] = i`，`rnk[i] = 0`。

```
1   2   3   4   5   6
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  2  |  3  |  4  |  5  |  6  |
| `rnk`     |  0  |  0  |  0  |  0  |  0  |  0  |



#### 步驟 1：`unite(1, 2)`

`find(1)=1`，`find(2)=2`，兩根等高（rnk 都是 0）。  
→ `parent[2] = 1`，`rnk[1]++`

```
  1        3   4   5   6
  |
  2
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  1  |  3  |  4  |  5  |  6  |
| `rnk`     |  1  |  0  |  0  |  0  |  0  |  0  |



#### 步驟 2：`unite(3, 4)`

`find(3)=3`，`find(4)=4`，等高。  
→ `parent[4] = 3`，`rnk[3]++`

```
  1     3      5   6
  |     |
  2     4
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  1  |  3  |  3  |  5  |  6  |
| `rnk`     |  1  |  0  |  1  |  0  |  0  |  0  |



#### 步驟 3：`unite(1, 3)`

`find(1)=1`，`find(3)=3`，兩根等高（rnk 都是 1）。  
→ `parent[3] = 1`，`rnk[1]++`

> ⚠️ **只改根的 parent**：節點 4 的 parent 仍然是 3，不會被動到。  
> `find(4)` 之後才會透過路徑壓縮把 parent[4] 直接指向 1。

```
    1         5   6
   / \
  2   3
      |
      4
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  1  |  1  |  3  |  5  |  6  |
| `rnk`     |  2  |  0  |  1  |  0  |  0  |  0  |



#### 步驟 4：`unite(5, 6)`

`find(5)=5`，`find(6)=6`，等高。  
→ `parent[6] = 5`，`rnk[5]++`

```
    1       5
   / \      |
  2   3     6
      |
      4
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  1  |  1  |  3  |  5  |  5  |
| `rnk`     |  2  |  0  |  1  |  0  |  1  |  0  |



#### 步驟 5：`unite(1, 5)`

`find(1)=1`，`find(5)=5`，**不等高**（`rnk[1]=2 > rnk[5]=1`）。  
→ 矮的根 5 接到高的根 1，`rnk` 不變。

```
       1
      /|\
     2 3 5
       | |
       4 6
```

| 索引      |  1  |  2  |  3  |  4  |  5  |  6  |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| `parent`  |  1  |  1  |  1  |  3  |  1  |  5  |
| `rnk`     |  2  |  0  |  1  |  0  |  1  |  0  |



### 路徑壓縮示範：`find(6)`

壓縮**前**的路徑：

```
6 → 5 → 1（根）
```

遞迴展開：

```
find(6)
  → find(5)
      → find(1) → 是根，return 1
  → parent[5] = 1   ← 壓平 5（但 5 本來就指 1，不變）
  → return 1
→ parent[6] = 1     ← 壓平 6，原本指 5，現在直接指根 1
→ return 1
```

壓縮後：

```
parent[6] = 1   // 下次 find(6) 只需一步
```

---

### 設計重點總結

| 操作 | 負責的事 | 複雜度 |
|------|---------|--------|
| `unite` | 只接「根對根」，一步完成 | O(1) |
| `find` | 爬到根 + 路徑壓縮壓平沿途節點 | 近似 O(1) |

- `unite` **不會**遍歷子樹更新所有節點的 parent
- `find` 在爬的過程中，**順路**把沿途每個節點直接指向根
- 兩者搭配，達到整體近乎 O(1) 的效果
</details>