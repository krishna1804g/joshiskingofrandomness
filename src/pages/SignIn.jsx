import React from 'react'
import Welcome from '../component/login/Welcome'
import SignInForm from '../component/login/SignInForm'

const SignIn = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center py-10 gap-10 bg-amber-50 min-h-[100vh]'>
                <Welcome />
                <SignInForm />
            </div>
        </>
    )
}

export default SignIn
