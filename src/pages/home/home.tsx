import React, { useState, useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import LCClient from '@/scripts/LCClient'
import { AtNavBar, AtList, AtListItem} from 'taro-ui'
import Store from '@/store'
import {getLocalConvList} from '@/service/conversation'
import bff from '@/api/bff'
import './home.scss'


const {UserData, connect} = Store



function Home(props){
      const [id, setId] = useState(props.id)
      const [convList, setConvList] = useState([])

      function handleClick (type) {
        if (type === 'leftIcon') {
          // 退出操作
          Taro.navigateTo({url:'/pages/login/login'})
        }
      }


      // 从本地缓存中拿到存储的最近conversastionId
      // 查询后显示
      useEffect(()=>{
        getLocalConvList().then(arr=>{
          bff.conversation.queryConversations(arr).then(res => {
            setConvList(res)
          })
        })
      },[])

      useMemo(
        () => {
          // console.log('useMemo', convList)
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
              <View className='home__content'>
                <AtList>
                    {
                      convList.map(cv => {
                         return (
                              <AtListItem 
                                key={cv.id}
                                arrow='right'
                                note={cv.lastMessage.text}
                                title={cv.name}
                                extraText=''
                                onClick={()=>handleListItemClick(cv)}
                              />
                         )})
                    }
                </AtList>
              </View>
          </View>
        
      )
}

export default connect(Home, UserData)