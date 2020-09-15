import {Event} from 'leancloud-realtime'
import Taro from '@tarojs/taro'
import Store from '@/store'
import storage from '@/helper/storage' 
import {YooRealtime} from './avInit'


const {UserData, ConvPageData} = Store


class LCClient  {
    userId: string
    storedConversations: []
    currentConversation: object
    eventObserverMap: [] = []
    IMClient:  object | null = null // IMClient

    constructor(){
      console.log("-----> LCCClient constructor")
    }

    // 会话页面使用 ConvPage
    addEventObserver(convId:string, cb) {
        console.log('addEventObserver---', this.eventObserverMap)
        if(!convId)return
        this.eventObserverMap[convId] = {
          convId,
          cb: cb
        }
    }
    // 聊天列表页面使用 Home
    addConversationObserver(cb){
      console.log('addConversationObserver')
      this.eventObserverMap['conversationList'] = {
        cb,
      }
    }
    async init(){
      console.log("page revoke LCCLient.init -->->", arguments)
        if (this.IMClient) {
          return Promise.resolve(this.IMClient)
        }

        const id = await storage.getItem('id')
        if(id) {
          const instance = await YooRealtime.createIMClient(id)
          console.log(instance)
          this.IMClient = instance
          this.reveiveMessage()
          UserData.update('id', id)
          return Promise.resolve(this.IMClient)
        } else {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        }
    }
    reveiveMessage(){
        const self = this
        this.IMClient.on(Event.MESSAGE, (message:any) => {
          console.log('Message received: \n '+ JSON.stringify(message));
          const {cid} = message
          if (self.eventObserverMap[cid]) {  // ConvPage
            self.eventObserverMap[cid].cb(message)
          }
        });
    
        // 未读消息
        this.IMClient.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, function(conversations) {
            // const total = conversations ? conversations.length : 0
            // console.log(conversations)
            self.eventObserverMap['conversationList'].cb(conversations)
            
        });
    }
}

export default new LCClient()