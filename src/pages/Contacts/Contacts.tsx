import React, {useMemo, useState} from 'react';
import { View, Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtList, AtListItem } from 'taro-ui'
import {fetchAllUsers} from '@/api'
import {createConv} from '@/service/conversation'
import './Contacts.scss';

function Contacts(){
  const [users, setUsers] = useState([])

  useMemo(()=>{
    fetchAllUsers().then(res=>{
      setUsers(res)
    })
  },[])

  return (
    <View className='Contacts-container'>
      <AtList>
        {users.map(u=>UserRow(u))}
      </AtList>
    </View>
  );
}

function clickRow(user){
    createConv(user)
}

function UserRow(user){
  const name = user.attributes.displayName || user.attributes.nickName
  return (
    <View className='user-row'>
      <AtListItem onClick={()=>clickRow(user.attributes)} title={name} arrow='right' />
    </View>
  )
}

export default Contacts;
