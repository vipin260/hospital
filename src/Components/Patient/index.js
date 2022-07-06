import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import { baseUrl } from "../baseurl";
import {AddPatient} from '../../redux/action/action'
import { useDispatch } from "react-redux";
import { InsertPatient } from "../../redux/action/Actions";



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
      padding: `30px`,
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
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    },
  },
}));

const Patient = (props) => {
  const classes = useStyle(props);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  //const [phone, setPhone] = useState("");

  const [patientData, setPatientData] = useState({
    id            : "",
    name          : "",
    phone_number  : "",
    date_of_birth : "",
    age           : "",
    address       : "",
    city          : "",
    state         : "",
    pincode       : "",
    adhar_number  : "",
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
    // setPatientData({phone_number :setPhone.value })
  };

  //console.log("Values are", patientData);


  const SubmitData = () => {
    Dispatch(InsertPatient(patientData))
    .then(()=> Navigate('/allpatient'))
  };


  const getAge    = (dateString) => {
    let today     = new Date();
    let birthDate = new Date(dateString);
    let age       = today.getFullYear() - birthDate.getFullYear();
    let m         = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAges = getAge(patientData.date_of_birth);
  const totalAge = patientData.date_of_birth == 0 ? 0 : getAges;
  //console.log('age is',totalAge);
  //console.log('patientData is',patientData);

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}  >
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2, padding:'10px' ,
              margin:'auto', fontWeight:'bold' }}>
              Add Patient
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
            {/* <TextField type='date'   name="date_of_birth" id="outlined-basic" label="Date of Birth" variant="outlined" value={patientData.date_of_birth} onChange={submitPntData} sx={{ width: '90%', marginBottom: 2 }} required /> */}
            {/* <TextField
              id="date"
              label="Date of Birth"
              type="date"
              name="date_of_birth"
              value={patientData.date_of_birth}
              onChange={submitPntData}
              sx={{ width: "90%", marginBottom: 2 }}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              type="text"
              name="age"
              id="outlined-basic"
              label="Age"
              variant="outlined"
              value={totalAge}
              onChange={submitPntData}
              sx={{ width: "90%", marginBottom: 2 }}
              disabled
            /> */}
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
              Add Patient
            </Button>
            </Grid> 
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default Patient;
