---
outline: deep
---

# 數值計算篇

## 1. 求多項式函數值

設多項式 P(x) = a₀ + a₁x + a₂x² + ... + aₙxⁿ，各自獨立計算再相加是效率較差的方法。實際上外面的那一層計算完後，可以乘以 x 再加下一個係數，由內而外依序計算，稱為**秦九韶演算法**（即 Horner 法的直觀版）。

輸入多項式次數 N、各係數 A(0)～A(N)，再輸入 x 值，輸出 P(x)。

原始 BASIC 程式（已改寫為 C++）：

<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

// 以 Horner 法計算多項式值
double fnply(double x, vector<double>& a, int n) {
    double p = a[n];
    for (int i = n - 1; i >= 0; i--)
        p = p * x + a[i];
    return p;
}

int main() {
    int n;
    cout << "DEG OF POLYNOMIAL: ";
    cin >> n;
    vector<double> a(n + 1);
    for (int i = 0; i <= n; i++) {
        cout << "COEFFICIENT a[" << i << "]: ";
        cin >> a[i];
    }
    double x;
    cout << "VALUE OF X: ";
    while (cin >> x)
        cout << "P(" << x << ") = " << fnply(x, a, n) << "\n";
    return 0;
}
```

</CppRunner>

**範例**：P(x) = x³ + 3x² + 2x + 1，輸入 x = 1.5

**輸出**：P(1.5) = 15.625

---

## 2. 求方程式的根

### 9-2-1 求根的數值問題

一般數值方法以迭代求 f(x)=0，其中 f 是特定的數學函數。求方程式的根，可能計算出實根或複數根。可以先畫圖，觀察大約根的位置，再用數值方法縮小到一個小區間。

二次方程式 ax²+bx+c=0 的公式解：

$$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$

BASIC 語言有內建 SQR 求平方根，但若 b²-4ac<0 則無實根。三次以上方程式沒有通用公式，此時需使用數值方法：先找出根所在的區間（一正一負），再反覆縮小。

![求方程式的根示意圖](/img/numerical-root-graph.png)

### 9-2-2 等分法（Bisection Method）

等分法就是把區間一分為二，找出中點，判斷根在哪半邊，反覆縮小直到區間夠小。

**演算法**：
- 輸入兩端點 P1, P2（需滿足 f(P1)×f(P2)≤0，即異號，保證根存在）
- 重覆到 |P2-P1| 夠小：
  - P3 = (P1+P2)/2
  - 若 f(P1)×f(P3)<0，表示根在左半，令 P2=P3
  - 否則根在右半，令 P1=P3
- 輸出根的近似值 (P1+P2)/2

<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

double f(double x) {
    return x * x - 2;  // 求 sqrt(2)，即 x²-2=0 的正根
}

int main() {
    double p1, p2;
    cout << "輸入區間 [P1, P2]: ";
    cin >> p1 >> p2;

    if (f(p1) * f(p2) > 0) {
        cout << "此區間無根（同號）\n";
        return 0;
    }

    while (fabs(p2 - p1) > 1e-6) {
        double p3 = (p1 + p2) / 2.0;
        if (f(p1) * f(p3) < 0)
            p2 = p3;
        else
            p1 = p3;
    }
    cout << "根的近似值 = " << (p1 + p2) / 2.0 << "\n";
    return 0;
}
```

</CppRunner>

**範例輸入**：1 2（求 √2 ≈ 1.414214）

### 9-2-3 內插法（False Position / Regula Falsi）

內插法利用兩端點的函數值做線性插值，求出更精確的近似根位置，收斂比等分法快。

新近似根公式：

$$P_3 = P_1 - \frac{(P_2 - P_1) \cdot f(P_1)}{f(P_2) - f(P_1)}$$

![內插法示意圖](/img/numerical-interpolation-graph.png)

**演算法**（與等分法相同框架，只改 P3 的計算方式）：

<CppRunner wrap>

```cpp:line-numbers
double f(double x) {
    return x * x - 2;  // 同等分法範例
}

double p1 = 1.0, p2 = 2.0;

if (f(p1) * f(p2) > 0) {
    cout << "此區間無根\n";
} else {
    double p3 = p1;
    while (fabs(p2 - p1) > 1e-6) {
        // 內插法計算新近似根
        double fp1 = f(p1), fp2 = f(p2);
        p3 = p1 - (p2 - p1) * fp1 / (fp2 - fp1);
        if (f(p1) * f(p3) < 0)
            p2 = p3;
        else
            p1 = p3;
    }
    cout << "根的近似值 = " << p3 << "\n";
}
```

</CppRunner>

---

## 3. 解聯立方程式

### 高斯消去法（Gaussian Elimination）

對 N 個方程式、N 個未知數的聯立方程組：

$$a_{11}x_1 + a_{12}x_2 + \cdots + a_{1N}x_N = a_{1,N+1}$$
$$a_{21}x_1 + a_{22}x_2 + \cdots + a_{2N}x_N = a_{2,N+1}$$
$$\vdots$$
$$a_{N1}x_1 + a_{N2}x_2 + \cdots + a_{NN}x_N = a_{N,N+1}$$

**解法**：利用 Horner 法，逐步把係數矩陣化為上三角形式，再反向代入求解。

每一步消去第 i 列以下各列的 xᵢ 項：

$$a_{kj} = a_{kj} - \frac{a_{ki}}{a_{ii}} \cdot a_{ij}，\quad k > i，j \ge i$$

<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cout << "方程式個數 N: ";
    cin >> n;

    // A[i][j]，j=n 為等號右側常數
    vector<vector<double>> A(n, vector<double>(n + 1));
    cout << "輸入增廣矩陣（" << n << " 列，每列 " << n + 1 << " 個數）:\n";
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= n; j++)
            cin >> A[i][j];

    // 前向消去（化為上三角）
    for (int i = 0; i < n; i++) {
        for (int k = i + 1; k < n; k++) {
            double factor = A[k][i] / A[i][i];
            for (int j = i; j <= n; j++)
                A[k][j] -= factor * A[i][j];
        }
    }

    // 反向代入求解
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = A[i][n];
        for (int j = i + 1; j < n; j++)
            sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }

    cout << "解：\n";
    for (int i = 0; i < n; i++)
        cout << "x[" << i + 1 << "] = " << x[i] << "\n";
    return 0;
}
```

</CppRunner>

**範例輸入**（3 個未知數）：
```
3
2 1 -1 8
-3 -1 2 -11
-2 1 2 -3
```
**輸出**：x₁=2，x₂=3，x₃=-1

---

## 4. 漸近式求指數（0101漸近式求指數.cpp）

![漸近式求指數理論說明](/img/numerical-exp-theory.png)

寫一程式，以便能快速求得 xⁿ，設 x=2.7，n 為任意正整數。

**原理**：將 n 以二進位表示為 $a_m a_{m-1} \cdots a_1 a_0$，則：

$$x^n = ((((x^{a_m})^2 \cdot x^{a_{m-1}})^2 \cdot x^{a_{m-2}})^2 \cdots x^{a_0}$$

令 p = x^{a_m}，重覆 m→1 次：p = p² · x^{a_{m-1}}

**指數律**：$(x^a)^b = x^{ab}$，$x^{a+b} = x^a \cdot x^b$

<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

int main() {
    double x;
    int n;
    cout << "輸入 x n: ";
    cin >> x >> n;

    // 取出 n 的二進位各位，由高位到低位
    vector<int> bits;
    int tmp = n;
    while (tmp > 0) {
        bits.push_back(tmp & 1);
        tmp >>= 1;
    }
    reverse(bits.begin(), bits.end());  // 最高位在前

    double p = (bits[0] == 1) ? x : 1.0;
    for (int i = 1; i < (int)bits.size(); i++) {
        p = p * p;
        if (bits[i] == 1) p *= x;
    }

    cout << x << "^" << n << " = " << p << "\n";
    return 0;
}
```

</CppRunner>

**範例**：x=2.7，n=11 → 2.7¹¹ = 2.7^{1011₂}

---

## 5. 漸近式－排列組合

設有 a、b、c 三個數字組成 ab、bc 等三個數字組，C 稱為 Combination 的首個字母。

$$_nC_r = \frac{n!}{r!(n-r)!}$$

直接計算容易溢位，改用漸近式：

$$_nC_r = 1 \cdot \frac{n-1+1}{1} \cdot \frac{n-2+1}{2} \cdot \frac{n-3+1}{3} \cdots \frac{n-r+1}{r}$$

從 $_{n}C_0 = 1$ 出發，每步乘以 (n-r+1)/r，即使 n 很大也不會溢位。

![排列組合漸近式理論](/img/numerical-pascal-theory.png)

<CppRunner>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

long long combi(int n, int r) {
    long long p = 1;
    for (int i = 1; i <= r; i++)
        p = p * (n - i + 1) / i;
    return p;
}

int main() {
    for (int n = 0; n <= 5; n++) {
        for (int r = 0; r <= n; r++)
            cout << n << " C " << r << "=" << combi(n, r) << "  ";
        cout << "\n";
    }
    return 0;
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

![Horner 法說明](/img/numerical-horner-theory.png)

Horner 法將 n 次多項式改寫為嵌套乘法形式，只需 n 次乘法和 n 次加法（比直接計算少得多）：

$$f(x) = (\cdots((a_n x + a_{n-1})x + a_{n-2})x + \cdots + a_1)x + a_0$$

以 f(x) = 5x⁴ + 4x³ + 3x² + 2x + 1 為例（係數陣列 a[] = {1,2,3,4,5}）：

$$f_n = a_n$$
$$f_{n-1} = f_n \cdot x + a_{n-1}$$
$$\vdots$$
$$f_0 = f_1 \cdot x + a_0$$

<CppRunner has-stdin>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

// f(x) = 5x⁴ + 4x³ + 3x² + 2x + 1
// 係數由低次到高次存放：a[0]=1, a[1]=2, a[2]=3, a[3]=4, a[4]=5
double fn(double x, double a[], int n) {
    double p = a[n];
    for (int i = n - 1; i >= 0; i--)
        p = p * x + a[i];
    return p;
}

int main() {
    double a[] = {1, 2, 3, 4, 5};  // f(x) = 5x⁴+4x³+3x²+2x+1
    double x;
    cout << "輸入 x: ";
    while (cin >> x)
        cout << "f(" << x << ") = " << fn(x, a, 4) << "\n";
    return 0;
}
```

</CppRunner>

**執行結果**：
```
f(1) = 15
f(2) = 129
f(3) = 547
f(4) = 1593
f(5) = 3711
```

---

## 7. 漸近式求巴斯卡三角形

使用第 5 節的 combi(n,r) 函式印出 Pascal 三角形。

$$_nC_r = _{n-1}C_{r-1} + _{n-1}C_r$$

<CppRunner>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

const int N = 12;

long long combi(int n, int r) {
    long long p = 1;
    for (int i = 1; i <= r; i++)
        p = p * (n - i + 1) / i;
    return p;
}

int main() {
    for (int n = 0; n <= N; n++) {
        // 置中對齊：印出前導空格
        for (int t = 0; t < (N - n) * 3; t++)
            cout << " ";
        for (int r = 0; r <= n; r++)
            cout << setw(6) << combi(n, r);
        cout << "\n";
    }
    return 0;
}
```

</CppRunner>

---

## 8. 遞迴求巴斯卡三角形

利用遞迴關係式 $_{n}C_r = _{n-1}C_{r-1} + _{n-1}C_r$（邊界條件：r=0 或 r=n 時為 1）直接遞迴計算。

<CppRunner>

```cpp:line-numbers
#include <bits/stdc++.h>
using namespace std;

long long combi(int n, int r) {
    if (r == 0 || r == n)
        return 1;
    else
        return combi(n - 1, r) + combi(n - 1, r - 1);
}

int main() {
    for (int n = 0; n <= 5; n++) {
        for (int r = 0; r <= n; r++)
            cout << n << " C " << r << "=" << combi(n, r) << "  ";
        cout << "\n";
    }
    return 0;
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

> 注意：遞迴版本在 n 較大時重複計算次數呈指數成長，實際使用宜改用記憶化遞迴（memoization）或漸近式版本。

---

## 問題

1. 以內插法算出函數值域在 0 到 1 之間（包含端點）的整數個數。
2. 寫一程式，以 SIN(x) 的漸近展開式求 sin(x) 的近似值：
   $$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$
3. 寫一程式，以漸近展開式表示 eˣ，設 x=2.7，n 為任意正整數。求 eˣ 近似值。
4. 將聯立方程式的消去演算法改寫為以遞迴方式表達的函式。
