/**
 *  BFF,这些接口本该放到后端(或者中转层),
 *     处理表中的复杂数据,然后给前端
*/
import AV from 'leancloud-storage'


// 用户信息有关的接口
const user = {
    getUserRecentContacts(){
        const currentUser = AV.User.current()
        const l = currentUser.get('recentContacts')
        let arr = []
        if (l && l.length){
            l.forEach( uid => {
                const query = new AV.Query('_User')
                query.equalTo('username', uid)
                arr.push(query)
            })
        }
        const query = AV.Query.or(...arr)
        return query.find()
    }
}





export default {
    user
}