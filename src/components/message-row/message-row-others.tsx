import React, {} from 'react';
import Taro, {Component} from '@tarojs/taro'
import { AtAvatar } from 'taro-ui'
import { View,Text } from '@tarojs/components';
import Store from '@/store';
import './message-row.scss'

function MessageRow(props){
    const {message} = props
    console.log(message,'0000')
    return (
        <View className='message-row-container'>
            <View className='at-row'>
                <View className='at-col-2'>
                    <AtAvatar size='small' circle text={message.from} ></AtAvatar>
                </View>
                <Text className='at-col-9 message__text'>{message.text}</Text>
                <View className='at-col-1'>
                </View>
            </View>     
        </View>
    )
}

export default MessageRow