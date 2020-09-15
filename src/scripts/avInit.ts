
import { Realtime } from "leancloud-realtime";
import { TypedMessagesPlugin, ImageMessage } from 'leancloud-realtime-plugin-typed-messages';
// import adapters from '@/libs/leancloud-adapters-weapp'
import {AV_APP_CONFIG} from './config'

let AV
if (process.env.TARO_ENV === 'weapp') {
    AV = require('leancloud-storage/dist/av-weapp.js');
} else {
    AV = require('leancloud-storage/dist/av.js')
}


// AV.setAdapters(adapters);

AV.init(AV_APP_CONFIG)

export const YooRealtime = new Realtime(Object.assign(AV_APP_CONFIG, {
    plugins: [TypedMessagesPlugin]
}));

// export const YooImageMessage = new ImageMessage()