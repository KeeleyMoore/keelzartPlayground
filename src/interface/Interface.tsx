import React, { FC, useState } from 'react';
import { AppBar, Typography, Box, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useInterfaceContext } from './context';
import Sidebar from './Sidebar';

import BurgerMenu from './BurgerMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'transparent',
      borderBottom: 'transparent'
    }
  })
);

const Interface: FC = () => {
  const { title } = useInterfaceContext();
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AppBar className={classes.root} position="absolute" color="default">
        <BurgerMenu open={sidebarOpen} toggleOpen={() => setSidebarOpen(lastState => !lastState)} />
        <Typography variant="h6">
          {title}
        </Typography>
        <Box display="flex" flexGrow={2} />
        <Box flexGrow={1} display="flex" alignItems="center">
        </Box>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Interface;
