// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

//优化插件
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import { Plugin as importToCDN, autoComplete } from "vite-plugin-cdn-import";
//这里必须安装一个依赖 yarn add @types/node@16.13.0 -D
import { svgBuilder } from "./src/plugins/svgBuilder";

export default defineConfig({
  base: "./",
  server: {
    proxy: {
      "/vue3-element-admin": {
        target:
          "https://www.fastmock.site/mock/f46350266007e9680ff6459f7412bd60",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/vue3-element-admin/, "vue3_admin"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // axios: "https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm", //cdn 模式下按需引入
    },
  },
  optimizeDeps: {},
  plugins: [
    vue(),
    svgBuilder({ path: "src/icons/svg/", prefix: "icon" }),
    // AutoImport({
    //   imports: ["vue", "vue-router"],
    //   resolvers: [
    //     ElementPlusResolver(),
    //     // Auto import icon components
    //     IconsResolver({
    //       prefix: "i",
    //     }),
    //   ],
    //   dts: "./src/auto-imports.d.ts", //auto-imports.d.ts
    // }),
    // Components({
    //   // 可以让我们使用自己定义组件的时候免去 import 的麻烦
    //   dirs: ["src/layout/", "src/components/", "src/views/"],
    //   // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
    //   extensions: ["vue"],
    //   // 解析组件，这里以 Element Plus 为例
    //   resolvers: [
    //     ElementPlusResolver(),
    //     // 自动注册图标组件
    //     IconsResolver({
    //       enabledCollections: ["ep"],
    //     }),
    //   ],
    //   // 生成auto-import.d.ts声明文件
    //   dts: "./src/auto-components.d.ts",
    //   // 遍历子目录
    //   deep: true,
    // }),
    Icons({
      // 自动安装图标
      compiler: "vue3",
      autoInstall: true,
    }),
    // 打包优化插件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    visualizer({
      emitFile: false,
      filename: "stats.html", //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
      gzipSize: true, // 收集 gzip 大小并将其显示
      brotliSize: true, // 收集 brotli 大小并将其显示
    }),
    importToCDN({
      prodUrl: "//unpkg.com/{name}@{version}/{path}",
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.3.4/dist/vue.global.js",
        },
        {
          name: "vue-demi",
          var: "VueDemi",
          path: "https://unpkg.com/vue-demi@0.14.5/lib/index.iife.js",
        },
        {
          name: "pinia",
          var: "Pinia",
          path: "https://unpkg.com/pinia@2.1.4/dist/pinia.iife.js",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://unpkg.com/vue-router@4.2.3/dist/vue-router.global.js",
        },

        autoComplete("axios"),
        autoComplete("xlsx"), // 可以正常引入显示
        // {
        //   name: "echarts", // 设法全局引入或减小体积
        //   var: "echarts",
        //   path: "https://unpkg.com/echarts@5.4.2/dist/echarts.js",
        // },
        // {
        //   name: "element-plus", // 在全局引入
        //   var: "ElementPlus",
        //   path: "https://unpkg.com/element-plus@2.3.7/dist/index.full.js",
        // },
      ],
    }), //,和autoImportComponents 组件冲突，须引入vue vue-router vue-demi pinia element-plus(在main.ts全局引入)，子组件中须 import XX 组件。
  ],
  build: {
    sourcemap: false,
    emptyOutDir: true, // 打包时先清空上一次构建生成的目录
    chunkSizeWarningLimit: 1024, // echarts 包800kb 偏大
    minify: "terser", //压缩方式
    terserOptions: {
      compress: {
        drop_console: true, //剔除console,和debugger
        drop_debugger: true,
      },
      format: {
        // 取消代码注释
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },
  },
});
