import React, { useEffect, useState } from 'react'
import AfterLoginNavbar from '../navbar/AfterLoginNavbar'
import User from '../sidebar/User'


const AfterLoginLayout = () => {
    const [role, setRole] = useState()
    const [user, setUser] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setUser(sessionStorage.getItem("uid"))
        setRole(sessionStorage.getItem("role"))
    }, [sessionStorage.getItem("uid")])

    

    return (
        <>
            <AfterLoginNavbar open={open} setOpen={setOpen} />
            <User open={open} setOpen={setOpen}/>
        </>
    )
}

export default AfterLoginLayout