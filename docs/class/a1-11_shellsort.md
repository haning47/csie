---
outline: deep
---

# a1-1 謝爾排序法

此法由 Donald Shell 提出，其方法為：排列 N 個資料時，先選定 N 的一半做為間隔（GAP），然後第一個元素與第（GAP+1）個元素比較，第二個元素與第（GAP+2）個元素比較，依次繼續下去，當所有距離為 GAP 的元素都調好順序後，再將間隔減半（取整數），重覆同樣比較的動作，直到間隔等於 0 為止。其過程如圖所示：

<img src="/img/fig_a1-1.svg" style="width:60%; display:block; margin:0 auto">

**例**：輸入N個文字資料，利用謝爾排序法排序，輸出排序好的資料。

演算法則如下：

```
輸入N個資料
設定GAP為N/2（取整數）
重覆下面步驟直到GAP為 0：
    將所有距離為GAP的元素調好順序
    GAP減半（取整數）
輸出排好次序的資料
```

「將所有距離為GAP的元素調好順序」這個敘述可進一步細分如下：

```
重覆下面步驟直到沒有調整的動作發生：
    重覆下面步驟（用FOR迴路，I 由 1 遞增到N－GAP）：
        比較並調整A(I)與A(I+GAP)的大小順序
```

在程式中，為了要確定有無調整的動作發生，可利用變數 CHANGE 的值來判斷，當 CHANGE 為 0 時表示沒有調整動作發生，當 CHANGE 為 1 時表示仍有調整動作發生。

0201shell.cpp

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
int main(){
    int i,a[10]={1,80,31,37,10,70,48,60,33,80};
    int n=10,GAP=n/2;
    bool change;
    while(GAP){
        change=false;
        for(i=0;i<n-GAP;i++){
            if (a[i]>a[GAP+i]){
                swap(a[i],a[GAP+i]);
                change=true;
            }
        }
        if(!change) GAP/=2;
    }
    for (i=0;i<10;i++){
        cout <<a[i]<< " ";
    }
}
```

</CppRunner>

以上討論的二種排序法中，我們可以看出泡式排序法觀念簡單，做法又方便，而其執行比較的次數為：

$$(N-1)+(N-2)+(N-3)+\cdots+1=N(N-1)/2$$

若 N 值很大時，其比較的次數大約為 $\dfrac{N^2}{2}$。謝爾排序法所需要的執行比較次數約為 $N(\log_2(N))^2$。若 N 值不大時，可以考慮泡式排序法；若 N 值很大時，就需考慮謝爾排序法或其他排序法。

<p style="text-align:right">（國編75頁）</p>


Shell Sort 的序列　：Tokuda、Ciura（實驗法）

Ciura : [1, 4, 10, 23, 57, 132, 301, 701, 1750] $\text{gap}(k) \approx \text{gap}(k-1) \times 2.25$
