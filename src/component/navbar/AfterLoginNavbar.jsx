import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Avatar } from '@mui/material';
import Logo from '../../assets/Logo';


const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));



function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function AfterAuthNavbar({ open, setOpen }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = {}
    const notification = 0
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const location = useLocation()
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate()
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const theme = useTheme();
    const isMdScreen = theme.breakpoints.up('md');

    console.log(location)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <div className='flex gap-3 items-center justify-center'>
                    <div>
                        <Avatar id="profile" className='uppercase' sx={{ width: 70, height: 70 }}
                            {...stringAvatar(sessionStorage.getItem('fName') + " " + sessionStorage.getItem('lName'))} />
                    </div>
                    <div>
                        <p className='text-[18px]'>{sessionStorage.getItem('fName')}{` ${sessionStorage.getItem('lName')}`}</p>

                    </div>
                </div>
            </MenuItem>
            <hr className='pt-2' />
            <MenuItem onClick={() => {
                sessionStorage.clear()
                localStorage.clear()
                navigate("/Auth")
            }}>
                <LogoutIcon color="error" />
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                >
                    <Badge badgeContent={notification} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar id="profile" className='uppercase' sx={{ width: 90, height: 90 }}
                        {...stringAvatar(sessionStorage.getItem('fName') + " " + sessionStorage.getItem('lName'))} />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={() => {
                sessionStorage.clear()
                localStorage.clear()
                navigate("/Auth")
            }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <LogoutIcon color="error" />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: "rgb(255 251 235)", backdropFilter: isMdScreen ? "" : 'blur(10px)', color: "#26496E" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link to="/">
                        <div className='text-3xl font-extrabold'>
                            <Logo />
                        </div>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', } }}>
                        <Link to="/support" className='hover:underline mt-[19px]'>
                            Support
                        </Link>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={() => setDrawerOpen(!drawerOpen)}
                        >
                            <Badge badgeContent={notification} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar id="profile" className='uppercase' sx={{ width: 90, height: 90 }}
                                {...stringAvatar(sessionStorage.getItem('fName') + " " + sessionStorage.getItem("lName"))} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );
}
