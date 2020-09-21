import React, {useState, useMemo, useEffect} from 'react';
import { View, } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtList, AtListItem} from 'taro-ui'
import bff from '@/api/bff'
import './Ground.scss';
/**
 *  通过Rest查询到的消息字段
    msg-id: "EZ7yzx+xSk+JDW5_sncvvg"
    conv-id: "5f647e7370b5c8f1c5b109ac"
    is-conv: true
    conv-type: 1
    from: "ksxom01e2czs9rcgsfj2dbgi3"
    bin: false
    mention-all: false
    timestamp: 1600421534505
    is-room: false
    from-ip: "58.247.93.26"
    to: "5f647e7370b5c8f1c5b109ac"
    data: "{"_lctext":"22222","_lctype":-1}"

 */

function Ground(){

    const [convList, setConvList] = useState([])

    useEffect(()=>{
        bff.conversation.getConversationsFromRestApi().then(res=>{
            setConvList(res)
        })
        
    }, [])

    function handleListItemClick(conversation){
        Taro.navigateTo({
          url: `/pages/conversation/ConvPage/ConvPage?convId=${conversation.id}`
        })
    }
    return (
        <View className='Ground-container'>
            <AtList>
                {convList.map( cv => {
                    return (
                        <AtListItem 
                          key={cv.convId}
                          arrow='right'
                          note={cv.lastMessageInHistory.text}
                          title={cv.name}
                          extraText=''
                          onClick={()=>handleListItemClick(cv)}
                        />
                    )
                })}
            </AtList>
        </View>
    );
}

export default Ground;
