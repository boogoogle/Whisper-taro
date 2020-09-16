import React, {useState} from 'react'
import Taro, {Component} from '@tarojs/taro'
import { AtInput, AtButton } from 'taro-ui'
import { View } from '@tarojs/components';
import './input-box.scss'

function InputBox(props) {
    const [value, setValue] = useState('')
    function handleChange(v){
        setValue(v)
    }
    function send(){
        props.onSubmit(value)
        setValue('')
    }
    return (
        <View className='input-box-wrapper'>
            <AtInput
              name='value'
              type='text'
              className='box__input'
              placeholder='输入新消息'
              value={value}
              onChange={handleChange}
            />
            <AtButton 
              className='box__btn'
              type='primary' 
              disabled={!value} 
              onClick={send}
              size='small'
            >
                发送
            </AtButton>
        </View>
    )
}

export default InputBox