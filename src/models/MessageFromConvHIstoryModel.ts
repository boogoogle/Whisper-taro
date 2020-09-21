class MessageFromConvHistoryModel {
    msgId: string
    convId: string
    timestamp: string
    lcText: string
    from: string
    imgUrl: string
    lcType: number

    constructor(_msgId:string, ){
        this.msgId = _msgId
    }
}