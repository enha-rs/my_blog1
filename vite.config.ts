import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
export default defineConfig({
  plugins: [vue(), tailwindcss(), AutoImport({
    resolvers: [ElementPlusResolver()],
    // 你还可以配置自动导入 Vue 的 API，例如 ref, reactive 等
    imports: ['vue', 'vue-router'], // 根据需要添加
    dts: 'src/auto-imports.d.ts', // 生成 TypeScript 的类型声明文件，如果你的项目用 TS
  }),
  Components({
    resolvers: [ElementPlusResolver()],
    // 指定组件位置，默认是 src/components
    dirs: ['src/components'], // 根据你的项目结构调整
    dts: 'src/components.d.ts', // 生成 TypeScript 的类型声明文件
  }),],
  resolve: {
    alias: [{
      find: /\@\//,
      replacement: `${pathResolve('src')}/`
    }]
  }

})