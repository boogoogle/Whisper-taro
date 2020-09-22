import { TextMessage } from "leancloud-realtime";
import storage from '@/helper/storage'
import AV from 'leancloud-storage'
import LCClient from '@/scripts/LCClient'
import Taro from '@tarojs/taro'
import bff from '@/api/bff'
import { isArray } from "lodash";

export const sendMessage = (conv,message) => {
    
}
/**
 * 
 * @param selfId  某个标志字段,大部分情况下指的 username
 * @param friendId 
 */
export const createConv = (friend) => {
    // console.log(friend,'----')
    const currentUser = AV.User.current()
    const nickName = currentUser.get('nickName');
    const friendId = friend.username || friend.email // 微信用username作为唯一标识, 测试账号用email
    const convName = `${nickName}&${friend.nickName || friend.email}`
    LCClient.IMClient.createConversation({
        members: [friendId],
        name: `${convName}`
    }).then(conversation => {
        LCClient.currentConversation = conversation
        Taro.navigateTo({
            url: `/pages/conversation/ConvPage/ConvPage?convId=${conversation.id}`
        })

        updateUserRecentContacts(currentUser, friendId)
        updateLocalConvList(conversation)
    })
}


function updateUserRecentContacts(currentUser, friendId){
    const rContacts = currentUser.get('recentContacts') || []
    if(rContacts.indexOf(friendId) == -1) {
        if(rContacts.length == 5) {
            rContacts.shift()
        }
        currentUser.set('recentContacts',rContacts.concat(friendId))
        currentUser.save().then(u=>{
            // console.log(u.get('recentContacts'))
        })
    }
}

/**
 * 更新本地保存的 conversationList
 */
export const updateLocalConvList =  async (newConv: object | Array<object>) => {
    let arr = []
    let convs = []
    if (!Array.isArray(newConv)){
        convs.push(newConv)
    } else {
        convs = newConv
    }

    try {
        const list = await storage.getItem('recentConversations')
        arr = JSON.parse(list)
    } catch (e) {
        console.log(e)
    }

    convs.forEach(conv => {
        if(arr.indexOf(conv.id) > -1)return
        arr.push(conv.id)
    })

    storage.setItem('recentConversations', JSON.stringify(arr))
}

export async function getLocalConvList(){
    let arr = []
    try {
        const list = await storage.getItem('recentConversations')
        arr = JSON.parse(list)
    } catch (e) {
        console.log(e)
    }
    return arr
}
