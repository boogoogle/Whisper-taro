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
import {v4 as uuid} from 'uuid'

import { } from 'taro-ui'
import './ConvPage.scss';


const {ConvPageData, connect} = Store

function ConvPage(props){
  const [convList, setConvList] = useState([])
  const [currentConv, setCurrentConv] = useState(null)
  const convId =  getCurrentInstance().router.params.convId

  useEffect(()=>{
    LCClient.init().then( async IMClient => {
      const conv = await IMClient.getConversation(convId)
      if(!conv)return
      setCurrentConv(conv)
      fetchHistory(conv, convId)
    })
  }, [convId])

  useEffect( // 这里和用useMemo啥区别呢?
    () => {
      // console.log('useMemo', convList)
      function handleMessageReceived(message){
        // console.log("convpage -- handle msg received")
        setConvList([].concat(convList,message))
      }
      LCClient.addEventObserver(uuid(), convId, handleMessageReceived);
    },
    [convId, convList]
  );
  async function fetchHistory(conv,id){
    try {
      const messages = await conv.queryMessages({
        limit:20
      })
      setConvList(messages)
    } catch (error) {
      console.log(error)
    }
  }
  

  function sendMsg(v){
    console.log(v,'vvvv')
    // 文本消息
    let textMsg = new TextMessage(v)
    currentConv.send(textMsg).then(msg => {
      console.log('发送成功 --> ', msg)
      // 发送成功后手动塞入到当前消息列表中
      setConvList(convList.concat([msg]))
    }).catch(console.error);
  }

  return (
    <View className='ConvPage-container'>
      <View className='msg-content'>
        <Text>{convList.length}</Text>
        {
          convList.map(cv => <MessageRow message={cv} key={cv.id} />)
        }
      </View>
      <InputBox onSubmit={sendMsg}></InputBox>
    </View>
  );
}

export default connect(ConvPage, ConvPageData);
