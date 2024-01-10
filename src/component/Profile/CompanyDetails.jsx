import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER } from '../../config/api';
import { toast } from 'react-toastify';


const CompanyDetails = ({ apiSuccess, setApiSuccess }) => {
    const user = useSelector((state) => state?.persistedReducer.user);
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'all' })

    useEffect(() => {
        setValue("name", user?.company?.name)
        setValue("about", user?.company?.about)
        setValue("address", user?.company?.address)
        setValue("phone", user?.company?.phone)

    }, [])

    const handleUpdateCompany = (data) => {
        setLoading(true)
        axios
            .put(`${SERVER}/company?id=${user?.company?.id}`, {
                name: data.name,
                phone: data.phone,
                about: data.about,
                address: data.address,
                userId: user.id
            }).then((res) => {
                setLoading(false)
                setApiSuccess(!apiSuccess)
                toast.success("Company updated successfully")
                setEdit(false)
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <div>
                <h2 className='px-4 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] mb-6'>Company Details</h2>
                <form action="" className='px-5 md:mx-auto pb-10 flex flex-col gap-5' onSubmit={handleSubmit(handleUpdateCompany)}>
                    <TextField id="outlined-basic" label="Company name *" variant="outlined" name='email' sx={{ width: "100%" }}
                        {...register('name', {
                            required: 'Company name is required.',
                        })}
                        error={!!errors.name?.message}
                        helperText={errors.name?.message ? errors?.name.message : ""}
                        InputProps={{
                            readOnly: !edit,
                        }}
                    />
                    <TextField id="outlined-basic3" label="Contact *" variant="outlined" name='phone' sx={{ width: "100%" }}
                        {...register('phone', {
                            required: 'Contact is required.',
                        })}
                        error={!!errors.phone?.message}
                        helperText={errors.phone?.message ? errors?.phone.message : ""}
                        InputProps={{
                            readOnly: !edit,
                        }}
                    />
                    <TextField id="outlined-basic2" label="Address" multiline rows={2} maxRows={2} variant="outlined" name='address' sx={{ width: "100%" }}
                        {...register('address')}
                        InputProps={{
                            readOnly: !edit,
                        }}
                    />
                    <TextField id="outlined-basic1" multiline rows={3} maxRows={5} label="About company" variant="outlined" name='description' sx={{ width: "100%", color: "black" }}
                        {...register('about')}
                        InputProps={{
                            readOnly: !edit,
                        }}
                    />
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

export default CompanyDetails