import React, { FC, useState } from 'react';
import { AppBar, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Sidebar from './Sidebar';

import BurgerMenu from './BurgerMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
      backgroundColor: 'transparent',
    },
    appBarShift: {
      width: `calc(100% - ${theme.options.drawerWidth}px)`,
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      })
    }
  })
);

const Interface: FC = () => {
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
        <BurgerMenu open={sidebarOpen} toggleOpen={() => setSidebarOpen(lastState => !lastState)} />
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Interface;
