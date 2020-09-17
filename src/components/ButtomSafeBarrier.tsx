/**
 * 底部安全距离,转对iPhoneX 等全面屏
 */
import React, {useState, useMemo} from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { View,Text } from '@tarojs/components'

 function ButtomSafeBarrier(){
     const [h, setH] = useState(0)
     useMemo(()=>{
        Taro.getSystemInfo({
            success: res=>{
                if(/iPhone X/i.test(res.model)) {
                    const bottomH = 34
                    setH(bottomH)
                }
            }
        })
     },[])
    return (
        <View style={{height: h}}></View>
    )
 }

 export default ButtomSafeBarrier