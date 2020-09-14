import React, { useState, useEffect } from 'react'
import { View, Button, Text } from '@tarojs/components'
import storage from '@/helper/storage'
import CreateConversation from '@/components/createConversation'

import { AtNavBar } from 'taro-ui'
import './home.scss'
import Store from '../../store'

const {UserData, connect} = Store

function Home(props){
      const [id, setId] = useState(props.id)
      function handleClick (value) {
        // props.updateId(33444)
      }

      useEffect(() => {
        if(props.id) {
          setId(props.id)
          return 
        }
        let storagedId = storage.getItem('id').then((rst: any)=>{
          if(rst) {
            setId(rst)
          } 
        })
      }, [props.id]);
      
      return (
          <View className='Home-container'>
            <AtNavBar
              onClickRgIconSt={handleClick}
              color='#000'
              title='会话列表'
              leftText={id + ''}
              rightFirstIconType='add'
            />
              <View className='home__content'>
                <CreateConversation></CreateConversation>
              </View>
              
          </View>
        
      )
}

export default connect(Home, UserData)