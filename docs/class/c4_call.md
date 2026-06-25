---
outline: deep
---

# c4.　參數傳遞
## Call By Value 、 Call By Address 、 Call by Reference

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
void myswapV (float,float);
void myswapR (float&,float&);
void myswapA (float*,float*);
int main()
{
    float x=2.5,y=3.6;
    myswapV(x,y);
    myswapR(x,y);
    myswapA(&x,&y);

    cout << " x="<< x << " y=" << y ;
}

void myswapV(float a,float b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
    cout << "Call by Value\n a="<< a << " b=" << b <<"\n";
}

void myswapR(float &a,float &b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
    cout << "Call by Reference\n a="<< a << " b=" << b <<"\n";
}

void myswapA(float *a,float *b)
{
    float temp;
    temp=*a;
    *a=*b;
    *b=temp;
    cout << "Call by Address\n a="<< *a << " b=" << *b <<"\n";
}
```

</CppRunner>

## 傳值呼叫 (Call by Value)


```cpp:line-numbers
void myswapV(float a,float b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
}
```



![Call by Value 記憶體示意圖](/img/fig_c4_call_value.png){width=50%}



## 傳址呼叫 (Call by Address)


```cpp:line-numbers
void myswapA(float *a,float *b)
{
    float temp;
    temp=*a;
    *a=*b;
    *b=temp;
}
```
![Call by Address 記憶體示意圖](/img/fig_c4_call_address.png){width=50%}

## 傳參考呼叫 (Call by Reference)



```cpp:line-numbers
void myswapR(float &a,float &b)
{
    float temp;
    temp=a;
    a=b;
    b=temp;
}
```


![Call by Reference 記憶體示意圖](/img/fig_c4_call_reference.png){width=50%}

蔡明志[「指標的藝術」](https://www.books.com.tw/products/E050025036?sloc=main)

---

## 陣列的傳遞

[1003陣列傳遞.cpp](https://onlinegdb.com/xU1LVs3vB)

<CppRunner>

```cpp:line-numbers
#include<iostream>
using namespace std;
void Arr1(int[]);   //[]表示引數是陣列 call By Address
void Arr2(int *);   // * 傳指標  call By Address
void Arr3(int (&)[5] );  //傳參考  call By Reference
int main(){
    int a[5]={62,25,44,17,91},i;
    cout << "原始值 :    a= " << a <<"\n";
    cout << "            &a = " << &a[0] << " ";
    for(i=0;i<5;i++) cout << &a[i]<<" ";
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "陣列參數 :    ";
    Arr1(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "指標參數 :    ";
    Arr2(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";

    cout << "位址參數 :    ";
    Arr3(a);
    for(i=0;i<5;i++) cout <<  a[i] << " ";
    cout << "\n";
}

void Arr1(int ar1[]){
    ar1[0]=10;
    ar1[1]=20;
    cout << " ar1= " << ar1 <<"\n";
    cout << "          &ar1= "<< &ar1 << " ";
    for(int i=0;i<5;i++) cout<<&ar1[i]<<" ";
}

void Arr2(int *ar2){
    ar2[0]=30;
    ar2[1]=40;
    cout << " ar2= " << ar2 <<"\n";
    cout << "          &ar2= "<< &ar2<< " ";
    for(int i=0;i<5;i++) cout<<&ar2[i]<<" ";
}

void Arr3(int (&ar3)[5]){
    ar3[0]=50;
    ar3[1]=60;
    cout << " ar3= " << ar3 <<"\n";
    cout << "          &ar3= "<< &ar3<< " ";
    for(int i=0;i<5;i++) cout<<&ar3[i]<<" ";
}
```

</CppRunner>

執行結果：

![執行結果](/img/fig_c4_call_result.png){width=90%}

![ar1 及 ar2 的傳遞方式](/img/fig_c4_call_ar1ar2.png){width=85%}

![ar3 的傳遞方式](/img/fig_c4_call_ar3.png){width=85%}

二維陣列的指標傳遞 [https://www.youtube.com/watch?v=ZkBZmyk17Q8](https://www.youtube.com/watch?v=ZkBZmyk17Q8)
[https://www.youtube.com/watch?v=WTGv2eqcgcQ](https://www.youtube.com/watch?v=WTGv2eqcgcQ)

[1004二維陣列傳遞.cpp](https://onlinegdb.com/EWjzfPW2R)

<CppRunner>

```cpp:line-numbers
#include<iostream>
#include<cstring>
using namespace std;
void r(int *,int *,int *); //傳陣列[0]的address 攤平成一維

int main(){
    int a[2]={1,2};
    int b[2][2]={1,2,3,4};
    int c[2][2][2]={1,2,3,4,5,6,7,8};
    r(a,*b,**c); //* a一維 b二維 c三維
}

void r(int *a,int *b,int *c){
    cout <<a[1]<<" " <<b[3]<<" "<<c[7];
    return;
}
```

</CppRunner>

## [Template](https://allen501pc.wordpress.com/2011/01/04/cc-%E9%97%9C%E6%96%BC%E9%99%A3%E5%88%97%E6%96%BC%E5%87%BD%E5%BC%8F%E4%B8%AD%EF%BC%8C%E7%95%B6%E5%81%9A%E5%8F%83%E6%95%B8%E5%82%B3%E9%81%9E%E7%9A%84%E5%A4%9A%E7%A8%AE%E5%81%9A%E6%B3%95/)

1005Template 陣列傳遞.cpp

<CppRunner>

```cpp:line-numbers
#include <iostream>
using namespace std;

template<typename T1,size_t N>
void fn1D(T1 (&arr)[N]){
    for(size_t i=0; i<N; ++i)
        arr[i]+=1; //陣列值+1
}

template<typename T2,size_t X,size_t Y>
void fn2D(T2 (&arr)[X][Y]){
    for(size_t i=0; i<X; ++i)
        for(size_t j=0; j<Y; ++j)
            arr[i][j]+=1 ; //陣列值+1
}

int main(){
    int arr1D[3]= {1,2,3};
    int arr2D[3][2] = { {1,2},{3,4},{5,6}};
    fn1D(arr1D); //傳1維陣列
    for(int i=0; i<3; ++i)
        cout << arr1D[i] ;
    cout <<"\n";
    fn2D(arr2D); //傳2維陣列
    for(int i=0; i<3; i++)
        for(int j=0; j<2; j++)
            cout <<arr2D[i][j];
    cout <<"\n";
    return 0;
}
```

</CppRunner>
