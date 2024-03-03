import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../redux/apiCalls/User/apicalls'

const CheckUserValidityForm = ({ apiSuccess, setApiSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })
    const [loading, setLoading] = useState(false)

    const checkUserValidity = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/validateUser`, {
                email: data.email,
            }).then((res) => {
                console.log(res)
                console.log("efajksuegutg")
                toast.success("user is valid!")
                reset()
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })


    }

    return (
        <>
            <div className='sm:ring-[1px] md:max-w-[900px] w-full sm:w-0 sm:min-w-[600px]  sm:bg-amber-100/20 sm:ring-gray-300 rounded-xl sm:shadow-md shadow-black px-6 md:py-4'>
                <h3 className='text-xl md:text-3xl font-semibold'>Validate User</h3>
                <form action="" className='mt-10  mb-4 flex flex-col gap-6' onSubmit={handleSubmit(checkUserValidity)}>
                    <TextField id="outlined-basic" label="Email *" variant="outlined" name='email' sx={{ width: "100%" }}
                        {...register('email', {
                            required: 'add email to check.',
                        })}
                        error={!!errors.email?.message}
                        helperText={errors.email?.message ? errors?.email.message : "Email not given"}
                    />
                    <div className=' mt-6 flex w-full justify-end'>
                        <Button type='submit' variant="contained" sx={{
                            width: "30%", '@media (max-width: 600px)': {
                                width: "70%",
                            },
                            py: 2, bgcolor: "rgb(245 158 11)", '&:hover': {
                                bgcolor: 'rgba(245, 158, 11, 0.9)',
                            },
                        }}>Check</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckUserValidityForm;