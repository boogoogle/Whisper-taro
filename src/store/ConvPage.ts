import DataBox from '../data-box'

export const ConvPageData = new DataBox('ConvPage', {
    convId: '',
    currentList: []
}, {
    updateList(arr){
        ConvPageData.update('currentList', ConvPageData.currentList.concat(arr))
        
    },
    updateConvId(v){
        ConvPageData.update('convId', v)
    }

})