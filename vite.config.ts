import { defineConfig, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import dotenv from 'dotenv'
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
  const envMap = dotenv.parse(envData)
  if (mode.mode === "development") {
    server = {
      host: '127.0.0.1',
      port: 6324,
      proxy: {
        '/zxy': {
          target: 'http://127.0.0.1/'
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