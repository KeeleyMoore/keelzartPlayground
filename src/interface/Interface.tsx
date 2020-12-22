import React, { FC } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useInterfaceContext } from './context';
import { BreathingDotsControls } from '../breathingDots';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(245, 245, 245, 0.6)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)'
    },
  }),
);

const Interface: FC = () => {
  const { title } = useInterfaceContext();
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="absolute" color="default">
      <Toolbar variant="dense">
        <IconButton edge="start" aria-label="menu">
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
  );
};

export default Interface;
