import {Event, IMClient} from 'leancloud-realtime'
import AV, {} from 'leancloud-storage';
import Taro from '@tarojs/taro'
import Store from '@/store'
import storage from '@/helper/storage' 
import {updateLocalConvList} from '@/service/conversation'
import {YooRealtime} from './avInit'



const {UserData, ConvPageData} = Store


class LCClient  {
    userId: string
    storedConversations: []
    currentConversation: object
    eventObserverMap: [] = []
    IMClient:  IMClient | null = null // IMClient

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
      // console.log('addConversationObserver')
      this.eventObserverMap['conversationList'] = {
        cb,
      }
    }
    gotoLogin(){
      console.log('gotoLogin')
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }
    async init(){
      // console.log("page revoke LCCLient.init -->->", arguments)
        if (this.IMClient) {
          return Promise.resolve(this.IMClient)
        }

        const user = AV.User.current()
        if (!user)  {
          this.gotoLogin()
          return
        }
        const authenticated = await user.isAuthenticated()
        
        if (!authenticated) {
          this.gotoLogin()
        }
        console.log( 'AV.User 已登录----',authenticated)

        const id = user.get('username') // leancloud自动登录时设置了一个username
        if(id) {
          const instance = await YooRealtime.createIMClient(id)
          console.log('IMClient',instance)
          this.IMClient = instance
          this.reveiveMessage()
          UserData.update('id', id)
          return Promise.resolve(this.IMClient)
        } else {
          this.gotoLogin()
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
            console.log(conversations.length, "个未读消息")
            self.eventObserverMap['conversationList'].cb(conversations)
            updateLocalConvList(conversations)
            setTimeout(()=>{
              Taro.showTabBarRedDot({
                index: 0,
                complete: (e)=>{
                  console.log(e)
                }
              })
            }, 1000)
        });
    }
}

export default new LCClient()