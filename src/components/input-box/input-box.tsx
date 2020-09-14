import React from 'react'
import Taro, {Component} from '@tarojs/taro'
import { AtInput, AtButton } from 'taro-ui'
import { View } from '@tarojs/components';
import './input-box.scss'

function InputBox() {
    
    return (
        <View className='input-box-wrapper'>
            <AtInput
              name='value'
              type='text'
              className='box__input'
              placeholder='输入新消息'
              value={this.props.inputValue}
              onChange={this.props.onInputChange}
            />
            <AtButton 
              className='box__btn'
              type='primary' 
              disabled={!this.props.inputValue} 
              onClick={this.props.onSubmit}
              size='small'
            >
                发送
            </AtButton>
        </View>
    )
}

export default InputBox