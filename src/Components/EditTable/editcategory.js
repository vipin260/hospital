import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import { red } from "@mui/material/colors";
import { Switch } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseurl";
import { useSelector, useDispatch } from "react-redux";
import { FetchSingleCattegory } from "../../redux/action/action";
import { UpdateCattegoryData } from "../../redux/action/action";
import { FetchSingleProduct } from "../../redux/action/Actions";
import {categoryData} from '../../redux/action/Actions'

import {UpdateProduct} from "../../redux/action/Actions"

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "670px",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,

    "& .MuiPaper-root": {
      width: "55%",
      height: "max-content",
      marginBottom: "5%",
      padding: `${theme.spacing(4)} 0`,
      //  border : '2px solid red'
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
    active: {
      
      fontSize: "17px!important",
      fontWeight: "500!important",
      marginBottom: 2,
    },
    inactive: {
      fontSize: "17px!important",
      fontWeight: "500!important",
      marginBottom: 2,
    },
    toggle: {
      display: "flex",
      alignItems: "center",
    },
    "& .makeStyles-inputs-20": {
      background: "red",
    },
    "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase": {
      color: "red",
    },
    "& .css-1yjjitx-MuiSwitch-track": {
      background: "red",
    },
    "& .css-18qg60n-MuiButtonBase-root-MuiSwitch-switchBase": {
      color: "red",
    },
    "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
      color: "green",
    },
    "& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        background: theme.palette.secondary.thirdlight,
      },
      '& .MuiTypography-body1':{
        color :"green",
        // marginTop: '-28px',
        // marginLeft: '57px'
      },
      '& .MuiTypography-body2': {
         color :"red",
        // marginTop: '-28px',
        // marginLeft: '57px'
    }
  },
}));

const Editcategory = () => {
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll);
  const SingleCategoryData = useSelector((state) => state.ProductReducersData.SingleApi);
  const DataCategory = useSelector((state) => state.CategoryDataReducers.ApiStat)


 console.log('single data',SingleCategoryData);
 console.log('DataCategory',DataCategory);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

 

  // const options = [
  //   { value: "1", label: "Pharmacy" },
  //   { value: "2", label: "Optical" },
  //   { value: "3", label: "OPD" },
  // ];

  const options = [];
  DataCategory.map((items)=>{
    options.push({value : items.id, label: items.name})
  })
  console.log('options are', options)
  
  const [category, setCategory] = useState({
    product_id        : SingleCategoryData.data.product_id,
    product_name      : SingleCategoryData.data.product_name,
    product_category  : SingleCategoryData.data.product_category,
    toggle            : SingleCategoryData.data.status==="0" ? false : true ,
    status            : SingleCategoryData.data.status,
  });
  const [opdPriceState, setOpdPriceState] = useState({
    opd_price : SingleCategoryData.data.opd_price
  })
  const handleChangerr = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setOpdPriceState((item)=>{
      return{
        ...item,
        opd_price : result
      }
    });
  }

  const handleData = (e) => {
    const { name, value } = e.target;
    setCategory((olditem) => {
      return {
        ...olditem,
        [name]: value,
      };
    });
  };

  const handleChange = (selectedOption) => {
    setCategory((prev) => {
      return {
        ...prev,
        product_category : selectedOption.value,
      };
    });
  };

  const toggler = (e) => {
    
    const { name, value } = e.target;
    if (category.toggle) {
      setCategory((items) => {
        return {
          ...items,
          [name]: false,
          status: "0",
        };
      });
    } else {
      setCategory((items) => {
        return {
          ...items,
          [name]: true,
          status: "1",
        };
      });
    }
   // console.log("category data", category);
  };
//const fDatat = () =>{

//   const filterateData = DataCategory.map((items)=> {return items.id} )
//   const filt = options.map((items)=>{return items.value})
//   const fDatata = DataCategory.filter((items)=> items.id === filt)
//   for(let i=0;i<fDatata.length;i++){
//     return DataCategory[i].name
//   }
// console.log('filterateData', filterateData)
// console.log('filt', filt)


//}

//console.log('fDatat', fDatat())
  const SubmitData = () => {
    let update_data={"action" : "UpdateProduct","product": category , "opdprice": opdPriceState}
    dispatch(UpdateProduct(update_data))
    //.then(()=>Navigate('/allproduct'))

  };

  //console.log('Category',category );
  // useEffect(()=>{
  //   dispatch(FetchSingleProduct)
  // })
  useEffect(()=>{
    let data= {"action":"getAllCategory"}
    dispatch(categoryData(data))
  },[dispatch])

  const classes = useStyle();

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Edit Data
            </Typography>
            <TextField
              id="outlined-basic"
              label="Add Name"
              name="product_name"
              variant="outlined"
              sx={{ width: "90%", marginBottom: 2 }}
              value={category.product_name}
              onChange={handleData}
            />
            <FormControl className={classes.radionBtns}>

              <Select
                options={options}
                defaultValue={category.product_category}
                // defaultValue={SingleCategoryData.data.product_category === '1' ? options[0] : 
                // (SingleCategoryData.data.product_category === '3' ? options[2] : options[1]) }
                onChange={handleChange}
              />
          {  category.product_category ==='3' ?
              <TextField
              id="outlined-basic"
              label="Add  Price"
              name="opd_price"
              variant="outlined"
              sx={{marginTop: 2 }}
              value={opdPriceState.opd_price}
              onChange={handleChangerr}
                /> : null
          }
              <Box className={classes.toggle} sx={{display:'flex', alignItems:"center" , marginTop:"10px"}}>
                <Switch
                  checked={category.toggle}
                  name="toggle"
                  value={category.toggle}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={toggler}
                />

                {category.toggle ? (
                  <>
                  <Typography
                    variant="body1"
                    className={classes.active}
                    componenet="p"
                  >
                    Active
                  </Typography>

                  <Typography
                    type='hidden'
                    name ='status'
                  />

                  </>
                ) : (
                  <>
                  <Typography variant="body2" componenet="p" 
                  className={classes.inactive} 
                  sx={{fontSize: "17px!important"}}>
                    Inactive
                  </Typography>

                  <Typography
                    type='hidden'
                    name ='status'
                  />

                  </>
                )}
              </Box>
         
            </FormControl>
           
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={()=>SubmitData()}
            >
              Update Data
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default Editcategory;
