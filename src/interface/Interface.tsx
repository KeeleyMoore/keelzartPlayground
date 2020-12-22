import React, { FC, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useInterfaceContext } from './context';
import { BreathingDotsControls } from '../breathingDots';
import clsx from 'clsx';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'rgba(245, 245, 245, 0.6)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)'
    },
    appBarShift: {
      marginLeft: theme.options.drawerWidth,
      width: `calc(100% - ${theme.options.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
);

const Interface: FC = () => {
  const { title } = useInterfaceContext();
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AppBar
        className={clsx(classes.root, {
          [classes.appBarShift]: sidebarOpen,
        })}
        position="absolute"
        color="default"
      >
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {title}
          </Typography>
          <Box display="flex" flexGrow={2} />
          <Box flexGrow={1} display="flex" alignItems="center">
            <BreathingDotsControls />
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Interface;
