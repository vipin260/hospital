import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MainSidebar from './Header';
import { makeStyles } from '@mui/styles';
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/action';



const useStyle = makeStyles((theme)=>({
  iconsButton:{
    color:theme.palette.secondary.light,
    backgroundColor :theme.palette.primary.main,
    display:'flex',
    justifyContent:'space-between'

  }
}))



const NavBar = () => {
  const toggleAppBar = useSelector((state)=>state.togglingReducer.togglingAll)
  const classes = useStyle()
  const [sideBarToggle, setSideBarToggle] = useState(toggleAppBar)
  const dispatch = useDispatch()

const handleToggle = () => {
   dispatch(toggle())
   setSideBarToggle(sideBarToggle)
}
// style={{ position: 'absolute', right: 0, left: sideBarToggle ? 300 : 0, transition: '.3s all'}}
  return (
    <>
    <Box display="flex" justifyContent="space-between"   sx={{ flexGrow: 1 }} className='hello'
      >
      <AppBar position="static" >
        <Toolbar  className={classes.iconsButton} >
          <Box>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggle}
            sx={{ mr: 2 }}
            >
            <MenuIcon />
          </IconButton> */}
          <Typography color="inherit" variant="h6" component={NavLink} to='/' sx={{width:'max-content',  cursor:'pointer',textDecoration:'none'}}>
            Hospital Management
          </Typography>
          </Box>
          <Button color="inherit" component={NavLink} to='/login'  
            sx={{alignItems:"center"}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    
    </Box>
    {/* <MainSidebar state={sideBarToggle} />  */}
        </>
  );
}
export default NavBar;