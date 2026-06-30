---
outline: deep
---
# a3-4　分治法 (Divide & Conquer)
### 1. [合併排序](a1-3_mergesort)
### 2. 高中資訊科技學科中心 [科技領域加深加廣=選修課程 -- 進階程式設計](https://ghresource.k12ea.gov.tw/nss/p/InformationTechnologyTPD05)   
- [影片-分而治之](https://www.youtube.com/watch?v=uX-PJiNVHrs&t=622s)  
- [講義](https://ghresource.k12ea.gov.tw/uploads/16143082837701UVLpFKJ.pdf)  
- L型磁磚 [程式](https://www.onlinegdb.com/945vRV1jfn)  
<details><summary>展開程式</summary>
<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

int board[1024][1024];
int tile_count = 1;  //瓷磚編號
// x, y: 目前盤面的左上角座標
// dx, dy: 缺口(不能放)的格子座標
// size: 目前盤面的邊長
void tileBoard(int x, int y, int dx, int dy, int size) {
    if (size == 1) return;

    int half = size / 2;
    int current_tile = tile_count++; // 取得目前的瓷磚編號

    // 檢查缺口在第幾個象限
    bool left_up = (dx < x + half) && (dy < y + half);
    bool right_up = (dx >= x + half) && (dy < y + half);
    bool left_down = (dx < x + half) && (dy >= y + half);
    bool right_down = (dx >= x + half) && (dy >= y + half);

    // 1. 填補左上象限
    if (left_up)
        tileBoard(x, y, dx, dy, half);
    else {
        board[x + half - 1][y + half - 1] = current_tile;
        tileBoard(x, y, x + half - 1, y + half - 1, half);
    }
    // 2. 填補右上象限
    if (right_up)
        tileBoard(x + half, y, dx, dy, half);
    else {
        board[x + half][y + half - 1] = current_tile;
        tileBoard(x + half, y, x + half, y + half - 1, half);
    }
    // 3. 填補左下象限
    if (left_down)
        tileBoard(x, y + half, dx, dy, half);
    else {
        board[x + half - 1][y + half] = current_tile;
        tileBoard(x, y + half, x + half - 1, y + half, half);
    }
    // 4. 填補右下象限
    if (right_down)
        tileBoard(x + half, y + half, dx, dy, half);
    else {
        board[x + half][y + half] = current_tile;
        tileBoard(x + half, y + half, x + half, y + half, half);
    }
}
int main() {
    int n = 3; // 盤面邊長為 2^3 = 8
    int size = 1 << n; // 計算 2^n 左移n格
    int X , Y ; // 設定缺口座標
    cin>>X>>Y;
    tileBoard(0, 0, X, Y, size);
    // 印出結果
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++)
            cout << setw(3) << board[i][j];
        cout << endl;
    }
    return 0;
}

```
</CppRunner>
</details>

- 平面中最近的2點 [參考](https://www.geeksforgeeks.org/dsa/closest-pair-of-points-using-divide-and-conquer-algorithm/)