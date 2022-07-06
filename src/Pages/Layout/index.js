import React from 'react'
import ButtonAppBar from '../../Components/Header/AppBar';

const Layout = ({children}) => {
  return (
    <div className='main_div'>
     <ButtonAppBar />
  
        {children}
    </div>
  )
}

export default Layout;