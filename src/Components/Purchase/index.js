import React, { useEffect, useState } from "react";
import {  Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {SupplierFetch, FetchProduct, PurchaseInsert } from "../../redux/action/Actions";
import axios from 'axios';
import { linkUrl } from '../../Components/baseurl';


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


  const [supplierList, setSupplierList]=useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState("");


  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState({fileName:""});
  const [fileIs, setFileIs] = useState({
      selectedFile: "",
      responseArray: [],
  })

 
  const [purchase, setpurchase] = useState({
    id                : "",
    supplier_name     : "",
    date_of_purchase  : "",
    invoice_no        : "",
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
  

  const Dispatch = useDispatch();

  const supplierData = useSelector((state) =>state.SupplierReducerData.apiState);
  const DataCategory = useSelector((state) => state.CategoryDataReducers.ApiStat)
  const FetchProductData = useSelector((state) => state.ProductReducersData.FetchApi);

  //console.log('FetchProductData name',FetchProductData);


  const options = []
  supplierData.map((items)=>
  options.push({ value: items.id, label: items.name })
  )

  const item_name_options = [];
  FetchProductData.map((items)=>{
    item_name_options.push({value : items.product_id, label : items.product_name})
  })


  const saveFile = (e) => {
    setFile(e.target.files[0]);
    //setFileName(e.target.files[0].name);
    setFileName({fileName : e.target.files[0].name })
  };

  const handleInputChange  = (event) =>{
    setFileIs(()=>{
      return{
        selectedFile: event.target.files,
        responseArray:[]
      }
    })
  }
  

  const submitPntData = (e, index) => {
    let { name, value } = e.target;
    setpurchase({ 
      ...purchase,
      [name]: value ,
      });
      
  };


  const handlenum = (event) => {
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
  

  const SubmitData = async () => {

    let data={"action": "AddNewPurchase","purchase": purchase, "purchasedetail": inputAdd}

    const formData = new FormData();
    formData.append("file", file);
    formData.append("details", JSON.stringify(data));
    formData.append("fileName", JSON.stringify(fileName));
    formData.append("headers", JSON.stringify({"Content-type": "multipart/form-data"}));
    formData.append("method", JSON.stringify({method: "post"}));
    
    try {
      const res = await axios.post(
        //"http://localhost/hospital_management/purchase.php",
        linkUrl + 'purchase.php',
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }

    console.log('formData', formData);
    //Dispatch(PurchaseInsert(formData))

   //.then(()=> Navigate('/allpurchase'))
  };

  useEffect(()=>{
    let data      = {"action" : "getAllSupplier"}
    let item_name = {"action" : "getAllProduct"}
    Dispatch(FetchProduct(item_name))
    Dispatch(SupplierFetch(data))
  },[Dispatch])
 
console.log('purchase is ',purchase)
//console.log('inputAdd is' ,inputAdd)


console.log('hello file is', file)
console.log('fileName', fileName)


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
            
           <input 
             style={{marginTop:"1.5%", marginLeft:'1%'}}  
             type="file" name="file"  onChange={saveFile} 
            /> 

            </ Box>

            <Typography variant="h6" component="h6" sx={{ marginBottom: 2,marginTop:3,width:'100%',
             maxWidth:'98%',marginBottom:2 }}>
               Purchase Order Items
            </Typography>
            <Box >
            <Box sx={{display:'flex',margin:'5px',justifyContent:'space-between' }} >
              
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
