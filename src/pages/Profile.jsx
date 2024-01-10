import { PersonRounded, Security } from '@mui/icons-material'
import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonalDetails from '../component/Profile/PersonalDetails';
import CompanyDetails from '../component/Profile/CompanyDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/apiCalls/User/apicalls';
import ChangePassword from '../component/Profile/ChangePassword';

const Profile = () => {
  const user = useSelector((state) => state?.persistedReducer.user);
  const [value, setValue] = useState(0);
  const [apiSuccess, setApiSuccess] = useState(0);
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserData(dispatch, user?.id)
  }, [apiSuccess])

  return (
    <>
      <div className=''>
        <h2 className='px-6 py-4 font-semibold text-lg text-gray-800 border-b-[0.5px] '>Profile</h2>
        <div className='md:px-6 w-full'>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="warning"
            indicatorColor="secondary"
            aria-label="icon position tabs example"
            style={{ height: '56px' }}
          >
            <Tab icon={<PersonRounded />} style={{ minWidth: 'unset' }} iconPosition="start" label="Personal Details" />
            <Tab icon={<Security />} style={{ minWidth: 'unset' }} iconPosition="start" label="Change Password" />
          </Tabs>
          <div className='py-5 border-t-[0.5px] mt-1'>
            {value === 0 ?
              <div className='flex flex-col md:flex-row gap-10'>
                <div className='md:w-[50%] flex flex-col gap-4 ring-[0.5px] ring-gray-200 hover:shadow-md rounded-md my-4 '>
                  <PersonalDetails apiSuccess={apiSuccess} setApiSuccess={setApiSuccess} />
                </div>
                <div className='md:w-[50%] flex flex-col gap-4 ring-[0.5px] ring-gray-200 hover:shadow-md rounded-md my-4 '>
                  <CompanyDetails apiSuccess={apiSuccess} setApiSuccess={setApiSuccess} />
                </div>
              </div>
              : <div className='md:w-[50%] flex flex-col gap-4 ring-[0.5px] ring-gray-200 hover:shadow-md rounded-md my-4 '>
                <ChangePassword />
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile