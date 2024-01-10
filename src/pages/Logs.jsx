import React from 'react'
import LogsData from '../component/log/LogsData'



const Logs = () => {
  return (
    <>
      <div className=''>
        <h2 className='px-6 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>Logs</h2>
        {/* <LogsData/> */}
        <div className='flex justify-center items-center min-h-[75vh]'>
          <img src="../work-progress.png" alt="coming_soon" className='w-[10%]' />
        </div>
      </div>
    </>
  )
}

export default Logs