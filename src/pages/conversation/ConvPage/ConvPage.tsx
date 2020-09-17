/**
 * Conversation Page
 * chat whit friend here
 */
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { TextMessage } from "leancloud-realtime";
import { View,Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import LCClient from '@/scripts/LCClient'
import Store from '@/store'
import MessageRow from '@/components/message-row'
import InputBox from '@/components/input-box'
import ButtomSafeBarrier from '@/components/ButtomSafeBarrier'

import './ConvPage.scss';

const {ConvPageData, connect} = Store

function ConvPage(props){
  const [messageList, setMessageList] = useState([])
  const [currentConv, setCurrentConv] = useState(null)

  useMemo(()=>{
    const convId =  getCurrentInstance().router.params.convId
    LCClient.init().then( async IMClient => {
      const conv = await IMClient.getConversation(convId)
      console.log(conv,'----')
      if(!conv)return
      wx.setNavigationBarTitle({
        title: conv.get('name')
      })
      setCurrentConv(conv)
      fetchHistory(conv, convId)
    })
  },[])

  useEffect( // 这里和用useMemo啥区别呢?
    () => {
      const convId =  getCurrentInstance().router.params.convId
      // console.log('useMemo', messageList)
      function handleMessageReceived(message){
        // console.log("convpage -- handle msg received")
        setMessageList([].concat(messageList,message))
      }
      LCClient.addEventObserver(convId, handleMessageReceived);
    },
    [messageList]
  );
  async function fetchHistory(conv,id){
    try {
      const messages = await conv.queryMessages({
        limit:20
      })
      setMessageList(messages)
    } catch (error) {
      console.log(error)
    }
  }
  

  function sendMsg(v){
    // 文本消息
    let textMsg = new TextMessage(v)
    currentConv.send(textMsg).then(msg => {
      console.log('发送成功 --> ', msg)
      // 发送成功后手动塞入到当前消息列表中
      setMessageList(messageList.concat([msg]))
    }).catch(console.error);
  }

  function handleClickBack(){
    Taro.navigateTo({
      url:'/pages/home/home'
    })
  }

  return (
    <View className='ConvPage-container'>
      {/* <AtNavBar
        onClickLeftIcon={handleClickBack}
        color='#000'
        title='聊天详情'
        leftIconType='chevron-left'
      /> */}
      <View className='msg-content'>
        {
          messageList.map(msg => <MessageRow message={msg} key={msg.id} />)
        }
      </View>
      <InputBox onSubmit={sendMsg}></InputBox>
      <ButtomSafeBarrier />
    </View>
  );
}

export default connect(ConvPage, ConvPageData);
