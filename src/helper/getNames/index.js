import names from './names'

const length = names.length

function generateName(){
    const i = Math.ceil(Math.random() * length)

    return names[i]
}

export default generateName