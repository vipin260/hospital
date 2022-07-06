  import React, { useEffect, useState } from "react";
  import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import Layout from "../../Pages/Layout";
  import { useNavigate } from "react-router-dom";
  import {AddInvoiceData ,FetchSupplName} from '../../redux/action/action'
  import { useDispatch, useSelector } from "react-redux";
  import Select from "react-select";

  const useStyle = makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "1000px",
      color: "red",
      display: "flex",
      alignItems: "center",
      background: theme.palette.secondary.light,
      justifyContent: "center",
      zIndex: -99,

      "& .MuiPaper-root": {
        width: "35%",
        height: "max-content",
        padding: `${theme.spacing(4)} 0`,
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
      '& #react-select-3-listbox':{
        backgroundColor : 'white !important',
        zIndex :'99'
      },
      '& #react-select-5-listbox':{
        backgroundColor : 'white !important',
        zIndex :'99'
      },
      //#react-select-3-listbox
      //.css-2613qy-menu
    },
  }));

  const Purchase = (props) => {
    
    const classes = useStyle(props);

    const Navigate = useNavigate();
    const Dispatch = useDispatch();

    const SupplierNameReducer = useSelector((state)=>state.PurchaseReducer.supplierApi)
    //console.log('supplier name',SupplierNameReducer);

    if(SupplierNameReducer.length === 0){
      Dispatch(FetchSupplName());
    }

    const options = []
    SupplierNameReducer.map((items)=>
    options.push({ value: items.name, label: items.name })
    )
 
    const [supplierList, setSupplierList]=useState([]);


    const [purchase, setpurchase] = useState({
      id                : "",
      item_id           : "",
      supplier_id       : "",
      supplier_name     : "",
      invoice_no        : "",
      number_of_items   : "",
      purchase_price    : "",
      mrp               : "",
      selling_price     : "",
    });
  
    const checkedItem = (e) =>{
        let { value ,checked } = e.target
        if(checked){
        setSupplierList(old => [...old,value] )
        }else{
        const index = supplierList.indexOf(value);
        supplierList.splice(index, 1);
        console.log('supplier list is ',supplierList) 
        }
    }
    
    const submitPntData = (e) => {
      let { name, value } = e.target;
  
      setpurchase({ 
        ...purchase,
        [name]: value 
        });
        
    };

    const handleChange = (selectedOption) => {
      setpurchase((prev) => {
        return {
          ...prev,
          supplier_name: selectedOption.value,
        };
      });
    };
    
    const SubmitData = () => {
      let k = supplierList
        setpurchase((prev)=>{
            return{
              ...prev,
              supplier_checkbox :  k
            }
        });
      Dispatch(AddInvoiceData(purchase))
     .then(()=> Navigate('/allpurchase'))
    };

    useEffect(()=>{
      Dispatch(FetchSupplName())
    },[Dispatch])
   
   //console.log('purchase is ',purchase)
   console.log('supplier is' ,supplierList)

    return (
      <Layout>
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={5}>
            <Box className={classes.inputs}>
              <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
                Add Invoice
              </Typography>
              <TextField
                type="text"
                name="item_id"
                id="outlined-basic"
                label="Item Id"
                variant="outlined"
                value={purchase.item_id}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              
              <TextField
                id="outlined-basic"
                label="Supplier id"
                type="text"
                name="supplier_id"
                value={purchase.supplier_id}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              <Box className="react_select_box" sx={{width:'90%', marginBottom: 2}}>
                <Select
                  options={options}
                  defaultValue={purchase.supplier_name}
                  onChange={handleChange}
                 
                />
              </ Box>
        {/* {SupplierNameReducer.map((items,id)=>{
             return(
               <Box key={id}>
                    <FormControlLabel 
                    control= { 
                    <Checkbox  
                      value={items.id}
                      onClick={(e)=>checkedItem(e)}
                      />  
                      }
                    label={items.name}
                    />
               </Box>
              )
           })
        } */}
      
              <TextField
                type="text"
                name="invoice_no"
                id="outlined-basic"
                label="Invoice No"
                variant="outlined"
                value={purchase.invoice_no}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              <TextField
                type="number"
                name="number_of_items"
                id="outlined-basic"
                label=" Number Of Items"
                variant="outlined"
                value={purchase.number_of_items}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              <TextField
                type="number"
                name="purchase_price"
                id="outlined-basic"
                label="Purchase Price "
                variant="outlined"
                value={purchase.purchase_price}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              <TextField
                type="number"
                name="mrp"
                id="outlined-basic"
                label="MRP"
                variant="outlined"
                value={purchase.mrp}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              <TextField
                type="number"
                name="selling_price"
                id="outlined-basic"
                label="Selling Price"
                variant="outlined"
                value={purchase.selling_price}
                onChange={submitPntData}
                sx={{ width: "90%", marginBottom: 2 }}
                required
              />
              {/* {serviceList.length -1 === index && serviceList.length<4 && (
                    <Button
                    variant="contained"
                    className={classes.stundentBtn}
                  >
                    Add Service
                  </Button>
              )} */}
              <Button
                onClick={SubmitData}
                variant="contained"
                className={classes.stundentBtn}
              >
                Add Invoice
              </Button>
            </Box>
          </Paper>
        </div>
      </Layout>
    );
  };

  export default Purchase;
