---
outline: deep
---

# a5-2　鋪磁磚問題

## ➢ 110-1 新北市資訊學科能力競賽第一題

[110-1 新北市資訊學科能力競賽第一題](https://drive.google.com/file/d/1mi6Zp0Zc47LwX0plmuqx0cJJplyOSm7v/view)

![110-1 新北市 P1 鋪磁磚問題](/img/fig_a5-2-prob110.png)

### 解題策略

- 最後一格是 1：取 n-1 格時的數字
- 最後一格是 2：取 n-2 格時的數字
- 最後一格是 3：取 n-3 格時的數字  
  
$f[0]=1 ;　f[1]=1 ;　f[2]=2$  
$f[i] = f[i-1] + f[i-2] + f[i-3]　(i>=3)$
![解題策略示意圖](/img/fig_a5-2-strategy.png){width=40%}

### DP 解

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n,i;
    long long f[72]={};
    f[0]=1;f[1]=1;f[2]=2;
    cin>>n;
    for (i=3;i<=n;i++){
        f[i]=f[i-1]+f[i-2]+f[i-3];
        //cout <<f[i]<< "\n"; //顯示所有n有幾種
    }
    cout <<f[n];
}
```

</CppRunner>

### 遞迴解

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
long long f(int);

int main(){
    int n,i;
    cin>>n;
    cout <<f(n);
}
long long f(int n){
    if (n==0 || n==1)
        return 1;
    else if (n==2)
        return 2;
    else
        return f(n-1)+f(n-2)+f(n-3);
}
```

</CppRunner>

---

## ➢ 臺北市資訊學科能力競賽 94-3 第三題

### 第三題：鋪磁磚問題（TPE94-3）

**問題敘述**

某學校有一片狹長形狀的畸零地，其寬度、長度分別為 30 公分及 $10n$ 公分（其中 $n$ 為輸入之值，$n$ 為奇數，$n \geq 3$），但在西北角缺了寬度、長度均為 10 公分的一角。現在我們要使用 $\dfrac{3n-1}{2}$ 塊磁磚將此片畸零地鋪滿，每塊磁磚的寬度、長度均為 10 公分及 20 公分，我們想知道共有多少種鋪法。請你撰寫一個程式來求出答案。以下圖為例，當 $n=3$ 時，可看出共有 4 種不同的鋪法。

![n=3 的 4 種鋪法](/img/fig_a5-2-n3tiles.png)

當 $n=5$ 時，由下圖，可看出共有 15 種不同的鋪法。

![n=5 的 15 種鋪法](/img/fig_a5-2-n5tiles.png)

**條件限制**

$n$ 為奇數，$3 \leq n \leq 41$。

**輸入格式**

1. 一律使用鍵盤輸入。
2. 輸入資料共一行，為一個奇數 $n$ 之值。

注意：輸出之整數值可能多達 12 位數。

**範例**

| TilingIn.txt | TilingOut.txt |
|:---:|:---|
| 3 | 4 |
| 5 | 15 |
| 9 | 209 |
| 15 | 10864 |
| 27 | 29354524 |
| 41 | 296011017105 |

### Dynamic Programming Solution

令 $f(n)=$ 完整的，$g(n)=$ 缺角的

$f(n) = f(n-2) + g(n-1) + g(n-1)$

$g(n) = g(n-2) + f(n-1)$

![DP 遞推關係圖](/img/fig_a5-2-dp94-diagram.png)

數學公式推導（很難在短時間導出來）$n$ 為偶數的排法 $f(n)=f(n-2) \times 4 - f(n-4)$

[https://haning47.vercel.app/article/3179b3c2-1935-80c9-99b9-d22b73477761](https://haning47.vercel.app/article/3179b3c2-1935-80c9-99b9-d22b73477761)

### 程式碼

<CppRunner has-stdin>

```cpp:line-numbers
/* A Dynamic Programming Solution */
#include <iostream>
using namespace std;

int main() {
    long long  f[42], g[42];//f(n)完整的  g(n)缺角的
    int n, i, j;
    f[0] = 1; //什麼都不放時算一種完整的
    g[0] = 0; //什麼都不放時不算缺角
    f[1] = 0; //n=1時，不能排出完整
    g[1] = 1; //n=1時，排出一種缺角

    for ( i=2; i<=41; i++ ){
        f[i] = f[i-2] + g[i-1]*2;
        g[i] = g[i-2] + f[i-1];
    }
    while ( cin >> n ) {
        if ( n < 0 ) break;
        cout << g[n] << endl;
    }
    return 0;
}
```

</CppRunner>
