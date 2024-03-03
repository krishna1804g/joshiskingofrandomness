import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
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
import { toast } from 'react-toastify';
const DisplayDomains = () => {
  // Redux selector to get user information from the store
  const user = useSelector((state) => state?.persistedReducer.user);
  console.log("SAfsjfg", user)
  // State variables
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [addDomain, setAddDomain] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollToRef, setScrollToRef] = useState(null);
  
  // Ref for scrolling to the addDomain section
  const addDomainRef = useRef(null);

  // Check if the menu is open
  const open = Boolean(anchorEl);

  // Function to handle click and open the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch domain information from the server when apiSuccess changes
  useEffect(() => {
    if (user?.company?.id) {
      axios
        .get(`${SERVER}/domain/?companyId=${user?.company?.id}`)
        .then((res) => {
          console.log("domains: ", res)
          setLoading(false);
          setDomain(res.data.domain);
        })
        .catch((err) => {
          toast.error(err.response.data.error);
          setLoading(false);
          console.log(err);
        });
    }
  }, [apiSuccess]);

  // Function to handle the click on "Add New Domain" button
  const handleAddDomainClick = () => {
    setAddDomain(true);
    setScrollToRef(addDomainRef);
  };

  // Effect to scroll to the addDomainRef when it is set
  useEffect(() => {
    if (scrollToRef) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToRef(null);
    }
  }, [scrollToRef]);

  console.log("domains", domain)
  return (
    <>
      <div className='px-6 pb-5 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2 className='lg:text-lg  text-gray-800 font-bold'>Your Domains:</h2>
          {addDomain ? null : <Button color="warning" variant='contained' onClick={handleAddDomainClick}>Add New Domain</Button>}
        </div>
        <div className='flex flex-wrap gap-3 w-full'>
          {/* Mapping through domain data and displaying information for each domain */}
          {domain.map((d, index) => (
            <div key={index} className='relative w-full sm:w-[48%] lg:w-[32%] xl:w-[24%] ring-gray-500 ring-[0.5px] px-4 py-3 rounded-md flex  flex-col gap-2 shadow-sm hover:shadow-md overflow-hidden'>
              <div>
                <h6 className='text-[12px] text-gray-700'>Domain Name</h6>
                <a className='text-xl text-amber-500 hover:underline' rel="noopener noreferrer" target="_blank" href={d.url?.includes('https') ? d.url : `https://${d.url}`}>{d.url} <OpenInNew sx={{ width: "16px" }} /></a>
              </div>
              <div>
                <h6 className='text-[12px] text-gray-700'>Active Directory</h6>
                <div>{d.name}</div>
              </div>
              <div className='absolute top-1 right-1'>
                {/* IconButton for opening the More options menu */}
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
                {/* More options menu */}
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
            </div>
          ))}
        </div>
        {/* Displaying the form to add a new domain */}
        {addDomain && (
          <div ref={addDomainRef} className='py-4 gap-4 md:ring-[0.5px] ring-gray-400 rounded-md hover:shadow-md md:px-4 md:w-[50%] md:mx-auto md:mt-10'>
            <h3 className='pb-8 text-lg font-bold text-gray-800'>Add your new domain</h3>
            <DomainAdd setApiSuccess={setApiSuccess} apiSuccess={apiSuccess} setAddDomain={setAddDomain} />
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayDomains;
