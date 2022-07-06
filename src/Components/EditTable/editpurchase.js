import React, { useEffect, useState } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchPurchases  ,DeletePurchaseData } 
from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from '@mui/icons-material/Remove';
import {SupplierFetch, PurchaseInsert, PurchaseDetailInsert, FetchSinglePurchase, FetchProduct, FetchPurchaseDetail,
  DeletePurchaseDetail, PurchaseUpdate } 
from "../../redux/action/Actions";


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
      width: "55%",
      marginTop: "10%",
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


  const supplierData = useSelector((state) =>state.SupplierReducerData.apiState);
  const FetchProductData = useSelector((state) => state.ProductReducersData.FetchApi);
  const SinglePurchaseData = useSelector((state) =>state.PurchaseReducer.fetchApis);
  

  // console.log('FetchProductData name',SinglePurchaseData.purchase.id);



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

  const [editData, setEditData] = useState('');

  const [purchase, setpurchase] = useState({
    id                : "",
    supplier_name     : "",
    date_of_purchase  : "",
    invoice_no        : "",
    // id                : SinglePurchaseData.purchase.id,
    // supplier_name     : SinglePurchaseData.purchase.supplier_id,
    // date_of_purchase  : SinglePurchaseData.purchase.date_of_purchase,
    // invoice_no        : SinglePurchaseData.purchase.invoice_no,
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
      
  };

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
          // id              : purchaseDetail.id,
          item_name       : purchaseDetail.item_name, 
          item_qty        : purchaseDetail.item_qty,  
          item_msrp       : purchaseDetail.item_msrp,
          cost_price      : purchaseDetail.cost_price, 
          selling_price   : purchaseDetail.selling_price 
      }])
      setPurchaseDetail({
        id                : "",
        item_name         : "",
        item_qty          : "",
        item_msrp         : "",
        cost_price        : "",
        selling_price     : ""
      })
  };
  

  const SubmitData = () => {
    let data={"action": "UpdatePurchase","purchase": purchase, "purchasedetail": inputAdd}
    //let editdata = {id : purchase.id}
    let editdata = {id:purchase.id,"action" : "getPurchaseByID"}
    Dispatch(PurchaseUpdate(data))
   .then(()=> Dispatch(FetchSinglePurchase(editdata)))
  };

  const HandlePurchaseDetailDelete = (id) =>{
    if (window.confirm("Are you sure to delete the data ?")) {
     let delete_purchaseDetail = {"id" : id, "action":"DeletePurchaseDetail"}
     Dispatch(DeletePurchaseDetail(delete_purchaseDetail))
    }

  }

  useEffect((id)=>{
    //let pdata = {"id"}
    let data      = {"action" : "getAllSupplier"}
    let item_name = {"action" : "getAllProduct"}
    let purchase_detail = {"id":id,"action" : "getAllPurchaseDetail"}
    Dispatch(FetchProduct(item_name))
    Dispatch(SupplierFetch(data))
    Dispatch(FetchSinglePurchase())
    
  },[Dispatch])


  useEffect(()=>{
    //console.log("first",SinglePurchaseData)

     setpurchase({
      id                : SinglePurchaseData.purchase.id,
      supplier_name     : SinglePurchaseData.purchase.supplier_id,
      date_of_purchase  : SinglePurchaseData.purchase.date_of_purchase,
      invoice_no        : SinglePurchaseData.purchase.invoice_no,
    });
  
    setEditData(SinglePurchaseData.purchase_detail)
  },[])

 console.log('purchase is ',purchase)
 //console.log('inputAdd is' ,inputAdd)
 console.log('editData is' ,editData)

const Btn = (e) => e.target.name === 'more_input_fields' 



  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h6" component="h6" sx={{ marginBottom: 2, width:'100%', maxWidth:'98%', 
               marginTop:2 }}>
                 Edit Purchase Order
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

            </ Box>

            <Typography variant="h6" component="h6" sx={{ marginBottom: 2,marginTop:3,width:'100%',
             maxWidth:'98%',marginBottom:2 }}>
               Edit Purchase Order Items
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
          {/* {SinglePurchaseDetailData.map((data,id)=>{
            return(
              <>
              <h4>{data.id}</h4>
              </>
            )
          })} */}
         
            <Box className="output">     
              {/* <h2>Output</h2> */}
              {/* <Box sx={{border:'1px solid red', padding:'20px'}}>
                {Btn ? 'hello' : 'null'}
              </Box> */}
                  <TableContainer>
                    <Table sx={{marginBottom:2}}>
                      <TableHead>
                      {/* {events.target.name === 'more_input_fields' ? */}
                      <TableRow>                    
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Item Quantity</TableCell>
                        <TableCell align="right">MSRP</TableCell>
                        <TableCell align="right">Cost Price</TableCell>
                        <TableCell align="right">Selling Price</TableCell>
                      </TableRow>
                      {/* : null } */}
                      </TableHead>
                      { editData.length>0 ?
                      editData?.map((singleService, index) => {
                        return(
                     <TableBody  key={index} >
                      <TableRow >
                        <TableCell name='moreinput' align="right">{singleService.product_name}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.item_qty}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.item_msrp}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.cost_price}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.selling_price}</TableCell>
                        <TableCell sx={{border:'1px solid white'}}>
                          <DeleteIcon sx={{marginRight:'20px', marginLeft:'20px', marginTop:'15%', 
                             color:'red'}} 
                           onClick={(id) => HandlePurchaseDetailDelete(singleService.id)} /> 
                        </TableCell>
                      </TableRow> 
                      </TableBody>
                        )
                      }):null}

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
                        <TableCell name='moreinput' align="right">{ValueName()}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.item_qty}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.item_msrp}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.cost_price}</TableCell>
                        <TableCell name='moreinput' align="right">{singleService.selling_price}</TableCell>
                        <TableCell sx={{border:'1px solid white'}}>
                          <RemoveIcon sx={{marginRight:'20px', marginLeft:'20px', marginTop:'15%', 
                             color:'#3f00ff'}} 
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
              Update Invoice
            </Button>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
};

export default PurchaseAdd;
