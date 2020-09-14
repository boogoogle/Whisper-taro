import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import store from '../../../store'
import {updateUserInfo} from '../../../store/actions/user'
import { YooRealtime } from '../../../scripts/avInit'

import { TextMessage } from "leancloud-realtime";

const mapState2Props = ({user}) => {
    return {
        uuid: user.uuid
    }
}
type State = {
    uuid: string, 
    ttl: number  // 保持时间
    members: string[]
}

interface CreateChatPage {
    props: {
        uuid: string
    },
    state: State
}

@connect(mapState2Props)
class CreateChatPage extends Component {
    config: Config = {
        navigationBarTitleText: 'Create Chat'
    }

    constructor(){
      super(...arguments)
      this.state = {
          uuid: this.props.uuid || 'dev001',
          ttl: 60*60*60, // 这是多长时间? 1小时?
          members: ['dev002']
      }
    //   console.log('当前登录用户uuid:', this.state.uuid)
    }

    createIMClient(){
        YooRealtime.createIMClient(this.state.uuid).then(self => {
            store.dispatch(updateUserInfo({
                IMInstance: self
            }))
            return self.createConversation({
                members: this.state.members,
                // ttl: this.state.ttl
            })
        }).then(conversation => {
            console.log('ppppp', conversation)

            return conversation.send(new TextMessage('会话已创建, time: ' + (new Date())))
        }).then(() => {
            // Taro.navigateTo({
            //     url: '/pages/chat/chat'
            // })
        })
    }



    componentWillReceiveProps (nextProps) {
    }

    render () {
      return (
        <View className='create-chat-page'>
            creating 
            <AtButton onClick={this.createIMClient.bind(this)}>创建</AtButton>
        </View>
      )
    }
}

export default CreateChatPage