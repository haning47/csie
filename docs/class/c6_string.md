---
outline: deep
---

# c6. 字串

## 字串函數　14_02字串函數stoi.cpp

<CppRunner>

```cpp:line-numbers
#include <iostream>
using namespace std;
int main()
{
    string b="456";
    char a[10],c[]="123.6";
    cout <<"char a[10] , string b=456 , char c[]=123.6\n";
    cout << "atoi(c)="<<atoi(c)<<"\n";
    cout << "atof(c)="<<atof(c)<<"\n";
    cout << "stoi(b)="<<stoi(b)<<"\n";
    cout << "itoa(25,c,10)="<<itoa(25,c,10)<<"\n";
    cout <<"sprintf(a,\"%2.1f\",20.5)=";
    sprintf(a,"%2.1f",20.5);
    cout <<a;
}
```

</CppRunner>

atoi、itoa 需 `#include<cstdlib>`　stoi 需使用 ISO C++11　sprintf:數字轉文字

執行結果

~~~
char a[10] , string b=456 , char c[]=123.6
atoi(c)=123
atof(c)=123.6
stoi(b)=456
itoa(25,c,10)=25
sprintf(a,"%2.1f",20.5)=20.5
~~~

::: info 注意
※ itoa 是 window 特有，非跨平台
:::

## string 類別

[維基百科](https://zh.wikipedia.org/wiki/String_(C%2B%2B%E6%A0%87%E5%87%86%E5%BA%93))

## string 轉 char

`/*string 轉char 可以用.data() 及 .c_str() 再用 strcpy複製給char */`

（14_11string 轉char.cpp）

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<cstring>
using namespace std;
int main(){
    string s;
    getline(cin,s);
    char a[s.size()];
    strcpy(a,s.c_str());
            cout << "char.c_str()"<<a << "\n";
    strcpy(a,s.data());
            cout << "char.data()"<<a << "\n";
}
```

</CppRunner>

## 分割字串（使用 stringstream）
14_10字串分割.cpp

<CppRunner has-stdin>

```cpp:line-numbers
#include<iostream>
#include<cstring>
#include<sstream>
using namespace std;
int main(){
    string n,split,k;
    getline(cin,n);
    stringstream ss(n);   //或ss<<n; 讀入字串n給ss
    while(ss>>split){      //遇到空白就輸出給split字串
        cout << split << "\n";
    }
    //while結束ss的讀取位置已經到了EOF
    ss.clear();   // 清除 EOF 狀態
    ss.seekg(0);  // 把讀取位置移回開頭

    while(getline(ss,split,' ')){  //另一種方式分割
        cout<<split<<"\n";          //遇到' '把字串讀給split
    }

    string code,ID;
    getline(cin,n);   //重新再輸入
    ss.clear();       //清除 EOF 狀態
    ss.str(n);        //ss=n

    getline(ss,code,','); //遇到,把字串讀給code
    getline(ss,ID);        //剩下的讀給ID
    cout<<code<<"\n"<<ID<<"\n";

    cout<<n.substr(0,3)<<"\n"; //n字串的前3個字
    cout<<n.substr(4);          //n字串第4個字以後

}
```

</CppRunner>

執行結果

~~~
hello world
hello
world
~~~

~~~
TPE,Taiwan Airport
TPE
Taiwan Airport
~~~

作業練習: TOI 新手組202406 [機場(Airport)](https://tpmso.org/toi/wp-content/uploads/question/202406/Airport.pdf)
