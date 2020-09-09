import store from '../store'
import storage from './storage'
import {updateUserInfo} from '../store/actions/user'

export const getUserInfo = async(): Promise<{uuid: string | null}> => {
    // 先从 store 取,再从 localStorage 里面取
    let user: any = store.getState().user
    if(user && user.uuid) {
        return user
    }

    try{
        user = await storage.getItem('userInfo')
        user = JSON.parse(user)
        if (user && user.uuid) {
            console.log(user.uuid, '拿到当前登录的uuid')
            store.dispatch(updateUserInfo(user))
            return user
        } else {
            // console.log('用户信息初始化错误, 没有拿到uuid')
            return {uuid: null}
        }

    } catch(e) {
        // console.log('用户信息初始化错误, 没有拿到uuid')
        return {uuid: null}
    }
    

    
}

export const setUserInfo = async(info:object): Promise<void> => {
    const localUserInfo = await storage.getItem('userInfo')
    let result = {}
    
    if(localUserInfo) {
        result = JSON.parse(localUserInfo)
    }

    Object.assign(result, info)

    storage.setItem('userInfo', JSON.stringify(result))
}