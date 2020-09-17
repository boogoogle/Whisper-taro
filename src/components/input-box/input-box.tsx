import React, {useState, useEffect} from 'react'
import Taro, {Component} from '@tarojs/taro'
import { AtInput, AtButton } from 'taro-ui'
import { View } from '@tarojs/components';
import './input-box.scss'

function InputBox(props) {
    const [value, setValue] = useState('')

    function handleChange(v,e){
        // input, blur时也会触发这个事件,特别是在ios上,键盘自动落下
        if(e.type == 'input') {
            setValue(v)
        }
    }
    function send(){
        setValue('')
        props.onSubmit(value)
    }
    return (
        <View className='input-box-wrapper'>
            <AtInput
              name='value'
              type='text'
              className='box__input'
              placeholder='输入新消息'
              value={value}
              hold-keyboard
              always-embed	
              onChange={handleChange}
            />
            <AtButton 
              className='box__btn'
              type='primary' 
              disabled={!value} 
              onClick={send}
              size='normal'
            >
                发送
            </AtButton>
        </View>
    )
}

export default InputBox