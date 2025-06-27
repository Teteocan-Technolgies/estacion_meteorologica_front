import axios from "axios"
export default {
    patchItem(payload,headers){
        return axios.patch(`/${payload.option}`,payload.item,{headers})
    },

    getItem(option,headers){
        return axios.get(`/${option}`,{headers})
    }
}