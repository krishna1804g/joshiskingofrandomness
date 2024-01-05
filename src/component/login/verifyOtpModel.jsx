import React from 'react'

const verifyOtpModel = () => {
    return (
        <>
            <Dialog open={successDialogOpen} >
                <div className='bg-theme-color'>
                    <div className='flex items-center gap-4 p-4'>
                        <img src="./Union.svg" alt="logo" className='w-[15%] md:w-[10%]' />
                        <h1 className='text-[18px] md:text-[30.47px] font-semibold'>Brand Safe</h1>
                    </div>
                    <DialogTitle sx={{ color: "green" }}>Email Sent Successfully !!</DialogTitle>
                    <DialogContent>
                        <p>We have sent an email to <b>{userEmail}</b> to verify your account.</p>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default verifyOtpModel