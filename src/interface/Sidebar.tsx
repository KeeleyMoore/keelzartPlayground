import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles, Drawer, Theme, MenuList, MenuItem, ListItemIcon, ListItemText, Box, Typography
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Controls } from '../controls';

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
  menuRoot: { padding: theme.spacing(1.5, 0, 0, 0) },
  menuItem: { paddingLeft: theme.spacing(1.5) },
}));

interface SidebarProps extends SidebarStyleProps {
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onClose, open }) => {
  const classes = useStyles({ open });
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
      <MenuList className={classes.menuRoot}>
        <MenuItem className={classes.menuItem} component={Link} to="/breathing_dots" selected={location.pathname.startsWith('/breathing_dots/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Breathing Dots</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/lines">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>Lines</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/kotch">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>Kotch</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/circles">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>Circles</ListItemText>
        </MenuItem>
        <MenuItem className={classes.menuItem} component={Link} to="/tree_generator">
          <ListItemIcon>
            <MenuBookIcon />
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
