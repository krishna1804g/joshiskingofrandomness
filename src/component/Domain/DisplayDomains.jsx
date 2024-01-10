import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { SERVER } from '../../config/api';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { OpenInNew } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DomainAdd from '../addCompany/DomainAdd';
import { IconButton } from '@mui/material';

const DisplayDomains = () => {
  const user = useSelector((state) => state?.persistedReducer.user);
  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState([])
  const [apiSuccess, setApiSuccess] = useState(false)
  const [addDomain, setAddDomain] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollToRef, setScrollToRef] = useState(null);
  const addDomainRef = useRef(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if (user?.company?.id) {
      axios
        .get(`${SERVER}/domain/?companyId=${user?.company?.id}`)
        .then((res) => {
          setLoading(false)
          setDomain(res.data.domain)
        }).catch((err) => {
          toast.error(err.response.data.error)
          setLoading(false)
          console.log(err)
        })
    }
  }, [apiSuccess])

  const handleAddDomainClick = () => {
    setAddDomain(true);
    setScrollToRef(addDomainRef);
  };

  useEffect(() => {
    if (scrollToRef) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToRef(null);
    }
  }, [scrollToRef]);


  return (
    <>
      <div className='px-6 pb-5 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2 className='lg:text-lg text-gray-800 font-bold'>Your Domains:</h2>
          {addDomain ? null : <Button color="warning" variant='contained' onClick={handleAddDomainClick}>Add New Domain</Button>}
        </div>
        <div className='flex flex-wrap gap-3 w-full'>
          {domain.map((d, index) => {
            return (<div key={index} className='relative w-full sm:w-[48%] lg:w-[32%] xl:w-[24%] ring-gray-500 ring-[0.5px] px-4 py-3 rounded-md flex  flex-col gap-2 shadow-sm hover:shadow-md overflow-hidden'>
              <div>
                <h6 className='text-[12px] text-gray-700'>Domain Name</h6>
                <a className='text-xl text-amber-500 hover:underline' rel="noopener noreferrer" target="_blank" href={d.url?.includes('https') ? d.url : `https://${d.url}`}>{d.url} <OpenInNew sx={{ width: "16px" }} /></a>
              </div>
              <div>
                <h6 className='text-[12px] text-gray-700'>Active Directory</h6>
                <div>{d.name}</div>
              </div>
              <div className='absolute top-1 right-1'>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>View keys</MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </div>
            </div>)
          })}
        </div>
        {addDomain && <div ref={addDomainRef} className='py-4 gap-4 md:ring-[0.5px] ring-gray-400 rounded-md hover:shadow-md md:px-4 md:w-[50%] md:mx-auto md:mt-10'>
          <h3 className='pb-8 text-lg font-bold text-gray-800'>Add your new domain</h3>
          <DomainAdd setApiSuccess={setApiSuccess} apiSuccess={apiSuccess} setAddDomain={setAddDomain} />
        </div>}
      </div>
    </>
  )
}

export default DisplayDomains