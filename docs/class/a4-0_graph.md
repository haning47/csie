---
outline: deep
---

# 四、　圖論（Graph theory）

## 鄰接陣列表示法　Adjacency Matrix

<div style="display:flex;gap:32px;align-items:center">
<img src="/img/fig_a4-0-1.png" style="width:330px;flex-shrink:0">

|   | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 1 | 0 | 1 | 1 | 0 | 0 |
| 2 | 1 | 0 | 1 | 1 | 0 |
| 3 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 0 | 0 | 1 |
| 5 | 0 | 0 | 1 | 1 | 0 |

</div>

## 鄰接串列表示法　Adjacency Lists（用在稀疏矩陣）

```
1 → 2 → 3
2 → 1 → 3 → 4
3 → 1 → 2 → 5
4 → 2 → 5
5 → 3 → 4
```

## 練習：將資料轉換為圖

|   | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 1 | 0 | 1 | 0 | 0 | 0 |
| 2 | 0 | 0 | 1 | 1 | 0 |
| 3 | 1 | 0 | 0 | 0 | 0 |
| 4 | 0 | 0 | 0 | 0 | 1 |
| 5 | 0 | 0 | 1 | 0 | 0 |

<img src="/img/fig_a4-0-2.png" alt="鄰接串列鏈結示意" style="display:block;margin-left:0;width:350px">
