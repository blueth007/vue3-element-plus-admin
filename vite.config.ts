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
//这里必须安装一个依赖 yarn add @types/node@16.13.0 -D
import { svgBuilder } from "./src/plugins/svgBuilder";

export default defineConfig({
  server: {
    proxy: {
      "/vue3-element-admin": {
        target: "https://www.fastmock.site/mock/f46350266007e9680ff6459f7412bd60/",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/vue3-element-admin/, "vue3_admin"),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    vue(),
    viteCompression({
      algorithm: "gzip",
      threshold: 10240,
      verbose: false,
      deleteOriginFile: true,
    }),
    visualizer({
      emitFile: false,
      filename: "stats.html", //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
    svgBuilder({ path: "src/icons/svg/", prefix: "icon" }),

    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        IconsResolver({
          prefix: "i",
        }),
      ],
      dts: "auto-imports.d.ts", //auto-imports.d.ts
    }),
    Components({
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ["src/layout/", "src/components/", "src/views/"],
      // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
      extensions: ["vue"],
      // 解析组件，这里以 Element Plus 为例
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
      // 生成auto-import.d.ts声明文件
      dts: "auto-components.d.ts",
      // 遍历子目录
      deep: true,
    }),
    Icons({
      // 自动安装图标
      compiler: "vue3",
      autoInstall: true,
    }),
  ],
});
