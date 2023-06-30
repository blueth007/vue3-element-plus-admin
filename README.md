# Vue 3 + TypeScript + Vite

yarn add @iconify/iconify element-plus pinia vue-router axios
yarn add @iconify/json @types/node @vitejs/plugin-vue autoprefixer postcss sass tailwindcss unplugin-auto-import unplugin-vue-components vite-plugin-purge-icons -D
npx tailwindcss init -p

el-upload vs mockjs fixed:

node_modules/mockjs/dist/mock.js 8308 行
node_modules/mockjs/src/xhr/xhr.js 216 行

++ MockXMLHttpRequest.prototype.upload = xhr.upload;

tp-importword
repo: "https://github.com/Five-great/tinymce-plugin/tp-importword",
fixed:  
pugin.js--> #8888

> > //渲染创建 p 和 h1 标签

    /*
    styleName: {
        数字1-6：h1-6
    }
    */
    var e, n, a, t, o;
    if(/\d/.test(r.styleName)){
        e, n, a, t, o =this.createElement('h'+r.styleName)
    }else if(/\w+/.test(r.styleName)) {
        e, n, a, t, o =this.createElement('p')
    }

#9395" --> useBase64URL: !0 //!1 使用 base64 位图
#8990 --> // !r.cssStyle["max-width"] && (r.cssStyle["max-width"] = "100%"), r.cssStyle.width && (r.cssStyle.width = parseFloat(r.cssStyle.width) _ 2 + "pt"), r.cssStyle.height && (r.cssStyle.height = parseFloat(r.cssStyle.height) _ 2 + "pt"); //在 document.css 下不需要扩大两倍设置 width 和 height。因为打印时候 A4 页面会变的更大不适配。 在图片 style 不需要设置大小，inline-block 即可
// str.replace(regex, (match, p1) => `${Number(p1) * 1.33333}px`); //pt 转 px 正则表达式

panelGroup 中 svg className 能引入 style 中，但是 svg 不能正确显示大小，外加 div.card-panel-icon
v-on="$attrs" --> v-bind="$attrs"
