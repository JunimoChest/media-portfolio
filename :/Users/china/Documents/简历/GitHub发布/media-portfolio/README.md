# 全媒体运营作品集

个人全媒体运营作品集网站，包含新闻作品、创意视频与运营分析三个板块。

## 在线访问

部署后通过 GitHub Pages 访问：

`https://junimochest.github.io/media-portfolio/`

页面访问密码为前端校验，用于日常低调分享。

## 本地预览

双击 `点击此启动网站-访问密码qdy.bat`，浏览器会自动打开网站。

脚本会自动查找本机 Python，并启动支持视频进度跳转的本地服务。
如果本机没有 Python，也可以直接双击 `index.html` 浏览，但个别视频可能无法拖动进度。

## 目录结构

- `index.html` / `script.js` / `styles.css`：网站主页面与逻辑
- `analytics/`：运营数据看板页面
- `assets/`：图片、视频与页面资源
- `local_server.py`：本地预览服务（支持视频分段请求）

## 视频说明

为控制仓库体积与加载速度，网页视频均为压缩后的网络版本：

- `news-yangtze-swimmer.mp4`：720p
- `cat-meme-ad.mp4`：720p
- `news-opening-day.mp4`：720p
- `creative-launch.mp4`：720p
