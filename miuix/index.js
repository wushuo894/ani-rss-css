/**
 * Miuix (HyperOS) 主题可选增强脚本
 *
 * 说明：本主题的 index.css 已经可以独立使用（纯 CSS）。
 * 本脚本是可选增强，提供三件事：
 *   1. 平滑圆角（Smooth Corner）—— 移植 Miuix SmoothRoundedCornerShape，
 *      用贝塞尔曲线（控制点系数 k=0.55）实现连续曲率，套到统计图标上。
 *   2. 按钮按压水波纹（currentColor + scale(4)）。
 *   3. 侧边栏品牌文字归一为 "ANI RSS"。
 *
 * 使用方法：把本文件内容粘贴到 ANI-RSS 的「自定义 JS」输入框即可。
 * 不粘本脚本，主题也能正常显示，只是图标是普通圆角、无水波纹。
 */
(function () {
    "use strict";

    /* ---------- Smooth Corner：连续曲率圆角 path ---------- */
    function smoothCornerPath(w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        if (r <= 0) return "M0,0 H" + w + " V" + h + " H0 Z";
        var k = 0.55, c = r * k;
        return [
            "M" + r + ",0",
            "H" + (w - r),
            "C" + (w - r + c) + ",0 " + w + "," + (r - c) + " " + w + "," + r,
            "V" + (h - r),
            "C" + w + "," + (h - r + c) + " " + (w - r + c) + "," + h + " " + (w - r) + "," + h,
            "H" + r,
            "C" + (r - c) + "," + h + " 0," + (h - r + c) + " 0," + (h - r),
            "V" + r,
            "C0," + (r - c) + " " + (r - c) + ",0 " + r + ",0",
            "Z"
        ].join(" ");
    }

    function applySmooth(el) {
        var rect = el.getBoundingClientRect();
        if (rect.width < 4 || rect.height < 4) return;
        var cs = getComputedStyle(el);
        var r = parseFloat(cs.getPropertyValue("--mx-r"))
            || parseFloat(cs.getPropertyValue("--mx-r-sm"))
            || 16;
        var d = smoothCornerPath(rect.width, rect.height, r);
        el.style.clipPath = "path('" + d + "')";
        el.style.webkitClipPath = "path('" + d + "')";
        el.style.borderRadius = "0";
    }

    var SMOOTH_SEL = ".metric-icon, .mx-smooth";
    var ro = null;

    function applyAllSmooth() {
        document.querySelectorAll(SMOOTH_SEL).forEach(applySmooth);
    }

    function initSmooth() {
        applyAllSmooth();
        if ("ResizeObserver" in window && !ro) {
            ro = new ResizeObserver(applyAllSmooth);
        }
        document.querySelectorAll(SMOOTH_SEL).forEach(function (el) {
            if (ro) ro.observe(el);
        });

        if ("MutationObserver" in window) {
            new MutationObserver(function (mutations) {
                mutations.forEach(function (m) {
                    m.addedNodes.forEach(function (node) {
                        if (node.nodeType !== 1) return;
                        var els = [];
                        if (node.matches && node.matches(SMOOTH_SEL)) els.push(node);
                        if (node.querySelectorAll) {
                            node.querySelectorAll(SMOOTH_SEL).forEach(function (e) {
                                els.push(e);
                            });
                        }
                        els.forEach(function (el) {
                            applySmooth(el);
                            if (ro) ro.observe(el);
                        });
                    });
                });
            }).observe(document.body, {childList: true, subtree: true});
        }
    }

    /* ---------- 水波纹 ---------- */
    function initRipple() {
        var style = document.createElement("style");
        style.textContent =
            "@keyframes mx-ripple{to{transform:scale(4);opacity:0}}";
        document.head.appendChild(style);

        document.addEventListener("pointerdown", function (e) {
            var btn = e.target.closest(".el-button");
            if (!btn || btn.classList.contains("is-disabled")) return;
            var rect = btn.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height) * 2;
            var ink = document.createElement("span");
            ink.style.cssText =
                "position:absolute;border-radius:50%;background:currentColor;opacity:0.08;" +
                "width:" + size + "px;height:" + size + "px;" +
                "left:" + (e.clientX - rect.left - size / 2) + "px;" +
                "top:" + (e.clientY - rect.top - size / 2) + "px;" +
                "transform:scale(0);animation:mx-ripple .6s ease-out;pointer-events:none;";
            if (getComputedStyle(btn).position === "static") btn.style.position = "relative";
            btn.style.overflow = "hidden";
            btn.appendChild(ink);
            setTimeout(function () {
                ink.remove();
            }, 600);
        });
    }

    /* ---------- 品牌文字 ---------- */
    function brand() {
        var el = document.querySelector(".app-brand");
        if (!el) return;
        var span = el.querySelector("span");
        if (span) span.textContent = "ANI RSS";
    }

    /* ---------- 执行 ---------- */
    function run() {
        brand();
        initRipple();
        initSmooth();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();
