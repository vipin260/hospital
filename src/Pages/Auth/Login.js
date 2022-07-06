import React , {useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Box, Paper, TextField , Button } from '@mui/material';
// import {  Row , Col} from 'react-bootstrap'
// import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../Components/baseurl';




const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
    background: 'url(/assets/images/background.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiPaper-root': {
      width: '30%',
      height: 400,
      [theme.breakpoints.down('md')]:{
        width:'80%'
      }
    }
  },
  image: {
    width: 200,
    marginBottom: theme.spacing(5)
  },
  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root':{
      color:theme.palette.secondary.light,
    
    } 
  },
 
}))




const Login = () => {
  const classes = useStyle();


  const Navigate = useNavigate();

  const [values , setValues] = useState({
      email :"",
      password:""
  });
 
    
 
 
     const submitData = () =>{
 
         const login = {
             userEmail    : values.email,
             userPassword : values.password
         }
         axios.post(baseUrl + '/doctor_login.php',login)
         .then((response)=>{
             if(response.data.Status ==='200'){
                 Navigate('/header')
                // window.localStorage.setItem('userEmail',response.data.email);
                 
             }
             else{
                 alert('Invalid Ceredentials');
                
             }
         })
     };
 
     const changeHandler = (e)=>{
       let {name,value} = e.target;
       setValues({...values,
       [name] : value
       })
   };


  return (
    <div className={classes.root}>
      <Paper variant='outlined' className={classes.papar}>
        <Box className={classes.inputs}>
       
          <TextField id="outlined-basic" label="Enter email" name="email" value={values.email} onChange={changeHandler} required  variant="outlined" sx={{ width: '70%', marginBottom: 2 }}  />

          <TextField id="outlined-basic" type="password" placeholder="Password" name="password" value={values.password} onChange={changeHandler}  variant="outlined" sx={{ width: '70%', marginBottom: 2 }} required />
          <Button onClick={submitData} variant="contained">Login</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Login;