import store from '../store'
import {getUserInfo} from '../helper'
import {YooRealtime} from './avInit'
import {updateUserInfo} from '../store/actions/user'
import EventHub from '../scripts/eventhub'

import {upadteConversationList} from '../store/actions/conversation'

const { Event } = require('../libs/realtime');


export const userInit = async() => {
    let user:any = getUserInfo()
    // console.log(user, 'user')
    if (user && user.uuid) {
        await YooRealtime.createIMClient(user.uuid).then(self => {
          store.dispatch(updateUserInfo({
            IMInstance: self
          }))
        })
        reveiveMessage(user)
    } 
    return user
}


function reveiveMessage(user: {uuid: string}){
    // Jerry 登录
    YooRealtime.createIMClient(user.uuid).then( self => {
      self.on(Event.MESSAGE, (message:any) => {
        console.log('Message received: \n '+ JSON.stringify(message));
        console.log('Message received: \n '+ message.updateAt);
      });

      // 未读消息
      self.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, function(conversations) {
        const total = conversations ? conversations.length : 0
        // console.log(conversations, '1')
        store.dispatch({
          type: 'UPDATE_TOTAL_NUM',
          total: total
        })
        console.log(conversations, '2')
        if(total) {
          // 这个eventhub的传参很恶心啊,是数组形式的
          EventHub.emitEvent('upadteConversationList', [{list: conversations}])
        }
        // console.log(conversations.length)
        // for(let conv of conversations) {
        //   console.log(JSON.stringify(conv));
        // }
      });

    }).catch(console.error); 
  }