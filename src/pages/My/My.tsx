import React, {useEffect, useState} from 'react';
import { View, Text} from '@tarojs/components'
import AV from 'leancloud-storage'
import Taro from '@tarojs/taro'
import CreateConversation from '@/components/createConversation'

import {AtAvatar } from 'taro-ui'
import './my.scss';

function My(){
  const [profile, setProfile] = useState({})
  useEffect(() => {
    const user = AV.User.current()
    const p = {
      avatarUrl: user.get('avatarUrl'),
      nickName: user.get('nickName')
    }
    setProfile(p)
    console.log(user.get('avatarUrl'))
  }, [])
  return (
    <View className='my-container'>
      <View className='profile-row pd20'>
        <AtAvatar circle size='large' image={profile.avatarUrl} className='mr20'></AtAvatar>
        <View>
          <Text>{profile.nickName}</Text>
        </View>
      </View>
      <CreateConversation></CreateConversation>
    </View>
  );
}

export default My;
