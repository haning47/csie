---
outline: deep
---

# A1-2　選擇排序法（Selection Sort）

將要排序的對象分作兩部份，一個是**已排序的**，一個是**未排序的**，每回合從未排序的部份選出一個最小值，放入已排序部份的最後一個位置。

---

## 一、排序步驟示範

以陣列 `[70, 80, 31, 37, 10, 1, 48, 60, 33, 80]` 為例（共 10 個元素）：

<img src="/img/fig_a1-2-1.svg" alt="選擇排序法逐回合示意" width="70%">

- **綠色**：已排序（就定位）
- **橘色**：本回合選出的最小值（與最前面未排序元素交換）
- **藍色**：未排序

每回合從未排序的部份掃描一遍，找到最小值後與未排序部份的第一個元素交換。

---

## 二、C++ 程式碼

### 方法一：直接選擇排序

[0202選擇排序.cpp](https://onlinegdb.com/gPOwJzGKC)

<CppRunner>

```cpp:line-numbers
//選擇排序由小到大 找到最小值放到最前面
#include<iostream>
using namespace std;
int main(){
    int i,j,minp,a[10]={1,80,31,37,10,70,48,60,33,80};

    for (i=0;i<9;i++){
        minp=i;                 //每個位置設定i為最小值
        for (j=i+1;j<10;j++)   //比 a[i+1]開始與最小值比較
            if (a[minp]>a[j])  //如果最小值比a[j]大
                minp=j;        //最小值元素位置置換成j

        swap(a[minp],a[i]);    //和位次未排序的最前一個值交換
        for (j=0;j<10;j++) cout<< a[j] << " ";  //顯示每回合排序結果
        cout << "\n";
    }
}
```

</CppRunner>

### 方法二：使用 priority_queue

[0203select_priorityqueue.cpp](https://onlinegdb.com/gPOwJzGKC)

利用 STL 的 `priority_queue`（最大堆），每次取出最大值放到陣列末尾，達到由小到大排序的效果。

<CppRunner>

```cpp:line-numbers
//選擇排序由小到大 找到最大值放到最後面
#include<iostream>
#include<queue>
using namespace std;
int main(){
    int i,a[10]={1,80,31,37,10,70,48,60,33,80};
    priority_queue <int> q;
    for (i=0;i<10;i++){    //數字輸入 Queue
        q.push(a[i]);
    }
    for (i=9;i>=0;i--){    //每次取出 queue 裡的最大值
        a[i]=q.top();       //放到陣列最後面
        q.pop();
    }
    for (i=0;i<10;i++){
        cout <<a[i]<< " ";
    }
}
```

</CppRunner>

---

## 三、時間複雜度

| 情況 | 時間複雜度 |
|:---|:---:|
| 最佳 / 平均 / 最壞 | O(n²) |
| 空間複雜度 | O(1)（原地排序） |

每回合需掃描未排序部份一遍，共需 (n−1)+(n−2)+…+1 = **n(n−1)/2** 次比較，約為 **n²/2**。
