import AV from 'leancloud-storage'
import Request from './base'

export const fetchAllUsers = () => {
    const query = new AV.Query('_User')
    query.limit(5)
    query.descending('createdAt');
    return query.find()
}


export const getConversationHistoryById = (id: string) => {
    return Request.get(`conversations/${id}/messages`).then(res => {
        return res
    })
}