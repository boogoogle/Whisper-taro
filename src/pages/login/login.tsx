import React, {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import storage from '@/helper/storage' 
import LCClient from '@/scripts/LCClient'
import { AtButton,AtNoticebar,AtInput,AtMessage } from 'taro-ui'
import './login.scss'

import Store from '../../store'

const {UserData, connect} = Store


function LoginPage(props) {
    const [id, setId] = useState(props.id)
    const [suggestId, setSuggestId] = useState('')

    useEffect(() => {
      if(props.id) {
        setId(props.id)
        return 
      }
      storage.getItem('id').then(id=>{
        if(id) {
          setId(id)
        } 
      })
    }, [props.id]);

    function confirm(){
      if(!id) {
        Taro.atMessage({
          message: '请输入通行证',
          type: 'error'
        })
        return
      }
      props.updateId(id)
      storage.setItem('id', id)
      LCClient.init()

      Taro.navigateTo({
        url: '/pages/home/home'
      })
    }
    function handleChange(v){
      setId(v)
    }
    function suggest(v){
      setId(v)
    }

    return (
      <View className='login-page'>
        <AtMessage />
        <AtNoticebar marquee>输入你的通行证,当然您可以随意输入,不过那样的话,你就收不到自己的消息了/狗头</AtNoticebar>
        <View className='login__form'>
          <AtInput
            name='value'
            type='text'
            placeholder='输入通行证'
            value={id}
            onChange={handleChange}
          />

          <View className='login__suggest'>
            <AtInput
              disabled
              name='suggestValue'
              type='text'
              placeholder='建议ID'
              value={suggestId}
              onChange={handleChange}
            />
            <AtButton type='secondary' size='normal' circle 
              onClick={suggest}
            >
            上次</AtButton>
          </View>
    <AtButton type='primary' onClick={confirm}>准备好了</AtButton>
        </View>
      </View>
    )
}

// ele.link('user')(LoginPage)

export default connect(LoginPage, UserData)