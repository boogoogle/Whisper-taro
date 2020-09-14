import React, {useState, useEffect} from 'react'
import DataBox from "../data-box"


const connect = function(FuncEle, dataBox: DataBox){
    return function WrappedEle(props){
        
        const {data,methods} = dataBox
        const [tempData, setTempData] = useState(data)

        // console.log('execute function WrappedEle >> tempData', tempData)

        const arr = []
        useEffect(() => {
            // console.log('useEffect connect tempData', tempData)
            const keys = Object.keys(data)
            if(!keys.length)return

            keys.forEach(k => {
                arr.push({
                    key:k,
                    responder: v => {
                        // console.log(k,v,tempData[k], 'v in responder')
                        if(v == tempData[k]){
                            return
                        }
                        let o = {}
                        o[k] = v
                        setTempData(Object.assign({},tempData, o))
                    }
                })
            })
            dataBox.use(arr)
        });
        
        return (
           <FuncEle {...tempData} {...methods}  />       
        ) 
    }
}



export default connect