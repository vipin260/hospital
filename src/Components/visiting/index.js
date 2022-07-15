import React, { useEffect, useState, useRef } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer  } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchData, FetchPurchases} from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { FetchPatient, FetchSinglePatient } from '../../redux/action/Actions';
// import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {FetchProductOpd, FetchProductPharmacy, FetchProductOptical, getAllInventory } from "../../redux/action/Actions";
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    // height: "700px",
    color: "red",
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.light,
    justifyContent: "center",
    zIndex: -99,
    //border:'1px solid red',

    "& .MuiPaper-root": {
      minWidth: "35%",
      height: "auto",
      padding: `${theme.spacing(4)} 30px`,
      marginTop :'7%',
      [theme.breakpoints.down("lg")]: {
        width: "70%",
        padding: `${theme.spacing(2)} 0`,
      },
      //border:'1px solid yellow',
    },
    
  },

  inputs: {
    //height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    //border:'1px solid green',

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
  '& .css-2kitwc-MuiFormControlLabel-root.MuiFormControlLabel-label' : {
     justifyContent: 'space-between',
     width: '100% !important'
},
'& .MuiFormControlLabel-label':{
  width: '100%'
},
  buttonsgrp : {
    width: '100%',
    maxWidth : '90%',
}
}));


const Visiting = (props) => {
  
  const classes = useStyle(props);

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const PatientNameReducer = useSelector((state)=>state.PatientReducerData.apiState)
  const SupplierNameReducer = useSelector((state)=>state.PurchaseReducer.supplierApi)
  const CategoryData = useSelector((state) => state.ProductReducersData.FetchApi);
  const PurchaseData       = useSelector((state) =>state.PurchaseReducer.fetchApi);
  const SingleData         = useSelector((state) =>state.PatientReducerData.stateApi);
  const FetchOpdData = useSelector((state) => state.ProductReducersData.OpdFetch);
  const FetchPharmacyData = useSelector((state) => state.ProductReducersData.PharmacyFetch);
  const FetchOpticalData = useSelector((state) => state.ProductReducersData.OpticalFetch);
  const FetchVisitData = useSelector((state) => state.VisitReducer.fetchApi);
  let newData = [SingleData.data];
  console.log("get",SingleData.data)

  console.log("real",FetchVisitData)
  console.log("real1",FetchOpticalData)
  
 

  console.log('PatientNameReducer name',PatientNameReducer);

  const [datasApi,setDatasApi] = useState({
    PurchaseDatais : '',
    CategoryDatais : '',
  })

  const [trueData, setTrueData]       = useState(true)
  const [trueDataOne, setTrueDataOne] = useState(true)
  const [trueDataTwo, setTrueDataTwo] = useState(true)
  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})
  const [options1,setOptions1] = useState([])
  const [value, setValue] = useState("one");
  const [opdpharmecyoptical,setOpdpharmecyoptical] = useState([])
  // const [selectdatasave, setSelectdatasave] = useState([]);
  const [inputAdd, setInputAdd] = useState([]);
  const [price, setPrice] = useState(0);
  const [addPharmacy, setAddPharmacy] = useState([]);

 

console.log("opdpharmecyoptical",opdpharmecyoptical)

  const ButtonsName = [{id:'1',name :'OPD',para:'OPD'},{id:'2',name:'Pharmacy',para:'Pharmacy'},
  {id:'3',name:'Opticals',para:'Opticals'}]
  

 
 

  const options = []
  // const options1 = []
  PatientNameReducer.map((items)=>
  options.push({ value: items.id, label: items.name })
  )

  const [purchaseDetail, setPurchaseDetail] = useState({
    id                : "",
    item_name         : "",
    item_qty          : "",
    item_msrp         : "",
    cost_price        : "",
    selling_price     : "",
  })

  

  const [supplierList, setSupplierList]=useState([]);
  const [chkValue, setChkValue] = useState(false);


  const [visit, setVisit] = useState({
    id                : "",
    supplier_name     : "",
    buttonName        : "",
  });

  const [visit1, setVisit1] = useState({
    id                : "",
    supplier_name     : "",
    buttonName        : "",
  });

  const handleServiceAdd = (items) => {
    if(items.name==="OPD"){
    setInputAdd([...inputAdd,  
      {
        product_name       : items.product_name, 
        product_id        : items.product_id,  
        product_name       : items.product_name,
        product_category      : items.product_category, 
        opd_price           : items.opd_price 
      }])
      
      if(inputAdd!==""){
        // setPrice(price.concat(items.opd_price))
        setPrice(price + parseFloat(items.opd_price))
        
      }
      console.log("price", price)
    }
    else if(items.name==="pharmacy"){
      let data = {"pharmacy_id" : items.product_id, "action" : "getAllInvertory"}
      Dispatch(getAllInventory(data))
      .then(() => handleClickOpen())
    }
  };

  
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  // BootstrapDialogTitle.propTypes = {
  //   children: PropTypes.node,
  //   onClose: PropTypes.func.isRequired,
  // };

  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };





  console.log("inputAdd", inputAdd)
  console.log("visit1",visit1)
  const submitPntData = (e) => {
    let { name, value } = e.target;
    setVisit({ 
      ...visit,
      [name]: value 
      });
      
  };

  const handleChange = (selectedOption) => {
    setVisit((prev) => {
      return {
        ...prev,
        supplier_name: selectedOption.value,
      };
    });
    let singleData = {"id" : selectedOption.value, "action" : "getPatientByID"}
    Dispatch(FetchSinglePatient(singleData))
    console.log("tet",selectedOption)
  };

  const handleChange1 = (value) => {
    setValue(value);
   console.log("kya h value me",value)
    setVisit1((prev) => {
      return {
        ...prev,
        supplier_name: value.value,
      };
    });
    
    
  
    console.log("tet5",opdpharmecyoptical)
    
   
  };
  console.log("tet6",visit1.supplier_name)
  
  
  

  useEffect(()=>{
    
   },[visit1])

   useEffect(()=>{
    setData(PatientNameReducer)
   },[PatientNameReducer])



      const checkedItem = (e) =>{
        let { value ,checked } = e.target
        if(checked){
        setSupplierList(old => [...old,value] )
        }else{
        const index = supplierList.indexOf(value);
        supplierList.splice(index, 1);
        //console.log('supplier list is ',supplierList) 
        }
    }

    



  const clickOpd =( itemsname)=>{ 
    let {name, value} = itemsname.target
     
      const ButtonFilter = ButtonsName.filter((items)=> { return value === items.id } )

    

      if(value  === '1' ){
          console.log('first button');

  setValue(null)
  options1.splice(0, options1.length)
  setOptions1( FetchOpdData.map((items)=>{ 
    return(
  { value: items.product_id, label: items.product_name }
  )
         }) 
  )  
  setOpdpharmecyoptical(FetchOpdData)
  // setDefaultvalue({label:"net"})
  // console.log("option",options1)
  console.log("dataata",FetchOpdData)
  console.log("dataata222",opdpharmecyoptical)
      }else if(value === '2' ){
         console.log('second button')
         setValue(null)
         options1.splice(0, options1.length)
         setOptions1( FetchPharmacyData.map((items)=>{
          return(
{ value: items.product_id, label: items.product_name }
          )
         }) 
         )   
         
         setOpdpharmecyoptical(FetchPharmacyData)

         
  //        if(options1!==""){
  //         options1.splice(0, options1.length)
  //         FetchPharmacyData.map((items)=>
  // options1.push({ value: items.product_id, label: items.product_name })
  // ) 
  
  //        }
         console.log("option",options1)
  console.log("dataata",FetchPharmacyData)
  // setDefaultvalue({label:"get"})
  
        //  Dispatch(FetchPurchases())
      }else if(value === '3' ){
         console.log('third button')
         setValue(null)
         options1.splice(0, options1.length)
         setOptions1( FetchOpticalData.map((items)=>{
          return(
  { value: items.product_id, label: items.product_name }
          )
      })
         )

         setOpdpharmecyoptical(FetchOpticalData)
        //Dispatch(FetchPurchases())
        
      }
      
      
 
  }

 const SelectedCheckboxes = (value) => {
  console.log("label",value)
  setAddPharmacy([ ...addPharmacy,
   {
    id : value.id,
    product_name : value.product_name,
    selling_price : value.selling_price,
    cost_price : value.cost_price,
    item_msrp : value.item_msrp,
   } 
  ])
 }
 console.log("label222",addPharmacy)
console.log("dash",opdpharmecyoptical);
  
  const SubmitData = () => {
//     Dispatch(AddInvoiceData(visit))
//    .then(()=> Navigate('/allvisit'))
  };

  
  useEffect(()=>{
    let data = {"action" : "getAllPatient"};
    Dispatch(FetchPatient(data))
    // Dispatch(FetchCattegoryData())   
  },[Dispatch]) 

  
 
 


   useEffect(() => {
    let opd_fetch      = {"action" : "getProductOPD"}
    let pharmacy_data  = {"action" : "getProductPharmacy"}
    let optical_fetch  = {"action" : "getProductOptical"}
    Dispatch(FetchProductPharmacy(pharmacy_data))
    Dispatch(FetchProductOptical(optical_fetch))
    Dispatch(FetchProductOpd(opd_fetch))
 }, [Dispatch])

  
  //  useEffect(()=>{
   
  //   let singleData = { "action" : "getPatientByID"}
  //   Dispatch(FetchSinglePatient(singleData))
  //  },[Dispatch])
   

  console.log("hdakhsdkj",FetchVisitData)
  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
          <Box className={classes.inputs} sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom: '16px'}}>
          <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Add Visiting
            </Typography>
            <Button
              onClick={SubmitData}
              variant="contained"
              className={classes.stundentBtn}
            >
              Add Invoice
            </Button>
            </Box>
           
            <Box className="react_select_box" sx={{width:'100%', marginBottom: 2}}>
              <Select
                options={options}
                defaultValue={visit.supplier_name}
                onChange={handleChange}
               
              />
            </ Box>
            {/* <input className="form-control" type="checkbox" checked={chkValue}/>
            <FormControlLabel 
                    control= { 
                    <Checkbox  
                      checked={chkValue}
                      />  
                      }
                    /> */}
                    
                  <Box>
                    {
                    PatientNameReducer.map((items)=>{
                      return(
                        <>
                          {
                          visit.supplier_name === items.id ?
                          <>
                          <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="right">Pincode</TableCell>
                            <TableCell align="right">Aadhar Number</TableCell>
                          </TableRow>

                          </TableHead>

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="right">{items.name}</TableCell>
                            <TableCell align="right">{items.phone_number}</TableCell>
                            <TableCell align="right">{items.address}</TableCell>
                            <TableCell align="right">{items.city}</TableCell>
                            <TableCell align="right">{items.state}</TableCell>
                            <TableCell align="right">{items.pincode}</TableCell>
                            <TableCell align="right">{items.adhar_number}</TableCell>
                          </TableRow>
                          </TableBody>
                          </Table> 
                         </TableContainer>
                         </>
                          : null
                        }
                        </>
                      
                      )
 
                 
                    })
                    }
                  </Box> 
          {visit.supplier_name !==''?          
            <Box  sx={{marginBottom:'2%',padding:'4px',display:'flex'}}>
               
              {ButtonsName.map((itemsname,i)=>{
                return(
                  <Box key={i} sx={{marginBottom:'2%',padding:'4px',display:'flex'}}>
                   
                    <Button sx={{marginRight:'2%'}}
                        variant="contained"
                        className={classes.buttonsgrp}
                        value={itemsname.id} 
                        name ={itemsname.name}
                        onClick={(items)=>clickOpd(items)}
                        >
                        {itemsname.name} 
                      </Button>
                     
                  </Box>
                  ) 
              })
             }
             <Select
                options={options1}
                value={value}
              //  defaultValue={defaultvalue}
                onChange={handleChange1}
               
              />
              {
                    opdpharmecyoptical.map((items)=>{
                      return(
                        <>
                          {
                          visit1.supplier_name === items.product_id ?
                          <>
                            <AddIcon sx={{marginTop:'7px',marginLeft:'15px',color:'white', backgroundColor:'blue', borderRadius:'50%'}} 
                            name='more_input_fields'  onClick={()=>handleServiceAdd(items)} /> 
                            </>
                          : null
                        }
                        </>
                      )
                    })
                    }
            </Box>
           :  null
           
          }
          
          
        {/* to show button static */}
         {/* {visit.supplier_name !==''?
          <Box>
             <Box sx={{display:'flex',marginBottom:'5%' }}>
             <Button sx={{marginRight:'2%',}}
             variant="contained"
             className={classes.buttonsgrp}
             value='1'
             onClick={(e)=>clickOpd(e)}
             
             >
             OPD
             </Button>
             <Button sx={{marginRight:'2%', }}
             variant="contained"
             className={classes.buttonsgrp}
             value='2'
              onClick={(e)=>clickOpd(e)}
             
             >
             PHARMACY
             </Button>
             <Button sx={{marginRight:'2%', }}
             variant="contained"
             className={classes.buttonsgrp}
             value='3'
              onClick={(e)=>clickOpd(e)}
             >
             OPTICALS
             </Button>
         </Box>
         </Box> : null}   */}
            {/* ends here code */}

            <Box>
                    {/* {
                    opdpharmecyoptical.map((items)=>{
                      return(
                        <>
                          {
                          visit1.supplier_name === items.product_id ?
                          <>
                          <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Product Name</TableCell>
                            
                            {items.name === "OPD" ?
                            <TableCell align="right">Opd Price</TableCell>
                            :null
                          }
                            
                            
                          </TableRow>

                          </TableHead>

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="right">{items.product_name}</TableCell>
                            
                            {items.name === "OPD" ?
                            <>
                                <TableCell align="right">{items.opd_price}</TableCell>
                            <AddIcon sx={{marginTop:'15px',color:'white', backgroundColor:'blue', borderRadius:'50%'}} 
                            name='more_input_fields'  onClick={()=>handleServiceAdd(items)} /> 
                            </>
                        
                            :null
                          }
                            
                           
                          </TableRow>
                          <TableRow>
                         
                          </TableRow>
                          </TableBody>
                          </Table> 
                         </TableContainer>
                         
                         </>
                         
                          : null
                        }
                        </>
                      
                      )
 
                 
                    })
                    } */}
                  </Box> 


                  <Box>
                    <>
                    {visit1.supplier_name !==''? 
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Product Name</TableCell>
                            
                            
                            <TableCell align="right">Opd Price</TableCell>
                            
                          
                            
                            
                          </TableRow>

                          </TableHead>
                    {
                    inputAdd.map((items)=>{
                      return(
                        

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="right">{items.product_name}</TableCell>
                            
                            
                            
                                <TableCell align="right">{items.opd_price}</TableCell>
                            
                           
                        
                            
                          
                            
                           
                          </TableRow>
                         
                          </TableBody>
                         
                         
                        
                      
                      )
 
                 
                    })
                    }

                     </Table> 
                         </TableContainer>
                         :null }
                    </>
                  </Box> 

                  <Box>
                  {visit1.supplier_name !==''? 
                    <TableContainer>
                      <Table>
                        <TableHead>
                        <TableRow>
                          <TableCell align="right">total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                        <TableCell align="right">{price}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    : null }
                  </Box>


                  <Box>
                    <>
                    {visit1.supplier_name !==''? 
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Product Name</TableCell>
                            
                            
                            <TableCell align="right">Item MSRP</TableCell>
                            <TableCell align="right">Cost Price</TableCell>
                            <TableCell align="right">Selling Price</TableCell>
                            
                          
                            
                            
                          </TableRow>

                          </TableHead>
                    {
                    addPharmacy.map((items)=>{
                      return(
                        

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="right">{items.product_name}</TableCell>
                            
                            
                            
                                <TableCell align="right">{items.item_msrp}</TableCell>
                                <TableCell align="right">{items.cost_price}</TableCell>
                                <TableCell align="right">{items.selling_price}</TableCell>
                            
                           
                        
                            
                          
                            
                           
                          </TableRow>
                         
                          </TableBody>
                         
                         
                        
                      
                      )
 
                 
                    })
                    }

                     </Table> 
                         </TableContainer>
                         :null }
                    </>
                  </Box> 

                  


          

{/*          
           {visit.supplier_name !==''?
           <Box> 
            {CategoryData.map((items,id)=>{
              const labelsAre = () => {
                return (
                <Box> 
                  <Box sx={{display:'flex' ,justifyContent:'space-between!important' , width:'200px'}}>
                    <Box >
                      {items.product_name} 
                    </Box>
                    <Box > 
                       {items.opd_price !== '' ? <>₹{items.opd_price}</> : 'No price'} 
                    </Box>
                    </Box>
                </Box> 
                )
              }
             return(
              items.product_category === '3' ? 
               <Box className='abc' key={id} sx={{marginBottom:'2%',border:'1px solid #d1cdcd',padding:'4px'}}>
                 <FormControlLabel sx={{ width:'100% !important'}}
                  control= { 
                    <Checkbox  
                      value={items.id}
                      onClick={(e)=>checkedItem(e)}
                      />  
                    }
                    label={ labelsAre() }  
                 />  
               </Box>
               : null
              )
              
           })
        } 
        </Box>: null }
        {visit.supplier_name !==''?
           <Box>
        {PurchaseData.map((items,id)=>{
             return(
               items.purchase_price !== '' ?
               <Box key={id} sx={{marginBottom:'2%',border:'1px solid #dcdde0',padding:'4px'}}>
                 <FormControlLabel 
                 control= { 
                 <Checkbox  
                   value={items.id}
                   onClick={(e)=>checkedItem(e)}
                   />  
                   }
                 label={items.selling_price}
                 />  
               </Box>
               : 'No Records'
              )
              
           })
        } 
        </Box>: null } */}
      

            {/* {visit.supplier_name !==''?
            <Box>
             <Box sx={{display:'flex',marginBottom:'5%' }}>
             <Button sx={{marginRight:'2%',}}
             variant="contained"
             className={classes.buttonsgrp}
             onClick={clickOpd}
             >
             OPD
             </Button>
             <Button sx={{marginRight:'2%', }}
             variant="contained"
             className={classes.buttonsgrp}
             onClick={clicksPharmacy}
             
             >
             PHARMACY
             </Button>
             <Button sx={{marginRight:'2%', }}
             variant="contained"
             className={classes.buttonsgrp}
             >
             OPTICALS
             </Button>
         </Box>
         {CategoryData.map((items,id)=>{
             return(
              items.product_category === 'OPD' ? 
               <Box key={id} sx={{marginBottom:'2%',border:'1px solid #dcdde0',padding:'4px'}}>
                 <FormControlLabel 
                 control= { 
                 <Checkbox  
                   value={items.id}
                   onClick={(e)=>checkedItem(e)}
                   />  
                   }
                 label={items.product_name}
                 />  
               </Box>
               : null
              )
              
           })
        }

        {/* {PurchaseData.map((items,id)=>{
             return(
               items.purchase_price !== '' ?
               <Box key={id} sx={{marginBottom:'2%',border:'1px solid #dcdde0',padding:'4px'}}>
                 <FormControlLabel 
                 control= { 
                 <Checkbox  
                   value={items.id}
                   onClick={(e)=>checkedItem(e)}
                   />  
                   }
                 label={items.selling_price}
                 />  
               </Box>
               : 'No Records'
              )
              
           })
        } }
        </Box> 
            :
            null} */}
            {/* <Paper variant='outlined' className={classes.table}
               style={{  marginTop:'4%' }}>
                     <DataTableExtensions {...tableData} >
                        <Table
                          columns={columns}
                          data={data}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                        />
                      </DataTableExtensions>
                    </Paper> */}
  
           
          </Box>
        </Paper>
        <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         Products Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <TableContainer>
                      <Table>
                        <TableHead>
                        <TableRow>
                          <TableCell align="right">Product Name</TableCell>
                          <TableCell align="right">Item MSRP</TableCell>
                          <TableCell align="right">Cost Price</TableCell>
                          <TableCell align="right">Selling Price</TableCell>
                          </TableRow>
                        </TableHead>

                           {
                            FetchVisitData.map((items) => {
                              return(
                              
                              <TableBody>
                            <TableRow>
                            <TableCell align="right">{<FormControlLabel value={items.id} control={<Checkbox  />} 
                             label={items.product_name} onChange={() => SelectedCheckboxes(items)} />}</TableCell>
                            <TableCell align="right">{items.item_msrp}</TableCell>
                            <TableCell align="right">{items.cost_price}</TableCell>
                            <TableCell align="right">{items.selling_price}</TableCell>
                              </TableRow>
                              </TableBody>
                              )
                            })
  
                           }
                        
                      </Table>
                    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
      </div>
    </Layout>
  );
};

export default Visiting;
