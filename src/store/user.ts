import DataBox from '../data-box'

export const UserData = new DataBox('user', {
    id: 0,
    isLogin: false,
    userInfo: {}
}, {
    updateId(v){
        UserData.update('id', v)
    },
    updateUserInfo(info){
        UserData.update('userInfo', info)
    },

})
