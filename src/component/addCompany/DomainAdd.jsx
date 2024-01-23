import { Autocomplete, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SERVER } from '../../config/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DomainAdd = ({ setApiSuccess, apiSuccess, setAddDomain }) => {
    const [selectedAd, setSelectedAd] = useState({ name: "" })
    const [cloudDirectories, setCloudDirectories] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })
    const user = useSelector((state) => state?.persistedReducer.user);

    useEffect(() => {
        axios
            .get(`${SERVER}/ad/`).then((res) => {
                setLoading(false)
                setCloudDirectories(res.data.ad)
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }, [])


    const handleDomain = (data) => {
        axios
            .post(`${SERVER}/domain/`, {
                url: data.url,
                companyId: user?.company?.id
            }).then((res) => {
                console.log(res.data.data)
                let domain = res.data.data
                toast.success(`${domain.url} created successfully`)
                axios
                    .post(`${SERVER}/domain/mapping`, {
                        domainId: domain.id,
                        adId: selectedAd.id,
                        keys: {
                            key: data.key
                        }
                    }).then((res) => {
                        toast.success(`${domain.url} mapped successfully`)
                        setAddDomain(false)
                        setLoading(false)
                        setApiSuccess(!apiSuccess)
                        setSelectedAd({ name: "" })
                        setOpen(false)
                        reset()
                    }).catch((err) => {
                        toast.error(err.response.data.error)
                        console.log(err)
                    })
            }).catch((err) => {
                toast.error(err.response.data.error)
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleDomain)}>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>

                        <TextField id="outlined-basic" label="Domain *" variant="outlined" sx={{ width: "100%" }}
                            {...register('url', {
                                required: 'Domain is required.',
                            })}
                            error={!!errors.url?.message}
                            helperText={errors.url?.message ? errors?.url.message : "example.com"}
                        />
                        <Autocomplete
                            options={cloudDirectories}
                            value={selectedAd}
                            getOptionLabel={(directory) => directory.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select your AD service"
                                    fullWidth
                                />
                            )}
                            onChange={(event, newValue) => {
                                setSelectedAd(newValue);
                                setOpen(true);
                            }}
                        />
                    </div>

                </div>
                {open && <div className='flex flex-col sm:py-4 px-5 md:w-[50%] w-fill'>
                    <h2 className='sm:text-2xl font-semibold text-gray-600'>Selected AD : {" "}<span className='text-amber-500 font-bold'>{selectedAd?.name}</span></h2>
                    <div className='flex flex-col md:flex-row gap-3 md:divide-x-2 my-6'>
                        <TextField id="outlined-basic" label="Secret Key *" variant="outlined" sx={{ width: "100%" }}
                            {...register('key', {
                                required: 'Secret key is required.',
                            })}
                            error={!!errors.key?.message}
                            helperText={errors.key?.message ? errors?.key.message : ""}
                        />
                        <div className='px-4 hidden md:block'>
                            Help?
                            <ul>
                                <li>1.</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                            </ul>
                        </div>
                    </div>
                </div>}
                <div className='md:w-[50%] flex flex-row gap-4 mt-5'>
                    <Button color="error"  sx={{ width: "50%", py: 2, }}
                        onClick={() => setAddDomain(false)}>Cancel</Button>
                    <Button type='submit' variant="contained" sx={{
                        width: "50%", py: 2, bgcolor: "rgb(245 158 11)", '&:hover': {
                            bgcolor: 'rgba(245, 158, 11, 0.9)',
                        },
                    }}>Add</Button>

                </div>
            </form>
        </>
    )
}

export default DomainAdd