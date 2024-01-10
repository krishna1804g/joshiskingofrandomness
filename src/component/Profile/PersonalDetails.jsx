import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SERVER } from '../../config/api';
import { toast } from 'react-toastify';
import { Verified } from '@mui/icons-material';

const PersonalDetails = ({ apiSuccess, setApiSuccess }) => {
    const user = useSelector((state) => state?.persistedReducer.user);
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'all' })

    useEffect(() => {
        setValue("firstName", user.firstName)
        setValue("lastName", user.lastName)
        setValue("email", user.email)
    }, [])

    const handleUpdateUser = (data) => {
        setLoading(true)
        axios
            .put(`${SERVER}/user/update?id=${user.id}`, {
                firstName: data.firstName,
                last_name: data.lastName
            }).then((res) => {
                setLoading(false)
                setApiSuccess(!apiSuccess)
                setEdit(false)
                toast.success("User updated successfully")
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <div>
                <h2 className='px-4 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>Personal Details</h2>
                <form action="" className='px-5 md:mx-auto pb-10 flex flex-col gap-5' onSubmit={handleSubmit(handleUpdateUser)}>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <TextField id="outlined-basic1" label="First Name" variant="outlined" name='firstName' sx={{ width: "100%" }}
                            {...register('firstName', {
                                required: 'First Name is required.',
                            })}
                            error={!!errors.firstName?.message}
                            helperText={errors.firstName?.message ? errors?.firstName.message : ""}
                            InputProps={{
                                readOnly: !edit,
                            }}
                        />
                        <TextField id="outlined-basic2" label="Last Name" variant="outlined" name='lastName' sx={{ width: "100%" }}
                            {...register('lastName', {
                                required: 'Last name is required.',
                            })}
                            error={!!errors.lastName?.message}
                            helperText={errors.lastName?.message ? errors?.lastName.message : ""}
                            InputProps={{
                                readOnly: !edit,
                            }}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-4'>
                        <TextField id="outlined-basic" label="Email" variant="outlined" name='email' sx={{ width: "100%", color: "black" }}
                            value={user?.email} InputProps={{
                                readOnly: true,
                            }}
                        />
                        <div className='absolute right-3 top-4'>
                            {user?.isEmailVerified && <div className='flex items-center text-green-500 gap-2'>
                                Verified <Verified />
                            </div>}
                        </div>
                    </div>
                    {edit ? <div className='flex gap-3 justify-end pt-4'>
                        <Button color="error" sx={{ width: "200px", py: "10px" }} onClick={() => setEdit(false)}>Cancel</Button>
                        <Button type='submit' color="warning" variant='contained' sx={{ width: "200px", py: "10px" }}>Update</Button>
                    </div> : <Button color="warning" variant='contained'
                        onClick={() => setEdit(true)}
                        sx={{ width: "200px", py: "10px" }}>Edit</Button>}
                </form>
            </div>
        </>
    )
}

export default PersonalDetails