import React, { useEffect, useState } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer  } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchData, FetchCattegoryData, FetchPurchases} from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { FetchPatient, FetchSinglePatient } from '../../redux/action/Actions';
// import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {FetchProductOpd, FetchProductPharmacy, } from "../../redux/action/Actions";

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
      padding: `${theme.spacing(4)} 0`,
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
  const CategoryData = useSelector((state) => state.CategoryReducerData.apiState);
  const PurchaseData       = useSelector((state) =>state.PurchaseReducer.fetchApi);
  const SingleData         = useSelector((state) =>state.PatientReducerData.stateApi);
  const FetchOpdData = useSelector((state) => state.ProductReducersData.OpdFetch);
  const FetchPharmacyData = useSelector((state) => state.ProductReducersData.PharmacyFetch);
  let newData = [SingleData.data];
  console.log("get",SingleData.data)

  console.log("real",FetchPharmacyData)
  
 

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
  // const [options1,setOptions1] = useState([])



  const ButtonsName = [{id:'1',name :'OPD',para:'OPD'},{id:'2',name:'Pharmacy',para:'Pharmacy'},
  {id:'3',name:'Opticals',para:'Opticals'}]
  

 
 

  const options = []
  const options1 = []
  PatientNameReducer.map((items)=>
  options.push({ value: items.id, label: items.name })
  )

  

  

  const [supplierList, setSupplierList]=useState([]);
  const [chkValue, setChkValue] = useState(false);


  const [visit, setVisit] = useState({
    id                : "",
    supplier_name     : "",
    buttonName        : "",
  });

  
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
          // Dispatch(FetchCattegoryData())
         if(options1==""){
          FetchOpdData.map((items)=>{ 
  options1.push({ value: items.product_id, label: items.product_name })
         }) 
         }
          
  // console.log("option",options1)
  // console.log("dataata",FetchOpdData)
      }else if(value === '2' ){
         console.log('second button')
         if(options1==""){
          FetchPharmacyData.map((items)=>
  options1.push({ value: items.product_id, label: items.product_name })
  ) 
         }
         console.log("option",options1)
  console.log("dataata",FetchPharmacyData)
        //  Dispatch(FetchPurchases())
      }else if(value === '3' ){
         console.log('third button')
        //Dispatch(FetchPurchases())
      }
      

 
  }



  const SubmitData = () => {
//     Dispatch(AddInvoiceData(visit))
//    .then(()=> Navigate('/allvisit'))
  };

  useEffect(()=>{
    let data = {"action" : "getAllPatient"};

    Dispatch(FetchPatient(data))
    // Dispatch(FetchCattegoryData())   
  },[Dispatch])

  useEffect(()=>{
    setTableData((state)=>{
      console.log("state",state)
      return{
        
        ...state,
        data,
        columns 
      }
    })
   },[data])


   useEffect(() => {
    let opd_fetch      = {"action" : "getProductOPD"}
    let pharmacy_data  = {"action" : "getProductPharmacy"}
    Dispatch(FetchProductPharmacy(pharmacy_data))
    Dispatch(FetchProductOpd(opd_fetch))
 }, [Dispatch])

  const columns = [
    // {
    //   name:'.S.No',
    //   selector:'.s.no',
    //   sortable: true,
    //   cell: (row,index) => index+1
    // }
     , {
       name: "Name",
       selector: rows => rows.name,
       sortable: true
     },
     {
       name: "Phone Number",
       selector: rows => rows.phone_number,
       sortable: true
     },
    //  {
    //    name: "Date Of Birth",
    //    selector: "date_of_birth",
    //    sortable: true
    //  },
    //  {
    //   name: "Age",
    //   selector: "age",
    //   sortable: true
    // },
    {
      name: "Address ",
      selector: rows => rows.address,
      sortable: true
    },
    {
      name: "City",
      selector: rows => rows.city,
      sortable: true
    },
    {
      name: "State",
      selector: rows => rows.state,
      sortable: true
    },
    {
      name: "Pincode",
      selector: rows => rows.pincode,
      sortable: true
    },
    {
      name: "Adhar Number",
      selector: rows => rows.adhar_number,
      sortable: true
    },
    // {
    //   name: "Action",
    //   sortable: false,
    //   selector: rows => rows.null,
    //     cell: (d,id) => [ 
    //       <Box key={id}>
    //           <EditIcon className={classes.edit} onClick={()=>edithandle(d.id)}  />
    //           <DeleteIcon className={classes.delete} onClick={() => handledelete(d.id)} />
    //       </Box>
    //   ],
    // },
   ];
  //  useEffect(()=>{
   
  //   let singleData = { "action" : "getPatientByID"}
  //   Dispatch(FetchSinglePatient(singleData))
  //  },[Dispatch])
   

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Add Visiting
            </Typography>
            <Box className="react_select_box" sx={{width:'90%', marginBottom: 2}}>
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
               <Select
                options={options1}
                // defaultValue={}
                // onChange={}
               
              />
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
        </Box>: null }
      

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

export default Visiting;
