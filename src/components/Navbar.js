import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link, useHistory } from 'react-router-dom';
import { reactLocalStorage } from "reactjs-localstorage";

const Navbar = () => {

    let history = useHistory();
    let auth = localStorage.getItem("authToken") ?? null

    const useStyles = makeStyles({
        navbar: {
          background: 'darkslateblue'
        },
        signupbtn: {
            color: 'white !important',
            fontSize: '1rem',
            textDecoration: 'None'
        }
      });

    const logout = () => {
        reactLocalStorage.remove('authToken')
        history.push("/");
    }

    const classes = useStyles();

    return (
        <AppBar position="fixed" >
            <Toolbar className={classes.navbar}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BUCKET
            </Typography>
            {auth ? (
                <Button onClick={() => logout() } className={classes.signupbtn}>LOGOUT</Button>
            ) : (
                <Link to={location => "/signup" } className={classes.signupbtn}>SIGNUP</Link>
            )
            }
            </Toolbar>
        </AppBar>
    );
    };

export default Navbar;
