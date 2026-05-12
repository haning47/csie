---
outline: deep
---

# 一、排序

| 類型 | 時間複雜度 | 額外空間 |
|------|-----------|---------|
| 1. Insertion Sort | $O(N^2)$ | $O(1)$ |
| 2. Bubble Sort | $O(N^2)$ | $O(1)$ |
| 3. Select Sort | $O(N^2)$ | $O(1)$ |
| 4. Merge Sort | $O(N\log N)$ | $O(N)$ |
| 5. Heap Sort | $O(N\log N)$ | $O(1)$ |
| 6. Quick Sort | Worse case　$O(N^2)$<br>Average　$O(N\log N)$ | $O(N)$<br>$O(\log N)$ |
| 7. Shell Sort | $O(N(\log N)^2)$ | $O(1)$ |

<https://www.toptal.com/developers/sorting-algorithms>

$O(1)$　常數，與 N 無關

<img src="/img/fig_a1-0.png" style="width:50%; display:block; margin:0 auto">

當 n 值很大的時候　$2^n > n^2 > n\log n > n > \log n$

$O(1) < O(\log n) < O(\sqrt{n}) < O(n) < O(n\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)$

註：$\log n$ 皆為以 2 為底的對數 $\log_2 n$

要估算複雜度時，建議可以一秒 $10^6$～$10^7$ 的指令數量來估計，所以，假設執行一筆測資的時限為 1 秒，我們可以得到下面常見的複雜度推估：

| n | 超過 1 萬 | 數千 | 數百 | 20~25 | 10 |
|---|----------|------|------|-------|-----|
| 複雜度 | $O(n)$ or<br>$O(n\log(n))$ | $O(n^2)$ | $O(n^3)$ | $O(2^n)$ | $O(n!)$ |

舉例來說，如果有一題的資料量上限為 5 萬，那麼這一題需要的複雜度就是 $O(n)$ 或 $O(n\log(n))$；如果資料上限是 200，那麼需求的複雜度可能是 $O(n^3)$。
