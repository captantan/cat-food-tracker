import { createTheme } from '@mui/material/styles';
import { red, blueGrey, amber } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: amber[500],
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-symbols-rounded'
      }
    }
  }
});

export default theme;