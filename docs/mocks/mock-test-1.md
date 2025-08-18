# 模拟面试题一

## JavaScript 基础

### 1. 说说你对闭包的理解，闭包有什么作用？

**参考答案：**

闭包是指有权访问另一个函数作用域中变量的函数。

**闭包的特点：**

- 函数嵌套函数
- 内部函数可以访问外部函数的变量
- 外部函数的变量不会被垃圾回收机制回收

**闭包的作用：**

1. **数据私有化**：创建私有变量
2. **模块化开发**：避免全局变量污染
3. **函数柯里化**：参数复用
4. **回调函数**：异步操作中保持状态

```javascript
// 示例：计数器
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

### 2. 请解释一下原型链的概念

**参考答案：**

原型链是 JavaScript 实现继承的机制。每个对象都有一个指向其原型对象的内部链接，原型对象也有自己的原型，直到原型为 null。

**关键概念：**

- `__proto__`：对象的原型指针
- `prototype`：函数的原型对象
- `constructor`：构造函数引用

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person("Alice");
person.sayHello(); // Hello, I'm Alice

// 原型链查找过程
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

## React 相关

### 3. React 中的虚拟 DOM 是什么？有什么优势？

**参考答案：**

虚拟 DOM 是 React 在内存中维护的一个轻量级的 JavaScript 对象，它描述了真实 DOM 的结构。

**优势：**

1. **性能优化**

   - 减少直接操作 DOM
   - 批量更新，减少重排重绘
   - Diff 算法优化更新过程

2. **跨平台**

   - 可以渲染到不同平台（Web、Native）
   - 服务端渲染支持

3. **开发体验**
   - 声明式编程
   - 状态驱动视图更新

```javascript
// 虚拟 DOM 示例
const virtualDOM = {
  type: "div",
  props: {
    className: "container",
    children: [
      {
        type: "h1",
        props: {
          children: "Hello World",
        },
      },
    ],
  },
};
```

### 4. useState 和 useEffect 的使用场景和注意事项

**参考答案：**

**useState：**

- 用于在函数组件中管理状态
- 返回状态值和更新函数

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**useEffect：**

- 处理副作用操作
- 可以替代生命周期方法

```javascript
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 副作用：获取用户数据
    fetchUser(userId).then(setUser);

    // 清理函数
    return () => {
      // 清理操作
    };
  }, [userId]); // 依赖数组

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## 算法题

### 5. 实现一个防抖函数

**参考答案：**

```javascript
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 使用示例
const debouncedSearch = debounce(function (query) {
  console.log("搜索:", query);
}, 300);

// 测试
debouncedSearch("a");
debouncedSearch("ab");
debouncedSearch("abc"); // 只会执行这一次
```

### 6. 手写一个深拷贝函数

**参考答案：**

```javascript
function deepClone(obj, map = new WeakMap()) {
  // 处理原始类型
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理日期
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const cloneArr = [];
    map.set(obj, cloneArr);
    obj.forEach((item, index) => {
      cloneArr[index] = deepClone(item, map);
    });
    return cloneArr;
  }

  // 处理对象
  const cloneObj = {};
  map.set(obj, cloneObj);
  Object.keys(obj).forEach((key) => {
    cloneObj[key] = deepClone(obj[key], map);
  });

  return cloneObj;
}

// 测试
const original = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "coding"],
  address: {
    city: "Beijing",
    country: "China",
  },
};

const cloned = deepClone(original);
console.log(cloned);
```

## 项目经验

### 7. 描述一下你在项目中遇到的性能优化问题及解决方案

**参考答案：**

**常见性能问题及解决方案：**

1. **首屏加载慢**

   - 代码分割（Code Splitting）
   - 懒加载（Lazy Loading）
   - 预加载关键资源
   - CDN 加速

2. **大列表渲染卡顿**

   - 虚拟滚动
   - 分页或无限滚动
   - React.memo 优化

3. **频繁重渲染**

   - useMemo 和 useCallback 优化
   - 状态提升和下沉
   - 组件拆分

4. **网络请求优化**
   - 请求缓存
   - 请求合并
   - 接口优化

```javascript
// 虚拟滚动示例
function VirtualList({ items, itemHeight = 50 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 8. 如何处理跨域问题？

**参考答案：**

**跨域解决方案：**

1. **CORS（跨域资源共享）**

```javascript
// 服务端设置
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
```

2. **代理（Proxy）**

```javascript
// webpack 开发环境
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

3. **JSONP**

```javascript
function jsonp(url, callback) {
  const script = document.createElement("script");
  const callbackName = "jsonp_callback_" + Date.now();

  window[callbackName] = callback;
  script.src = `${url}?callback=${callbackName}`;
  document.head.appendChild(script);

  script.onload = () => {
    document.head.removeChild(script);
    delete window[callbackName];
  };
}
```

---

**面试建议：**

- 回答问题要有条理，先说概念再举例
- 结合实际项目经验
- 主动提及相关的技术点
- 准备好代码示例
