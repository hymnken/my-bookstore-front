import { defineConfig, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import dotenv, { DotenvParseOutput } from 'dotenv'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue()
//   ],
// })


export default defineConfig((mode) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  // console.log('curEnvFileName: ', curEnvFileName);
  let server: CommonServerOptions = {}
  const envData = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  console.log('envMap: ', envMap);
  if (mode.mode === "development") {
    server = {
      host: envMap.VITE_HOST,
      // 忽视这个错
      port: 6324,
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN
        }
      }
    }
    console.log('development mode', server);
  } else if (mode.mode === "production") {
    console.log('我是生产者环境');
    server = {
      port: envMap.VITE_PORT,
      host: envMap.VITE_HOST
    }
  }
  return {
    plugins: [
      vue(),
    ],
    server
  }
})