import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { SERVER } from '../../config/api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { register, handleSubmit,getValues,setValue, formState: { errors },reset } = useForm({ mode: 'all' })
    const user = useSelector((state) => state?.persistedReducer.user);
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const handleChangePassword = (data) => {
        setLoading(true)
        if(data.oldPassword === data.newPassword){
            toast.error("Current and New password can't be same")
            setValue("newPassword",'')
            setValue("cPassword",'')
        }else{
            axios
                .post(`${SERVER}/user/changePassword`, {
                    oldPassword:data.oldPassword,
                    newPassword:data.newPassword,
                    email: user.email
                }).then((res) => {
                    setLoading(false)
                    toast.success("password changed successfully")
                    reset()
                }).catch((err) => {
                    toast.error(err.response.data.message)
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    return (
        <>
            <div>
                <h2 className='px-4 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>Change Password</h2>
                <form action="" className='px-5 md:mx-auto pb-10 flex flex-col gap-5' onSubmit={handleSubmit(handleChangePassword)}>
                    <TextField
                        label="Current Password"
                        variant="outlined"
                        type={isVisible ? 'text' : 'password'}
                        {...register('oldPassword', {
                            required: 'Current Password is required.',
                        })}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message}
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
                    <Button color="warning" variant='contained' type='submit'
                        sx={{ width: "200px", py: "10px" }}>Change Password</Button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword