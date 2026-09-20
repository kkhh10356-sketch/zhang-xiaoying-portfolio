# 张晓英｜视频剪辑师作品集

React + Vite 个人作品集网站，包含项目展示、视频交互、能力模块和多端内容案例。

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建检查

```bash
pnpm run build
```

## 部署

项目已包含 `vercel.json`，导入 GitHub 后可直接部署到 Vercel。Vercel 会执行 `pnpm install --frozen-lockfile` 和 `pnpm run build`，发布 `dist` 目录。

当前公开网址：<https://zhang-xiaoying-portfolio-v2.vercel.app>

国内备用网址（腾讯云 CloudBase）：<https://zhang-xiaoying-web-d6cxh4484538c-1491091849.tcloudbaseapp.com/>

GitHub 仓库：<https://github.com/kkhh10356-sketch/zhang-xiaoying-portfolio>

腾讯云 EdgeOne Pages 已部署（全球可用区，含中国大陆）。腾讯云默认域名仅支持限时预览，绑定自定义域名后可作为长期备用地址。

CloudBase 静态托管已连接 GitHub `main` 分支，构建环境为 Node.js 20，推送代码后可重新部署。CloudBase 测试域名首次访问可能显示一次风险提示，点击“确定访问”即可进入网站。

## 说明

`public/assets` 中的视频已转换为适合网页加载的 H.264 MP4，并开启快速开始播放参数。原始高码率视频不在仓库内。
