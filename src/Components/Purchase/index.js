import React, { useEffect, useState } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchPurchases ,FetchSinglePurchase ,DeletePurchaseData } 
from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from '@mui/icons-material/Remove';
import {SupplierFetch, PurchaseInsert, PurchaseDetailInsert, FetchProduct } from "../../redux/action/Actions";


const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,
    

    "& .MuiPaper-root": {
      width: "70%",
      marginTop: "10%",
      marginLeft:"12%",
      padding: `${theme.spacing(4)} 0`,
      // border:'1px solid red',
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
    '& #react-select-7-listbox':{
      backgroundColor : 'white !important',
      zIndex :'99'
    },
    '& .css-1s2u09g-control ':{
      paddingBottom:'9px',
      paddingTop :'9px'
    },
    '& .css-1pahdxg-control ':{
      paddingBottom:'9px',
      paddingTop :'9px'
    },
    //#react-select-3-listbox
    //.css-2613qy-menu
  },
  edit :{
    color :"#2E2EFF"
  },
  delete :{
    color :"red"
  }
}));

const PurchaseAdd = (props) => {
  
  const classes = useStyle(props);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  // const SupplierNameReducer = useSelector((state)=>state.PurchaseReducer.supplierApi)
  // const PurchaseData       = useSelector((state) =>state.PurchaseReducer.fetchApi);
  const supplierData = useSelector((state) =>state.SupplierReducerData.apiState);
  const DataCategory = useSelector((state) => state.CategoryDataReducers.ApiStat)
  const FetchProductData = useSelector((state) => state.ProductReducersData.FetchApi);

  //console.log('FetchProductData name',FetchProductData);

  // if(SupplierNameReducer.length === 0){
  //   Dispatch(FetchSupplName());
  // }

  const options = []
  supplierData.map((items)=>
  options.push({ value: items.id, label: items.name })
  )

  const item_name_options = [];
  FetchProductData.map((items)=>{
    item_name_options.push({value : items.product_id, label : items.product_name})
  })

  const [supplierList, setSupplierList]=useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [getLabel,setGetLabel] = useState()



  const [purchase, setpurchase] = useState({
    id                : "",
    supplier_name     : "",
    date_of_purchase  : "",
    invoice_no        : "",
    pdf_upload        : "",
    // item_name         : "",
    // item_qty          : "",
    // item_msrp         : "",
    // cost_price        : "",
    // selling_price     : "",
  });

  const [purchaseDetail, setPurchaseDetail] = useState({
    id                : "",
    item_name         : "",
    item_qty          : "",
    item_msrp         : "",
    cost_price        : "",
    selling_price     : "",
  })

  const [inputAdd, setInputAdd] = useState([]);

  const submitPntData = (e, index) => {
    let { name, value } = e.target;
    setpurchase({ 
      ...purchase,
      [name]: value ,
      });
      console.log(value)
  };
  const submitPntData1 = (e, index) => {
    let { name, value } = e.target;
    // let b = value.slice(12);
    // let a = e.target.files[0].name;
    setpurchase({ 
      ...purchase,
      [name]: value ,
      });
      console.log()
  };
  console.log(purchase)
  // const submitPntData = (e, index) => {
  //     let a = e.target.value;
  //     setpurchase({ 
  //       ...purchase,
  //       a
  //       });
  //       console.log(a);
  //   };

  const submitPurchaseDetailData = (e, index) => {
    let { name, value } = e.target;
    setPurchaseDetail({ 
      ...purchaseDetail,
      [name]: value ,
      });
      
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setpurchase((item)=>{
        return{
          ...item,
          item_name  : value,
        }
      });
    }
  }

  const handlenum = (event) => {
    console.log("keyword",event)
    const result = event.target.value.replace(/\D/g, '')
    if(event.target.name ==='item_qty') {
    setPurchaseDetail((item)=>{
      return{
        ...item,
       item_qty  : result 

      }
    })
  }else if(event.target.name ==='item_msrp'){
    setPurchaseDetail((item)=>{
      return{
        ...item,
       item_msrp  : result 

      }
    })
  } else if(event.target.name ==='cost_price'){
    setPurchaseDetail((item)=>{
      return{
        ...item,
       cost_price  : result 

      }
    })
  }else if(event.target.name ==='selling_price'){
    setPurchaseDetail((item)=>{
      return{
        ...item,
       selling_price  : result 
      }
    })
  }
  };

  const handleChange = (selectedOption) => {
    setpurchase((prev) => {
      return {
        ...prev,
        supplier_name: selectedOption.value,
      };
    });
  };

  const handleItemName =(selectName) =>{
    setPurchaseDetail((prev) => {
      return {
        ...prev,
        item_name   : selectName.value,
      };
    });

  }

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputAdd];
    list[index][name] = value;
    setInputAdd(list);

  };

  const handleServiceRemove = (index) => {
    const list = [...inputAdd];
    list.splice(index, 1);
    setInputAdd(list);
  };

  const handleServiceAdd = () => {
    setInputAdd([...inputAdd,  
      {
          item_name       : purchaseDetail.item_name, 
          item_qty        : purchaseDetail.item_qty,  
          item_msrp       : purchaseDetail.item_msrp,
          cost_price      : purchaseDetail.cost_price, 
          selling_price   : purchaseDetail.selling_price 
      }])
      setPurchaseDetail({
        item_name         : "",
        item_qty          : "",
        item_msrp         : "",
        cost_price        : "",
        selling_price     : ""
      })
  };
  

  const SubmitData = () => {
    let data={"action": "AddNewPurchase","purchase": purchase, "purchasedetail": inputAdd}
    Dispatch(PurchaseInsert(data))
   //.then(()=> Navigate('/allpurchase'))
  };

  useEffect(()=>{
    let data      = {"action" : "getAllSupplier"}
    let item_name = {"action" : "getAllProduct"}
    Dispatch(FetchProduct(item_name))
    Dispatch(SupplierFetch(data))
  },[Dispatch])
 

//console.log('inputAdd is' ,inputAdd)

const Btn = (e) => e.target.name === 'more_input_fields' 



  return (
    <Layout>
      <div className={classes.root} >
        <Paper className={classes.paper} elevation={0} >
          <Box className={classes.inputs}>
            <Typography variant="h6" component="h6" sx={{ marginBottom: 2, width:'100%', maxWidth:'98%', 
               marginTop:2 }}>
                 Purchase Order
            </Typography>
            <Box className="react_box" sx={{ marginBottom:'5px', display:'flex', width:'100%', maxWidth:'98%' }}>
              <Box sx={{width:'42%' }}>
              <Select
                options={options}
                defaultValue={purchase.supplier_name}
                onChange={handleChange}
                placeholder='Supplier Name'
              />
            </Box>
            <TextField 
              id="date"
              label="Date of Purchase"
              type="date"
              name="date_of_purchase"
              value={purchase.date_of_purchase}
              onChange={submitPntData}
              sx={{ width: "35%", marginLeft: '15px' }}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              type="text"
              name="invoice_no"
              id="outlined-basic"
              label="Invoice No"
              variant="outlined"
              value={purchase.invoice_no}
              onChange={submitPntData}
              sx={{ width: "35%", marginLeft: '15px' }}
              required
            />
      
            <TextField
              type="file"
              name="pdf_upload"
              value={purchase.pdf_upload}
              onChange={submitPntData1}
              sx={{ width: "35%", marginLeft: '15px' }}
              required
            />

            </ Box>

            <Typography variant="h6" component="h6" sx={{ marginBottom: 2,marginTop:3,width:'100%',
             maxWidth:'98%',marginBottom:2 }}>
               Purchase Order Items
            </Typography>
            <Box >
              {/* {inputAdd.map((addData, index) => ( */}
            <Box sx={{display:'flex',margin:'5px',justifyContent:'space-between' }} >
                {/* <TextField
                  type="text"
                  name="item_name"
                  id="outlined-basic"
                  label="Item Name"
                  variant="outlined"
                  value={purchase.item_name}
                  onChange={(e) => submitPntData(e)} 
                  sx={{ width: "17%", marginBottom: 2 }}
                  required
                /> */}
              
                <Box sx={{  width: "18%", marginBottom: 2 }}>
                  <Select 
                    options={item_name_options}
                    defaultValue={purchaseDetail.item_name}
                    onChange={handleItemName}
                    placeholder='Item Name'
                  />
                </Box>
                <TextField
                  type="text"
                  name="item_qty"
                  id="outlined-basic"
                  label="Qty"
                  variant="outlined"
                  value={purchaseDetail.item_qty}
                  onChange={(e) => handlenum(e)}
                  sx={{ width: "17%", marginBottom: 2 }}
                  required
                />
                <TextField
                  type="text"
                  name="item_msrp"
                  id="outlined-basic"
                  label="MSRP"
                  variant="outlined"
                  value={purchaseDetail.item_msrp}
                  onChange={(e) =>handlenum(e)}
                  sx={{ width: "17%", marginBottom: 2 }}
                  required
                />
                <TextField
                  type="text"
                  name="cost_price"
                  id="outlined-basic"
                  label="Cost Price"
                  variant="outlined"
                  value={purchaseDetail.cost_price}
                  onChange={(e) => handlenum(e)}                
                  sx={{ width: "17%", marginBottom: 2 }}
                  required
                />
            
                <TextField
                  type="text"
                  name="selling_price"
                  id="outlined-basic"
                  label="Selling Price"
                  variant="outlined"
                  value={purchaseDetail.selling_price}
                  onChange={(e) => handlenum(e)}
                  sx={{ width: "17%", marginBottom: 2 }}
                  required
                />
              <AddIcon sx={{marginTop:'15px',color:'white', backgroundColor:'blue', borderRadius:'50%'}} 
                 name='more_input_fields'  onClick={()=>handleServiceAdd()} /> 

           </Box>
           {/* ))} */}
           </Box>
          
         
            <Box className="output">     
              {/* <h2>Output</h2> */}
              {/* <Box sx={{border:'1px solid red', padding:'20px'}}>
                {Btn ? 'hello' : 'null'}
              </Box> */}
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}>
                      <TableHead>
                      {/* {events.target.name === 'more_input_fields' ? */}
                      <TableRow>                    
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Item Quantity</TableCell>
                        <TableCell align="right">MSRP</TableCell>
                        <TableCell align="right">Cost Price</TableCell>
                        <TableCell align="right">Selling Price</TableCell>
                      </TableRow>
                      
                      </TableHead>
                      { inputAdd.map((singleService, index) => {
                           const ValueName =()=>{
                            let arr = item_name_options.filter((items) => singleService.item_name === items.value)
                            for(let i=0;i<arr.length;i++){
                                return arr[i].label
                           }
                          }
                        return(
                     <TableBody  key={index} >
                      <TableRow >
                        <TableCell name='moreinput' align="center">{ValueName()}</TableCell>
                        <TableCell name='moreinput' align="center">{singleService.item_qty}</TableCell>
                        <TableCell name='moreinput' align="center">{singleService.item_msrp}</TableCell>
                        <TableCell name='moreinput' align="center">{singleService.cost_price}</TableCell>
                        <TableCell name='moreinput' align="center">{singleService.selling_price}</TableCell>
                        <TableCell sx={{border:'1px solid white'}}>
                          <RemoveIcon sx={{marginRight:'20px', marginLeft:'20px', marginTop:'15%', 
                             color:'white', backgroundColor:'red', borderRadius:'50%'}} 
                           onClick={() => handleServiceRemove(index)} />
                        </TableCell>
                      </TableRow> 
                      </TableBody>
                        )
                      })}
                      
                    </Table> 
                  </TableContainer>
                    {/* <TextField
                      type="text"
                      //name="item_name"
                      name={`item_name${index}`}
                      id="outlined-basic"
                      label="Item Name"
                      variant="outlined"
                      value={singleService.item_name}
                      sx={{ width: "17%", marginBottom: 2 }}
                      onChange={(e) => submitPntData(e, index)}
                      disabled
                      
                    />
                    <TextField
                      type="text"
                      //name="item_qty"
                      name={`item_qty${index}`}
                      id="outlined-basic"
                      label="Qty"
                      variant="outlined"
                      value={singleService.item_qty}
                      sx={{ width: "17%", marginBottom: 2 }}
                      onChange={(e) => submitPntData(e, index)}
                      disabled
                    />
                    <TextField
                      type="text"
                      //name="item_msrp"
                      name={`item_msrp${index}`}
                      id="outlined-basic"
                      label="MSRP"
                      variant="outlined"
                      value={singleService.item_msrp}
                      sx={{ width: "17%", marginBottom: 2 }}
                      onChange={(e) => submitPntData(e, index)}
                      disabled
                    />
                    <TextField
                      type="text"
                      //name="cost_price"
                      name={`cost_price${index}`}
                      id="outlined-basic"
                      label="Cost Price"
                      variant="outlined"
                      value={singleService.cost_price}
                      sx={{ width: "17%", marginBottom: 2 }}
                      onChange={(e) => submitPntData(e, index)}
                      disabled
                    />
                    
                    <TextField
                      type="text"
                      //name="selling_price"
                      name={`selling_price${index}`}
                      id="outlined-basic"
                      label="Selling Price"
                      variant="outlined"
                      value={singleService.selling_price}
                      sx={{ width: "17%", marginBottom: 2 }}
                      onChange={(e) => submitPntData(e, index)}
                      disabled
                    /> */}
                   {/* <RemoveIcon sx={{marginRight:'20px', marginLeft:'20px', marginTop:'12%'}} onClick={() => handleServiceRemove(index)} />
                    </Box>
                    ))} */}
                              
            </Box>

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

export default PurchaseAdd;
