export default {
  pages: [
    'pages/Contacts/Contacts',
    'pages/home/home',
    'pages/Ground/Ground',
    'pages/My/My',
    'pages/login/login',
    'pages/conversation/ConvPage/ConvPage',
    'pages/conversation/ConvPage4OtherPairs/ConvPage4OtherPairs'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // navigationStyle: 'custom'// 自定义需要处理刘海
  },
  // [小程序tabbar配置](https://taro-docs.jd.com/taro/docs/tutorial#tabbar)
  tabBar: { 
    list:[
      {
        pagePath: 'pages/home/home',
        iconPath: './imgs/msg-grey.png',
        selectedIconPath: './imgs/msg.png'
      },
      {
        pagePath: 'pages/Ground/Ground',
        iconPath: './imgs/earth-grey.png',
        selectedIconPath: './imgs/earth.png'
      },
      {
        pagePath: 'pages/Contacts/Contacts',
        iconPath: './imgs/explore-grey.png',
        selectedIconPath: './imgs/explore.png'
      },
      {
        pagePath: 'pages/My/My',
        iconPath: './imgs/mine-grey.png',
        selectedIconPath: './imgs/mine.png'
      }
    ]
  }
}
