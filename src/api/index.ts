import AV from 'leancloud-storage'

export const fetchAllUsers = () => {
    const query = new AV.Query('_User')
    query.limit(15)
    return query.find()
}