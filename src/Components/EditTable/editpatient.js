import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import { useDispatch, useSelector } from "react-redux";
//import {UpdatePatientData , FetchData ,FetchSinglePatient} from '../../redux/action/action'
import {  FetchSinglePatient, PatientUpdate } from '../../redux/action/Actions';

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "auto",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,

    "& .MuiPaper-root": {
      width: "50%",
      height: "max-content",
      marginTop:'100px',
      padding: `${theme.spacing(4)} 30px`,
      [theme.breakpoints.down("lg")]: {
        width: "70%",
        padding: `${theme.spacing(2)} 0`,
      },
    },
  },

  inputs: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,

    "& .MuiInputLabel-root": {
      fontSize: 15,
      fontWeight: 500,
    },
    "& .MuiButton-root": {
      color: theme.palette.secondary.light,
    },
    "& .css-1nrlq1o-MuiFormControl-root": {
      width: "90%",
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    },
  },
}));

const EditPatient = (props) => {
  const classes = useStyle(props);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const singlepatient = useSelector((state)=>state.PatientReducerData.stateApi)
  //const singlepatient = useSelector((state)=>state.SinglePatientReducer.stateApi)
  
  if(singlepatient.length === 0){
    Dispatch(FetchSinglePatient())
  }

 //console.log('single',singlepatient)

  const [patientData, setPatientData] = useState({
    id            : singlepatient.data.id,
    name          : singlepatient.data.name,
    phone_number  : singlepatient.data.phone_number,
    address       : singlepatient.data.address,
    city          : singlepatient.data.city,
    state         : singlepatient.data.state,
    pincode       : singlepatient.data.pincode,
    adhar_number  : singlepatient.data.adhar_number,
  });

  const onInputChange = (e) => {
    const result = e.target.value.replace(/\D/g, '');
    setPatientData((item)=>{
      return{
        ...item,
        adhar_number  : result,

      }
    });
  }


  const submitPntData = (e) => {
    let { name, value } = e.target;
    setPatientData({ 
      ...patientData,
       [name]: value 
      });
   };

  const submitPntPhone = (setPhone) => {
  
    setPatientData((prev) => {
      return {
        ...prev,
        phone_number : setPhone,
      }
    });
  };

  //console.log("Values are", patientData);

  const SubmitData = () => {

    Dispatch(PatientUpdate(patientData.id,patientData))
    .then(()=> Navigate('/allpatient'))

  };

  const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAges = getAge(patientData.date_of_birth);
  const totalAge = patientData.date_of_birth == 0 ? 0 : getAges;
  //console.log('age is',totalAge);
  //console.log("Values are", patientData);

  return (
    <Layout>
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
          <Typography variant="h5" component="h5" sx={{ marginBottom: 2, padding:'10px' ,
            margin:'auto', fontWeight:'bold' }}>
            Edit Patient
          </Typography>
        <Box className={classes.inputs}>
        <Grid container spacing={2}>
        <Grid item xs={6} >
          <TextField
            type="text"
            name="name"
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            value={patientData.name}
            onChange={submitPntData}
            sx={{ width: "100%", marginBottom: 2 }}
            required
          />
        </Grid>
          {/* <TextField type="phone" name='phone_number' id="outlined-basic" label="Phone Number" variant="outlined" value={patientData.phone_number} onChange={submitPntData} sx={{ width: '90%', marginBottom: 2 }}  required />  */}
          <Grid item xs={6} >
          <MuiPhoneNumber
            defaultCountry={"in"}
            variant="outlined"
            name="phone_number"
            value={patientData.phone_number}
            onChange={submitPntPhone}
            sx={{ width: "100%", marginBottom: 3 }}
            required
          />
          </Grid>
          <Grid item xs={6} >
          <TextField
            type="text"
            name="adhar_number"
            id="outlined-basic"
            label="Aadhar Number"
            variant="outlined"
            value={patientData.adhar_number}
            onChange={onInputChange}
            sx={{ width: "100%", marginBottom: 2 }}
            inputProps={{ maxLength: 12 }}
            required
          />
          </Grid>
          <Grid item xs={6} >
          <TextField
            type="address"
            name="address"
            id="outlined-basic"
            label="House No."
            variant="outlined"
            value={patientData.address}
            onChange={submitPntData}
            sx={{ width: "100%", marginBottom: 2 }}
            required
          />
          </Grid>
          <Grid item xs={6} >
          <TextField
            type="text"
            name="city"
            id="outlined-basic"
            label="City "
            variant="outlined"
            value={patientData.city}
            onChange={submitPntData}
            sx={{ width: "100%", marginBottom: 2 }}
            required
          />
          </Grid>
          <Grid item xs={6} >
          <TextField
            type="text"
            name="state"
            id="outlined-basic"
            label="State"
            variant="outlined"
            value={patientData.state}
            onChange={submitPntData}
            sx={{ width: "100%", marginBottom: 2 }}
            required
          />
          </Grid>
          <Grid item xs={12} >
          <TextField
            type="text"
            name="pincode"
            id="outlined-basic"
            label="Pincode"
            variant="outlined"
            value={patientData.pincode}
            onChange={submitPntData}
            sx={{ width: "100%", marginBottom: 2 }}
            required
          />
          </Grid>

          <Button
            onClick={SubmitData} sx={{width:'fit-content', margin:'auto'}}
            variant="contained"
            className={classes.stundentBtn}
          >
            Update Patient
          </Button>
          </Grid> 
        </Box>
      </Paper>
    </div>
  </Layout>
  );
};

export default EditPatient;
