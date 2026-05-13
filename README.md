# Cloudflare R2 WebDAV Server

这个项目实现了一个基于 Cloudflare Workers 和 R2 存储的 WebDAV 服务器。它允许用户通过 WebDAV 协议访问和管理存储在 Cloudflare R2 中的文件和目录。

[R2免费额度](https://developers.cloudflare.com/r2/pricing/)  [视频教程](https://www.bilibili.com/video/BV1mh4peNECe/)

![部署Cloudflare R2 WebDAV服务，超简单拥有自己的私人网盘](https://raw.githubusercontent.com/aigem/CFr2-webdav/main/%E5%85%8D%E8%B4%B9%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2Cloudflare%20R2%20WebDAV%E6%9C%8D%E5%8A%A1%EF%BC%8C%E8%B6%85%E7%AE%80%E5%8D%95%E6%8B%A5%E6%9C%89%E8%87%AA%E5%B7%B1%E7%9A%84%E7%A7%81%E4%BA%BA%E7%BD%91%E7%9B%98-%E5%B0%81%E9%9D%A2.jpg)


## 特性

- 完全兼容 WebDAV 协议
- 基于 Cloudflare Workers，无需管理服务器
- 使用 Cloudflare R2 作为存储后端（免费额度慷慨）
- 支持基本的身份验证
- 支持文件上传、下载、删除、移动和复制操作
- 支持目录创建和列表

## 部署到 Cloudflare Pages（推荐）

由于 Cloudflare Workers 的默认域名在中国大陆地区无法直接访问，建议将本项目部署到 Cloudflare Pages，以获得更稳定便捷的访问体验。

### 前提条件

在开始部署之前，请确保已准备好以下内容：

1. 一个 Cloudflare 账户（使用 Cloudflare R2 存储服务时需绑定付款方式）
2. 一个 GitHub 账户

### 部署前准备

1. 在 Cloudflare 中创建一个新的 Cloudflare R2 存储桶（也可以使用已有的存储桶）
2. Fork 本仓库到您的 GitHub 账户

### 部署步骤

#### 1. 创建 Pages 项目

1. 打开 Cloudflare 控制台，进入 **Workers 和 Pages**
2. 点击 **创建应用程序，** 选择 **部署 Pages**
3. 连接 GitHub 账户，选择 Fork 后的仓库
4. 保持默认构建配置，无需修改任何设置
5. 点击 **保存并部署**

#### 2. 配置变量

在 Pages 项目的 **设置 -> 变量与机密** 中，添加以下变量：

| 类型 | 名称 | 值                         |
| ------ | ------ | ---------------------------- |
| 文本 | `USERNAME`     | 您用于登录 WebDAV 的用户名 |
| 文本 | `PASSWORD`     | 您用于登录 WebDAV 的密码   |
| 文本 | `BUCKET_NAME`     | 您的 R2 存储桶名称         |

#### 3. 配置 R2 绑定

在 Pages 项目的 **设置**  **->**  **绑定** 中添加：

| 类型      | 名称 | 值                 |
| ----------- | ------ | -------------------- |
| R2 存储桶 | `BUCKET`     | 您的 R2 存储桶名称 |

> 注意：`BUCKET` 绑定的存储桶必须与 `BUCKET_NAME` 变量保持一致。

#### 4. 重新部署

完成上述配置后，进入 **部署** 页面 **重试部署**，使新配置生效。

## 使用方法

部署完成后，您可以在任意支持 WebDAV 的客户端中使用以下信息连接：

- **服务器地址（URL）：**`https://<your-pages-domain>.pages.dev/`
- **用户名**：`USERNAME` 中设置的值
- **密码**：`PASSWORD` 中设置的值

## 一键部署到 Cloudflare Workers

点击下面的按钮，一键将此项目部署到您的Cloudflare Workers账户：

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/aigem/CFr2-webdav)

注需要有Cloudflare账户才能使用此功能。如果您还没有账户，可以在[Cloudflare官www.cloudflare.com)注册。

## 手动部署步骤 [Githut Actions]

如果您需要自定义配置或想要深入了解部署流程，请按以下步骤操作：

### 前提条件

- Cloudflare 账户
- 已创建的 R2 存储桶
- GitHub 账户

### 步骤 1: 配置 Cloudflare

1. 【获取API令牌】在 Cloudflare 仪表板中，创建一个新的 API 令牌，确保它有足够的权限来管理编辑Workers(和 R2)。
2. 【获取桶名称】创建的 R2 存储桶

### 步骤 2: 准备仓库

Fork 这个仓库到您的 GitHub 账户。
```
https://github.com/aigem/CFr2-webdav
```

### 步骤 3: 配置 GitHub Secrets

在您的 GitHub 仓库中，转到 Settings -> Secrets and variables -> Actions，添加以下 secrets：

- `CLOUDFLARE_API_TOKEN`: 步骤1的 Cloudflare API 令牌 (必须)
- `USERNAME`: WebDAV 服务器的用户名 （可选，默认为 _user）
- `PASSWORD`: WebDAV 服务器的密码 （可选，默认为 _pass）
- `BUCKET_NAME`: 的 R2 存储桶名称 （可选，默认为 bucket 如果与你实际的bucket不符，则GithubAction部署会失败）

### 步骤 4: 配置 GitHub Actions

1. 在您的 GitHub 仓库设置中，启用 GitHub Actions。
2. workflow 文件已经存在，请选择： .github/workflow/main.yml

### 步骤 6: 触发部署

按上面操作完成后就会自动进行部署到CF Worker中，或将任何更改推送到 GitHub 仓库的 `main` 分支，或者手动运行 GitHub Actions 工作流。GitHub Actions 将自动触发部署流程。

您可以在 GitHub 仓库的 Actions 标签页中查看部署进度。部署成功后，您可以在 Cloudflare Workers 仪表板中找到您的 Worker URL。

## 使用方法

使用任何支持 WebDAV 协议的客到您的 Worker URL，使用配置的用户名和密码进行身份验证。


## 本地开发（可选）

如果您需要在本地进行开发和测试，请按以下步骤操作：

0. 同上面步骤1 ：配置 Cloudflare

1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/aigem/CFr2-webdav.git
   cd cf-r2-webdav
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 修改wrangler.toml.template为wrangler.toml文件，并修改为你的实际参数：
  
4. 使用 Wrangler 进行本地开发：
   ```bash
   npx wrangler dev --local
   ```

注意：本地开发可能无法完全模拟 Cloudflare Workers 环境，特别是 R2 存储的操作。

## 注意事项

- 确保妥善保管您的 API 令牌和其他敏感信息。
- 定期更新您的依赖以确保安全性。
- 遵守 Cloudflare 的使用政策和条款。

## 贡献

欢迎提交 Pull Requests 或创建 Issues 来改进这个项目。

## 许可证

本项目采用 MIT 许可证。
