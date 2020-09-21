import Taro from "@tarojs/taro"

const baseUrl = "https://fnjukhqv.lc-cn-n1-shared.com/1.2/rtm"
const LEAN_CLOUD_HEADERS = {
    "X-LC-Id":"fnjUKhQvsD8oFXSvwk76BeBM-gzGzoHsz",
    "X-LC-Key":"gK044vy1Cj2mwwJ6Gaaa2UW0,master",
}

const logError = (category, descrition, error?)=>{
    console.error(category, descrition, error)
}

const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

enum RequestMethod {
    get = "GET",
    post ="POST"
}


const baseRequest = (method: RequestMethod, url="", data="") => {
    const options = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: baseUrl + (/^\//.test(url) ? url : '/'+url),
        data: data,
        method: method,
        header: {'content-type': "application/json",...LEAN_CLOUD_HEADERS },
        success(res) {
            if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                return logError('api', '请求资源不存在')
            } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                return logError('api', '服务端出现了问题')
            } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                return logError('api', '没有权限访问')
            } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                return res.data
            }
        },
        error(e) {
            logError('api', '请求接口出现问题', e)
        }
    }

    return Taro.request(options).then(res => {
        if(res.statusCode == 200) {
            return res.data
        } else {
            return Promise.reject(res)
        }
        
    })
}

export default {
    get(url, data?: any){
        return baseRequest(RequestMethod.get, url, data)
    },
    post(url, data?: any){
        return baseRequest(RequestMethod.post, url, data)
    }
}