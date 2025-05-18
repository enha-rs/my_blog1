import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [{
      find: /\@\//,
      replacement: `${pathResolve('src')}/`
    }]
  }

})