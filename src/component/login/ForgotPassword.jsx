import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ForgotPassword = ({ successDialogOpen, setSuccessDialogOpen }) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({ mode: 'all' })
    const [loading, setLoading] = useState(false)
    const [otpOpen, setOtpOpen] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const handleForgotPassword = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/user/forgotPassword`, {
                email: data.email,
            })
            .then((res) => {
                setLoading(false)
                toast.success("OTP sent your email")
                setOtpOpen(false)
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }

    const handleVerify = (data) => {

        setLoading(true)
        if (data.oldPassword === data.newPassword) {
            toast.error("Current and New password can't be same")
            setValue("newPassword", '')
            setValue("cPassword", '')
        } else {
            axios
                .post(`${SERVER}/user/resetPassword`, {
                    email: data.email,
                    newPassword: data.newPassword,
                    otp: data.otp
                })
                .then((res) => {
                    setLoading(false)
                    toast.success("Password changed successfully")
                    reset()
                    setSuccessDialogOpen(false)
                }).catch((err) => {
                    toast.error(err.response.data.error)
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    return (
        <>
            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)} maxWidth={"sm"} fullWidth >
                <div className=''>
                    <div className='px-4'>
                        <img src="./logo.ico" alt="logo" className='w-[25%] md:w-[30%]' />
                    </div>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogContent>
                        {otpOpen ? <form className='w-full flex gap-6 flex-col' onSubmit={handleSubmit(handleForgotPassword)}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%" }}
                                {...register('email', {
                                    required: 'Email is required.',
                                })}
                                error={!!errors.email?.message}
                                helperText={errors.email?.message ? errors?.email.message : ""}
                            />
                            <div className='sm:w-[60%]'>

                                <Button type='submit' variant="contained" sx={{
                                    width: "100%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                        bgcolor: 'rgba(245, 158, 11, 0.9)',
                                    },
                                }}>Submit</Button>
                            </div>
                        </form> : <form className='w-full flex gap-6 flex-col' onSubmit={handleSubmit(handleVerify)}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%" }}
                                value={getValues("email")}
                                disabled
                            />
                            <TextField
                                label="New Password"
                                variant="outlined"
                                type={isVisible ? 'text' : 'password'}
                                {...register('newPassword', {
                                    required: 'New Password is required.',
                                    minLength: {
                                        value: 6,
                                        message: 'New Password Must be above 6 characters.',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'New Password Must be less than 16 characters.',
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                                        message: 'Must contain 1 UpperCase, 1 LowerCase, 1 Number ,1 Special char',
                                    },
                                })}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <span onClick={() => setIsVisible(!isVisible)}>
                                            {errors.password && isVisible ? <VisibilityOff /> : <Visibility />}
                                        </span>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                type={isVisible ? 'text' : 'password'}
                                {...register('cPassword', {
                                    required: 'Confirm password is required.',
                                    validate: (value) => {
                                        const { newPassword } = getValues();
                                        return newPassword === value || 'Passwords should match!';
                                    },
                                })}
                                error={!!errors.cPassword}
                                helperText={errors.cPassword?.message}
                            />
                            <TextField id="outlined-basic1" label="OTP" sx={{ width: "100%" }} variant="outlined" name='otp'
                                {...register('otp', {
                                    required: 'Otp is required.',
                                })}
                                error={!!errors.otp?.message}
                                helperText={errors.otp?.message ? errors?.otp.message : "OTP sent to your email"}
                            />
                            <Button type='submit' variant="contained" sx={{
                                width: "100%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                    bgcolor: 'rgba(245, 158, 11, 0.9)',
                                },
                            }}>Verify</Button>
                        </form>}
                    </DialogContent>
                </div>
            </Dialog>
        </>
    )
}

export default ForgotPassword