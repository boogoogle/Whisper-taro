import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import ConversationRow from '../../../components/conversation/single-conversation-row'
import { TYPE_CONVERSATION } from '../../../types/conversation'
import {updateChatingPageInfo} from '../../../store/actions/conversation'
import EventHub from '../../../scripts/eventhub'


import './chat-list.scss'
import { connect } from '@tarojs/redux';
interface ChatList {
  props: {
      user: object,
      updateChatingPage: (chatingInfo:object) => void
  },
  state: {
    conversationList: TYPE_CONVERSATION[] | any,
  }
}

const mapStateToProps = ({user}) => {
  return {
    user,
  }
}
const mapDispatchToProps = dispatch => ({
  updateChatingPage(chatingInfo){
    dispatch(updateChatingPageInfo(chatingInfo))
  }
})

@connect(mapStateToProps, mapDispatchToProps)

class ChatList extends Component {
    config: Config = {
        navigationBarTitleText: 'Chating'
    }

    constructor(){
      super(...arguments)
      this.state = {
        conversationList: []
      }
      const self = this
      EventHub.addListener('upadteConversationList', (data) => {
        self.updateList(data.list)
      })
    }
    updateList(list){
      const r = list.map(item=> {
        const {lastMessage, members, id} = item
        return {lastMessage, members, id}
      })
      console.log(r, 'rrrr')
      this.setState({
        conversationList: r
      })
    }
    clickMessage(item) {
      this.props.updateChatingPage(item)
      Taro.navigateTo({
        url: '/pages/chating/chating-page'
      })
    }

    render () {
      return (
        <View className="chat-page">
          {this.state.conversationList && this.state.conversationList.map((item,index) => {
            // unreadMessagesCount在item的非可枚举属性上
            return <View onClick={this.clickMessage.bind(this,item)} key={index}>
                      <ConversationRow 
                        members={item.members}
                        lastMessage={item.lastMessage}
                        unreadMessagesCount={item.unreadMessagesCount}>
                      </ConversationRow>
                  </View>
          })}
        </View>
      )
    }
}

export default ChatList