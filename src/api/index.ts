import AV from 'leancloud-storage'
import Request from './base'

export const fetchAllUsers = () => {
    const query = new AV.Query('_User')
    query.limit(5)
    query.descending('createdAt');
    return query.find()
}


export const getConversationHistoryById = (id: string, params?:object) => {
    return Request.get(`conversations/${id}/messages`).then(res => {
        let arr = []
        if(res && res.length) {
            arr = res.map( m=> {
                let text = ''
                if(m.data) {
                    let d = JSON.parse(m.data)
                    text = d._lctext
                }

                return {
                    convId: m['conv-id'],
                    msgId: m['msg-id'],
                    text: text,
                    from: m['from']
                }
            })
        }
        return arr
    })
}