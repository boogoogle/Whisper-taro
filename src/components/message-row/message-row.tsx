import React, {} from 'react';
import Taro, {Component} from '@tarojs/taro'
import { AtAvatar } from 'taro-ui'
import { View,Text, Image } from '@tarojs/components';
import Store from '@/store';
import './message-row.scss'

function MessageRow(props){
    const {message} = props
    const isSelf = message.from === Store.UserData.id
    function generateMsgDetail(){

        const {type} = message
        if(type == -1) { // 文本消息
            return <Text className='message__text'>{message.text}</Text>
        }
    
        if(type == -2) { // 图片消息
            let file = message.getFile()
            console.log(file.url())
            return (
                <View className='image-msg'>
                    <Image src={file.url()} mode='aspectFit' />
                    { message.text && <Text>{message.text}</Text> }
                </View>
            )
        }
    }

    return (
        <View className='message-row-container'>
            <View className={"at-row " + (isSelf ? 'flex-reverse' : '')}>
                <View className='at-col-2'>
                    <AtAvatar size='small' circle text={message.from} ></AtAvatar>
                </View>
                <View className='at-col-9'>
                    {generateMsgDetail()}
                </View>
                <View className='at-col-1'>
                </View>
            </View>     
        </View>
    )
}

export default MessageRow