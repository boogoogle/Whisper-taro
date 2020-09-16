import { TextMessage } from "leancloud-realtime";
import AV from 'leancloud-storage'
import LCClient from '@/scripts/LCClient'
import Taro from '@tarojs/taro'




export const sendMessage = (conv,message) => {
    
}
/**
 * 
 * @param selfId  某个标志字段,大部分情况下指的 username
 * @param friendId 
 */
export const createConv = (friend) => {
    console.log(friend,'----')
    const nickName = AV.User.current().get('nickName');
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
        return conversation.send(new TextMessage(`Hi, I am ${nickName}`))
    })
}