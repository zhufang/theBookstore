# theBookstore
图书管理系统前端开发
## 需要的内容
- restful风格 -ngResource
- bootstrap 制作界面
- ngRoute (uiRouter)
- angular
- jquery
- mime
## 初始化pacakge.json
```
npm init -y  
```
```
npm install angular angular-resource bootstrap jquery mime angular-route --save
```
## ngRoute与uiRouter
### 1UI-Router支持嵌套视图，ngRoute不支持
>使用ngRoute时，在主页面添加<ng-view></ng-view>标签，会把视图渲染好自动加载到此标签，而如
果想在视图里面再加一个<ng-view></ng-view>，用别的子视图渲染好来填充视图里面种的<ng-
view>标签，这是不支持的（这话说得很绕，就是不支持视图里面嵌套视图）；而UI-Router支持这个特性，ui-router使用ui-view标签，可以层层嵌套视图。

### 2、UI-Router支持多视图，ngRoute不支持
>ngRoute的页面只能添加一个<ng-view></ng-view>标签，及时添加多个，都是填充同样的内容；
UI-Router可以通过为ui-view命名的方式支持多个视图，如:
```
<ng-view="profile"></ng-view>
<ng-view="main"></ng-view>
```

## 列表页效果图
![img](https://github.com/zhufang/theBookstore/blob/master/img/list.png)

## 详情页效果图
![img](https://github.com/zhufang/theBookstore/blob/master/img/detail.png)

## 修改页效果图
![img](https://github.com/zhufang/theBookstore/blob/master/img/modify.png)

## 增加页效果图
![img](https://github.com/zhufang/theBookstore/blob/master/img/add.png)
