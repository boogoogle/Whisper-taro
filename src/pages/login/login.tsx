import React, {useState, useMemo} from 'react'
import AV from 'leancloud-storage';
import Taro, { useDidShow } from '@tarojs/taro'
import {View} from '@tarojs/components'
import LCClient from '@/scripts/LCClient'
import { AtButton,AtInput} from 'taro-ui'
import generateName from '@/helper/getNames'
import './login.scss'

import Store from '../../store'

const {UserData, connect} = Store


function LoginPage(props) {

    const [canIUse, setCanIuse] = useState(false)
    const [placeHolder, setPlaceHolder] = useState('')
    const [displayName, setDisplayName] = useState('')

    // 使用微信登录小程序账号
    useDidShow(()=>{
      console.log('login usememo-----')
      Taro.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            setCanIuse(true)
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            Taro.getUserInfo({
              success: ({userInfo}) => {
                // console.log(userInfo) // 登录用户基础信息...
                // 使用LeanCloud账号系统登录
                loginAV(userInfo)
              }
            })
          }
        }
      })
    })

    useDidShow(()=>{
      setPlaceHolder(generateName())
    })

    function loginAV(userInfo){
      AV.User.loginWithMiniApp().then(user => {
        userInfo.displayName = displayName || placeHolder
        user.set(userInfo).save().then(savedUser => {
          // console.log(savedUser)
        })
        LCClient.init()
        Taro.switchTab({
          url: '/pages/Ground/Ground'
        })
      }).catch(console.error);
    }

    function bindgetuserinfo(e){
      if(e.detail.userInfo) {
        setCanIuse(true)
        loginAV(e.detail.userInfo)
      }
    }

    return (
      <View className='login-page'>
        <View className='login__form'>
          { 
          canIUse ? 
          '' :

            <View>
            <AtButton 
              className='mt10' 
              type='secondary' 
              openType='getUserInfo'
              onGetUserInfo={bindgetuserinfo}
            >微信登录(使用下方昵称)</AtButton>
            <View>
              <AtInput
                name='displayName'
                type='text'
                placeholder={placeHolder}
                value={displayName}
                onChange={(v) => setDisplayName(v)}
              />

            </View>
          </View>
          }
        </View>
      </View>
    )
}

// ele.link('user')(LoginPage)

export default connect(LoginPage, UserData)