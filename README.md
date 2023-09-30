
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [学习函数式编程指北（其他名称：JavaScript函数式编程）代码理解。](#学习函数式编程指北httpsllh911001gitbooksiomostly-adequate-guide-chinesecontent其他名称javascript函数式编程代码理解)
  - [curry（柯里化）](#curry柯里化)
  - [componse（组合）](#componse组合)
    - [pointfree](#pointfree)
  - [functor（函子）](#functor函子)
    - [Container（容器）](#container容器)
    - [pointed functor](#pointed-functor)
    - [monad](#monad)
    - [applicative functor](#applicative-functor)
  - [一些个人见解](#一些个人见解)

<!-- /code_chunk_output -->


# 学习[函数式编程指北](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)（其他名称：JavaScript函数式编程）代码理解。
1. 执行以下命令安装依赖
```
yarn
```
或者
```
npm install
```
2. 进入相关目录执行例子

==注意：==
相关http调用的副作用，使用fs模拟，里面涉及了相关的相对目录，执行相关代码，请到代码目录执行
```
// ❌ 错误的执行方式
node .\src\chapter10\ap-io.mjs

// ✔ 正确的执行方式
cd .\src\chapter10\
node ap-io.mjs

...
```
相关概念按个人理解摘自书中，未必准确，详情请查阅书本。   
书中例子相关内容并不完整，建议学习时根据个人理解补充相关代码，达到例子可以运行的程度。
## curry（柯里化）
curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
## componse（组合）
组合看起来像是在饲养函数，你就是饲养员，选择两个有特点又遭你喜欢的函数，让它们结合，产下一个崭新的函数。
### pointfree
pointfree 模式指的是，永远不必说出你的数据。它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。
## functor（函子）
functor作用：用来控制函数副作用，异常处理，异步操作等。
functor 是实现了 map 函数并遵守一些特定规则的容器类型。  
一个函数在调用的时候，如果被 map 包裹了，那么它就会从一个非 functor 函数转换为一个 functor 函数。我们把这个过程叫做 lift。一般情况下，普通函数更适合操作普通的数据类型而不是容器类型，在必要的时候再通过 lift 变为合适的容器去操作容器类型。这样做的好处是能得到更简单、重用性更高的函数，它们能够随需求而变，兼容任意 functor。
### Container（容器）
创建一个能够装载任意类型的值容器；这个容器将会是一个对象，但我们不会为它添加面向对象观念下的属性和方法。我们将把它当作一个百宝箱——一个存放宝贵的数据的特殊盒子。
### pointed functor
pointed functor 是实现了 of 方法的 functor。
### monad
只要它定义个了一个 join 方法和一个 of 方法，并遵守一些定律，那么它就是一个 monad。
### applicative functor
ap 就是这样一种函数，能够把一个 functor 的函数值应用到另一个 functor 的值上。   
applicative functor 是实现了 ap 方法的 pointed functor。

## 一些个人见解
1. 一个functor定义为Container，数据可以是任意值；
2. 一个functor定义为IO，则限定了数据是函数；
