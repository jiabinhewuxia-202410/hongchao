# 红潮链 2.0

一个面向资源、资料、文章与专题的静态内容平台底座。目标：低成本、可持续、本人可通过 `/admin` 管理内容。

## 架构

- Astro 7.3（静态输出）
- Decap CMS（`/admin`）
- GitHub（代码 + 内容）
- Cloudflare Pages（托管/CDN）
- Cloudflare R2（后续资料文件）
- 自建轻量静态搜索索引（无第三方搜索费用）

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:4321`。

### 本地 CMS

Decap 的 `local_backend: true` 已开启。另开一个终端运行：

```bash
npx decap-server
```

然后访问 `http://localhost:4321/admin/`。

## 构建

```bash
npm run build
```

输出目录：`dist`

## Cloudflare Pages

1. 将本项目推送到 GitHub。
2. Cloudflare → Workers & Pages → Create → Pages → Import Git repository。
3. Production branch：`main`
4. Build command：`npm run build`
5. Build output directory：`dist`
6. 环境变量建议设置：`SITE_URL=https://你的正式域名`

每次 GitHub `main` 分支更新后，Cloudflare Pages 自动构建发布。

## 上线前必须修改

### 1. Decap GitHub 仓库

编辑 `public/admin/config.yml`：

```yml
backend:
  name: github
  repo: 你的GitHub用户名/hongchao-chain-2
  branch: main
```

### 2. OAuth

Decap 的 GitHub backend 需要 OAuth 服务。当前项目只预留配置，不包含密钥。
建议后续在 Cloudflare Worker 部署 OAuth handler，再填写：

```yml
base_url: https://auth.你的域名
# auth_endpoint 以实际 OAuth handler 为准
```

OAuth Client Secret 只能放在 Cloudflare Secret 中，**不要提交到 GitHub**。

### 3. 站点地址

部署时设置 `SITE_URL`，并同步修改 `public/robots.txt` 中的 sitemap 域名。

## 后台内容

`/admin` 当前可以管理：

- 网站设置：`src/data/settings/site.json`
- 首页模块：`src/data/settings/home.json`
- 资源导航：`src/content/resources/`
- 红潮文库：`src/content/library/`
- 红潮文章：`src/content/articles/`
- 红潮专题：`src/content/topics/`

### 首页模块控制

后台的「网站设置 → 首页模块」支持：

- 修改模块标题、副标题
- 显示 / 隐藏
- 修改排序值

排序值越小越靠前。

## 搜索

构建时自动生成 `/search-index.json`，浏览器端本地过滤：

- 资源名称 / 简介 / 标签
- 资料名称 / 简介 / 标签
- 文章标题 / 摘要 / 标签
- 专题标题 / 简介

不需要 Algolia、数据库或付费搜索服务。

## R2 接入建议

第一阶段 `fileUrl` 使用普通 URL。后续创建 R2 Bucket 后：

1. 绑定 `files.你的域名.com`
2. 文件上传到 R2
3. 将公开文件 URL 写入文库条目的 `fileUrl`

这样不改变网站内容模型，不需要重构前台。

## 设计原则

- 不是传统企业官网，而是可使用的资源平台
- 以搜索、资源、资料、专题、文章为主
- 暖白 / 炭黑 / 浅灰 + 克制红色
- 桌面端与移动端均独立适配
- 主要内容不硬编码到组件里

## 下一阶段

- Cloudflare OAuth 登录打通
- R2 上传与文件域名
- 首页模块真正拖拽排序（当前使用 order 数值）
- 分类管理字典
- 资源批量导入
- 下载权限 / 会员体系（确认商业模式后再做）
- AI 问答（内容规模足够大后再做）
