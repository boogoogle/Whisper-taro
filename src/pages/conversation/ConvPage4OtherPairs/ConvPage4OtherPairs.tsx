/**
 * 本人未参与的会话,聊天详情页
 */

import React, {useEffect, useState, useMemo} from 'react';
import { View,ScrollView } from '@tarojs/components'
import { } from 'taro-ui'
import Taro, { getCurrentInstance,useDidShow, useReachBottom } from '@tarojs/taro'
import LCClient from '@/scripts/LCClient'
import {getConversationHistoryById} from '@/api/index'
import MessageRowOthers from '@/components/message-row/message-row-others'


import './ConvPage4OtherPairs.scss';

function ConvPage4OtherPairs(){
  const [messageList, setMessageList] = useState([])
  const [currentConv, setCurrentConv] = useState(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollViewHeigh, setScrollViewHeight] = useState(0)

  useMemo(()=>{
    const convId = getCurrentInstance().router.params.convId
    // const currentUser = AV.User.current()
    LCClient.init().then( async IMClient => {
      const conv = await IMClient.getConversation(convId)
      // if(conv.members.indexOf(currentUser.get('username'))) {
      //   setCanISpeak(true)
      // }
      if(!conv)return
      Taro.setNavigationBarTitle({
        title: conv.get('name')
      })
      setCurrentConv(conv)
      fetchHistory(convId)
    })
  },[])

  useEffect(()=>{
    const l = messageList.length
    if(l === 0) return
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery()
      query.select('#msg-content').boundingClientRect()
      query.exec(function(res){
        setScrollViewHeight(res[0].height)
      })
      setScrollTop(40 * l)
    })
  },[messageList])

  async function fetchHistory(id){
    try {
      const messages = await getConversationHistoryById(id,{
        limit:20
      })
      setMessageList(messages)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className='ConvPage4OtherPairs-container'>
      <View id='msg-content' className='msg-content'>
       <ScrollView
         style={{height: '100vh'}}
         scrollY 
         scrollTop={scrollTop}
       >
          {
            messageList.map((msg,idx) => {
              return (
                <View className={`msg-anchor-${idx}`} key={msg.msgId}>
                    <MessageRowOthers message={msg} />
                </View>
              )
            })
          }
        </ScrollView>
        </View>
    </View>
  );
}

export default ConvPage4OtherPairs;
