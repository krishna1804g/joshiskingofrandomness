import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { SERVER } from '../../config/api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../redux/apiCalls/User/apicalls'

const AddCompanyForm = ({ apiSuccess, setApiSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })
    const user = useSelector((state) => state?.persistedReducer.user);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAddCompany = (data) => {
        setLoading(true)
        axios
            .post(`${SERVER}/company/`, {
                name: data.name,
                phone: data.phone,
                about: data.about,
                address: data.address,
                userId: user.id
            }).then((res) => {
                setLoading(false)
                setApiSuccess(!apiSuccess)
                toast.success("Company created successfully")
                getUserData(dispatch, user?.id)
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
                <h3 className='text-xl md:text-3xl font-semibold'>Add company details</h3>
                <form action="" className='mt-10  mb-4 flex flex-col gap-6' onSubmit={handleSubmit(handleAddCompany)}>
                    <TextField id="outlined-basic" label="Company name *" variant="outlined" name='email' sx={{ width: "100%" }}
                        {...register('name', {
                            required: 'Company name is required.',
                        })}
                        error={!!errors.name?.message}
                        helperText={errors.name?.message ? errors?.name.message : ""}
                    />
                    <TextField id="outlined-basic3" label="Contact *" variant="outlined" name='phone' sx={{ width: "100%" }}
                        {...register('phone', {
                            required: 'Contact is required.',
                        })}
                        error={!!errors.phone?.message}
                        helperText={errors.phone?.message ? errors?.phone.message : ""}
                    />
                    <TextField id="outlined-basic2" label="Address" multiline rows={2} maxRows={2} variant="outlined" name='address' sx={{ width: "100%" }}
                        {...register('address')}
                    />
                    <TextField id="outlined-basic1" multiline rows={3} maxRows={5} label="About company" variant="outlined" name='description' sx={{ width: "100%", color: "black" }}
                        {...register('about')}
                    />
                    <div className=' mt-6 flex w-full justify-end'>
                        <Button type='submit' variant="contained" sx={{
                            width: "30%", '@media (max-width: 600px)': {
                                width: "70%",
                            },
                            py: 2, bgcolor: "rgb(245 158 11)", '&:hover': {
                                bgcolor: 'rgba(245, 158, 11, 0.9)',
                            },
                        }}>Next</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCompanyForm;