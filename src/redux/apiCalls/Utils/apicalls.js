import axios from "axios"
import { SERVER } from "../../../config/api"
import { getUtils } from "../../slices/utilsSlice"

export const getUtilsData = async (dispatch,name) => {
    try {
        const res = await axios.get(`${SERVER}/utils?check=${name}`)
        dispatch(getUtils(res.data.utils))
    } catch (err) {
        console.log(err)
        if (err.code === 'ERR_NETWORK') {
            toast.error("Please connect your internet!")
        } else {
            toast.error(err.response.data.error)
        }
    }
}