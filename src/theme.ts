import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    options: {
      drawerWidth: number;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    options?: {
      drawerWidth?: number;
    };
  }
}

// A custom theme for ReferenceBox
const theme = createMuiTheme({
  options: {
    drawerWidth: 240,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#0A0F0D',
    },
    secondary: {
      main: '#d72323',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#fff',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
      paddingLeft: 0,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        borderRadius: 0,
      },
    },
  },
});

export default theme;
