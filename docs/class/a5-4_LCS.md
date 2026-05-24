---
outline: deep
---

# a5-4　最長共同字串

<div style="font-family: 'Times New Roman', serif; font-size: 1rem; margin: 1em 2em; line-height: 2.4;">
  <div style="display: flex; align-items: baseline; gap: 0;">
    <span style="min-width: 4em;">給定</span>
    <span style="min-width: 13em;"><em>X</em>= <em>x</em><sub>1</sub> <em>x</em><sub>2</sub> …<em>x</em><sub>m</sub></span>
    <span>求 LCS(<em>X</em>,<em>Y</em>)</span>
  </div>
  <div>
    <span style="min-width: 4em; display: inline-block;"></span>
    <span><em>Y</em>= <em>y</em><sub>1</sub> <em>y</em><sub>2</sub> …<em>y</em><sub>m</sub></span>
  </div>
</div>

如 abcdeza 和 xbadze 的 LCS 有 adz、ade、bdz、bde，長度為 3
## 定義
![LCS 遞迴關係](/img/fig_a5-4-lcs-recur.png){width=55%}

取 $x_1 x_2 \ldots x_{i-1}$ 與 $y_1 y_2 \ldots y_j$ 和 $x_1 x_2 \ldots x_i$ 與 $y_1 y_2 \ldots y_{j-1}$ 的較大值

## 範例：求 xbadza 和 abcdeza 的 LCS

![LCS DP 表格（xbadza 與 abcdeza）](/img/fig_a5-4-lcs.jpeg){width=80%}

$\ell(7,6) = 4$，即 LCS 長度為 **4**
