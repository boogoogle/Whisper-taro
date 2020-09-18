import { TextMessage } from "leancloud-realtime";
import storage from '@/helper/storage'
import AV from 'leancloud-storage'
import LCClient from '@/scripts/LCClient'
import Taro from '@tarojs/taro'
import bff from '@/api/bff'

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
const updateLocalConvList =  async (newConv) => {
    let arr = []
    console.log(newConv, '---')
    try {
        const list = await storage.getItem('recentConversations')
        console.log(list, '1111')
        arr = JSON.parse(list)
    } catch (e) {
        console.log(e)
    }
    console.log('222')

    if(arr.indexOf(newConv.id) > -1)return

    arr.push(newConv.id)
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
