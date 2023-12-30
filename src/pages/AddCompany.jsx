import React, { useState } from 'react'
import Logo from '../assets/Logo'
import AddCompanyForm from '../component/addCompany/addCompanyForm'
import CloudDirectoryList from '../component/addCompany/CloudDirectoryList'


const AddCompany = () => {
    const [companyName, setCompanyName] = useState(sessionStorage.getItem('cName'))


    return (
        <>
            <div className='flex flex-col  items-center text-gray-600 bg-amber-50 min-h-[100vh] '>
                <div className='py-10 flex flex-col items-center text-5xl'>
                    <Logo />
                </div>
                {companyName ? <CloudDirectoryList/>: <AddCompanyForm />
                }
            </div>
        </>
    )
}

export default AddCompany