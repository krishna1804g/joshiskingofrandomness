import React from 'react'
import Welcome from '../component/login/Welcome'
import SignUpForm from '../component/login/SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center py-10 gap-10 bg-amber-50 min-h-[100vh]'>
                <Welcome />
                <SignUpForm />
            </div>
        </>
    )
}

export default SignUp