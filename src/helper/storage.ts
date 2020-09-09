
/**
 * 本地存储,用来抹平小程序和网页
 */

const setItem = (key:string, value:string): void => {
    switch(process.env.TARO_ENV){
        case 'h5':
            window.localStorage.setItem(key, value);
            break
        case 'weapp':
            wx.setStorage({
                key: key,
                data: value,
                success: (res) => {
                    console.log(res.data, 'wx.setStorage success')
                },
                fail: err => {
                    console.log(err, 'wx.setStorage fail')

                }
            })
        default:
            break;
    }
}

const getItem = (key: string): any => {
    switch(process.env.TARO_ENV) {
        case 'h5': 
            return new Promise((resolve: any, reject) => {
                const result = window.localStorage.getItem(key);
                resolve(result)
            })
        case 'weapp':
            return new Promise((resolve, reject) => {
                wx.getStorage({
                    key: key,
                    success: (res) => {
                        resolve(res.data)
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            })
        default:
            return null
    }
}

const initStorage = async(): Promise<void> => {
    try{
        const userInfo = await getItem('userInfo');
        // debugger
        setItem('userInfo', userInfo || '');
    } catch(e) {
        console.log(e, 'initStorage error')
        setItem('userInfo','');
    }
    
}

initStorage()

export default  {
    setItem,
    getItem
}
