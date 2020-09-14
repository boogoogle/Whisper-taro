/**
 * Conversation Page
 * chat whit friend here
 */
import React, {useEffect, useState} from 'react';
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
  console.log(props,'conv-page')
  const [convList, setConvList] = useState([])
  const [convId, setConvId] = useState('')

  useEffect(()=>{
    let id =  getCurrentInstance().router.params.convId
    console.log('useEffect, ConvPage',)
    if(!id){
      return
    }
    setConvId(id)
    // LCClient.addEventObserver(uuid(),convId, handleMessageReceived)
    fetchHistory(convId)
  }, [convId])
  function handleMessageReceived(message){
    setConvList(message)
  }
  async function fetchHistory(id){
    console.log(id, '=====')
    try {
      await LCClient.init()
      const conv = await LCClient.IMClient.getConversation(id)
      if(!conv)return
      const messages = await conv.queryMessages({
        limit:20
      })
      console.log(messages, '<-------messages------>')
      setConvList(messages)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <View className='ConvPage-container'>
      <Text>{convList.length}</Text>
      {
        convList.map(cv => <MessageRow message={cv} key={cv.id} />)
      }

    </View>
  );
}

export default connect(ConvPage, ConvPageData);
