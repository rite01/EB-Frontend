/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import PublishIcon from '@mui/icons-material/Publish';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { IPost } from '@/interfaces';
import type { RootState } from '@/redux/Store/store';

import { Header } from '../../layouts';
import { handleToggle } from '../../redux/Reducer';
import { getEmployeeData } from '../../services';
import { FileUpload } from '../FileUpload';
import { Registration } from '../Registration';
import { CustomTable } from '../Table/Table';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const CustomDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isOpen, isLoading } = useSelector(
    (state: RootState) => state.counter,
  );
  const [employeeData, setEmployeeData] = React.useState<IPost[]>([]);
  const [isTooggle, setIsToggle] = React.useState<string>('');
  const role = Cookies.get('role');
  const getData = async () => {
    const result: any = await getEmployeeData();
    setEmployeeData(result?.data?.user);
  };

  React.useEffect(() => {
    role === 'admin'
      ? setIsToggle('Employee List')
      : setIsToggle('New Employee');
    getData();
  }, [isLoading]);

  const handleIconClick = (value: string) => {
    setIsToggle(value);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={() => dispatch(handleToggle())}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {(role === 'admin'
            ? [
                {
                  name: 'Employee List',
                  icon: <GroupIcon style={{ color: 'red' }} />,
                },

                {
                  name: 'Insert Users',
                  icon: <PublishIcon style={{ color: 'red' }} />,
                },
              ]
            : [
                {
                  name: 'Update Details',
                  icon: <AppRegistrationIcon style={{ color: 'red' }} />,
                },
              ]
          )?.map((data) => (
            <ListItem
              key={data.name}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => handleIconClick(data.name)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.name}
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {isTooggle === 'Employee List' ? (
          <CustomTable employeeData={employeeData} />
        ) : isTooggle === 'New Employee' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 7,
            }}
          >
            <Registration />
          </Box>
        ) : (
          <FileUpload />
        )}
      </Box>
    </Box>
  );
};
