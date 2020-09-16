
import { resolve } from 'path'

const config = {
  projectName: 'Whisper-taro',
  date: '2020-9-8',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {

  },
  alias: {
    // eslint-disable-next-line no-undef
    '@': resolve(__dirname, '../src'),
    'leancloud-realtime': resolve(__dirname, '../src/libs/leancloud-realtime.js'),
    'leancloud-storage': resolve(__dirname, '../src/libs/leancloud-storage.js'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.merge({
        // node: {
        //   fs: 'empty',
        //   net: 'empty',
        //   tls: 'empty',
        //   http2: 'empty'
        // }
      })
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    outputRoot: 'dist-h5',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
