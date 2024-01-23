import { Button, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SERVER } from '../../config/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DomainAdd from './DomainAdd';
import { useSelector } from 'react-redux';

const CloudDirectoryList = () => {
    const [domain, setDomain] = useState([])
    const [apiSuccess, setApiSuccess] = useState(false)
    const [addDomain, setAddDomain] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state?.persistedReducer.user);




    useEffect(() => {
        if (user?.company?.id) {
            axios
                .get(`${SERVER}/domain/?companyId=${user?.company?.id}`).then((res) => {
                    setLoading(false)
                    setDomain(res.data.domain)
                }).catch((err) => {
                    toast.error(err.response.data.error)
                    setLoading(false)
                    console.log(err)
                })
        }
    }, [apiSuccess])



    return (
        <>
            <div className='flex flex-col sm:gap-6 justify-center items-center mb-10 w-[100vw]'>
                <div action=""
                    className='sm:ring-[1px] sm:ring-gray-300 md:rounded-xl py-4 px-5 w-[100%] md:w-[90%] sm:bg-amber-100/20 flex flex-col gap-2 sm:shadow-sm shadow-black'>
                    <h2 className='text-xl md:text-3xl font-semibold'>Company name: <span className='text-orange-600 font-bold'>{user?.company?.name}</span></h2>
                    {domain?.length > 0 && < div className='flex justify-between'>
                        <h2 className='text-xl md:text-2xl font-semibold mb-4'>Your domains</h2>
                        {!addDomain && <Button variant='outlined' color="warning" onClick={() => setAddDomain(true)}>Add New Domain</Button>}
                    </div>}
                    <div className='flex gap-2 mb-6 border-b-[1px] pb-4 border-gray-400 overflow-hidden overflow-x-auto'>
                        {domain.map((d, index) => <div className='' key={index}>
                            <div>
                                <Chip label={d.url} />
                            </div>
                        </div>)}
                    </div>
                    {
                        (addDomain || domain?.length === 0) &&
                        <DomainAdd addDomain={addDomain}
                            setAddDomain={setAddDomain}
                            setApiSuccess={setApiSuccess}
                            apiSuccess={apiSuccess}
                        />
                    }
                    {<div className={`flex justify-end ${addDomain && "border-t-[1px] border-gray-400 mt-5"} `}>
                        <div className={`w-full flex gap-3 justify-end`}>
                           
                            <Button type='submit' variant="contained" onClick={() => navigate('/dashboard')} disabled={addDomain}
                                sx={{
                                    width: "20%", py: 2, marginY: "20px", bgcolor: "rgb(245 158 11)", '&:hover': {
                                        bgcolor: 'rgba(245, 158, 11, 0.9)',
                                    },
                                }}>Next</Button>
                        </div>
                    </div>}
                </div >

            </div >
        </>

    );
};

export default CloudDirectoryList;
