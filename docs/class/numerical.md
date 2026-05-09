---
outline: deep
---

# 數值計算篇

## 1. 求多項式函數值

設定 P 為 A(N)
設定 Y 為 X
使用 FOR 迴路（I 由N-1 遞減到0）重覆底下步驟：
　P←P+A(I)＊Y
　Y←Y＊X
輸出 P

在這個計算方法當中，每求一項就要做兩次乘法，總共要做 2n 次乘法，其實另外有一個更快的方法，總共只要做n次乘法就可以了。如果把多項式寫成

$$p(x)=(\cdots((a_n x+a_{n-1})x+\cdots)x+a_{n-1})x+a_n$$

利用以上的式子，由 $a_n$ 開始，每次乘上x後加上下一項的係數，直到乘上x再加上$a_0$，計算就完成了，其演算法則如下：

輸入多項式的次數N
輸入係數值到 A(0), A(1),…, A(N)
輸入變數值到 X
設定 P 為 A(0)
使用FOR迴路（I 由1 遞增到N）重覆底下步驟：
　P←P＊X＋A(I)
輸出 P

程式如下：

```
100 DIM A(10)
200 INPUT "DEG OF POLYNOMIAL";N
210 FOR I=0 TO N
220     INPUT "COEFFICIENT";A(I)
230 NEXT I
240 INPUT "VALUE OF X =";X
300 P=A(0)
310 FOR I=1 TO N
320     P=P*X+A(I)
330 NEXT I
400 PRINT "VALUE OF POLYN AT X =";X;" IS  ";
410 PRINT P
500 END
```

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    double a[100],x,p;
    cin>>n;
    for(int i=0;i<=n;i++) cin>>a[i];
    cin>>x;
    p=a[0];
    for(int i=1;i<=n;i++)
        p=p*x+a[i];
    cout<<"VALUE OF POLYN AT X ="<<x<<" IS "<<p<<"\n";
}
```

</CppRunner>

**範例**：P(x)=x³+3x²+3x+1，輸入次數 3，係數 1 3 3 1，x=1.5

**執行結果**：`VALUE OF POLYN AT X = 1.5 IS 15.625`

---

## 2. 求方程式的根

### 9-2-1 求根的數值問題

一般數值方法以迭代求 f(x)=0，其中 f 是特定的數學函數。求方程式的根，可能計算出實根或複數根。可以先畫圖，觀察大約根的位置，再用數值方法縮小。

二次方程式 $ax^2+bx+c=0$ 的公式解：

$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$

BASIC 語言有內建 SQR 求平方根。若 $b^2-4ac<0$ 則無實根。三次以上方程式沒有通用公式，需先找出根所在區間（一正一負），再反覆縮小。

![圖 9-1 求方程式的根示意圖](/img/fig9-1-root-graph.png)

### 9-2-2 等分法

$f(x_5)$ 與 $f(x_4)$ 異號，所以取 $(x_5, x_4)$，依同樣原則再取 $(x_5, x_4)$，如此繼續下去，漸漸靠近根的確切位置。

演算法則列在下面，其中F表示函數 f，寫程式時可自定，P1、P2表示區間左右兩個端點，P3 表示區間的中點，函數值是否同號以其乘積的正負來決定。注意：演算法則中的 P1 永遠小於 P2。

![圖 9-2 等分法示意圖](/img/fig9-2-bisect-graph.png)

定義函數 F
輸入 P1, P2
若 F(P1)×F(P2)≤0 則做
　若 P2-P1 不夠小時重覆底下步驟：
　　P3=(P1+P2)/2
　　若 F(P1)×F(P3)<0 則假
　　　P2=P3
　　否則假
　　　P1=P3
　重覆到 |P2-P1| 夠小
　輸出 (P1+P2)/2
否則輸出"此區間無根"

```
100 DEF FNPLOY(X)=X*X-2
110 INPUT "SELECT TWO PROPER END POINTS ";P1,P2
120 V1=FNPLOY(P1)
130 V2=FNPLOY(P2)
140 :
150 IF V1*V2>0 THEN GOTO 230
160 WHILE P2-P1>=.000001
170     P3=(P1+P2)/2
180     V3=FNPLOY(P3)
190     IF V1*V3>0 THEN P1=P3:V1=FNPLOY(P1)
            ELSE P2=P3:V2=FNPLOY(P2)
200 WEND
210 PRINT "ROOT IS APPROXIMATELY ";(P1+P2)/2
220 GOTO 240
230 PRINT "NO ROOT IN INTERVAL."
240 END
```

**執行結果**：`SELECT TWO PROPER END POINTS? 1,2` → `ROOT IS APPROXIMATELY 1.414214`

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
double fnploy(double x){ return x*x-2; }
int main(){
    double p1,p2,v1,v2,p3,v3;
    cin>>p1>>p2;
    v1=fnploy(p1);
    v2=fnploy(p2);
    if(v1*v2>0){ cout<<"NO ROOT IN INTERVAL.\n"; return 0; }
    while(p2-p1>=0.000001){
        p3=(p1+p2)/2;
        v3=fnploy(p3);
        if(v1*v3>0){ p1=p3; v1=fnploy(p1); }
        else        { p2=p3; v2=fnploy(p2); }
    }
    cout<<"ROOT IS APPROXIMATELY "<<(p1+p2)/2<<"\n";
}
```

</CppRunner>

### 9-2-3 內插法

內插法不以定義域 X 軸上的 $x_1$, $x_2$ 為出發點，而是考慮函數圖上的兩個點。利用 $(P1,F(P1))$，$(P2,F(P2))$，$(P3,F(P3))$ 三點共線的性質，可求出 P3 的值，其公式為：

$$P3 = P1 - \frac{(P2-P1) \times F(P1)}{F(P2)-F(P1)}$$

雖然內插法中逼近根的過程和等分法很類似，但 P2-P1 卻不一定會趨近於 0，因此不能以 P2-P1 的大小，而是以 P3 變動的大小來控制迴路的繼續執行與否，整個演算法則描述如下：

輸入P1,P2
若 F(P1)×F(P2)≤0 則做
　P3=P1-(P2-P1)×F(P1)/(F(P2)-F(P1))
　若 F(P1)×F(P3)<0 則做
　　P2=P3
　否則做
　　P1=P3
　重覆底下步驟直到 |P4-P3| 相當小：
　　P4=P3
　　P3=P1-(P2-P1)×F(P1)/(F(P2)-F(P1))
　　若 F(P1)×F(P3)<0 則做
　　　P2=P3
　　否則做
　　　P1=P3
　輸出P3
否則輸出"此區間無根"

![圖 9-3 內插法示意圖](/img/fig9-3-interp-graph.png)

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
double f(double x){ return x*x-2; }
int main(){
    double p1,p2,p3,p4;
    cin>>p1>>p2;
    if(f(p1)*f(p2)>0){ cout<<"此區間無根\n"; return 0; }
    p3=p1-(p2-p1)*f(p1)/(f(p2)-f(p1));
    if(f(p1)*f(p3)<0) p2=p3;
    else p1=p3;
    do{
        p4=p3;
        p3=p1-(p2-p1)*f(p1)/(f(p2)-f(p1));
        if(f(p1)*f(p3)<0) p2=p3;
        else p1=p3;
    }while(fabs(p4-p3)>1e-6);
    cout<<p3<<"\n";
}
```

</CppRunner>

---

## 3. 解聯立方程式

$$a_{11}x_1+a_{12}x_2+a_{13}x_3+\cdots+a_{1n}x_n=a_{1,n+1}$$
$$a_{21}x_1+a_{22}x_2+a_{23}x_3+\cdots+a_{2n}x_n=a_{2,n+1}$$
$$a_{31}x_1+a_{32}x_2+a_{33}x_3+\cdots+a_{3n}x_n=a_{3,n+1}$$
$$\vdots$$
$$a_{n1}x_1+a_{n2}x_2+a_{n3}x_3+\cdots+a_{nn}x_n=a_{n,n+1}$$

其中 $a_{ij}$，$1 \le i$，$j \le n$，為輸入的係數；$x_i$，$1 \le i \le n$，為輸出的解。

如果把任一個方程式換成該方程式減去一個常數乘另一個方程式，不會改變聯立方程式的解，例如第 i 個方程式可以改成

$$a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=a_{1,n+1}$$
$$-c(a_{j1}x_1+a_{j2}x_2+\cdots+a_{jn}x_n=a_{j,n+1})$$
$$\overline{(a_{11}-ca_{j1})x_1+(a_{12}-ca_{j2})x_2+\cdots+(a_{1n}-ca_{jn})x_n=a_{1,n+1}-ca_{j,n+1}}$$

利用上述的方法，想辦法把原來的聯立方程式改寫成底下的形式（注意方程式左邊的項數越來越少）：

$$\begin{pmatrix} a_{11} & a_{12} & a_{13} & \cdots & a_{1n} & a_{1,n+1} \\ 0 & a_{22} & a_{23} & \cdots & a_{2n} & a_{2,n+1} \\ 0 & 0 & a_{33} & \cdots & a_{3n} & a_{3,n+1} \\ \vdots & & & \ddots & \vdots & \vdots \\ 0 & 0 & 0 & \cdots & a_{nn} & a_{n,n+1} \end{pmatrix}$$

若以二維陣列 A(N, N+1) 代表係數，而以一維陣列 X(N) 代表聯立方程式的解，演算法則初步構想如下：

輸入係數到陣列A
用FOR迴路（K由1遞增到N-1）重覆底下步驟：
　更改第K+1列到第N列
X(N)=A(N, N+1)/A(N,N)
用FOR迴路（I由N-1遞減到1）重覆底下步驟：
　計算X(I)
輸出陣列X

整個演算法則為：

輸入係數到陣列A
用FOR迴路（K由1遞增到N-1）重覆底下步驟：
　用FOR迴路（I由K+1遞增到N）重覆底下步驟：
　　用FOR迴路（J由K+1遞增到N+1）重覆底下步驟：
　　　A(I,J)=A(I,J)-(A(I,K)/A(K,K))×A(K,J)
X(N)=A(N, N+1)/A(N,N)
用FOR迴路（I由N-1遞減到1）重覆底下步驟：
　SUM=0
　用FOR迴路（J由I+1遞增到N）重覆底下步驟：
　　SUM=SUM+A(I, J)×X(J)
　X(I)=(A(I, N+1)-SUM)/A(I, I)
輸出陣列X

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    double a[20][21],x[20];
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n+1;j++)
            cin>>a[i][j];
    for(int k=1;k<=n-1;k++)
        for(int i=k+1;i<=n;i++)
            for(int j=k+1;j<=n+1;j++)
                a[i][j]=a[i][j]-(a[i][k]/a[k][k])*a[k][j];
    x[n]=a[n][n+1]/a[n][n];
    for(int i=n-1;i>=1;i--){
        double sum=0;
        for(int j=i+1;j<=n;j++)
            sum=sum+a[i][j]*x[j];
        x[i]=(a[i][n+1]-sum)/a[i][i];
    }
    for(int i=1;i<=n;i++)
        cout<<"X("<<i<<")="<<x[i]<<"\n";
}
```

</CppRunner>

---

## 4. 漸近式 9-3數值計算

[0101漸近式求指數.cpp](https://onlinegdb.com/)

寫一程式，以便能快速求得 $x^n$，設x=2.7，n 為任意正整數。

註：若將n以二進位表示為 $a_m a_{m-1}\cdots a_0$（$n=a_m 2^m+a_{m-1}2^{m-1}+\cdots+a_1 2+a_0$）

則 $x^n=x^{a_m 2^m} x^{a_{m-1} 2^{m-1}}\cdots x^{a_1 2} x^{a_0}$，所以如果能依序求出 $a_0,a_1,a_2,\cdots,a_m$，則可在m步裡算出 $x^n$，這裡的m並不需要預先知道。

解：

$$x^n = x^{a_m 2^m} x^{a_{m-1} 2^{m-1}} \cdots x^{a_1 2} x^{a_0}$$

$$= (((( x^{a_m})^2 \cdot x^{a_{m-1}})^2 \cdot x^{a_{m-2}})^2 \cdots x^{a_0}$$

令 $p = x^{a_m}$

重覆m→1次

$p = p^2 \cdot x^{a_{m-1}}$

例：求 $x^{11}$

解：$x^{11} = x^{1011_2} = x^{1\cdot 2^3} x^{0\cdot 2^2} x^{1\cdot 2^1} x^{1\cdot 2^0}$

$= (((x^1)^2 \cdot x^0)^2 \cdot x^1)^2 \cdot x^1$

驗算：
$(((x^1)^2 \cdot x^0)^2 \cdot x^1)^2 \cdot x^1$
$= ((x^2 \cdot 1)^2 \cdot x^1)^2 \cdot x^1$
$= (x^4 \cdot x^1)^2 \cdot x^1$
$= (x^5)^2 \cdot x^1$
$= x^{10} \cdot x^1$
$= x^{11}$

指數律：$x^{ab}=(x^a)^b$，$x^{a+b}=x^a \cdot x^b$

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
int main(){
    double x,p;
    int n,a[100],m=0;
    cin>>x>>n;
    int tmp=n;
    while(tmp>0){ a[m++]=tmp&1; tmp>>=1; }
    // 由高位到低位
    p=(a[m-1]==1)?x:1;
    for(int i=m-2;i>=0;i--){
        p=p*p;
        if(a[i]==1) p*=x;
    }
    cout<<x<<"^"<<n<<"="<<p<<"\n";
}
```

</CppRunner>

---

## 5. 漸近式－排列組合

**例題** 求由a個數字中選取b個數字組合的數量 $_nC_r$，C稱為Combination的首個字母。

$$_nC_r = \frac{n!}{r!(n-r)!}$$

如果直接這樣計算下去，到了大的n值時，n!會發生溢位的危險。

$_nC_r$ 亦可寫成：

$$_nC_r = 1 \cdot \frac{n-1+1}{1} \cdot \frac{n-2+1}{2} \cdot \frac{n-3+1}{3} \cdots \frac{n-r+1}{r}$$

這種漸近式製作成程式，可使用反覆方式或遞迴呼叫（第4章 4-1）等兩種方式。這裡使用反覆方式來製作程式。以反覆方式來製作程式時，須將 0 次的值設定成初始值，再將係數（$(n-r+1)/r$）的r值由1開始反覆+1，然後依序計算。

$$_nC_r=1\cdot\frac{n-1+1}{1}\cdot\frac{n-2+1}{2}\cdot\frac{n-3+1}{3}\cdots\frac{n-r+1}{r}$$

使用這個方法以後，n即使再大也不會溢位了。

**程式** Rei01.c

```c
#include <stdio.h>
long combi(int,int);
void main(void)
{
    int n,r;
    for (n=0;n<=5;n++) {
        for (r=0;r<=n;r++)
            printf("%d C %d=%ld  ",n,r,combi(n,r));
        printf("\n");
    }
    system("PAUSE");
}
long combi(int n,int r)
{
    int i;
    long p=1;
    for (i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
}
```

<CppRunner>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
long combi(int n,int r){
    long p=1;
    for(int i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
}
int main(){
    for(int n=0;n<=5;n++){
        for(int r=0;r<=n;r++)
            cout<<n<<" C "<<r<<"="<<combi(n,r)<<"  ";
        cout<<"\n";
    }
}
```

</CppRunner>

**執行結果**：

```
0 C 0=1
1 C 0=1  1 C 1=1
2 C 0=1  2 C 1=2  2 C 2=1
3 C 0=1  3 C 1=3  3 C 2=3  3 C 3=1
4 C 0=1  4 C 1=4  4 C 2=6  4 C 3=4  4 C 4=1
5 C 0=1  5 C 1=5  5 C 2=10 5 C 3=10 5 C 4=5  5 C 5=1
```

---

## 6. 以 Horner 法求多項式的值

**Horner 法**

以 Horner 法來求多項式 $f(x)=(a_n x+a_{n-1})x+\cdots+a_1)x+a_0$ 的值。

在上面這個計算式中，我們首先求最外面一層的 $f_n=a_n$，各自獨立計算再相加。這個簡單算法也可以這樣寫成：

$$f(x) = (\cdots((a_n x + a_{n-1})x + a_{n-2})x + \cdots + a_1)x + a_0$$

$$\underbrace{f_0}_{}$$

這個算法的具體範例 $a_n=a_5=5, a_4=4, a_3=3, a_2=2, a_1=1, a_0=0$ 的多項式，結果為：

$$f_n = f_5 = a_5$$
$$f_4 = f_5 \times x + a_4$$
$$f_3 = f_4 \times x + a_3$$
$$f_2 = f_3 \times x + a_2$$
$$f_1 = f_2 \times x + a_1$$
$$f_0 = f_1 \times x + a_0$$

將它變成一般式，即為以下的列式：

$$f_{n-1} = f_n \times x + a_{n-1}$$

這種方法稱為 Horner 法，這個方法能以n次的乘法求出n次多項式的值，下面的程式中 a[n]=a_5，對應到的順序為 a[n]→...→a[0]：

**程式** Dr01_1.c（$f(x)=5x^4+4x^3+3x^2+2x+1$，係數 a[]={1,2,3,4,5}）

```c
#include <stdio.h>
double fn(double,double *,int);
void main(void)
{
    static double a[]={1,2,3,4,5};    /* 係數 */
    double x;
    for (x=1;x<=5;x++)
        printf("fn(%f)=%f\n",x,fn(x,a,4));
}
double fn(double x,double a[],int n)
{
    double p;
    int i;
    p=a[n];
    for (i=n-1;i>=0;i--)
        p=p*x+a[i];
    return p;
}
```

<CppRunner has-stdin>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
double fn(double x,double a[],int n){
    double p=a[n];
    for(int i=n-1;i>=0;i--)
        p=p*x+a[i];
    return p;
}
int main(){
    double a[]={1,2,3,4,5};  // f(x)=5x^4+4x^3+3x^2+2x+1
    double x;
    cin>>x;
    cout<<"fn("<<x<<")="<<fn(x,a,4)<<"\n";
}
```

</CppRunner>

**執行結果**：

```
fn(1.000000)=15.000000
fn(2.000000)=129.000000
fn(3.000000)=547.000000
fn(4.000000)=1593.000000
fn(5.000000)=3711.000000
```

---

## 7. 漸近式求巴斯卡三角形

使用例題1的求 $_nC_r$ 之程式，畫出 Pascal 三角形。

**程式** Dr01_2.c

```c
#include <stdio.h>
#define N 12
long combi(int,int);
void main(void)
{
    int n,r,t;
    for (n=0;n<=N;n++){
        for (t=0;t<(N-n)*3;t++)    /* 空白 */
            printf(" ");
        for (r=0;r<=n;r++)
            printf("%3ld  ",combi(n,r));
        printf("\n");
    }
}
long combi(int n,int r)
{
    int i;
    long p=1;
    for (i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
}
```

<CppRunner>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
#define N 12
long combi(int n,int r){
    long p=1;
    for(int i=1;i<=r;i++)
        p=p*(n-i+1)/i;
    return p;
}
int main(){
    for(int n=0;n<=N;n++){
        for(int t=0;t<(N-n)*3;t++)
            cout<<" ";
        for(int r=0;r<=n;r++)
            cout<<setw(3)<<combi(n,r)<<"  ";
        cout<<"\n";
    }
}
```

</CppRunner>

---

## 8. 遞迴求巴斯卡三角形

**例題** 以遞迴求 $_nC_r$。

如同第 1 章 Pascal 三角形中所提到的，$_nC_r$ 可定義成：

$$\begin{cases} _nC_r=_{n-1}C_{r-1}+_{n-1}C_r & (n>0) \\ _nC_0=_nC_n=1 & (r=0 \text{ 或 } r=n) \end{cases}$$

$_nC_n=1$ 呼叫 $_{n-1}C_n$，$_nC_0=1$ 呼叫 $_{n-1}C_{-1}$ 的遞迴出口：

![圖 4.5 Pascal 三角形](/img/fig4-5-pascal.png)

$_nC_n=1$ 為 $_{n-1}C_{r-1}$ 呼叫出口，$_nC_0=1$ 為 $_{n-1}C_r$ 呼叫出口。

**程式** Dr29_2.c

```c
#include <stdio.h>
long combi(int,int);
void main(void)
{
    int n,r;
    for (n=0;n<=5;n++) {
        for (r=0;r<=n;r++)
            printf("%d C %d=%ld  ",n,r,combi(n,r));
        printf("\n");
    }
}
long combi(int n,int r)
{
    if (r==0 || r==n)
        return 1L;
    else
        return combi(n-1,r)+combi(n-1,r-1);
}
```

<CppRunner>

```cpp:line-numbers
#include<bits/stdc++.h>
using namespace std;
long combi(int n,int r){
    if(r==0||r==n) return 1;
    else return combi(n-1,r)+combi(n-1,r-1);
}
int main(){
    for(int n=0;n<=5;n++){
        for(int r=0;r<=n;r++)
            cout<<n<<" C "<<r<<"="<<combi(n,r)<<"  ";
        cout<<"\n";
    }
}
```

</CppRunner>

**執行結果**：

```
0 C 0=1
1 C 0=1  1 C 1=1
2 C 0=1  2 C 1=2  2 C 2=1
3 C 0=1  3 C 1=3  3 C 2=3  3 C 3=1
4 C 0=1  4 C 1=4  4 C 2=6  4 C 3=4  4 C 4=1
5 C 0=1  5 C 1=5  5 C 2=10 5 C 3=10 5 C 4=5  5 C 5=1
```

---

## 問題

1. 以內插法算出函數值域在 0 到 1 之間（包含端點）的整數個數。
2. 寫一程式，以 SIN(x) 的漸近展開式求 sin(x) 的近似值（請參閱第 2 章 2-3）。
3. 寫一程式，以二進位來表示 $x^n$，設 x=2.7，n 為任意正整數。求 $e^x$ 近似值，設 n 以二進位表示為 $a_m a_{m-1}\cdots a_0$，則 $E_n=\frac{x}{n}E_{n-1}$，$E_0=1$。
4. 將聯立方程式的消去演算法以遞迴方式表達。
