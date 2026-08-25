# ANI-RSS Custom CSS

这里收集了一些可直接用于 ANI-RSS 的自定义 CSS 主题。主题已按英文目录整理，每个主题入口统一为 `index.css`，资源放在主题自己的
`assets/` 目录里。

## 使用方法

在 ANI-RSS 的自定义 CSS 中填入一行 `@import` 即可：

```css
@import url("https://ani-rss-css.wushuo.top/mygo/index.css");
```

也可以导入多个文件，但建议一次只启用一个完整主题，避免样式互相覆盖。

## 目录结构

```text
mygo/
  index.css
  assets/

random-transparent/
  index.css

minecraft/
  index.css
  assets/

cyberpunk2077/
  index.css
  assets/

bocchi-the-rock/
  index.css
  assets/

sakura-no-toki/
  index.css
  assets/
```

## 主题列表

| 主题               | 入口                           | 说明                                                                                          |
|--------------------|--------------------------------|-----------------------------------------------------------------------------------------------|
| MyGO               | `mygo/index.css`               | MyGO 风格主题，背景图和 Logo 已本地化到 `mygo/assets/`，背景优先使用 AVIF/WebP。              |
| Random Transparent | `random-transparent/index.css` | 随机二次元背景图透明主题，横屏/竖屏使用随机图片接口，保留柔和渐变兜底。                       |
| Minecraft          | `minecraft/index.css`          | 我的世界风格主题，背景图、苦力怕 SVG 已本地化到 `minecraft/assets/`，背景优先使用 AVIF/WebP。 |
| Cyberpunk 2077     | `cyberpunk2077/index.css`      | 赛博朋克 2077 风格主题，使用 Cyberpunk.net 背景图和 Logo，本地化后配合扫描线与高对比控件。    |
| Bocchi the Rock!   | `bocchi-the-rock/index.css`    | 孤独摇滚风格主题，使用官方 PC 壁纸、移动端主视觉图和 Logo，本地化后配合粉/黄/蓝乐队配色。     |
| Sakura no Toki     | `sakura-no-toki/index.css`     | 樱之刻风格主题，使用官网樱花主视觉图和 Logo，两张背景图会定时柔和切换。                       |

## 常用导入

MyGO：

```css
@import url("https://ani-rss-css.wushuo.top/mygo/index.css");
```

随机背景透明主题：

```css
@import url("https://ani-rss-css.wushuo.top/random-transparent/index.css");
```

Minecraft：

```css
@import url("https://ani-rss-css.wushuo.top/minecraft/index.css");
```

Cyberpunk 2077：

```css
@import url("https://ani-rss-css.wushuo.top/cyberpunk2077/index.css");
```

Bocchi the Rock!：

```css
@import url("https://ani-rss-css.wushuo.top/bocchi-the-rock/index.css");
```

Sakura no Toki：

```css
@import url("https://ani-rss-css.wushuo.top/sakura-no-toki/index.css");
```

## 资源说明

- 静态远程资源已下载到对应主题的 `assets/` 目录，并通过相对路径引用。
- 图片资源尽量同时提供原图、WebP 和 AVIF；CSS 中使用 `image-set()` 让浏览器自动选择更合适的格式。
- `random-transparent` 依赖随机图片接口，这类动态资源保留远程访问；主题内仍有渐变兜底，接口慢或失败时不会露出空白背景。
- 中文 CSS 文件名已迁移为英文目录入口，例如旧的 `我的世界.css` 现在对应 `minecraft/index.css`。
- 主题更新后如果页面没有变化，尝试强制刷新浏览器缓存。
