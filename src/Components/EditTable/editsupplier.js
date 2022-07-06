import React,{useState} from 'react'
import { Paper, Box, Button, Typography, TextField, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { useNavigate } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useSelector ,useDispatch } from 'react-redux';
import { UpdateSupplierData } from '../../redux/action/action';
import { SupplierUpdate } from '../../redux/action/Actions';



const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '50%',
      marginTop:'8%',
      padding: '30px',
      height: 'max-content',
      padding: `${theme.spacing(4)} 0`
    }
  },

  inputs: {
    height: 'auto%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,
    },
    '& .css-1nrlq1o-MuiFormControl-root': {
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    }
  },


}))

const EditSupplier = () => {

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const classes = useStyle();

  const suppliersingledata  = useSelector((state)=>state.SupplierReducerData.SingleApi)
  // const singlepatient = useSelector((state)=>state.SinglePatientReducer.stateApi)
  //console.log('suppliersingledata is',suppliersingledata)

  const [supplierData, setsupplierData] = useState({

    id            : suppliersingledata.data.id,
    name          : suppliersingledata.data.name,
    phone_number  : suppliersingledata.data.phone_number,
    address       : suppliersingledata.data.address,
    city          : suppliersingledata.data.city,
    state         : suppliersingledata.data.state,
    pincode       : suppliersingledata.data.pincode,
  });

  const handleSupplier = (e) => {
    const { value, name } = e.target;
    setsupplierData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitPntPhone = (setPhone) => {
  
    setsupplierData((prev) => {
      return {
        ...prev,
        phone_number : setPhone,
      }
    });
  };

  const insertSupplier = () => {

    Dispatch(SupplierUpdate(supplierData.id,supplierData))
    .then(()=> Navigate('/allsupplier'))


  };

  //console.log('values of supplierData',supplierData.id);

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
           <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
             Edit Supplier
            </Typography>
          <Box className={classes.inputs}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Name"
                  name="name"
                  variant="outlined"
                  sx={{ width: "100%", marginBottom: 2 }}
                  value={supplierData.name}
                  onChange={handleSupplier}
                />
              </Grid>

            {/* <TextField
              id="outlined-basic"
              type="number"
              label="Phone Number"
              name="phone_number"
              variant="outlined"
              sx={{ width: "100%", marginBottom: 2 }}
              value={supplierData.phone_number}
              onChange={handleSupplier}
            /> */}
               <Grid item xs={6}>
                <MuiPhoneNumber
                  defaultCountry={"in"}
                  variant="outlined"
                  name="phone_number"
                  value={supplierData.phone_number}
                  onChange={submitPntPhone}
                  sx={{ width: "100%", marginBottom: 2 }}
                  required
                />
               </Grid>
 
              <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                type="text"
                label="House No"
                name="address"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2 }}
                value={supplierData.address}
                onChange={handleSupplier}
              />
              </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                type="text"
                label="City"
                name="city"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2 }}
                value={supplierData.city}
                onChange={handleSupplier}
              />
            </Grid>
     
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                type="text"
                label="State"
                name="state"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2 }}
                value={supplierData.state}
                onChange={handleSupplier}
              />
            </Grid>
   
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                type="text"
                label="Pincode"
                name="pincode"
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2 }}
                value={supplierData.pincode}
                onChange={handleSupplier}
              />
            </Grid>

           
            <Button
              onClick={insertSupplier} sx={{width:'fit-content', margin:'auto'}}
              variant="contained"
              className={classes.stundentBtn}
            >
              Update Supplier
            </Button>

            </Grid>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default EditSupplier;