import React from 'react';
import { View, } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtAvatar, AtBadge } from 'taro-ui'
import './ComvListCell.scss';

function ComvListCell(message){
  return (
    <View className='ComvListCell-container'>
      <AtAvatar className='avatar' text='My' size='small' circle>占位图</AtAvatar>
      <View className='row-info'>
          <View className='mem c-333'>
              {message.members.map((mem,i) => {
                  return mem + (i < message.members.length - 1 ? '&' : '')
              })}
          </View> 
          <View className='row__last-message c-999'>
              {message.lastMessage && message.lastMessage._lctext}
          </View>
      </View>
      <View className='unread'>
      <AtBadge value={message.unreadMessagesCount} maxValue={99}>
          未读
      </AtBadge>
      </View>
    </View>
  );
}

export default ComvListCell;
