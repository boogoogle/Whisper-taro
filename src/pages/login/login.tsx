import React, {useState, useEffect, useMemo} from 'react'
import AV from 'leancloud-storage';
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import storage from '@/helper/storage' 
import LCClient from '@/scripts/LCClient'
import { AtButton,AtNoticebar,AtInput,AtMessage } from 'taro-ui'
import './login.scss'

import Store from '../../store'

const {UserData, connect} = Store


function LoginPage(props) {

    const [canIUse, setCanIuse] = useState(false)
    // 使用微信登录小程序账号
    useMemo(()=>{
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
    },[])

    function loginAV(userInfo){
      AV.User.loginWithMiniApp().then(user => {
        user.set(userInfo).save().then(savedUser => {
          // console.log(savedUser)
        })
        LCClient.init()
        Taro.switchTab({
          url: '/pages/home/home'
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
          <AtButton 
            className='mt10' 
            type='secondary' 
            openType='getUserInfo'
            onGetUserInfo={bindgetuserinfo}
          >微信登录</AtButton>
          }
        </View>
      </View>
    )
}

// ele.link('user')(LoginPage)

export default connect(LoginPage, UserData)