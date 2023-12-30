import { Chip, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../../assets/Logo';
import { useForm } from 'react-hook-form';

const CloudDirectoryList = () => {
    const cloudDirectories = [
        'Amazon Web Services (AWS) Directory Service',
        'Google Cloud Identity (IAM)',
        'Okta',
        'OneLogin',
        'Ping Identity',
        'Microsoft Azure Active Directory (Azure AD)',
        'JumpCloud',
        'LDAP',
        'IBM Cloud Identity',
        // Add more directories as needed
    ];

    const [selectedAd, setSelectedAd] = useState('')
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'all' })

    return (
        <>
            <div className='flex flex-col sm:gap-6 justify-center items-center'>
                <div className='sm:ring-[1px] sm:ring-gray-300 md:rounded-xl py-4 px-5 md:w-[90%] sm:bg-amber-100/20 overflow-hidden flex flex-col gap-4 sm:shadow-sm shadow-black'>
                    <h2 className='text-xl md:text-3xl font-semibold'>Company name: <span className='text-orange-600 font-bold'>{sessionStorage.getItem("cName")}</span></h2>
                    <h2 className='text-xl md:text-2xl font-semibold mt-4'>Select your Cloud Directory Services</h2>
                    <ul className='flex flex-wrap gap-4 mb-5'>
                        {cloudDirectories.map((directory, index) => (
                            <li key={index}
                            >
                                <Chip label={directory} color='warning' sx={{ color: '', px: "5px", py: "3px", fontWeight: 600 }} variant={selectedAd === directory ? 'filled' : "outlined"}
                                    onClick={() => {
                                        setSelectedAd(directory)
                                        setOpen(true)
                                    }
                                    } />
                            </li>
                        ))}
                    </ul>

                </div>
                {open && <div className='flex flex-col sm:py-4 px-5 md:w-[90%] w-fill'>
                    <h2 className='sm:text-lg font-semibold text-gray-600'>Your AD : {" "}<span className='text-amber-500 font-bold'>{selectedAd}</span></h2>
                    <div className='flex gap-3 divide-x-2 my-6'>
                        <form action="" className='min-h-[200px] w-[50%]'>
                            <TextField id="outlined-basic" label="Secret Key *" variant="outlined" sx={{ width: "100%" }}
                                {...register('key', {
                                    required: 'Secret key is required.',
                                })}
                                error={!!errors.name?.message}
                                helperText={errors.name?.message ? errors?.name.message : ""}
                            />
                        </form>
                        <div className='px-4'>
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
            </div>
        </>

    );
};

export default CloudDirectoryList;
