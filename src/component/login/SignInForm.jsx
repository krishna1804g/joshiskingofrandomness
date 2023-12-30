import React, { useState } from 'react'
import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alignment, setAlignment] = useState('downloadPackage')
    const navigate = useNavigate()

    const handleSignUp = (data) => {
        if (alignment === "downloadPackage") {
            toast.success("Package downloaded successfully")
        } else {
            navigate('/add-company')

            console.log(data)
        }
    }

    return (
        <>
            <div className='sm:ring-[1px] sm:ring-gray-200 shadow-sm sm:shadow-gray-500 md:min-w-[500px] md:min-h-[300px] md:bg-amber-100/20 rounded-xl w-full sm:w-[60%] md:w-[0px] px-4 md:px-6 lg:px-12 py-4 flex flex-col justify-center gap-10 items-center'>
                <h6 className=' font-semibold text-3xl text-gray-600'>Sign In</h6>
                <form className='w-full flex gap-6 flex-col' onSubmit={handleSubmit(handleSignUp)}>
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
                        <div className='mt-4'>
                            <h6 className='text-[14px] text-gray-600 pb-2'>Account type</h6>
                            <ToggleButtonGroup
                                color="warning"
                                value={alignment}
                                exclusive
                                variant="contained"
                                onChange={(e) => setAlignment(e.target.value)}
                                aria-label="Account Type"
                                aria-labelledby="account-type-label"
                            >
                                <ToggleButton value="business" sx={{ color: 'black' }}>
                                    Business
                                </ToggleButton>
                                <ToggleButton value="downloadPackage" sx={{ color: 'black' }}>
                                    Download Package
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <div className='sm:w-[60%]'>

                        <Button type='submit' variant="contained" sx={{
                            width: "100%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                bgcolor: 'rgba(245, 158, 11, 0.9)',
                            },
                        }}>Next</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignInForm