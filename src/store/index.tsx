import React, {Component, FunctionComponent, FunctionComponentElement, ReactElement} from 'react'
import Taro from '@tarojs/taro'

const GlobalContext = React.createContext(null)

const state = {
    user: {
        id: '000',
        token: ''
    }
}

class Provider extends Component{
    render() {
        return (
            <GlobalContext.Provider value={state}> 
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
    
}


interface LinkedAttrModel{
    [propName: string]: Function | null
}

function pick(moduleName: string, lm? : LinkedAttrModel){
    let keys = Object.keys(lm)
    const module = state[moduleName]
    keys.forEach(k => {
        let value
        if (module.hasOwnProperty(k)) {
            value = module[k]
        } else {
            throw Error(`${module} doesn't have this key: ${k}`)
        }
        Object.defineProperty(module, k, {
            get: () => {
                return value
            },
            set: newValue => {
                if (newValue !== value) {
                    value = newValue
                    lm[k](value)
                }
            }
        })
    })
    module.updateAttr = (key: string,value: any) => {
        module[key] = value
    }
    return module
}

export default {
    Provider,
    pick,
    state
}

