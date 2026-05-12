---
outline: deep
---

# 2. 漸進式 - 排列組合

## 2-1 由 $n$ 個數中選出 $r$ 個數字排列組合的數值${}_nC_r$ 

設有 $a, b, c$ 三個數字，我們從中取 2 個數字組成 $ab$、$ac$ 與 $bc$ 三個數字組。通常我們將這種由 $n$ 個數字選出 $r$ 個數字組的數寫成 ${}_nC_r$，並定義成下列的式子。而此處的 $n!$ 為 $n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1$ 的值。$C$ 則為 Combination 的首個字母。

$$_nC_r = \frac{n!}{r!\,(n-r)!}$$

如直接這樣計算下去，對於大的 $n$ 值而言，$n!$ 會有發生溢位的危險。如下列例子：

$$_{10}C_5 = \frac{10!}{5!\cdot 5!} = \frac{3628800}{120 \cdot 120} = 252$$

結果計算出來的值即使沒有溢位，但如為 int 型態時，則在 $10!$ 時會發生溢位。

${}_nC_r$ 也可寫成：

$$\left\{\begin{array}{ll}
{}_nC_r = \dfrac{n-r+1}{r} \cdot {}_nC_{r-1} & \text{（漸進式）} \\[10pt]
{}_nC_0 = 1 & \text{（0次的值）}
\end{array}\right.$$

**公式說明**  

$$\begin{aligned}
C_{r-1}^n &= \frac{n!}{(r-1)!(n-r+1)!}  \\
C_r^n &= \frac{n!}{r!(n-r)!} = \frac{n-r+1}{r} \cdot C_{r-1}^n
\end{aligned}$$

漸進式是指定義本身（${}_nC_r$）時，以低於本身 1 次的（${}_nC_{r-1}$）來標示，而 0 次（${}_nC_0$）則定義成終止條件值。

實作漸進式程式時，可使用迴圈或遞迴。以下範例使用迴圈方式，先將 0 次的值設定成初始值 1，再將係數（$(n-r+1)/r$）的 $r$ 值由 1 開始反覆 +1，然後依序計算。


<img src="/img/fig5-1.png" style="width:60%; display:block; margin:0 auto">

使用這個方法，避免計算過程中溢位。

**程式**

<CppRunner>

```cpp:line-numbers
/* 漸進式(nCr排列組合的計算) */
#include <bits/stdc++.h>
using namespace std;
int combi(int,int);
int main()
{
    for (int n=0;n<=5;n++) {
        for (int r=0;r<=n;r++)
            printf("%dC%d=%2d  ",n,r,combi(n,r));
        printf("\n");
    }
}
int combi(int n,int r)
{
    int p=1;
    for (int i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
}

```

</CppRunner>

**執行結果**

```
0C0= 1  
1C0= 1  1C1= 1  
2C0= 1  2C1= 2  2C2= 1  
3C0= 1  3C1= 3  3C2= 3  3C3= 1  
4C0= 1  4C1= 4  4C2= 6  4C3= 4  4C4= 1  
5C0= 1  5C1= 5  5C2=10  5C3=10  5C4= 5  5C5= 1  
```

## 2-2 漸進式求巴斯卡三角形。
${}_nC_r$ 可排成下列圖形，這種圖形稱為 Pascal 三角形。

![巴斯卡三角形](/img/fig2-4.png){width=400}
**程式** 

<CppRunner>

```cpp:line-numbers
/*漸進式求 Pascal 三角形*/
#include<iostream>
#include<iomanip>
#define HEIGHT 5  //設定層數 
using namespace std;
int combi(int,int);
int main() {
    for(int n=0;n<=HEIGHT;n++) {
        cout<<setw((HEIGHT-n)*3)<<""; //每列前面的空白
        for(int r=0;r<=n;r++)
        	cout<<setw(6)<<combi(n,r); //數字寬度為空白乘數的2倍
        cout<<"\n";
    }
    return 0;
}
int combi(int n,int r){
    int p=1;
    for(int i=1;i<=r;i++)
        p=p*(n-i+1)/ i;
    return p;
}
```

</CppRunner>


```
                    1
                 1     1
              1     2     1
           1     3     3     1
        1     4     6     4     1
     1     5    10    10     5     1                  
```

###  以遞迴計算 $_nC_r$ 求巴斯卡三角形。

由以上圖形推出，$_nC_r$ 可定義成：

$$\left\{\begin{array}{ll}
{}_nC_r = {}_{n-1}C_{r-1} + {}_{n-1}C_r & (n>r>0) \\[4pt]
{}_rC_0 = {}_rC_r = 1 & (r=0 \text{ 或 } n=r)
\end{array}\right.$$

上列式子如以圖形表示，則為，

<img src="/img/fig8-1.png" style="width:60%; display:block; margin:0 auto">

<p style="text-align:center">Pascal 三角形</p>

$_rC_0=1$ 為 ${}_{n-1}C_{r-1}$ 的終止條件，$_rC_r=1$ 為 ${}_{n-1}C_r$ 的終止條件。

**程式** 

<CppRunner has-stdin>

```cpp:line-numbers
/* nCr 的計算（遞迴版）    */
#include<iostream>
#include<iomanip>
using namespace std;
int Pascal(int,int);
int main(){
	int m,n,r;
	cin >> m;   //輸入層數
	for (n=0;n<=m;n++) {
		cout << setw(3*(m-n))<<"";
		for (r=0;r<=n;r++)
			cout << setw(6)<< Pascal(n,r);
		cout <<endl;
	}
}
int Pascal(int n,int r){
	if (r==0 || r==n)
		return 1;
	else
	 	return Pascal(n-1,r-1)+Pascal(n-1,r);
}


```

</CppRunner>



