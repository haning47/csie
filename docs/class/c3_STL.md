---
outline: deep
---
# c3. STL 介紹

## [STL 的定義](https://www.geeksforgeeks.org/cpp/the-c-standard-template-library-stl/)

STL 原文為 Standard Template Library，是 C++ 標準程式庫的一部分，其中包含 3 個常用元件，分別為演算法（algorithms）、容器（containers）、疊代器（iterators）。

## 一、 [STL Container](https://jasonblog.github.io/note/c++/stl_rong_qi_4e0029_-_ji_ben_jie_shao.html) 整理

### 序列式容器 (Sequence Containers)

| **方法** | [**vector**](https://zh.wikipedia.org/wiki/Vector_%28STL%29) | **stack** | **queue** | [**deque**](https://shengyu7697.github.io/std-deque/) | **priority_queue** |
|---|---|---|---|---|---|
| `push_back()` | ✅ | | | ✅ | |
| `push()` | | ✅ | ✅ | | ✅ |
| `pop_back()` | ✅ | | | ✅ | |
| `pop()` | | ✅ | ✅ | | ✅ |
| `emplace_back()` | ✅ | | | ✅ | |
| `emplace()` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `emplace_front()` | | | | ✅ | |
| `insert()` | ✅ | | | ✅ | |
| `erase()` | ✅ | | | ✅ | |
| `front()` | ✅ | | ✅ | ✅ | ✅ |
| `back()` | ✅ | ✅ | ✅ | ✅ | |
| `top()` | | ✅ | | | ✅ |
| `at(i)` | ✅ | | | ✅ | |
| `operator[]` | ✅ | | | ✅ | |
| `size()` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `empty()` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `clear()` | ✅ | | | ✅ | |

### 關聯式容器 (Associative Containers)

| **方法** | [**map**](https://www.mropengate.com/2015/12/cc-map-stl.html) | **unordered_map** | [**set**](https://shengyu7697.github.io/std-set/) | **multiset** | **pair** |
|---|---|---|---|---|---|
| `insert()` | ✅ | ✅ | ✅ | ✅ | |
| `emplace()` | ✅ | ✅ | ✅ | ✅ | |
| `emplace_hint()` | ✅ | | ✅ | ✅ | |
| `erase()` | ✅ | ✅ | ✅ | ✅ | |
| `clear()` | ✅ | ✅ | ✅ | ✅ | |
| `size()` | ✅ | ✅ | ✅ | ✅ | |
| `empty()` | ✅ | ✅ | ✅ | ✅ | |
| `find()` | ✅ | ✅ | ✅ | ✅ | |
| `count()` | ✅ | ✅ | ✅ | ✅ | |
| `[]` | ✅ | ✅ | | | |
| `at(key)` | ✅ | ✅ | | | |
| `begin()/end()` | ✅ | ✅ | ✅ | ✅ | |
| `first` | | | | | ✅ |
| `second` | | | | | ✅ |
| `make_pair()` | | | | | ✅ |
| `swap(p1,p2)` | | | | | ✅ |
| 比較運算 `<,==,!=...` | | | | | ✅ |

- set 和 vector 的不同：唯一的、不可修改、有序性。multiset 元素可重覆
- `emplace`，效率高於 `insert` 和 `push`
- map 依 key 排序（紅黑樹），unordered_map 不排序（hash）。查找效率 map O(log n)、unordered_map O(1)、set/multiset O(log n)
- pair 可比較，先比 first 再比 second
- stack、queue、priority_queue 不能用範圍型 for 走訪 `for(auto &i:s)`

### emplace 用法

| **容器** | **方法** | **說明** |
|---|---|---|
| **vector** | `emplace_back(val)` | 在尾端插入（最常用）|
| | `emplace(pos, val)` | 在指定位置插入 |
| **deque** | `emplace_back(val)` | 在尾端插入 |
| | `emplace_front(val)` | 在前端插入 |
| | `emplace(pos, val)` | 在指定位置插入 |
| **list** | `emplace_back(val)` | 在尾端插入 |
| | `emplace_front(val)` | 在前端插入 |
| | `emplace(pos, val)` | 在指定位置插入 |
| **set / multiset** | `emplace(val)` | 位置由排序規則決定 |
| **map / multimap** | `emplace(key, val)` | 插入一個 pair，位置由排序規則決定 |
| **unordered_set / unordered_map** | `emplace(val)` | 位置由 hash 決定 |
| **stack / queue / priority_queue** | `emplace(val)` | 在頂端或尾端插入，無 pos 參數 |

`pos` 指定位置

```cpp
v.emplace(v.begin(), 50);  // 在 vector 開頭插入 50
pq.emplace(37);            // 在 priority_queue 插入 37
```

---

### 1. Vector

#### 一維 

<details><summary>程式展開</summary>
[1009vector.cpp]
<CppRunner>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;
int main(){
    int i,arr[10]={1,2,3,4,5,6,7};    //初始化陣列
    for(auto i:arr) cout<<i;cout <<"\n";

    //使用陣列型式 vector
    vector<int> vec(10,2);      //初始化，10個元素都設定為2
    for(auto i:vec) cout<<i; cout <<"\n";

    vector<int> vec1(arr,arr+10); //使用陣列來建構vector
    for(auto i:vec1) cout<<i; cout <<"\n";

    vector<int> vec2(arr+3,arr+7); //使用陣列某範圍來建構vector
    for(auto i:vec2) cout<<i; cout <<"\n";

    vector<int> vec3; //陣列複製
    vec3=vec1;
    for(auto i:vec3) cout<<i;cout <<"\n";

    vector<int> v={10,20,30};
    v.push_back(40);
    v.emplace(v.begin(),50);
    v.emplace(v.end(),60);    //emplace(指定位置，插入值)
    for(auto &i:v) cout<<i<<" ";
    v.erase(v.begin());       //刪掉第一個元素
    v.erase(v.begin()+1);     //刪除第二個元素
    v.clear();                //清空
    cout<<"\n"<<v.size()<<"\n";    //vector長度 0

    int n=10;
    vector<int> va(n);        //當陣列來用va[10]
    for (int i=0 ;i<10;i++)
        va[i]=i;
    for(auto i:va) cout<<i;cout <<"\n";

    vector<int> vn;           //沒有設定長度
    for (int i=0 ;i<10;i++)
        vn.push_back(i);      //需用push_back
    for(auto i:vn) cout<<i;

    cout<<"\n";
    vector<int>::iterator itv=vn.begin(); //itv是vn的iterator 設定在開始元素
    cout <<*itv<<" ";     // 0 各種顯示開始元素的方法
    cout<<vn.at(0)<<" "; // 0
    cout<<vn[0]<<" ";    // 0
    auto itv2=prev(vn.end()); //用auto型態，取最後一個元素
    //cout<<vn.back();
    cout<<*itv2;
    cout<<"\n";
}
```

</CppRunner>


**輸出：**

```
1234567000
2222222222
1234567000
4567
1234567000
50 10 20 30 40 60
0
0123456789
0123456789
0 0 9
```

**`end()`** 是容器結尾的下一個位置。取最後一個元素可以用 **`vn.back()`**
</details>

#### 二維 
<details><summary>程式展開</summary>
[1009vector二維.cpp]
<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<vector>
using namespace std;
int main(){
    int a,k1,k2;
    cin>>k1>>k2;    //輸入k1列 k2欄
    vector<vector<int>> v1(k1);                     //設定列數，沒有設定欄位長度
    vector<vector<int>> v2(k1,vector<int>(k2));     //列欄都設定可當做陣列
    for(int i=0;i<k1;i++)
        for(int j=0;j<k2;j++){
            cin>>a;
            v1[i].push_back(a); //沒有設定每列長度需用push_back()
        }
    for(int i=0;i<k1;i++){
        for(int j=0;j<k2;j++)
            v2[i][j]=i;
    }
    cout<<"\nv1\n";
    for(auto &i:v1){
        for(auto &j:i)
            cout<<j<<"\t";
        cout<<"\n";
    }
    cout<<"\nv2\n";
    for(auto &i:v2){
        for(auto &j:i)
            cout<<j<<"\t";
        cout<<"\n";
    }
}
```

</CppRunner>


**輸出（輸入 2 3，再輸入 1 2 3 4 5 6）：**

```
v1
1       2       3
4       5       6

v2
0       0       0
1       1       1
```

✅ 正確：`vector<vector<int>> v2(5,vector<int>(10));`

❌ 錯誤：`vector<vector<int>> v2(5,10);`

每列未設定長度時，需要用 `push_back(a)` 輸入值

❌ 錯誤範例：

```cpp
vector<int> v1[k1];
v1[0][1]=3;  // 未設定每列長度，不能直接用索引賦值
```
</details>

#### Vector 的傳遞 - Call By Reference

>傳遞時加上 `&` 不用複製可以節省時間


<details><summary>程式展開</summary>

<CppRunner has-stdin>

```cpp:line-numbers
/* Vector傳遞 */
#include<iostream>
#include<vector>

using namespace std;

void one(vector <int> &);        //一維陣列
void two(vector<vector<int>> &); //二維陣列

int main(){
    vector <int> vec1;
    vec1.push_back(10);
    vec1.push_back(20);
    cout<< vec1[0] << " "; //輸出vec1的第1個元素
    one(vec1);

    int n;
    cin>>n;
    vector <vector<int>> vec2(n);   //設定vec2的row數
    vec2[0].push_back(1000);
    vec2[1].push_back(2000);
    cout << vec2[0][0] << " "; //輸出vec2的[0][0]元素 --1000
    two(vec2);
}

void one(vector <int> &p1){
    cout<< p1[1] << "\n"; //輸出vec1的第2個元素
}

void two(vector<vector<int>> &p2){
    cout<< p2[1][0];  //輸出vec2的[1][0]元素--2000
}
```

</CppRunner>


**輸出（輸入 n=2）：**  
輸出 vec1[0] vec1[1]  
輸入二維 vec2的row數為2   
輸出 vec2[0][0]  vec2[1][0]

```
10 20
2
1000 2000
```
</details>

#### vector宣告技巧 - reserve

<CppRunner has-stdin wrap>

```cpp:line-numbers
int n;
cin >> n;
vector<int> v;    // 宣告空 vector 
//vector<int> v(n); //如果宣告n格，再push會從n+1開始輸入 
v.reserve(n);     // ✅ 預留 n 個人的座位，但此時裡面還沒有人（長度為 0）
for (int i = 0; i < n; i++) {
    int temp;
    cin >> temp;
    v.push_back(temp); // ✅ 正確：依序從第 0 個位置放進去，長度慢慢變成 n
}
for(auto &i:v) cout << i << " ";
//輸入 3  10 20 30
```

</CppRunner>



### 2. set / multiset

set 元素不重復，multiset 可重覆。皆有排序

<CppRunner wrap>

```cpp:line-numbers
set <int> s{6,2,3,4,10};
set<int>::iterator it;
s.insert(3); //重覆插入時 set中的元素不會重覆
for(auto &i:s) cout<<i<<" "; // 2 3 4 6 10 有排序
cout << "\n";
cout << s.count(3)<<"\n";    // 1 判斷元素是否存在（1或0）
cout << *s.find(2)<<"\n";    // 2 找到回傳要找的值
cout << *s.find(1)<<"\n";    // 5 沒找到回傳陣列長度
it=prev(s.end());
cout <<*it<<"\n";             // 10 最後一個元素
```

</CppRunner>


**輸出：**

```
2 3 4 6 10
1
2
5
10
```

<CppRunner wrap>

```cpp:line-numbers
multiset <int> ms{6,1,2,3,4,5};
ms.insert(3);
ms.emplace(3);
for(auto &i:ms) cout<<i<<" "; // 1 2 3 3 3 4 5 6 有重覆的元素
```

</CppRunner>


**輸出：**

```
1 2 3 3 3 4 5 6
```

---

### 3. stack

<CppRunner wrap>

```cpp:line-numbers
stack<int> st;
st.push(10);    // 壓入元素
st.push(20);
st.push(30);
cout << "目前堆疊大小：" << st.size() << "\n";
cout << "堆疊頂端元素：" << st.top() << "\n";
if(!st.empty()) st.pop();     // 堆疊不為空時，移除頂端元素★
cout << "移除後頂端元素：" << st.top() << "\n";
```

</CppRunner>


**輸出：**

```
目前堆疊大小：3
堆疊頂端元素：30
移除後頂端元素：20
```

---

### 4. queue / priority_queue、deque

<CppRunner wrap>

```cpp:line-numbers
queue <int> q;
for(int i=2;i<11;i++) q.push(i);
cout<<q.front()<<" ";   //2
cout<<q.back()<<"\n";   //10
q.pop(); //只能操作前端，不能用 for( auto &i:q)
```

</CppRunner>


**輸出：**

```
2 10
```

`priority_queue` 的 `top` 是最大的元素

<CppRunner wrap>

```cpp:line-numbers
priority_queue<int> pq;
pq.push(10);
pq.emplace(37);
cout<<pq.top()<<"\n"; //37
```

</CppRunner>


**輸出：**

```
37
```

雙佇列 (double-ended queue)

<CppRunner wrap>

```cpp:line-numbers
deque <int> dq={1,2,5,10};    //deque比queue靈活
dq.push_back(100);dq.push_back(200);dq.push_front(300);
cout<<dq[3]<<" ";    //可以取中間的值
cout <<dq.front()<<"\n";
for( auto &i:dq) cout <<i<<" "; //可以用範圍型for走訪
```

</CppRunner>


**輸出：**

```
5 300
300 1 2 5 10 100 200
```

---

### 5. map / unordered_map

`map[key]=value`  
各種把值放進 map 的方法

<CppRunner wrap>

```cpp:line-numbers
map <string,int> m;     //各種把值放進map的方法
pair <string,int> a,b;
m["Apple"]=15;
m["Banana"]=18;
m["lion"]=0;
a.first="cat";a.second=5;
b=make_pair("stone",9);
m.insert({a});
m.insert({b});
m.insert({"flower",22});
m.insert(pair<string,int>("dog",10));
m.emplace("peach",13);
for (auto &i:m)
    cout <<i.first<<i.second<<"\n";
cout<<m["dog"]<<" ";     //找到dog 顯示值的2種方式
cout<<m.find("dog")->second<<"\n";
if (m.find("pig")==m.end()) cout<<"pig找不到";
```

</CppRunner>


**輸出：**

```
Apple15
Banana18
cat5
dog10
flower22
lion0
peach13
stone9
10 10
pig找不到
```

- map 會key由小到大排序,若要大到小在宣告時寫 `map<int, string, greater<int>> myMap`
- 找不到此項目時值等於 0。有可能某項目的值正好為 0，因此不能以值為 0 來判斷找不到
- 要判斷是否找到用 `find(值)==end`，例如 `if (m.find("pig")==m.end())`
- unordered_map 用法與 map 相同，但不排序
- map（紅黑樹）unordered_map（hash）

### 6. pair
>**應用範例**
1. 二維平面上的「座標點 $(x, y)$」  
在圖論、幾何題目或 APCS 中，我們經常要處理平面上的很多個點。
```cpp
// 🚀 完美：用 pair 組合出一個點
pair<int, int> point = {3, 5}; // 代表座標 (3, 5)

// 如果有 100 個點，直接開一個 vector 裝它們
vector<pair<int, int>> points;
```
2. 同時有「分數」與「編號」的排序問題  
有 5 位選手要依照「分數從高到低」排序，如果分數一樣，就依照「編號從小到大」排序。
pair預設會先比第一個元素（first），如果一樣，再自動去比第二個元素（second  
但內建無法做到 first升冪  second降冪，因此將編號改為負數 
<CppRunner>

```cpp:line-numbers
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // pair 格式：{分數, 學生編號} vector是一維(非二維)在記憶體中是連續空間，速度快
    vector<pair<int, int>> students = {
        {85, -3},
        {95, -1},
        {85, -2}, // 跟學號 3 一樣是 85 分
        {100, -4}
    };
    // pair 在 sort時，會先比 first 再比 second  
    // 因為我們要分數從大到小，所以加 greater (降冪)
    sort(students.begin(), students.end(), greater());

    for (auto s : students) {
        cout << "學號: " << -s.second << ", 分數: " << s.first << "\n";
    }
}
```
</CppRunner>

## 二、 [STL Algorithm](https://www.geeksforgeeks.org/cpp/c-magicians-stl-algorithms/) | [ref.](https://en.cppreference.com/w/cpp/algorithm.html)

### 1. [swap](https://www.geeksforgeeks.org/cpp/swap-in-cpp/)(a, b) 交換2數

### 2. [find](https://www.geeksforgeeks.org/cpp/std-find-in-cpp/)(first, last, Value) 找某數

<CppRunner wrap>

```cpp:line-numbers
int a[]={10,9,8,7,6};
auto it = find(a, a + 5, 8); //8的位置
cout<<it-a;   //2
```

</CppRunner>


### 3. [replace](https://www.geeksforgeeks.org/cpp/stdreplace-stdreplace_if-c/)(first, last, old_val, new_val)
<CppRunner wrap>

``` cpp:line-numbers
vector<int> v = {1, 0, 3, 0, 5, 0};
    //把 v 裡面所有的 0 換成 2
    replace(v.begin(), v.end(), 0, 2);
    // 此時 v 會變成：{1, 2, 3, 2, 5, 2}
    for( auto i:v) cout <<i<<" ";
```
</CppRunner>

### 4. [sort](https://www.geeksforgeeks.org/cpp/sort-c-stl/)(first, last)

陣列型

<CppRunner wrap>

```cpp:line-numbers
int a[]={3,5,7,2,4,35,21,0,8,9};
sort(a,a+10);
for (auto &i :a ) cout << i <<" ";
```

</CppRunner>


vector 型

<CppRunner wrap>

```cpp:line-numbers
vector<int> a={1,7,6,4,5,3,7,8,9,0};
sort(a.begin(),a.end());
for (auto &i :a ) cout << i <<" ";
```

</CppRunner>


### 5. [min](https://www.geeksforgeeks.org/cpp/stdmin-in-cpp/)(a, b)、[max](https://www.geeksforgeeks.org/cpp/stdmax-in-cpp/)(a, b)、min({a, b, c})、max({a, b, c})

<CppRunner wrap>

```cpp:line-numbers
int a=5,b=6,c=10,d=2;
cout << min ( {a,b,c,d});

```

</CppRunner>


### 6. [min_element](https://www.geeksforgeeks.org/cpp/stdmin_element-in-cpp/)(first, last)、[max_element](https://www.geeksforgeeks.org/cpp/max_element-in-cpp/)(first, last)

陣列型

<CppRunner wrap>

```cpp:line-numbers
int a[]={8,7,6,4,5,3,7,8,9,20};
cout<<*min_element(a,a+10);        //3 陣列中最小值
cout<<min_element(a,a+10)-a;       //5 最小值出現的位置
```

</CppRunner>


vector 型

<CppRunner wrap>

```cpp:line-numbers
vector<int> a={8,7,6,4,5,3,7,8,9,20};
cout<<*min_element(a.begin(),a.end());             //3 陣列中最小值
cout<<min_element(a.begin(),a.end())-a.begin();    //5 最小值出現的位置
```

</CppRunner>


### 7. [nth_element](https://www.geeksforgeeks.org/cpp/stdnth_element-in-cpp/)(first, nth_pos, last) 找第k小的數字

<CppRunner wrap>

```cpp:line-numbers
int a[]={3,5,7,2,4,11,13,0,8,9};
nth_element(a,a+6,a+10);
```

</CppRunner>


第 6 小是 8，在 8 的左邊比 8 小，右邊比 8 大，但左右兩邊的數並不排序

**輸出：** `4 0 3 2 7 5 8 9 13 11`

### 8. [unique](https://www.geeksforgeeks.org/cpp/stdunique-in-cpp/)(first, last) **相鄰**一樣的數過濾到只剩1個

<CppRunner wrap>

```cpp:line-numbers
int a[]={8,7,6,4,5,3,7,8,3,4,7,7,8,9,20};
sort(a,a+15);       //sort後相同的元素會相鄰
auto k=unique(a,a+15); //傳回過濾後end()位置即 a+8
cout <<"陣列中元素個數"<<k-a<<"\n"; //或*k+1 (*k=7)
for(int i=0;i<k-a;i++) cout<<a[i]<<" ";
```

</CppRunner>


**輸出：**

```
陣列中元素個數8
3 4 5 6 7 8 9 20
```

第 8 個數之後的值無意義

### 9. [next_permutation](https://www.geeksforgeeks.org/cpp/stdnext_permutation-prev_permutation-c/)(first, last) 排列 123→321

next：把目前的序列，改成字典序（Alphabetical Order）中下一個更大的排列。  
prev：把目前的序列，改成字典序（Alphabetical Order）中下一個更小的排列。
`next_permutation(first, last)` 排列 123→321  
`prev_permutation(first, last)` 排列 321→123
<CppRunner wrap>

```cpp:line-numbers
    //vector<int> v = {3, 2, 1}; // 從最大的排列開始 prev   
    vector<int> v = {1, 2, 3}; // 從最小的排列開始 next
    do {
        for (int x : v)  cout << x << " ";  //印出目前的排列 
        cout << "\n";  
    } 
    //while (prev_permutation(v.begin(), v.end())); // 切換成下一個更小的排列
    while (next_permutation(v.begin(), v.end())); // 切換成下一個更大的排列
```

</CppRunner>




### 10. [lower_bound](https://www.geeksforgeeks.org/cpp/lower_bound-in-cpp/)、[upper_bound](https://www.geeksforgeeks.org/cpp/upper_bound-in-cpp/)

自定義 `cmp` 函數可省略

- `lower_bound(first, last, val, cmp)` 找出範圍中第一個 `>=val` 的數
- `upper_bound(first, last, val, cmp)` 找出範圍中第一個 `>val` 的數

---

## 三、 [STL Numeric](https://www.geeksforgeeks.org/cpp/numeric-library-c-stl/) | [ref.](https://en.cppreference.com/w/cpp/numeric.html)

### 1. [accumulate](https://www.geeksforgeeks.org/cpp/accumulate-and-partial_sum-in-c-stl-numeric-header/)(first, last, init_value) 給定初始值，陣列全部相加

`0ll` ll表示要定義初始值型態為 `long long` 設定初始值=0

<CppRunner wrap>

```cpp:line-numbers
int a[]={1,2,3,4,5};
int l=sizeof(a)/sizeof(a[0]);
cout<<accumulate(a,a+l,0ll);    //15
```

</CppRunner>


### 2. [iota](https://www.geeksforgeeks.org/cpp/std-iota-in-cpp/)(first, last, init_value) 給定的範圍中填入一段連續的數字

陣列長度 `l`，初始值設定 11

<CppRunner wrap>

```cpp:line-numbers
int a[10];
int l=sizeof(a)/sizeof(a[0]);
iota(a,a+l,11);
```

</CppRunner>


**輸出：** `11 12 13 14 15 16 17 18 19 20`
