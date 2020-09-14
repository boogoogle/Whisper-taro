import React, {} from 'react';
import Taro, {Component} from '@tarojs/taro'
import { AtAvatar } from 'taro-ui'
import { View,Text } from '@tarojs/components';
import './message-row.scss'
// import { UserData } from '@/store';

function MessageRow(props){
    const {message} = props
    const isSelf = message.type !== -1
    return (
        <View className='message-row-container'>
            <View className={"at-row " + (isSelf ? 'flex-reverse' : '')}>
                <View className='at-col-2'>
                    <AtAvatar size='small' circle text={isSelf ? message.from : '他'} ></AtAvatar>
                </View>
                <Text className='at-col-9 message__text'>{message.text}</Text>
                <View className='at-col-1'>

                </View>

            </View>     
        </View>
    )
}

export default MessageRow