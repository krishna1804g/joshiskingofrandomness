import React from 'react'

const NoPage = () => {
    return (
        <>
            <div className='flex justify-center h-[100vh] bg-amber-100 items-center'>
                <div>

                </div>
                <div>
                    <h2 className='text-orange-500 text-[68px] font-bold'>404</h2>
                    <p className='text-2xl font-[300]'>OOPS! PAGE NOT BE FOUND</p>
                    <p className='text-gray-400'>Sorry but the page you are looking for does not exits,<br />have been removed,name changed or temporarily unavailable.</p>
                </div>
            </div>
        </>
    )
}

export default NoPage