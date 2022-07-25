import React from 'react'
import ButtonAppBar from '../../Components/Header/AppBar';
import NavBar from '../../Components/Header/AppBar';
import MainSidebar from '../../Components/Header/Header';
import Grid from '@mui/material/Grid';

const Layout = ({children}) => {
  return (
    <div className='main_div'>
      <Grid container>
  <Grid item md={2.5}>
  <MainSidebar  />
  </Grid>
  <Grid item md={9.5}>
    <NavBar />
    {children}
  </Grid>
</Grid>
     {/* <ButtonAppBar /> */}
    </div>
  )
}
export default Layout;