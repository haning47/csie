---
outline: deep
---

# c4　讀檔

## 一、 命令列讀檔

以下用一個範例來說明。

**讀入資料的方法**

把檔案 Compile 成 `prog.exe`，和 txt 放在同一個目錄下，cmd 到終端機模式

簡單的說，可以使用 `<` 和 `>` 把 I/O 導引到檔案去，所以在終端機模式下 File I/O 的用法就是

```
Prog <infile >outfile
```

`cin` 的時候由 infile 輸入，不用鍵盤，`cout` 的時候輸出到 outfile。

在 Ubuntu 下需加上 `./`　[https://matthung0807.blogspot.com/2019/06/linux.html](https://matthung0807.blogspot.com/2019/06/linux.html)

**例如**

test 是執行檔　in.txt 是測資檔　out.txt 是輸出檔

**測資檔 CodeIn.txt：**

![CodeIn.txt 內容](/img/fig_c3-codein.png)

**範例程式：**

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
using namespace std;
int main(){
    int a,b,c;
    cin >> a >> b >> c;
    cout << a << " " << b << " " << c << " ";
}
```

</CppRunner>

**Windows 執行方式：**

>E:\>prog < CodeIn.txt  
>12 3 64

**Ubuntu / Linux 執行方式：**  

>user@thspc:~$ ./text < in.txt > out.txt

![Ubuntu 執行方式](/img/fig_c3-run-linux.png)


## 二、 程式讀檔

<CppRunner >

```cpp:line-numbers
/* 在本機執行 */
#include <iostream>
#include<fstream>
using namespace std;
int main()
{
    int n;
    ifstream ifile("in.txt",ios::in);    //讀入測資檔  in.txt -> [ 5 4 3 2 1 ]
    ofstream ofile("out.txt",ios::out);  //輸出答案檔
    cout<<"Input Number ";cin>>n; //從鍵盤讀資料給 n
    cout << n;
    for(int i=0;i<5;i++){
        ifile>>n; //從in.txt讀資料給 n
        cout << n <<" ";
    }
    for(int i=0;i<5;i++)
        ofile<<rand()%100<<" "; //亂數產生5個數 輸出到out.txt
    return 0;
}
```
</CppRunner>


## 三、 加速設定

### 設定陣列初始值為 0

```cpp:line-numbers
#include<cstring>
memset(a,0,sizeof(a));
memcpy(b,a,sizeof(a)); //a陣列copy給b
```

### I/O 加速

```cpp:line-numbers
ios::sync_with_stdio(false); //關閉cin 與stdin同步, 加速用
cin.tie(nullptr);             //取消 cin 和cout綁定，不會每次動作都 flush
cin.tie(&cout);               //必要時可以再綁回去
```

::: tip 提示
用 `\n` 不要用 `endl`，否則一樣會 flush。
:::

### cout 設定小數位數

<CppRunner>

```cpp:line-numbers
#include<iostream>
#include<iomanip>
using namespace std;
int main(){
	cout << fixed<< setprecision(3) <<1.2355 << "\n"; //小數點下3位
	cout.unsetf(ios::fixed);  //解除小數位數設定
	cout<<setprecision(3)<<1.2355 ; //3位有效
	cout <<"\n"<<1.8665789;
}
```
</CppRunner>



### printf 格式化輸出

```
printf("格式字串", 項目1, 項目2, ……);
```

**例：01_05printf.cpp**

<CppRunner>

```cpp:line-numbers
#include<stdio.h>
int main(){
    int num1=25;
    float num2=12.5;
    char school[]="松山高中";
    printf("%s有%4d%%的男生及%6.2f%%的女生戴眼鏡\n",school,num1,num2);
}
```

</CppRunner>

**執行結果**

```
松山高中有  25%的男生及 12.50%的女生戴眼鏡
```

::: tip 提示
`%6.2f`：連小數點一共 6 位，小數 2 位。
:::

**格式符號**

| 格式 | 說明 | 格式 | 說明 |
| --- | --- | --- | --- |
| `%c` | 字元 | `%%` | 印出 % |
| `%d` | 十進位整數 | `%o` | 無號 8 進位整數 |
| `%ld` | 長整數 | `%s` | 字串 |
| `%e` | 浮點數（科學記號） | `%u` | 無號 10 進位整數 |
| `%f` | 浮點數 | `%x` | 無號 16 進位整數 |

**跳脫字元**

| 跳脫字元 | 說明 | 跳脫字元 | 說明 |
| --- | --- | --- | --- |
| `\\` | 印出 \ | `\n` | 換行 |
| `\"` | 印出 " | `\t` | 跳格 |
| `\'` | 印出 ' | `\b` | 倒退一格 |
| `\/` | 印出 / | `\f` | 跳頁 |
| `\a` | 警告音 | `\r` | 歸位 |

### scanf 格式化輸入

```
scanf("格式字串", &變數1, &變數2, ……);
```

**例：01_06scanf.cpp**

<CppRunner has-stdin>

```cpp:line-numbers
#include<stdio.h>
int main(){
    int num;
    char school[13];
    scanf("%s %d",school,&num); //字元陣列不用&
    printf("%s有 %d%% 的學生戴眼鏡\n",school,num);
}
```

</CppRunner>

**執行結果**

```
松山高中
25
松山高中有 25% 的學生戴眼鏡
```

::: warning 注意
`scanf 的 %d` 和 `"` 中間不能有空格。空格表示忽略空格，等待下一個非空格的字元，所以會停下再等下一個輸入。
:::

**習題：P01-2 IO_C.cpp**

輸入校名、班級數、學生戴眼鏡百分比。顯示出資料，戴眼鏡百分比至小數點下第二位四捨五入。

**執行結果**

```
請輸入校名 松山高中
請輸入班級數 60
請輸入戴眼鏡百分比 23.6456789
松山高中全校  60班共有 23.65%的學生戴眼鏡
```

### 萬能標頭檔

```cpp:line-numbers
#include<bits/stdc++.h>
```
