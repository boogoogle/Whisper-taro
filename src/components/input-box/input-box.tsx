import React, {useState, useEffect} from 'react'
import Taro from '@tarojs/taro'
import AV from "leancloud-storage";
import { TextMessage } from "leancloud-realtime";
import {ImageMessage } from '@/libs/typed-messages.min.js';
import { AtInput, AtButton, AtIcon, AtTag } from 'taro-ui'
import { View,Image } from '@tarojs/components';
import './input-box.scss'



function InputBox(props) {
    const [value, setValue] = useState('')
    const [imgPath, setImgPath] = useState('')

    function handleChange(v,e){
        // input, blur时也会触发这个事件,特别是在ios上,键盘自动落下
        if(e.type == 'input') {
            setValue(v)
        }
    }
    async function send(){
        if(imgPath) {
          const fileName = imgPath.split('/')[3]
          console.log(fileName)
          let file = new AV.File(fileName, {
            blob: {
              uri: imgPath
            }
          })
          // 小程序图片消息 https://leancloud.cn/docs/weapp.html#hash794469087
          file.save().then(()=>{
            var message = new ImageMessage(file)
            if(value) {
              message.setText(value)
            }
            // message.setAttributes({'location': '北京'})
            props.onSubmit(message)
            setValue('')

          }).catch(e => {
            console.log(e)
          })
          
        } else {
          const textMsg = new TextMessage(value)
          props.onSubmit(textMsg)
          setValue('')
        }

    }
    function handleMediaClick(){
        Taro.chooseImage({
            success (res) {
              const tempFilePaths = res.tempFilePaths
              const file = tempFilePaths[0]
              setImgPath(file)
            }
          })
    }
    function cancelImg(){
      setImgPath('')
    }
    return (
        <View className='input-box-wrapper'>
            <View className='content-wrapper'>
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
              <Image className='img' mode='aspectFit' src={imgPath}></Image>
            </View>
            <View className='input--wrapper'>
                {
                  imgPath ? <AtTag circle size='small' onClick={cancelImg}>取消</AtTag> :
                  <AtIcon onClick={handleMediaClick} value='add-circle' size='30' color='#999'></AtIcon>
                }
                <AtButton 
                  className='box__btn ml10'
                  type='primary' 
                  disabled={!value && !imgPath} 
                  onClick={send}
                  size='normal'
                >发送</AtButton>
                </View>
        </View>
    )
}

export default InputBox