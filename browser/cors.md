# 浏览器跨域

## 相关问题

- 什么是跨域？为什么会有跨域问题？
- 有哪些解决跨域的方法？
- CORS 的工作原理是什么？

## 回答关键点

**跨域定义：** 当一个请求的协议、域名、端口任一不同时，就会产生跨域问题。

**产生原因：** 浏览器的同源策略限制，这是一种安全机制。

**解决方案：**

1. **CORS** - 跨域资源共享（推荐）
2. **JSONP** - 利用 script 标签不受同源策略限制
3. **代理服务器** - 服务端代理请求
4. **postMessage** - 跨窗口通信

## 知识点深入

### 1. 同源策略

同源需要满足三个条件：

- 协议相同（http/https）
- 域名相同
- 端口相同

```javascript
// 当前页面：https://www.example.com:8080/page.html

// 同源
https://www.example.com:8080/api/data  ✅

// 跨域
http://www.example.com:8080/api/data   ❌ (协议不同)
https://api.example.com:8080/api/data  ❌ (域名不同)
https://www.example.com:3000/api/data  ❌ (端口不同)
```

### 2. CORS 解决方案

**简单请求：**

```javascript
// 服务器响应头
Access-Control-Allow-Origin: https://www.example.com
Access-Control-Allow-Credentials: true
```

**预检请求：**

```javascript
// 浏览器发送 OPTIONS 请求
OPTIONS /api/data HTTP/1.1
Origin: https://www.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

// 服务器响应
Access-Control-Allow-Origin: https://www.example.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

### 3. JSONP 实现

```javascript
// 前端代码
function handleResponse(data) {
  console.log(data);
}

const script = document.createElement("script");
script.src = "https://api.example.com/data?callback=handleResponse";
document.head.appendChild(script);

// 服务器返回
handleResponse({ name: "张三", age: 25 });
```

### 4. 代理服务器配置

```javascript
// webpack 开发服务器配置
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.example.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

## 面试要点

1. **理解同源策略**: 安全机制，限制跨域访问
2. **掌握 CORS 原理**: 简单请求 vs 预检请求
3. **了解多种解决方案**: CORS、JSONP、代理各有优缺点
4. **实际应用经验**: 在项目中如何配置和使用

## 扩展知识

- **安全性考虑**: 为什么需要同源策略
- **性能影响**: 预检请求的缓存机制
- **移动端特殊性**: App 内 WebView 的跨域处理

## 参考资料

- [MDN - 跨源资源共享 CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [阮一峰 - 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
