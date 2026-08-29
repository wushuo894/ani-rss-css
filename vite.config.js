import path from 'path'
import {readdirSync} from 'node:fs'
import {defineConfig} from 'vite'
import compression from 'vite-plugin-compression'

let dirname = import.meta.dirname;

const ignoredDirectories = new Set(['.git', '.idea', '.vscode', 'dist', 'node_modules']);

function findThemeEntries(directory, entries = {}) {
    for (const item of readdirSync(directory, {withFileTypes: true})) {
        if (item.isDirectory()) {
            if (!ignoredDirectories.has(item.name)) {
                findThemeEntries(path.join(directory, item.name), entries);
            }
            continue;
        }

        if (['index.css', 'index.js'].includes(item.name)) {
            const filename = path.join(directory, item.name);

            const entryName = path.relative(dirname, filename)

            entries[entryName] = filename;
        }
    }

    return entries;
}

const themeEntries = findThemeEntries(dirname);

export default defineConfig({
    base: './',
    plugins: [
        compression({
            filter: true,
            // 输出压缩日志
            verbose: true,
            // 是否禁用压缩
            disable: false,
            // 对超过10KB的文件进行压缩
            threshold: 1024,
            // 使用gzip压缩
            algorithm: 'gzip',
            // 压缩后文件的扩展名
            ext: '.gz'
        }),
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsInlineLimit: 0,
        cssCodeSplit: true,
        cssMinify: 'lightningcss',
        chunkSizeWarningLimit: 1024,
        rollupOptions: {
            input: themeEntries,
            output: {
                entryFileNames: '[name]',
                assetFileNames: (assetInfo) => {
                    let {originalFileName} = assetInfo;

                    let extname = path.extname(originalFileName);

                    if (['.css', '.js'].includes(extname)) {
                        return originalFileName;
                    }

                    let dir = path.dirname(originalFileName);
                    return `${dir}/[name]-[hash].[ext]`
                },
            }
        }
    }
})
