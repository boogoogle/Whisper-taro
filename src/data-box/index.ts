import {isObject, isString} from '../helper/utils'


interface UseModel extends Array<any>{
    [index: number]: string | object
}


class DataBox {
    data:object
    methods: object
    updatedcallbackMap = {}
    constructor(moduleName:string='global', data:object, methods: object){
        this.data = data
        this.methods = methods
        Object.keys(data).forEach(k => {
            let value
            if (data.hasOwnProperty(k)) {
                value = data[k]
            } else {
                throw Error(`${data} doesn't have this key: ${k}`)
            }
            Object.defineProperty(this,k,{
                get(){
                    return value
                },
                set(newValue) {
                    if (newValue !== value) {
                        value = newValue
                        console.log(value,'v in set')
                        this.updatedcallbackMap[k] && this.updatedcallbackMap[k](newValue)
                    }
                }
            })
        })
    }
    update(key:string, value: any){
        this[key] = value

    }
    use(params: UseModel) {
        params.forEach(p => {
            if(isString(p)){ // 只传了一个String

            } else { // 对象
                const {key, responder} = p
                this.updatedcallbackMap[key] = responder
                responder(this[key])
            }
        })
    }
    
}

export default DataBox