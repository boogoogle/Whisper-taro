/**
 *  Backend for Frontend, 这些接口本该放到后端(或者中转层),
 *     处理表中的复杂数据,然后给前端
*/
import AV from 'leancloud-storage'
import LCClient from '@/scripts/LCClient'


// 用户信息有关的接口, 主要查询_User 这个document
const user = {
    getUserRecentContacts(){
        const currentUser = AV.User.current()
        const l = currentUser.get('recentContacts')
        let arr = []
        if (l && l.length){
            l.forEach( uid => {
                const query = new AV.Query('_User')
                query.equalTo('username', uid)
                arr.push(query)
            })
        }
        const query = AV.Query.or(...arr)
        return query.find()
    }
}


// conversation相关接口 主要查询 _Conversation 这个document
const conversation = {
    // 传入conversation的id数组, 获取conversation详情
    async queryConversations(arr: Array<string>){
        return Promise.all(arr.map(async id=>{
            const conv = await LCClient.IMClient.getConversation(id)
            const lastM = await conv.queryMessages({
                limit: 1 // 获取最后一条消息
            })
            conv.lastMessage = lastM[0]
            return conv
        }))
    }
}





export default {
    user,
    conversation
}