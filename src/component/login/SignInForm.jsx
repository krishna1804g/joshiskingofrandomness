import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { SERVER } from '../../config/api';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice';


const SignInForm = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: 'all' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpOpen, setOtpOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/user/signIn`, {
                email: data.email,
                password: data.password
            })
            .then((res) => {
                setLoading(false)
                let userData = res.data.data
                dispatch(setUser(userData))
                if (userData?.isEmailVerified === 0) {
                    toast.success("OTP sent your email")
                    setOtpOpen(true)
                } else if (!userData.company.id) {
                    navigate('/add-company')
                } else if (!userData.domains === 0) {
                    navigate('/add-company')
                } else {
                    navigate('/dashboard')
                }
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }

    const handleVerify = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/user/verifyOtp`, {
                email: data.email,
                otp: data.otp
            })
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                let userData = res.data.data
                dispatch(setUser(userData))
                toast.success("Account verified successfully")
                if (!userData.company.id) {
                    navigate('/add-company')
                } else if (!userData.domains === 0) {
                    navigate('/add-company')
                } else {
                    navigate('/dashboard')
                }
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <div className='sm:ring-[1px] sm:ring-gray-200 shadow-sm sm:shadow-gray-500 md:min-w-[500px] md:min-h-[300px] md:bg-amber-100/20 rounded-xl w-full sm:w-[60%] md:w-[0px] px-4 md:px-6 lg:px-12 py-4 flex flex-col justify-center gap-10 items-center'>
                <h6 className=' font-semibold text-3xl text-gray-600'>Sign In</h6>
                {otpOpen?.isEmailVerified !== 0 ? <form className='w-full flex gap-6 flex-col' onSubmit={handleSubmit(handleSignUp)}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%" }}
                        {...register('email', {
                            required: 'Email is required.',
                        })}
                        error={!!errors.email?.message}
                        helperText={errors.email?.message ? errors?.email.message : ""}
                    />
                    <div className='relative w-full flex flex-col gap-4'>
                        <TextField id="outlined-basic1" label="Password" sx={{ width: "100%" }} variant="outlined" name='password'
                            {...register('password', {
                                required: 'Password is required.',
                            })}
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message ? errors?.password.message : ""}
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-4'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </div>
                        <div className='relative'>
                            <Link to="/forgotPassword"><h1 className="absolute -top-4 right-0 text-[#EB3434] text-center hover:underline">Forgot Password?</h1></Link>
                        </div>
                    </div>
                    <div className='sm:w-[60%]'>

                        <Button type='submit' variant="contained" sx={{
                            width: "100%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                bgcolor: 'rgba(245, 158, 11, 0.9)',
                            },
                        }}>Next</Button>
                    </div>
                </form> : <form className='w-full flex gap-6 flex-col' onSubmit={handleSubmit(handleVerify)}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%" }}
                        value={getValues("email")}
                        disabled
                    />
                    <TextField id="outlined-basic1" label="OTP" sx={{ width: "100%" }} variant="outlined" name='otp'
                        {...register('otp', {
                            required: 'Otp is required.',
                        })}
                        error={!!errors.otp?.message}
                        helperText={errors.otp?.message ? errors?.otp.message : ""}
                    />
                    <Button type='submit' variant="contained" sx={{
                        width: "100%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                            bgcolor: 'rgba(245, 158, 11, 0.9)',
                        },
                    }}>Verify</Button>
                </form>}
            </div>
        </>
    )
}

export default SignInForm