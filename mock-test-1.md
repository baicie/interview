# 模拟题一

## 基础题（20 分钟）

### 1. JavaScript 数据类型 (5 分钟)

**问题：** JavaScript 有哪些数据类型？如何判断一个变量的类型？

**回答要点：**

- 8 种数据类型：7 种基本类型 + 1 种引用类型
- 判断方法：typeof、instanceof、Object.prototype.toString
- 注意 typeof null 返回 "object"

**深入方向：**

- 类型转换机制
- 包装对象
- Symbol 和 BigInt 的使用场景

---

### 2. 闭包 (5 分钟)

**问题：** 什么是闭包？闭包有什么作用？

**回答要点：**

- 函数和其词法环境的组合
- 内部函数访问外部函数的变量
- 主要作用：数据私有化、模块化、防抖节流

**代码示例：**

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

### 3. 原型链 (5 分钟)

**问题：** 解释一下 JavaScript 的原型链机制？

**回答要点：**

- 每个对象都有 `__proto__` 属性指向其构造函数的 prototype
- 原型链是对象查找属性的机制
- 最终指向 Object.prototype，再指向 null

---

### 4. 异步编程 (5 分钟)

**问题：** Promise 和 async/await 的区别？

**回答要点：**

- Promise 是异步编程的解决方案
- async/await 是 Promise 的语法糖
- async/await 让异步代码看起来像同步代码

## 浏览器题（15 分钟）

### 5. 浏览器渲染过程 (8 分钟)

**问题：** 从输入 URL 到页面显示，发生了什么？

**回答要点：**

1. DNS 解析
2. TCP 连接
3. HTTP 请求
4. 服务器响应
5. 浏览器解析 HTML
6. 构建 DOM 树和 CSSOM 树
7. 生成渲染树
8. 布局和绘制

---

### 6. 跨域问题 (7 分钟)

**问题：** 什么是跨域？如何解决？

**回答要点：**

- 同源策略：协议、域名、端口都相同
- 解决方案：CORS、JSONP、代理服务器
- CORS 分为简单请求和预检请求

## 网络题（10 分钟）

### 7. HTTP 缓存 (5 分钟)

**问题：** HTTP 缓存机制是怎样的？

**回答要点：**

- 强缓存：Cache-Control、Expires
- 协商缓存：Last-Modified、ETag
- 缓存优先级：强缓存 > 协商缓存

---

### 8. HTTPS 原理 (5 分钟)

**问题：** HTTPS 是如何保证安全的？

**回答要点：**

- 对称加密 + 非对称加密
- SSL/TLS 握手过程
- 数字证书验证身份

## 编码题（10 分钟）

### 9. 手写防抖函数

**问题：** 实现一个防抖函数

```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

## 综合题（5 分钟）

### 10. 性能优化

**问题：** 前端性能优化有哪些方法？

**回答要点：**

- 资源优化：压缩、合并、CDN
- 渲染优化：减少重排重绘
- 代码优化：懒加载、代码分割
- 网络优化：HTTP/2、缓存策略

---

## 评分标准

- **基础题（40 分）：** 概念清晰，能举例说明
- **浏览器题（30 分）：** 理解原理，知道实际应用
- **网络题（20 分）：** 掌握核心机制
- **编码题（10 分）：** 代码正确，思路清晰

**总分：100 分，80 分以上为优秀**
