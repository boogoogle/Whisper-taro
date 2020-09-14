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

    addEventObserver(key: string, convId:string, cb) {
        this.eventObserverMap[convId] = {  // key来标识ConvPage
          convId,
          cb: cb
        }
    }
    async init(){
        if (this.IMClient) {
          return Promise.resolve(this.IMClient)
        }

        const id = await storage.getItem('id')
        if(id) {
          const instance = await YooRealtime.createIMClient(id)
          console.log(instance)
          this.IMClient = instance
          this.reveiveMessage()
        } else {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        }
        
    }
    reveiveMessage(){
        this.IMClient.on(Event.MESSAGE, (message:any) => {
          console.log('Message received: \n '+ JSON.stringify(message));
          console.log('Message received: \n '+ message.updateAt);
        });
    
        // 未读消息
        this.IMClient.on(Event.UNREAD_MESSAGES_COUNT_UPDATE, function(conversations) {
            const total = conversations ? conversations.length : 0
            console.log(conversations, '1')
            conversations.forEach(conv => {
              const {id} = conv
              // if (this.eventObserverMap[id]) {
              //   if(id === ConvPageData.convId) {
              //     this.eventObserverMap[id].cb(message)
              //   }
              // }
            })
            
        });
    }
}

export default new LCClient()