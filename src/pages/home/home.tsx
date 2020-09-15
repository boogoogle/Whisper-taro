import React, { useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import storage from '@/helper/storage'
import CreateConversation from '@/components/createConversation'
import LCClient from '@/scripts/LCClient'
import { AtNavBar, AtList, AtListItem} from 'taro-ui'
import './home.scss'
import Store from '../../store'

const {UserData, connect} = Store



function Home(props){
      const [id, setId] = useState(props.id)
      const [convList, setConvList] = useState([])
      function handleClick (type) {

        if (type === 'leftIcon') {
          // 退出操作
          storage.setItem('id', null)
          Taro.navigateTo({url:'/pages/login/login'})
        }
      }

      useEffect(() => {
        if(props.id) {
          setId(props.id)
          return 
        }
        let storagedId = storage.getItem('id').then((rst: any)=>{
          if(rst) {
            setId(rst)
          } 
        })
      }, [props.id]);

      useMemo(
        () => {
          console.log('useMemo', convList)
          function handleMessageReceived(convercations){
            console.log("convpage -- handle msg received")

            convercations.forEach(c => {
              let isNew = true
              convList.forEach((cBefore, idx) => {
                if(cBefore.id === c.id) {
                  convList[idx] = c
                  isNew = false
                }
              })
              if(isNew) {
                convList.unshift(c)
              }
            })
            setConvList([].concat(convList))
          }
          LCClient.addConversationObserver(handleMessageReceived);
        },
        [convList]
      );
      function handleListItemClick(conversation){
        Taro.navigateTo({
          url: `/pages/conversation/ConvPage/ConvPage?convId=${conversation.id}`
        })
      }
      
      return (
          <View className='Home-container'>
            <AtNavBar
              onClickRgIconSt={handleClick}
              onClickLeftIcon={()=>handleClick('leftIcon')}
              color='#000'
              title='会话列表'
              leftText={id + ''}
              rightFirstIconType='add'
            />
              <View className='home__content'>
                <AtList>
                    {
                      convList.map(cv => {
                         return (
                              <AtListItem 
                                key={cv.id}
                                arrow='right'
                                note={cv.lastMessage.text}
                                title={cv.members.join('&')}
                                extraText=''
                                onClick={()=>handleListItemClick(cv)}
                              />
                         )})
                    }
                  
                </AtList>
                <CreateConversation></CreateConversation>
              </View>
              
          </View>
        
      )
}

export default connect(Home, UserData)