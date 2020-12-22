import React, { FC } from 'react';
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
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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
    width: theme.spacing(6) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0),
    // needed for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

interface SidebarProps extends SidebarStyleProps {
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onClose, open }) => {
  const classes = useStyles({ open });
  const theme = useTheme();

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
      <MenuList>
        <MenuItem >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText></ListItemText>
        </MenuItem>
      </MenuList>
    </Drawer>
  );
};

export default Sidebar;
