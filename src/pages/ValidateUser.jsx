import React from 'react'
import CheckUserValidityForm from '../component/checkUserValidity.jsx/ValidateUser'

const ValidateUser = () => {
  return (
    <>
      <div className=''>
        <h2 className='px-6 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>User Validation</h2>
        <div className='flex justify-center items-center min-h-[75vh]'>
          <CheckUserValidityForm />
        </div>
      </div>
    </>
  )
}

export default ValidateUser