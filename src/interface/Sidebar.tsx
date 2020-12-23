import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  Theme,
  IconButton,
  useTheme,
  Divider,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { BreathingDotsControls } from '../breathingDots';

interface SidebarStyleProps {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: ({ open }: SidebarStyleProps): number =>
      open ? theme.options.drawerWidth : 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0),
    // needed for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuRoot: { padding: 0 },
  menuItem: { paddingLeft: theme.spacing(1.5) },
}));

interface SidebarProps extends SidebarStyleProps {
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onClose, open }) => {
  const classes = useStyles({ open });
  const theme = useTheme();
  const location = useLocation();
  console.log(location);
  const breathingDotsSelected = location.pathname.startsWith('/breathing_dots');

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <Drawer
      anchor="left"
      className={clsx(
        classes.root,
        open ? classes.drawerOpen : classes.drawerClose
      )}
      classes={{
        paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
      }}
      onClose={onClose}
      open={open}
      variant="permanent"
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
              <ChevronLeftIcon />
            )}
        </IconButton>
      </div>
      <Divider />
      <MenuList className={classes.menuRoot}>
        <MenuItem className={classes.menuItem} component={Link} to="/breathing_dots" selected={location.pathname.startsWith('/breathing_dots/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Breathing Dots</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem className={classes.menuItem} component={Link} to="/lines">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>Lines</ListItemText>
        </MenuItem>
      </MenuList>
      <Box flexGrow={1} />
      <Divider />
      {breathingDotsSelected && <BreathingDotsControls />}
    </Drawer>
  );
};

export default Sidebar;
