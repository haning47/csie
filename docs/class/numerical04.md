---
outline: deep
---

# 4. 漸進式 - 求次方

[0101漸近式求指數.cpp](https://www.onlinegdb.com/TEkt2472T)

寫一程式，以便能快速求得 $x^n$，設 $x=2.7$，$n$ 為任意正整數。

註：若將 $n$ 以二進位表示為 $a_m a_{m-1} \cdots a_0$（$n = a_m 2^m + a_{m-1} 2^{m-1} + \cdots + a_1 2 + a_0$）

則 $x^n = x^{a_m 2^m} x^{a_{m-1} 2^{m-1}} \cdots x^{a_1 2} x^{a_0}$，所以如果能依序求出 $a_0, a_1, a_2, \cdots, a_m$，則可在 $m$ 步裏算出 $x^n$，這裏的 $m$ 並不需要預先知道。

**解：**

$$\begin{aligned}
x^n &= x^{a_m 2^m} x^{a_{m-1} 2^{m-1}} \cdots x^{a_1 2} x^{a_0} \\
&= \Bigl(\Bigl(\bigl((x^{a_m})^2 x^{a_{m-1}}\bigr)^2 x^{a_{m-2}}\Bigr)^2 x^{a_{m-3}}\Bigr)^2 \cdots x^{a_0} \\[8pt]
&\text{令 } p = x^{a_m} \\
&\text{重覆 } m \to 1 \text{ 次} \\
&\quad p = p^2 \cdot x^{a_{m-i}}
\end{aligned}$$

**例：** 求 $x^{11}$

**解：**

$$\begin{aligned}
x^{11} &= x^{1011_2} \\
&= x^{1 \cdot 2^3} x^{0 \cdot 2^2} x^{1 \cdot 2^1} x^{1 \cdot 2^0} \\
&= \Bigl(\bigl((x^1)^2 \cdot x^0\bigr)^2 \cdot x^1\Bigr)^2 \cdot x^1
\end{aligned}$$

**驗算：**

$$\begin{aligned}
&\Bigl(\bigl((x^1)^2 \cdot x^0\bigr)^2 \cdot x^1\Bigr)^2 \cdot x^1 \\
&= \bigl((x^2 \cdot 1)^2 \cdot x^1\bigr)^2 \cdot x^1 \\
&= (x^4 \cdot x^1)^2 \cdot x^1 \\
&= (x^5)^2 \cdot x^1 \\
&= x^{10} \cdot x^1 \\
&= x^{11}
\end{aligned}$$

**指數律**

$$x^{ab} = (x^a)^b$$

$$x^{a+b} = x^a \cdot x^b$$
<CppRunner has-stdin>

```cpp:line-numbers
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> b2;
    int p=1,x,n,a,i=0;
    cin >>x>>n;             //輸入x的n次方

    while(n>>i){            //將整數轉成2進位
         b2.push((n>>i)&1); //每次右移一位，做&1運算，取出最後那位的2進位數
         i++;
    }

    while(!b2.empty()){
        a=b2.top()? x : 1; //如果2進位值是1就乘以x的1次方(x), 否則乘以x的0次方(1)
        p*=p*a; // 重覆b2長度次p=p平方*a
        b2.pop();
    }
    cout <<p;
    return 0;
}
```

</CppRunner>

