# Sakura no Toki 2

樱之刻多壁纸主题。所有变体共用根目录的 `index.css`，角色目录中的 `index.css` 只负责选择桌面和移动端壁纸。壁纸优先使用
AVIF，并提供 WebP 回退。

## 使用方法

在 ANI-RSS 的自定义 CSS 中选择一个变体导入。不要同时导入多个变体。

| 角色       | 目录      | 导入地址                                                            |
|------------|-----------|---------------------------------------------------------------------|
| 夏目蓝     | `ai`      | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/ai/index.css`      |
| 本间心铃   | `honma`   | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/honma/index.css`   |
| 鸟谷真琴   | `makoto`  | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/makoto/index.css`  |
| 御樱禀     | `rin`     | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/rin/index.css`     |
| 冰川里奈   | `rina`    | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/rina/index.css`    |
| 夏目雫     | `shizuku` | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/shizuku/index.css` |
| 川内野优美 | `yuumi`   | `https://ani-rss-css.wushuo.top/sakura-no-toki-2/yuumi/index.css`   |

例如使用夏目蓝（`ai`）：

```css
@import url("https://ani-rss-css.wushuo.top/sakura-no-toki-2/ai/index.css");
```

## 目录结构

```text
sakura-no-toki-2/
  index.css
  README.md
  ai/
    index.css
    assets/
      background.avif
      background.webp
      background-mobile.avif
      background-mobile.webp
  honma/
    index.css
    assets/
      background.avif
      background.webp
      background-mobile.avif
      background-mobile.webp
  makoto/
  rin/
  rina/
  shizuku/
  yuumi/
```

每个省略展开的角色目录都与 `ai`、`honma` 结构相同。桌面壁纸为 `1920x1080`，移动壁纸为 `1170x2532`；每张壁纸均提供 AVIF 与
WebP 两种格式。
