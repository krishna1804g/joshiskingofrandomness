import axios from "axios"
import { SERVER } from "../../../config/api"
import { getUser } from "../../slices/userSlice"

export const getUserData = async (dispatch,id) => {
    try {
        const res = await axios.get(`${SERVER}/user/${id}`)
        dispatch(getUser(res.data.user))
    } catch (err) {
        console.log(err)
        if (err.code === 'ERR_NETWORK') {
            toast.error("Please connect your internet!")
        } else {
            toast.error(err.response.data.error)
        }
    }
}