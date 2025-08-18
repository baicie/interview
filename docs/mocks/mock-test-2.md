# 模拟面试题二

## Vue.js 专题

### 1. Vue 2 和 Vue 3 的主要区别是什么？

**参考答案：**

**架构层面：**

- **Vue 2**: Options API，基于 Object.defineProperty
- **Vue 3**: Composition API，基于 Proxy

**性能提升：**

- **更小的包体积**：Tree-shaking 支持
- **更快的渲染**：重写虚拟 DOM
- **更好的 TypeScript 支持**

**新特性：**

```javascript
// Vue 3 Composition API
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    onMounted(() => {
      console.log("组件已挂载");
    });

    return {
      count,
      doubleCount,
      increment,
    };
  },
};
```

**响应式原理对比：**

```javascript
// Vue 2 - Object.defineProperty
Object.defineProperty(obj, "name", {
  get() {
    return value;
  },
  set(newValue) {
    value = newValue;
    // 触发更新
  },
});

// Vue 3 - Proxy
const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key) {
      // 依赖收集
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      // 触发更新
      return true;
    },
  });
};
```

### 2. 解释一下 Vue 的响应式原理

**参考答案：**

Vue 的响应式系统基于**依赖收集**和**派发更新**：

**核心概念：**

- **Observer**: 数据劫持，监听数据变化
- **Dep**: 依赖收集器，收集依赖的 Watcher
- **Watcher**: 观察者，数据变化时执行回调

**实现原理：**

```javascript
// 简化版响应式实现
class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        // 派发更新
        dep.notify();
      },
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.vm[this.exp];
    Dep.target = null;
    return value;
  }

  update() {
    const newValue = this.get();
    if (newValue !== this.value) {
      this.value = newValue;
      this.cb.call(this.vm, newValue);
    }
  }
}
```

## 浏览器与网络

### 3. 从输入 URL 到页面展示的完整过程

**参考答案：**

**完整流程：**

1. **URL 解析**

   - 解析协议、域名、端口、路径
   - 检查缓存（浏览器缓存、DNS 缓存）

2. **DNS 解析**

   - 浏览器缓存 → 系统缓存 → 路由器缓存 → ISP DNS → 根域名服务器

3. **TCP 连接**

   - 三次握手建立连接
   - HTTPS 需要 TLS 握手

4. **HTTP 请求**

   - 发送 HTTP 请求报文
   - 服务器处理请求

5. **服务器响应**

   - 返回 HTTP 响应报文
   - 包含状态码、头部、响应体

6. **浏览器解析**

   - HTML 解析构建 DOM 树
   - CSS 解析构建 CSSOM 树
   - JavaScript 执行

7. **渲染流程**
   - 合并 DOM 和 CSSOM 生成渲染树
   - 布局（Layout）计算元素位置
   - 绘制（Paint）像素填充
   - 合成（Composite）图层合并

```javascript
// 模拟 DNS 解析过程
async function dnsResolve(domain) {
  // 1. 检查浏览器缓存
  const browserCache = getBrowserDNSCache(domain);
  if (browserCache) return browserCache;

  // 2. 检查系统缓存
  const systemCache = getSystemDNSCache(domain);
  if (systemCache) return systemCache;

  // 3. 向 DNS 服务器查询
  const ip = await queryDNSServer(domain);

  // 4. 缓存结果
  setBrowserDNSCache(domain, ip);

  return ip;
}
```

### 4. HTTP 缓存策略详解

**参考答案：**

**缓存类型：**

1. **强缓存**

   - **Expires**: 绝对时间
   - **Cache-Control**: 相对时间

2. **协商缓存**
   - **Last-Modified / If-Modified-Since**: 时间戳
   - **ETag / If-None-Match**: 文件哈希

**缓存策略：**

```javascript
// 服务端缓存设置
app.get("/api/data", (req, res) => {
  // 强缓存 - 1小时
  res.setHeader("Cache-Control", "public, max-age=3600");

  // 协商缓存
  const etag = generateETag(data);
  res.setHeader("ETag", etag);

  // 检查客户端缓存
  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end();
  }

  res.json(data);
});
```

**缓存决策流程：**

```javascript
// 浏览器缓存决策
function getCachedResource(url) {
  const cached = getFromCache(url);

  if (!cached) {
    // 无缓存，发起请求
    return fetchFromNetwork(url);
  }

  // 检查强缓存
  if (isStrongCacheValid(cached)) {
    return cached.data;
  }

  // 检查协商缓存
  return validateCache(url, cached);
}

function validateCache(url, cached) {
  const headers = {};

  if (cached.etag) {
    headers["If-None-Match"] = cached.etag;
  }

  if (cached.lastModified) {
    headers["If-Modified-Since"] = cached.lastModified;
  }

  return fetch(url, { headers }).then((response) => {
    if (response.status === 304) {
      // 缓存仍然有效
      updateCacheTimestamp(cached);
      return cached.data;
    }
    // 缓存已失效，更新缓存
    return updateCache(url, response);
  });
}
```

## 工程化与性能优化

### 5. Webpack 的工作原理和优化策略

**参考答案：**

**工作原理：**

1. **初始化参数**：读取配置文件和命令行参数
2. **开始编译**：创建 Compiler 对象
3. **确定入口**：根据 entry 找到入口文件
4. **编译模块**：从入口文件开始，递归解析依赖
5. **完成模块编译**：得到每个模块的最终内容和依赖关系
6. **输出资源**：根据入口和模块的依赖关系，组装成包含多个模块的 Chunk
7. **输出完成**：根据配置的 output 路径和文件名，输出到文件系统

**优化策略：**

```javascript
// webpack.prod.js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",

  // 1. 代码分割
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 5,
        },
      },
    },

    // 2. 代码压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },

  // 3. 解析优化
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },

  // 4. 模块优化
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // 多线程编译
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },

  // 5. 插件优化
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),

    // 包分析
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? "server" : "disabled",
    }),
  ],
};
```

### 6. 前端性能监控方案

**参考答案：**

**性能指标：**

```javascript
// 性能监控实现
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // 监听页面加载完成
    window.addEventListener("load", () => {
      this.collectLoadMetrics();
    });

    // 监听 LCP
    this.observeLCP();

    // 监听 FID
    this.observeFID();

    // 监听 CLS
    this.observeCLS();
  }

  collectLoadMetrics() {
    const navigation = performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType("paint");

    this.metrics = {
      // DNS 解析时间
      dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,

      // TCP 连接时间
      tcpTime: navigation.connectEnd - navigation.connectStart,

      // 请求响应时间
      requestTime: navigation.responseEnd - navigation.requestStart,

      // DOM 解析时间
      domParseTime:
        navigation.domContentLoadedEventEnd - navigation.responseEnd,

      // 资源加载时间
      resourceTime:
        navigation.loadEventEnd - navigation.domContentLoadedEventEnd,

      // 首屏时间
      firstPaint: paint.find((p) => p.name === "first-paint")?.startTime,
      firstContentfulPaint: paint.find(
        (p) => p.name === "first-contentful-paint"
      )?.startTime,
    };

    this.reportMetrics();
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.fid = entry.processingStart - entry.startTime;
      });
    });

    observer.observe({ entryTypes: ["first-input"] });
  }

  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
    });

    observer.observe({ entryTypes: ["layout-shift"] });
  }

  reportMetrics() {
    // 上报性能数据
    fetch("/api/performance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        metrics: this.metrics,
      }),
    });
  }
}

// 初始化性能监控
new PerformanceMonitor();
```

## 算法与数据结构

### 7. 实现一个 LRU 缓存

**参考答案：**

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      // 更新访问顺序
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // 更新已存在的键
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的键
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }
}

// 使用示例
const lru = new LRUCache(3);
lru.put(1, "a");
lru.put(2, "b");
lru.put(3, "c");
console.log(lru.get(2)); // 'b'
lru.put(4, "d"); // 删除键 1
console.log(lru.get(1)); // -1
```

### 8. 二叉树的层序遍历

**参考答案：**

```javascript
// 二叉树节点定义
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 层序遍历 - 队列实现
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// 测试
const root = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]
```

## 系统设计

### 9. 设计一个前端埋点系统

**参考答案：**

```javascript
class TrackingSystem {
  constructor(config) {
    this.config = {
      endpoint: "/api/tracking",
      batchSize: 10,
      flushInterval: 5000,
      maxRetries: 3,
      ...config,
    };

    this.queue = [];
    this.timer = null;
    this.init();
  }

  init() {
    // 自动上报定时器
    this.startAutoFlush();

    // 页面卸载时上报
    window.addEventListener("beforeunload", () => {
      this.flush(true);
    });

    // 页面隐藏时上报
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.flush();
      }
    });
  }

  // 埋点数据收集
  track(event, data = {}) {
    const trackData = {
      event,
      data,
      timestamp: Date.now(),
      url: location.href,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
    };

    this.queue.push(trackData);

    // 队列满时立即上报
    if (this.queue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  // 批量上报
  async flush(sync = false) {
    if (this.queue.length === 0) return;

    const data = [...this.queue];
    this.queue = [];

    if (sync) {
      // 同步上报（页面卸载时）
      navigator.sendBeacon(this.config.endpoint, JSON.stringify(data));
    } else {
      // 异步上报
      this.sendData(data);
    }
  }

  async sendData(data, retries = 0) {
    try {
      await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      // 重试机制
      if (retries < this.config.maxRetries) {
        setTimeout(() => {
          this.sendData(data, retries + 1);
        }, Math.pow(2, retries) * 1000);
      } else {
        // 存储到本地，下次再试
        this.saveToLocal(data);
      }
    }
  }

  startAutoFlush() {
    this.timer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = "session_" + Date.now() + "_" + Math.random();
      sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }

  getUserId() {
    return localStorage.getItem("userId") || "anonymous";
  }

  saveToLocal(data) {
    const stored = JSON.parse(localStorage.getItem("pendingTracks") || "[]");
    stored.push(...data);
    localStorage.setItem("pendingTracks", JSON.stringify(stored));
  }
}

// 使用示例
const tracker = new TrackingSystem({
  endpoint: "https://api.example.com/track",
});

// 页面浏览埋点
tracker.track("page_view", {
  page: location.pathname,
});

// 按钮点击埋点
document.addEventListener("click", (e) => {
  if (e.target.dataset.track) {
    tracker.track("click", {
      element: e.target.tagName,
      text: e.target.textContent,
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  }
});
```

---

**面试技巧：**

- 回答问题要有深度，不要只停留在表面
- 主动提及相关的最佳实践和优化方案
- 结合实际项目经验，说明遇到的问题和解决方案
- 准备好代码实现，展示编程能力
