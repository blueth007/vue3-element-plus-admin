// vite.config.ts
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

//这里必须安装一个依赖 yarn add @types/node@16.13.0 -D
import { svgBuilder } from "./src/plugins/svgBuilder";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
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