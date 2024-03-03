// Importing necessary dependencies from Material-UI, Axios, React, Redux, and Toastify
import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER } from '../../config/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const registrationSteps = [
  'Go to the Azure portal.',
  'In the left sidebar, navigate to "Azure Active Directory."',
  'Under "Manage," select "App registrations" or "App registrations (Preview)."',
  'Click on "New registration" or "New registration (Preview)."',
  'Fill in the required information: ',
  '  - Name: Give your application a meaningful name.',
  '  - Supported account types: Choose the appropriate option for your scenario (e.g., "Accounts in this organizational directory only").',
  'Click on "Register" to create the application.',
  'Application (Client) ID:',
  'After registering the application, you\'ll be redirected to the application\'s overview page.',
  'Note down the "Application (client) ID." This is your client_id.',
  'Directory (Tenant) ID:',
  'On the application overview page, find the "Directory (tenant) ID." This is your tenant_id.',
  'Client Secret:',
  'In the application\'s menu, select "Certificates & secrets."',
  'Under the "Client secrets" section, click on "New client secret."',
  'Enter a description, choose an expiration period, and click on "Add."',
  'Note down the generated secret value. This is your client_secret. Make sure to save it securely, as it will not be visible again.'
];



// DomainAdd component
const DomainAdd = ({ setApiSuccess, apiSuccess, setAddDomain }) => {
  // State variables
  const [selectedAd, setSelectedAd] = useState({ name: "" });
  const [cloudDirectories, setCloudDirectories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addDirectory, setAddDirectory] = useState(false);

  // Form handling using react-hook-form
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({ mode: 'all' });
  const user = useSelector((state) => state?.persistedReducer.user);

  // Fetching cloud directories data on component mount
  useEffect(() => {
    axios
      .get(`${SERVER}/ad/`)
      .then((res) => {
        setLoading(false);
        setCloudDirectories(res.data.ad);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setLoading(false);
        console.log(err);
      });
  }, []);

  // Handling domain form submission
  const handleDomain = (data) => {
    axios
      .post(`${SERVER}/domain/`, {
        url: data.url,
        companyId: user?.company?.id
      })
      .then((res) => {
        let domain = res.data.data;
        toast.success(`${domain.url} created successfully`);
        // add keys
        axios.post(`${SERVER}/azure/`, {
            keys:{
              "clientId": data.clientId,
              "clientSecret": data.clientSecret,
              "tenantId": data.tenantId
            },
            domainUrl: domain.url
        }).then(res=>{
          console.log(res.data)
          axios
            .post(`${SERVER}/domain/mapping`, {
              domainId: domain.id,
              adId: selectedAd.id,
              adServiceId: res.data.data
            })
            .then((res) => {
              toast.success(`${domain.url} mapped successfully`);
              setAddDomain(false);
              setLoading(false);
              setApiSuccess(!apiSuccess);
              setSelectedAd({ name: "" });
              setOpen(false);
              reset();
            })
            .catch((err) => {
              toast.error(err.response.data.error);
              console.log(err);
            });

        }).catch(err=>{
          toast.error(err.response.data.error);
        })
        // Mapping domain to selected AD
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setLoading(false);
        console.log(err);
      });
  };


// handel test keys
const handleKeyTest = () => {
  const tenantId = getValues('tenantId')
  const clientId = getValues('clientId')
  const clientSecret = getValues('clientSecret')
// payload data to transfer
    const keys= {
      "clientId": clientId,
      "clientSecret": clientSecret,
      "tenantId": tenantId
    }
    // const testEmail = getValues('testEmail')

  console.log("the payload: ", keys)
  axios.post(`${SERVER}/azure/testKeys`, {
    "keys":keys,
    "domainUrl": getValues('url')
  }).then(res=>{
    console.log(res.data.message)
    toast.success(`${res.data.message}`);
    setAddDirectory(true)
  }).catch(e=>{
    console.log(e)
    toast.error(e.response.data.error);
  })
}



  // Rendering the form
  return (
    <form onSubmit={handleSubmit(handleDomain)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          {/* Input field for domain */}
          <TextField
            id="outlined-basic"
            label="Domain *"
            variant="outlined"
            sx={{ width: "100%" }}
            {...register('url', {
              required: 'Domain is required.',
            })}
            error={!!errors.url?.message}
            helperText={errors.url?.message ? errors?.url.message : "example.com"}
          />
          {/* Autocomplete for selecting AD */}
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
      {/* Displaying information about selected AD if open is true */}
      {open && (
        <div className='flex flex-col sm:py-4 px-5 md:w-[100%] w-fill'>
          <h2 className='sm:text-2xl font-semibold text-gray-600'>Selected AD : {" "}
            <span className='text-amber-500 font-bold'>{selectedAd?.name}</span>
          </h2>
          {/* Input fields for clientId, clientSecret, and tenantId */}
          <div className='flex flex-col md:flex-row gap-3 md:divide-x-2 my-6'>
            <div className='flex flex-col gap-3'>
              <TextField
                id="outlined-basic"
                label="clientId *"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register('clientId', {
                  required: 'clientId is required.',
                })}
                error={!!errors.clientId?.message}
                helperText={errors.clientId?.message ? errors?.clientId.message : ""}
              />
              <TextField
                id="outlined-basic"
                label="clientSecret *"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register('clientSecret', {
                  required: 'clientSecret(secret Id) is required.',
                })}
                error={!!errors.clientSecret?.message}
                helperText={errors.clientSecret?.message ? errors?.clientSecret.message : ""}
              />
              <TextField
                id="outlined-basic"
                label="tenantId *"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register('tenantId', {
                  required: 'tenantId is required.',
                })}
                error={!!errors.tenantId?.message}
                helperText={errors.tenantId?.message ? errors?.tenantId.message : ""}
              />
            </div>
            {/* Help information */}
            <div className='px-4 hidden md:block w-100'>
              <p>Help?</p>
              <ul>
                {registrationSteps.map((step, index) => (
                  <li key={index}>{index + 1}: {step}</li>
                ))}
              </ul>
          </div>
          </div>
        </div>
      )}
      {/* Buttons for cancel and submit */}
      <div className='md:w-[50%] flex flex-row gap-4 mt-5'>
        <Button
          color="error"
          sx={{ width: "50%", py: 2, }}
          onClick={() => setAddDomain(false)}
        >
          Cancel
        </Button>
        { (
        <Button
          disabled={!addDirectory}
          type='submit'
          variant="contained"
          sx={{
            width: "50%", py: 2, bgcolor: "rgb(245 158 11)",
            '&:hover': {
              bgcolor: 'rgba(245, 158, 11, 0.9)',
            },
          }}
        >
          Add
        </Button>
        )}
        {open && (
        <Button
          type='button'
          variant="contained"
          sx={{
            width: "50%", py: 2, bgcolor: "rgb(245 158 11)",
            '&:hover': {
              bgcolor: 'rgba(245, 158, 11, 0.9)',
            },
          }}
          onClick={handleKeyTest}
        >
          Test
        </Button>
        )}
      </div>
    </form>
  );
};

export default DomainAdd;
