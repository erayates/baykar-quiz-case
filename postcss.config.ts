import { ConfigFn } from 'postcss-load-config'

const config: ConfigFn = () => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
})

export default config