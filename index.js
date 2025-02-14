let addCSSLink = (href) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.body.appendChild(link);
}

// 调用函数以添加 CSS 链接
addCSSLink('https://raw.githack.com/wushuo894/ani-rss-css/main/木柜子乐队.css');
