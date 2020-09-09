import React, {useState} from 'react'
import { View, } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton,AtNoticebar,AtInput,AtMessage } from 'taro-ui'
import './login.scss'

import Store from '../../store'



function LoginPage() {
      // const {uuid} = this.$router.params // 先从路由取值,方便测试
    const [id, setId] = useState('')
    const [suggestId, setSuggestId] = useState('')

    const userFromStore = Store.pick('user',{
      'id': v => setId(v) // 根据需要配置对应key的回调, 如果只是取值某个属性,完全可以不声明
    })

    function confirm(){
      if(!id) {
        Taro.atMessage({
          message: '请输入通行证',
          type: 'error'
        })
        return
      }
      userFromStore.updateAttr('id', id)
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

export default LoginPage