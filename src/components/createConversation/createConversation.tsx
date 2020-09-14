import React, {useState, useEffect} from 'react';
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtInput} from 'taro-ui'
import { TextMessage } from "leancloud-realtime";
import storage from '@/helper/storage' 
import LCClient from '@/scripts/LCClient'
import './createConversation.scss';

const {IMClient} = LCClient

function CreateConversation(){

  const [friendId, setFriendId] = useState('')

  useEffect(()=>{
    console.log('ue')
    storage.getItem('friendId').then(id => {
      if(!id)return
      setFriendId(id)
    })
  }, [friendId])

  function createConv(){
    console.log(friendId, 'f')
    storage.setItem('friendId', friendId)
    LCClient.IMClient.createConversation({
      members: [friendId],
      name: LCClient.IMClient.id + '&' + friendId
      // ttl: this.state.ttl
    }).then(conversation => {
      LCClient.currentConversation = conversation
      console.log(conversation)
      Taro.navigateTo({
          url: `/pages/conversation/ConvPage/ConvPage?convId=${conversation.id}`
      })
      return conversation.send(new TextMessage('会话已创建, time: ' + (new Date())))
    }).then(() => {
        // Taro.navigateTo({
        //     url: '/pages/chat/chat'
        // })
    })
  }



  return (
    <View className='createConversation-container'>
      <AtInput
        name='friendId'
        type='text'
        placeholder='好友ID'
        value={friendId}
        onChange={(v) => setFriendId(v)}
      />
      <AtButton onClick={createConv}>+</AtButton>
    </View>
  );
}

export default CreateConversation;
