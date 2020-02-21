import { createStore } from 'redux';

function reducer (){
    return [
        { id: 1, 
        nomes: [
            {id:1, subn:"welington"},
            {id:2, subn:"welitototonn"} 
        ]},
        { id: 2, 
            nomes: [
            {id:1, subn:"ojoajsdf"},
            {id:2, subn:"woisjdofj"} 
        ]},
    ]
}

const store = createStore(reducer);

export default store;