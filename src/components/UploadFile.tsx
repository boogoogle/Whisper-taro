/**
 * 
 * 
 * 
Taro.uploadFile({
    url: 'https://upload.qiniup.com', //仅为示例，非真实的接口地址
    filePath: tempFilePaths[0],
    name: 'file',
    formData: {
        'user': 'test'
    },
    success (res){
        const data = res.data
        //do something
    }
})
 * 
 * 
 */