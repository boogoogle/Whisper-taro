let AV
import { Realtime } from "leancloud-realtime";
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import {AV_APP_CONFIG} from './config'

if (process.env.TARO_ENV === 'weapp') {
    AV = require('leancloud-storage/dist/av-weapp.js');
} else {
    AV = require('leancloud-storage/dist/av.js')
}

AV.init(AV_APP_CONFIG)

export const YooRealtime = new Realtime(Object.assign(AV_APP_CONFIG, {
    plugins: [TypedMessagesPlugin]
}));

// export const YooImageMessage = new ImageMessage()