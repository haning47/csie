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

### 萬能標頭檔

```cpp:line-numbers
#include<bits/stdc++.h>
```
