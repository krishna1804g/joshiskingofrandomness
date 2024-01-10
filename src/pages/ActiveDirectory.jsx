import React, { useState } from 'react'
import DisplayDomains from '../component/Domain/DisplayDomains';

const ActiveDirectory = () => {
  return (
    <>
      <div className=''>
        <h2 className='px-6 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>Domain</h2>
        <DisplayDomains />
      </div>
    </>
  )
}

export default ActiveDirectory