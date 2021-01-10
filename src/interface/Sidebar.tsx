import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles, Drawer, Theme, MenuList, MenuItem, ListItemIcon, ListItemText, Box, Typography
} from '@material-ui/core';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import ShortTextIcon from '@material-ui/icons/ShortText';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NatureIcon from '@material-ui/icons/Nature';

import { Controls } from '../controls';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: theme.options.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    border: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  menuRoot: {
    padding: theme.spacing(1.5, 0, 0, 0)
  },
  menuItem: {
    paddingLeft: theme.spacing(1.5)
  },
  menuItemIcon: {
    minWidth: theme.spacing(4.5)
  },
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onClose, open }) => {
  const classes = useStyles();
  const location = useLocation();

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
      <Box mt={3} mb={1} mx={2}>
        <Typography variant="h5">Keelzart Playground</Typography>
      </Box>
      <MenuList className={classes.menuRoot} dense>
        <MenuItem className={classes.menuItem} component={Link} to="/breathing_dots" selected={location.pathname.startsWith('/breathing_dots/')}>
          <ListItemIcon className={classes.menuItemIcon}>
            <DragIndicatorIcon />
          </ListItemIcon>
          <ListItemText >Breathing Dots</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/lines">
          <ListItemIcon className={classes.menuItemIcon}>
            <ShortTextIcon />
          </ListItemIcon>
          <ListItemText>Lines</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/kotch">
          <ListItemIcon className={classes.menuItemIcon}>
            <LineStyleIcon />
          </ListItemIcon>
          <ListItemText>Kotch</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/circles">
          <ListItemIcon className={classes.menuItemIcon}>
            <RadioButtonUncheckedIcon />
          </ListItemIcon>
          <ListItemText>Circles</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/tree_generator">
          <ListItemIcon className={classes.menuItemIcon}>
            <NatureIcon />
          </ListItemIcon>
          <ListItemText>Tree Gen</ListItemText>
        </MenuItem>
      </MenuList>
      <Box flexGrow={1} mb={1} />
      <Controls />
    </Drawer>
  );
};

export default Sidebar;
