---
outline: deep
---

# A1-3　合併排序法（Merge Sort）

合併排序法採用**分治法（Divide and Conquer）**：先將陣列不斷對半分割，直到每個子陣列只剩一個元素，再將這些子陣列兩兩合併成已排序的較大陣列，最終完成整體排序。

---

## 一、分治概念

以 `[6, 5, 7, 1, 4, 2, 3]` 為例，整個過程可拆成三個階段：

<img src="/img/fig_a1-3-1.svg" alt="合併排序法分治示意圖" width="90%">

| 階段 | 說明 |
|:---:|:---|
| **① 分割** | 反覆對半切，直到每組只剩 1 個元素 |
| **② 合併** | 兩兩比較大小，合併成排序好的子陣列 |
| **③ 完成** | 重複到只剩一組，即為排序結果 |

> n 個資料需要 **log n** 回合，每回合需 **O(n)** 時間，因此時間複雜度為 **O(n log n)**。

---

## 二、兩陣列合併（Merge）

合併的核心操作是將兩個**已排序**的陣列合併成一個更大的排序陣列。方法是同時從兩陣列的最前面開始，每次選出較小的元素放入結果陣列。

以陣列 A = `[10, 15, 45, 60]`、B = `[8, 25]` 為例：

<img src="/img/fig_a1-3-2.svg" alt="兩陣列合併過程" width="90%">

演算法如下：

```
設定 i=0、j=0、k=0（分別為 A、B、C 的指標）
當 i < m 且 j < n：
    若 A[i] < B[j]：將 A[i] 抄入 C[k]，i 增加 1
    否則：         將 B[j] 抄入 C[k]，j 增加 1
    k 增加 1
若 A 已取完：將 B 剩餘元素全部抄入 C
否則：      將 A 剩餘元素全部抄入 C
```

### 程式碼：兩陣列合併

[0204merge1.cpp](https://onlinegdb.com/0Qa22tabp)

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
int main(){
    int i,j,k,x;
    int m=6,n=5;
    int a[m]={1,10,31,37,70,75},b[n]={33,48,63,80,90},c[m+n];
    i=0;j=0;k=0;
    while(i<m && j<n){
        if (a[i]<b[j]) {
            c[k]=a[i];
            i++;
        }
        else {
            c[k]=b[j];
            j++;
        }
        k++;
    }
    if (i>=m) {                    //如果a陣列先結束，
        for (x=j;x<n;x++){        //把b陣列剩下的資料抄給c陣列
            c[k]=b[x];
            k++;
        }
    }
    else {
        for (x=i;x<m;x++){
            c[k]=a[x];             //否則把a陣列剩下的抄給c陣列
            k++;
        }
    }

    for (x=0;x<m+n;x++){
        cout <<c[x] << " ";
    }
}
```

</CppRunner>

---

## 三、遞迴合併排序（完整實作）

參考資料：[合併排序 Merge Sort](https://kopu.chat/2017/08/10/%E5%90%88%E4%BD%B5%E6%8E%92%E5%BA%8F-merge-sort/)

[0205Merge.cpp](https://onlinegdb.com/SacvxUu2D)

完整的合併排序分為兩個函式：`merge_sort`（分割）與 `merge2`（合併），透過遞迴實現分治。

<CppRunner has-stdin>

```cpp:line-numbers
#include <iostream>
using namespace std;
void merge_sort(int[], int, int);  //divide
void merge2(int[], int, int, int); //conquer
int n;  //序列n個元素

int main(){
    int i;
    cin>>n;
    int arr[n];
    for(i=0; i<n; i++)
        cin>>arr[i];
    merge_sort(arr, 0, n-1);
    return 0;
}

// 把陣列分成兩段 A[] B[]
// A是 [L...mid]
// B是 [mid+1...R]
void merge2(int arr[], int L, int mid, int R){
    int i,j,k;
    int lenA = mid - L + 1;
    int lenB = R - (mid + 1) + 1;
    int A[lenA];
    int B[lenB];
    //把前半複製到暫時陣列A[] 後半複製到暫時陣列B[]
    for(i = 0; i < lenA; i++){
        A[i] = arr[L + i];
    }
    for(j = 0; j < lenB; j++){
        B[j] = arr[mid + 1 + j];
    }
    //A[] B[]依序比大，比較小的依序放進arr[]
    i = 0; j = 0; k = L;
    while(i < lenA && j < lenB){
        if(A[i] < B[j]){
            arr[k] = A[i];
            i++;
        }
        else{
            arr[k] = B[j];
            j++;
        }
        k++;
    }
    //把A[]剩下的依序複製到arr[]
    while(i < lenA){
        arr[k] = A[i];
        i++;
        k++;
    }
    //把B[]剩下的依序複製到arr[]
    while(j < lenB){
        arr[k] = B[j];
        j++;
        k++;
    }
    //輸出合併後的完整arr[]陣列
    for(i=0; i<n; i++)
        cout<<arr[i]<<" ";
    cout<<"\n";
}

void merge_sort(int arr[], int l, int r){
    if(l < r){
        int m = (l + r) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m+1, r);
        merge2(arr, l, m, r);
    }
}
```

</CppRunner>

**測試輸入：**
```
7
6 5 7 1 4 2 3
```
**預期輸出（每次合併後顯示）：**
```
5 6 5 6 7 1 4 2 3
1 7 5 6 1 7 2 4 2 3
...
1 2 3 4 5 6 7
```

---

## 四、時間複雜度

| 情況 | 時間複雜度 | 說明 |
|:---|:---:|:---|
| 最佳 / 平均 / 最壞 | **O(n log n)** | 每次均分，log n 層，每層 O(n) |
| 空間複雜度 | O(n) | 需要額外的暫存陣列 |

::: tip 與其他排序法比較
合併排序在**最壞情況下仍保證 O(n log n)**，不像快速排序在極端情況下退化為 O(n²)。缺點是需要 O(n) 的額外記憶體。
:::
