import { Component } from 'react'
import 'taro-ui/dist/style/index.scss'
import LCClient from '@/scripts/LCClient'

import './app.scss'
import './styles/common.scss'


class App extends Component {

  componentDidMount () {
    console.log('App.js did mount')
    LCClient.init()
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      this.props.children
    )
  }
}

export default App
