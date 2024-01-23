import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo'
import AddCompanyForm from '../component/addCompany/addCompanyForm'
import CloudDirectoryList from '../component/addCompany/CloudDirectoryList'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/apiCalls/User/apicalls'


const AddCompany = () => {
    const [apiSuccess, setApiSuccess] = useState(false)
    const user = useSelector((state) => state?.persistedReducer.user);
    const dispatch = useDispatch()

        useEffect(() => {
            getUserData(dispatch, user?.id)
        }, [apiSuccess])



    return (
        <>
            <div className='flex flex-col  items-center text-gray-600 bg-amber-50 min-h-[100vh] '>
                <div className='py-10 flex flex-col items-center text-5xl'>
                    <Logo />
                </div>
                {!(user?.company?.name === null) ? <CloudDirectoryList /> : <AddCompanyForm apiSuccess={apiSuccess} setApiSuccess={setApiSuccess} />
                }
            </div>
        </>
    )
}

export default AddCompany