import React, { useState } from 'react'
import { View, Button, Text } from '@tarojs/components'
// import {userInit} from '../../scripts/userInit'

import { AtTabBar }  from 'taro-ui'

import ChatList from '../chat/chat-list/chat-list'
import AddConversation from '../chat/create/create'
import './home.scss'

function Home(){
      const [tab, setTab] = useState(0)
      
      function handleClick (value) {
        this.setState({
          current: value
        })
      }
      

      return (
          <View className='Home-container'>
              <View className='home__content'>
                  {!this.state.current ? <ChatList></ChatList> : <AddConversation></AddConversation>}
              </View>
              <AtTabBar
                className='home__tabs'
                tabList={[
                      { title: '', iconType: 'message', text: this.props.conversation.total },
                      { title: '', iconType: 'add' },
                      { title: '', iconType: 'user'}
                  ]}
                onClick={this.handleClick.bind(this)}
                current={this.state.current}
              />
          </View>
        
      )

}

export default Home