/* eslint-disable import/no-commonjs */

// import { Realtime } from "leancloud-realtime";
// import { TypedMessagesPlugin, ImageMessage } from 'leancloud-realtime-plugin-typed-messages';


 
import AV from '@/libs/leancloud-storage.js';
import { Realtime, TextMessage, setAdapters } from '@/libs/leancloud-realtime.js';
import { TypedMessagesPlugin, ImageMessage } from '@/libs/typed-messages.min.js';
import {AV_APP_CONFIG} from './config'

const adapters = require('@/libs/leancloud-adapters-weapp.js'); // 这个不能用import ,funk, 因为它不是用esMoule写的

console.log(adapters)

AV.setAdapters(adapters); // 为存储 SDK 设置 adapters
setAdapters(adapters);    // 为即时通讯 SDK 设置 adapters

AV.init(AV_APP_CONFIG)

export const YooRealtime = new Realtime(Object.assign(AV_APP_CONFIG, {
    plugins: [TypedMessagesPlugin]
}));