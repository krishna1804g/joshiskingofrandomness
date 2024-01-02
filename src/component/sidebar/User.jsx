import * as React from 'react';
import { createMuiTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Tooltip } from '@mui/material';
import { ContactSupport } from '@mui/icons-material';


const drawerWidth = 270;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});


const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(0)} + 1px)`,
    [theme.breakpoints.up('md')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    fontFamily: "Lexend Deca, sans-serif",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        fontFamily: "Lexend Deca, sans-serif",
        graySpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function User({ open, setOpen }) {
    const theme = useTheme();
    //const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = React.useState(location.pathname);

    React.useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location.pathname])





    return (
        <Box sx={{ display: 'flex' }} >
            <Drawer variant="permanent" open={open} >
                <DrawerHeader sx={{ backgroundColor: "white" }}>
                    <IconButton onClick={() => setOpen(!open)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : ""}
                    </IconButton>
                </DrawerHeader>
                <div className='flex flex-col justify-between h-full'>

                    <List sx={{ backgroundColor: "white", height: "100%", mx: "10px", display: "flex", flexDirection: "column", gap: "4px", }}>
                        <Link to="/dashboard">
                            <ListItem disablePadding sx={{ display: 'block', }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        borderRadius: "15px",
                                        px: 2.5,
                                        backgroundColor: currentLocation?.includes('/dashboard') && "rgb(254 243 199)",
                                        color: currentLocation?.includes('/dashboard') && "#000",
                                    }}
                                >
                                    {open ? <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                    </ListItemIcon> : <Tooltip title={"Dashboard"} placement='right'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                        </ListItemIcon>
                                    </Tooltip>}
                                    <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0, color: "gray" }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/logs">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        borderRadius: "15px",
                                        px: 2.5,
                                        backgroundColor: currentLocation?.includes('/logs') && "rgb(254 243 199)",
                                        color: currentLocation?.includes('/logs') && "#000",
                                    }}
                                >
                                    {open ? <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                    </ListItemIcon> : <Tooltip title={"Logs"} placement='right'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                        </ListItemIcon>
                                    </Tooltip>}
                                    <ListItemText primary={"Logs"} sx={{ opacity: open ? 1 : 0, color: "gray" }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/active-directory">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        borderRadius: "15px",
                                        px: 2.5,
                                        backgroundColor: currentLocation?.includes('/active-directory') && "rgb(254 243 199)",
                                        color: currentLocation?.includes('/active-directory') && "#000",
                                    }}
                                >
                                    {open ? <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                    </ListItemIcon> : <Tooltip title={"Active directory (AD)"} placement='right'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                        </ListItemIcon>
                                    </Tooltip>}
                                    <ListItemText primary={"Active directory (AD)"} sx={{ opacity: open ? 1 : 0, color: "gray", whiteSpace: "nowrap" }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/profile" >
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        borderRadius: "15px",
                                        px: 2.5,
                                        backgroundColor: currentLocation?.includes('/profile') && "rgb(254 243 199)"
                                    }}
                                >
                                    {open ? <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                    </ListItemIcon> : <Tooltip title={"Profile"} placement='right'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DashboardIcon size={'23px'} sx={{ color: "gray" }} />
                                        </ListItemIcon>
                                    </Tooltip>}
                                    <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0, color: "gray" }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                    </List>
                    <List sx={{ backgroundColor: "white" }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    borderRadius: "15px",
                                    px: 2.5,
                                    backgroundColor: currentLocation?.includes('/contact-us') && "rgb(254 243 199)",
                                    color: currentLocation?.includes('/contact-us') && "#000",
                                }}
                            >
                                {open ? <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <ContactSupport size={'23px'} sx={{ color: "gray" }} />
                                </ListItemIcon> : <Tooltip title={"Contact Us"} placement='right'>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ContactSupport size={'23px'} sx={{ color: "gray" }} />
                                    </ListItemIcon>
                                </Tooltip>}
                                <ListItemText primary={"Contact Us"} sx={{ opacity: open ? 1 : 0, color: "gray", whiteSpace: "nowrap" }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, overflow: "hidden", mt: "65px", pt: "10px", overflowY: "auto", bgcolor: "#f0f0f1", height: "100vh" }}>
                <Box sx={{ mx: "20px",mt:"10px", bgcolor: "white", borderRadius: "20px" }}>
                    <Outlet />
                </Box>

            </Box>
        </Box>
    );
}
