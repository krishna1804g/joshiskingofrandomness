import { Button, Chip, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SERVER } from '../../config/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CloudDirectoryList = () => {
    const [selectedAd, setSelectedAd] = useState('')
    const [cloudDirectories, setCloudDirectories] = useState([])
    const [domain, setDomain] = useState([])
    const [open, setOpen] = useState(false)
    const [apiSuccess, setApiSuccess] = useState(false)
    const [addDomain, setAddDomain] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })

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

    useEffect(() => {
        if (sessionStorage.getItem('cId')) {
            axios
                .get(`${SERVER}/domain/?companyId=${Number(sessionStorage.getItem('cId'))}`).then((res) => {
                    setLoading(false)
                    setDomain(res.data.domain)
                }).catch((err) => {
                    toast.error(err.response.data.error)
                    setLoading(false)
                    console.log(err)
                })
        }
    }, [apiSuccess])

    const handleDomain = (data) => {
        console.log(data, selectedAd)
        axios
            .post(`${SERVER}/domain/`, {
                url: data.url,
                companyId: Number(sessionStorage.getItem("cId"))
            }).then((res) => {
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
                        setSelectedAd([])
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
            <div className='flex flex-col sm:gap-6 justify-center items-center mb-10 w-[100vw]'>
                <form action="" onSubmit={handleSubmit(handleDomain)}
                    className='sm:ring-[1px] sm:ring-gray-300 md:rounded-xl py-4 px-5 w-[100%] md:w-[90%] sm:bg-amber-100/20 flex flex-col gap-2 sm:shadow-sm shadow-black'>
                    <h2 className='text-xl md:text-3xl font-semibold'>Company name: <span className='text-orange-600 font-bold'>{sessionStorage.getItem("cName")}</span></h2>
                    {domain?.length > 0 && < div className='flex justify-between'>
                        <h2 className='text-xl md:text-2xl font-semibold mb-4'>Your domains</h2>
                        {!addDomain && <div onClick={() => setAddDomain(true)}>Add New Domain</div>}
                    </div>}
                    <div className='flex gap-2 mb-6 border-b-[1px] pb-4 border-gray-400 overflow-hidden overflow-x-auto'>
                        {domain.map((d, index) => <div className='' key={index}>
                            <div>
                                <Chip label={d.url} />
                            </div>
                        </div>)}
                    </div>
                    {
                        (addDomain || domain?.length === 0) && <div>

                            <div className='flex flex-col gap-4'>
                                <TextField id="outlined-basic" label="Domain *" variant="outlined" sx={{ width: "100%" }}
                                    {...register('url', {
                                        required: 'Domain is required.',
                                    })}
                                    error={!!errors.url?.message}
                                    helperText={errors.url?.message ? errors?.url.message : "example.com"}
                                />
                                <h2 className='text-xl md:text-2xl font-semibold mt-4'>Select your Cloud Directory Services</h2>
                                <ul className='flex flex-wrap gap-4 mb-5'>
                                    {cloudDirectories.map((directory, index) => (
                                        <li key={index}
                                        >
                                            <Chip label={directory.name} color='warning' sx={{ color: '', px: "5px", py: "3px", fontWeight: 600 }} variant={selectedAd?.name === directory.name ? 'filled' : "outlined"}
                                                onClick={() => {
                                                    setSelectedAd(directory)
                                                    setOpen(true)
                                                }
                                                } />
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            {open && <div className='flex flex-col sm:py-4 px-5 md:w-[50%] w-fill'>
                                <h2 className='sm:text-lg font-semibold text-gray-600'>Your AD : {" "}<span className='text-amber-500 font-bold'>{selectedAd?.name}</span></h2>
                                <div className='flex gap-3 divide-x-2 my-6'>
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
                                <div className='flex gap-3'>

                                    <Button type='submit' variant="contained" sx={{
                                        width: "50%", py: 2, bgcolor: "rgb(245 158 11)", '&:hover': {
                                            bgcolor: 'rgba(245, 158, 11, 0.9)',
                                        },
                                    }}>Add</Button>
                                    <Button sx={{
                                        width: "50%", py: 2,
                                    }}
                                        onClick={() => setAddDomain(false)} color='error'>Cancel</Button>
                                </div>
                            </div>}
                        </div>
                    }
                    { (!addDomain && domain?.length > 0) && <div className='flex justify-end'>
                        <Button type='submit' variant="contained" onClick={() => navigate('/dashboard')}
                            sx={{
                                width: "20%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                    bgcolor: 'rgba(245, 158, 11, 0.9)',
                                },
                            }}>Next</Button>
                    </div>}
                </form >

            </div >
        </>

    );
};

export default CloudDirectoryList;
