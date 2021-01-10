
import React, { FC } from 'react';
import { Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuBtn: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: 60,
      cursor: 'pointer',
      transition: 'all .5s ease-in-out',
    },
    menuBtn_burger: {
      width: 50,
      height: 4,
      background: '#fff',
      borderRadius: 5,
      boxShadow: '0 2px 5px rgba(255, 101, 47, .2)',
      transitions: 'all .5s ease-in-out',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: 50,
        height: 4,
        background: '#fff',
        borderRadius: 5,
        boxShadow: '0 2px 5px rgba(255, 101, 47, .2)',
        transitions: 'all .5s ease-in-out',
      },
      '&::before': {
        transform: 'translateY(-16px)',
      },
      '&::after': {
        transform: 'translateY(16px)',
      }
    },
    open: {
      transform: `translateX(${theme.options.drawerWidth}px)`,
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.complex,
      }),
    },
    openBurger: {
      background: 'transparent',
      boxShadow: 'none',
      '&::before': {
        transform: 'rotate(45deg)',
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.complex,
        }),
      },
      '&::after': {
        transform: 'rotate(-45deg)',
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.complex,
        }),
      }
    }

  }),
);

interface BurgerMenuProps {
  open: boolean;
  toggleOpen: () => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ open, toggleOpen }) => {
  const classes = useStyles();

  const handleClick = () => {
    toggleOpen();
  };

  return (
    <div className={clsx(classes.menuBtn, { [classes.open]: open })} onClick={handleClick} >
      <div className={clsx(classes.menuBtn_burger, { [classes.openBurger]: open })} >
      </div>
    </div >
  );
};

export default BurgerMenu;
