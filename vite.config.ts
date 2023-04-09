import { defineConfig, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import dotenv,{DotenvParseOutput} from 'dotenv'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue()
//   ],
// })


export default defineConfig((mode) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  console.log('curEnvFileName: ', curEnvFileName);
  let server: CommonServerOptions = {}
  const envData = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  if (mode.mode === "development") {
    server = {
      host:envMap.VITE_HOST,
      port: envMap.VITE_PORT,
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN,
        }
      }
    }
    console.log('development mode',server);
  } else if (mode.mode === "production") {
    console.log("production mode");
  }
  return {
    plugins: [
      vue(),
    ],
    server
  }
})