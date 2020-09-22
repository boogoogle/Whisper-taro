import React, {useState, useMemo} from 'react';
import { View } from '@tarojs/components'
import { AtButton, AtInput} from 'taro-ui'
import storage from '@/helper/storage' 
import {createConv} from '@/service/conversation'
import './createConversation.scss';

function CreateConversation(){
  const [friendId, setFriendId] = useState('')
  const [placeHolder, setPlaceHolder] = useState('')

  useMemo(()=>{
    console.log("useEffect")
    storage.getItem('friendId').then(id => {
      if(!id)return
      setPlaceHolder(id)
    })
  },[])

  function create(){
    const id = friendId || placeHolder
    storage.setItem('friendId', id)
    const friend = {
        email: id
    }
    createConv(friend)
  }

  return (
    <View className='createConversation-container'>
      <AtInput
        name='friendId'
        type='text'
        placeholder={placeHolder}
        value={friendId}
        onChange={(v) => setFriendId(v)}
      />
      <AtButton type='primary' size='normal' onClick={create}>发起会话</AtButton>
    </View>
  );
}

export default CreateConversation;
