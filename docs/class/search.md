---
outline: deep
---

# 二、搜尋

## 1. 循序搜尋 Linear Search

## 2. 二分搜尋 Binary Search

[視覺化動畫](https://www.cs.usfca.edu/~galles/visualization/Search.html)

## 3. 雜湊（hash）

- 唯一（碰撞處理）
- 平均
- 經函數計算就可找到 data 的位置，不用搜尋

![hash 示意圖](/img/search-hash-diagram.png){width=90%}

[簡單 Hash Table 介紹](https://blog.techbridge.cc/2017/01/21/simple-hash-table-intro/)

---

## 用 Hash Table 來解一題簡單的演算法題目

我們先看個題目 - [Two Sum](https://leetcode.com/problems/two-sum/)，假設我們有一個 array，裡面儲存了一些數字，假設我有一個想要找到的數字 target，請找出 array 中兩個數字的 index，這兩個數字的和必須跟 target 一樣。
>[!IMPORTANT] 說明
>假設有 `nums = [2, 7, 11, 15]`，`target = 9`  
>因為 `nums[0] + nums[1] = 2 + 7 = 9`，回傳 `[0, 1]`

最直觀的作法是用兩層 for 迴圈，跑過所有可能的組合就可以了，但如果我們被要求只能用 O(n) 複雜度的演算法解出這題要怎麼辦呢。

### 0208two sum_brute.cpp（暴力法）

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
using namespace std;
int main(){
    int target,n,i,j;
    cin>>n;
    int nums[n];
    for(int i=0;i<n;i++) cin>>nums[i];  //input n nums
    cin>> target;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if( nums[i]+nums[j]==target )
                cout<<i<<" "<<j;
        }
    }
}
```

</CppRunner>

### 0208two sum_hash.cpp（雜湊）

[unorder_map](https://www.geeksforgeeks.org/cpp/map-vs-unordered_map-c/)

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<unordered_map>
using namespace std;
int main(){
    int target,n,i;
    unordered_map<int, int> table;
    cin>>n;
    int nums[n];
    for(int i=0;i<n;i++) cin>>nums[i];  //input n nums
    cin>> target;
    for(int i = 0; i < n; i++) {
        // If not in the table, insert the index
        if( table.find( target - nums[i] ) == table.end() )
            table[ nums[i] ] = i;
        else
            cout<< table[target - nums[i]] <<" " << i <<"\n";
    }
}
```

</CppRunner>

LeetCode [https://leetcode.com/problemset/](https://leetcode.com/problemset/)

LeetCode 程式寫法 [1103leetcode_twosum_map_3ms.cpp](https://www.onlinegdb.com/x_c_Qb_iI)

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<vector>
#include<map>
#include<unordered_map>
using namespace std;
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> table;
        vector<int> ans;
        for(int i = 0; i < nums.size(); i++){
            if(table.find(target-nums[i]) == table.end()) //沒找到把num[i],i放進table
                table[ nums[i] ] = i;
            else {
                ans.push_back(table[target-nums[i]]); //找到把table[target-nums[i]],i 放進ans
                ans.push_back(i);
            }
        }
        return ans;
    }
};
int main(){
    //vector<int> a={2,7,10,14},b;
    vector<int> a,b;
    int n,m,t;
    cin>>n;    //有n個數字
    for(int i=0 ;i<n;i++){
        cin>>m;       //輸入n個數字
        a.push_back(m);
    }
    cin>>t;  //輸入目標值
    b=Solution().twoSum(a,t);
    for(int i=0;i<b.size();i++)cout<<b[i]<<" ";
}
```

</CppRunner>

---

### 前綴和

O(1) 的解法：`presum[i] = presum[i-1] + nums[i]`

- [560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) [參考解法](https://hackmd.io/@meyr543/Bk2Nd21AY)
- [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) [參考解法](https://hackmd.io/@bangyewu/rJRpH9dhh)
