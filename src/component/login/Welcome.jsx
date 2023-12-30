import React from 'react'
import Logo from '../../assets/Logo'

const Welcome = () => {
  return (
    <>
      <div className='flex flex-row gap-2 text-[24px] sm:text-[48px] text-gray-500 items-center'>
        <h2>Welcome to </h2>
        <Logo />
      </div>
    </>
  )
}

export default Welcome