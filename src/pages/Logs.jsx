import React from 'react'
import LogsData from '../component/logs/LogsData'



const Logs = () => {
  return (
    <>
    <div className='flex flex-col justify-start items-start  py-4 '>
      <h2 className='font-semibold text-lg text-gray-800 px-6'>Logs</h2>
      <LogsData/>
    </div>
    </>
  )
}

export default Logs