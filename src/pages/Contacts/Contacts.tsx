import React, {useMemo, useState, useEffect} from 'react';
import { View, Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtList, AtListItem, AtCard } from 'taro-ui'
import {fetchAllUsers} from '@/api'
import {createConv} from '@/service/conversation'
import bff from '@/api/bff'
import './Contacts.scss';

function Contacts(){
  const [users, setUsers] = useState([])
  const [recentContacts, setRecentContacts] = useState([])

  useMemo(()=>{
    fetchAllUsers().then(res=>{
      setUsers(res)
    })
  },[])

  useEffect(()=>{
    // setRecentContacts(arr)
    bff.user.getUserRecentContacts().then(res=>{
      setRecentContacts(res)
    })
  }, [])

  return (
    <View className='Contacts-container'>
      <View className='section'>
        <AtCard 
          title='推荐用户'
          extra='最新5个'
        >
          <AtList>
            {users.map(u=>UserRow(u))}
          </AtList>
        </AtCard>
      </View>
      <View className='section'>
        <AtCard 
          title='最近联系人'
          extra='最近5个'
        >
          <AtList>
            {recentContacts.map(user=>RecentContactsRow(user))}
          </AtList>
        </AtCard>
      </View>
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
function RecentContactsRow(user){ // 这里的userId,指的是username字段,leancloud一开始自定的
  const name = user.get('displayName') || user.get('nickName')
  return (
    <View className='user-row'>
      <AtListItem onClick={()=>clickRow(user.attributes)} title={name} arrow='right' />
    </View>
  )
}

export default Contacts;
