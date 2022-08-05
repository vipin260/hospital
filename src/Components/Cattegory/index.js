import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import { Switch } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { FetchCattegoryData } from "../../redux/action/action";
import {categoryData} from '../../redux/action/Actions'
import {ProductInsert} from '../../redux/action/Actions'


const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "700px",
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
    },
    '& #react-select-3-listbox':{
      backgroundColor : 'white !important',
      zIndex :'99'
    },
    '& #react-select-5-listbox':{
      backgroundColor : 'white !important',
      zIndex :'99'
    },
    '& #react-select-7-listbox':{
      backgroundColor : 'white !important',
      zIndex :'99'
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
    toggle: {
      display: "flex",
      alignItems: "center",
      border : "2px solid red !important"

    },
    active: {
      
      fontSize: "17px!important",
      fontWeight: "500!important",
      marginBottom: "2",
    },
    inactive: {
      fontSize: "17px!important",
      fontWeight: "500!important",
      marginBottom: "2",
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
      },
      '& .MuiTypography-body2': {
         color :"red",

    },
  
  },
}));

const Addcategory = () => {

  const [category, setCategory] = useState({
    
    product_id        : "",
    product_name      : "",
    product_category  : "",
    toggle            : false,
    status            : "0",
  });

  const [opdPriceState, setOpdPriceState] = useState({
    opd_price : ""
  })

  const CategoryData = useSelector((state) => state.CategoryReducerData.apiState);
  const DataCategory = useSelector((state) => state.CategoryDataReducers.ApiStat)

  console.log("this",DataCategory)

  const dispatch = useDispatch();

  if (CategoryData.length == 0) {
    dispatch(FetchCattegoryData());
  }

  const options = [];
  DataCategory.map((items)=>{
    options.push({value : items.id, label: items.name})
  })


  const handleChangerr = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setOpdPriceState((item)=>{
      return{
        ...item,
        opd_price : result

      }
    });
  };
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
        product_category: selectedOption.value,
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

    
  };


  const SubmitData = () => {

    let insert_data={"action": "AddNewProduct","product": category , "opdprice": opdPriceState}
    dispatch(ProductInsert(insert_data))
    setCategory({
      product_id        : "",
      product_name      : "",
      product_category  : "",
      toggle            : false,
      status            : "0",
    })
    setOpdPriceState({opd_price : ""})
  };

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
              Add Data
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
                
                <Typography
                variant="body3"
                    type='hidden'
                    name ='status' sx={{ display: 'none' }}
                  >Hidden type
                    </Typography>
                {category.toggle ? (
                  <>
                  <Typography
                    variant="body1"
                    className={classes.active}
                    componenet="p"
                  >
                    Active
                  </Typography>

                  </>
                ) : (
                  <>
                  <Typography variant="body2" componenet="p" 
                  className={classes.inactive} 
                  sx={{fontSize: "17px!important"}}>
                    Inactive
                  </Typography>

                  {/* <Typography
                    type='hidden'
                    name ='status'
                  /> */}
                  
                  </>
                )}
              </Box>
         
            </FormControl>
            
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={SubmitData}
            >
              Add Data
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};
export default Addcategory;
