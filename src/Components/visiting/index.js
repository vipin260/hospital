import React, { useEffect, useState, useRef } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer, Autocomplete  } from "@mui/material";
import '../../index.css';
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchData, FetchPurchases} from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ReactSelect, { createFilter } from 'react-select';
import { FetchPatient, FetchSinglePatient } from '../../redux/action/Actions';
// import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {FetchProductOpd, FetchProductPharmacy, FetchProductOptical, getAllInventory,getnamephoneaadhar,prescriptionDetail } from "../../redux/action/Actions";
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';





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
      // width: "73%",
      width: "100%",
    // marginLeft: "20%",
    boxShadow:"none",
      height: "auto",
      padding: `${theme.spacing(4)} 30px`,
      marginTop :'2%',
      [theme.breakpoints.down("lg")]: {
        width: "70%",
        padding: `${theme.spacing(2)} 0`,
      },
      //border:'1px solid yellow',
    },
    "& .css-tj5bde-Svg": {
      cursor: "default",
    },
    
  },
  radio_button : {
    display: 'flex !important',
    flexDirection: 'row !important',
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
      zIndex :'99',
      // visibility: 'hidden'
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
'& .css-6j8wv5-Input' : {
cursor : 'text',
},
'& .MuiFormControlLabel-label':{
  width: '100%'
},
  buttonsgrp : {
    width: '100%',
    maxWidth : '90%',
}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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
  const Searchdata = useSelector((state) => state.VisitReducer.fetchApis);
  const Prescriptiondata = useSelector((state) => state.VisitReducer.supplierApi);
  let newData = [SingleData.data];
 console.log("searchdata",Searchdata)
 console.log("searchdata222",SingleData)
 console.log("prescription3333",Prescriptiondata.data)
//  const inputElement = useRef();

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
  const [options,setOptions] = useState([])
  const [value, setValue] = useState("one");
  const [opdpharmecyoptical,setOpdpharmecyoptical] = useState([])
  // const [selectdatasave, setSelectdatasave] = useState([]);
  const [inputAdd, setInputAdd] = useState([]);
  const [inputAdddata, setInputAdddata] = useState([]);
  const [price, setPrice] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [pricetotal, setPricetotal] = useState(0);
  const [addPharmacy, setAddPharmacy] = useState([]);
  const [beforePharmacy, setBeforePharmacy] = useState([]);
  const [beforeOptical, setBeforeOptical] = useState([]);
  const [addOptical, setAddOptical] = useState([]);
  const [addPharmacydata, setAddPharmacydata] = useState([]);
  const [addOpticaldata, setAddOpticaldata] = useState([]);
  const [radiovalue, setRadiovalue] = useState('Search By Name');
  const [current, setCurrent] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const [newdatasingle, setNewdatasingle] = useState([]);
  const [maindata, setMaindata] = useState();
  const [active, setActive] = useState(false);
  
  // const [storepharmacyid, setStorepharmacyid] = useState([]);

 



  const ButtonsName = [{id:'1',name :'OPD',para:'OPD'},{id:'2',name:'Pharmacy',para:'Pharmacy'},
  {id:'3',name:'Opticals',para:'Opticals'}]
  

 
 console.log("pateint",PatientNameReducer)

 useEffect(()=>{
  if(Searchdata!=""){
    console.log("SearchdataOption",Searchdata)
    setOptions( Searchdata?.map((items)=>{ 
      return(
        console.log("items",items),
    { label: `${items.name} (${items.address})`,value: items.id, data1:items.phone_number+items.adhar_number  }
    )
     }))
    }
    
},[Searchdata]) 


  console.log("Newdatasingle",newdatasingle)
  // const options1 = []
  useEffect(()=>{
    
      setNewdatasingle(SingleData.data)
      
      
  },[SingleData]) 
  
console.log("optionsis",options)
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

  const handleServiceAdd = () => {
    let itemsdata = ""
    opdpharmecyoptical.map((items)=> {
      if(visit1.supplier_name === items.id){
        return(
          itemsdata=items
          )
        
      }
      
    }
     )
    
 
    console.log("itemskiyun",itemsdata)
    
    if(itemsdata.name==="OPD"){
    setInputAdd([...inputAdd,  
      {
        product_name       : itemsdata.product_name, 
        id         : itemsdata.id,  
        product_name       : itemsdata.product_name,
        product_category      : itemsdata.product_category, 
        opd_price           : itemsdata.opd_price 
      }])
      
      // if(inputAdd!==""){
      //   setPrice(price + parseFloat(items.opd_price))
        
      // }
      
    }
    else if(itemsdata.name==="pharmacy"){
      // setStorepharmacyid()
      let data = {"pharmacy_id" : itemsdata.id, "action" : "getAllInvertory"}
      Dispatch(getAllInventory(data))
      // .then(() => {
      //   console.log("checking data",FetchVisitData)
        
        
      // }
      //   )
    }
    else if(itemsdata.name==="optical"){
      // setStorepharmacyid()
      let data = {"pharmacy_id" : itemsdata.id, "action" : "getAllInvertory"}
      Dispatch(getAllInventory(data))
      // .then(() => {
      //   console.log("checking data",FetchVisitData)
        
        
      // }
      //   )
    }
    
  };
console.log("inputtttt",inputAdd)
  useEffect(()=>{
    setInputAdddata([...new Map(inputAdd.map(item => [item.id, item])).values()])
    
  },[inputAdd]) 

  useEffect(()=>{
    
    let pricevar2 = 0;
    inputAdddata.map((items) => {
      return(
      
      pricevar2 += parseFloat(items.opd_price)
      )
    })
    setPrice(pricevar2)
    
  },[inputAdddata]) 


  useEffect(()=>{
    if(visit1.buttonName =='pharmacy'){
    if(FetchVisitData.length>1&&visit1.buttonName =='pharmacy'){
      handleClickOpen()
    }
    else{
      FetchVisitData.map((items) => {
        return(
          setAddPharmacy([ ...addPharmacy,
          {
           id : items.id,
           product_name : items.product_name,
           selling_price : items.selling_price,
           cost_price : items.cost_price,
           item_msrp : items.item_msrp,
          } 
         ])
        )
      })
        
      
      }
    }

    else if(visit1.buttonName =='optical'){
      if(FetchVisitData.length>1&&visit1.buttonName =='optical'){
        handleClickOpen1()
      }
      else{
        FetchVisitData.map((items) => {
          return(
            setAddOptical([ ...addOptical,
            {
             id : items.id,
             product_name : items.product_name,
             selling_price : items.selling_price,
             cost_price : items.cost_price,
             item_msrp : items.item_msrp,
            } 
           ])
          )
        })
          
        
        }
      }
     
    
  },[FetchVisitData]) 


  useEffect(()=>{
    
    let pricevar = 0;
    addPharmacydata.map((items) => {
      return(
      
      pricevar += parseFloat(items.selling_price)
      )
    })
    setPrice1( pricevar)
    
  },[addPharmacydata]) 

  useEffect(()=>{
    
    let pricevar1 = 0;
    addOpticaldata.map((items) => {
      return(
      
      pricevar1 += parseFloat(items.selling_price)
      )
    })
    setPrice2(pricevar1)
    
  },[addOpticaldata]) 


  

  

  
  // console.log("data is ",FetchVisitData)
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

 

  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);
  
    const handleClickOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
    };

    const pharmacydata = (items) => {
    //   setAddPharmacydata( addPharmacy.filter((c) => {
    //     return (
    //       addPharmacy.map((y) => {
    //         return(
    //         (y.id).findIndex((c.id))!=2
    //         )
    //       })
    //     )
    // })
    //   )
    console.log(beforePharmacy);
    setAddPharmacy([...addPharmacy,...beforePharmacy]);
    
    setOpen(false);
    // let pricevar = 0;
   
   
    // addPharmacydata.map((items) => {
    //   return(
      
    //   pricevar += price1 + parseFloat(items.selling_price)
    //   )
    // })
    // setPrice1(pricevar)
    
    }
    const pharmacydata1 = (items) => {
      setAddOptical([...addOptical,...beforeOptical]);
      setOpen1(false);

      
      
      }
    

     
  const submitPntData = (e) => {
    let { name, value } = e.target;
    setVisit({ 
      ...visit,
      [name]: value 
      });
      
  };

  const handleChange = (selectedOption) => {
    console.log("selected",selectedOption)
    if(selectedOption!=null){
    setVisit((prev) => {
      return {
        ...prev,
        supplier_name: selectedOption.value,
      };
    });
    let singleData = {"id" : selectedOption.value, "action" : "getPatientByID"}
    Dispatch(FetchSinglePatient(singleData))
    
  }};

  const Onkey = (value) => {
    // let value = inputElement.current.value
    console.log("value is", value)
    if(value!=""){
    let data = {"name" : value, "action" : "SearchByName"}
      Dispatch(getnamephoneaadhar(data))
    }
   
  }

  const handleChange1 = (value) => {
    setValue(value);
    setCurrent(false)
    setVisit1((prev) => {
      return {
        ...prev,
        supplier_name: value.value,
        buttonName: value.data
      };
    });
    
    
  
    
    
   
  };
  
  
  
  

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

    



  const clickOpd =( itemsname,i)=>{ 
    let {name, value} = itemsname.target
     
      const ButtonFilter = ButtonsName.filter((items)=> { return value === items.id } )

    

      if(value  === '1' ){
        console.log("index",i)
        setActive(i) 
         
        
        
        // addPharmacydata.splice(0, addPharmacydata.length)
        // addOpticaldata.splice(0, addOpticaldata.length)
        
        setCurrent(false)
  setValue(null)
  options1.splice(0, options1.length)
  FetchOpdData.map((items)=>{ 
    return(
  options1.push({ value: items.id, label: items.product_name, data: items.name })
  )
         }) 
   
  setOpdpharmecyoptical(FetchOpdData)
  // setDefaultvalue({label:"net"})
  // console.log("option",options1)
  
      }else if(value === '2' ){
        console.log("index",i)
      setActive(i) 
        
         console.log('second button')
         setCurrent(false)
         setValue(null)
         options1.splice(0, options1.length)
         FetchPharmacyData.map((items)=>{
          return(
options1.push({ value: items.id, label: items.product_name, data: items.name })
          )
         }) 
          
         
         setOpdpharmecyoptical(FetchPharmacyData)

         
  //        if(options1!==""){
  //         options1.splice(0, options1.length)
  //         FetchPharmacyData.map((items)=>
  // options1.push({ value: items.product_id, label: items.product_name })
  // ) 
  
  //        }
        
  // setDefaultvalue({label:"get"})
  
        //  Dispatch(FetchPurchases())
      }else if(value === '3' ){
        console.log("index",i)
       setActive(i)
        setCurrent(false)
         setValue(null)
         options1.splice(0, options1.length)
          FetchOpticalData.map((items)=>{
          return(
  options1.push({ value: items.id, label: items.product_name, data: items.name })
          )
      })
         

         setOpdpharmecyoptical(FetchOpticalData)
        //Dispatch(FetchPurchases())
        
      }
      else if(value === '4' ){
         
        setValue(null)
        options1.splice(0, options1.length)
        setCurrent(true)

        
       //Dispatch(FetchPurchases())
       
     }
     else{
      setActive(false)
    }
      
 
  }
  
  console.log("active",active)
 const SelectedCheckboxes = (value) => {
  
  setBeforePharmacy([ ...beforePharmacy,
   {
    id : value.id,
    product_name : value.product_name,
    selling_price : value.selling_price,
    cost_price : value.cost_price,
    item_msrp : value.item_msrp,
   } 
  ])

}
  const SelectedCheckboxes1 = (value) => {
  
    setBeforeOptical([ ...beforeOptical,
     {
      id : value.id,
      product_name : value.product_name,
      selling_price : value.selling_price,
      cost_price : value.cost_price,
      item_msrp : value.item_msrp,
     } 
    ])
  
  // console.log("check",addPharmacy)
      
      // setPrice1(price1 + parseFloat(value.selling_price))
  
   
 }
 
 useEffect(()=>{
  setAddPharmacydata([...new Map(addPharmacy.map(item => [item.id, item])).values()])
  
},[addPharmacy]) 

useEffect(()=>{
  setAddOpticaldata([...new Map(addOptical.map(item => [item.id, item])).values()])
  
},[addOptical]) 




// console.log("addPharmacy222",addPharmacydata)
  
  const SubmitData = () => {
//     Dispatch(AddInvoiceData(visit))
//    .then(()=> Navigate('/allvisit'))
  };

  
  useEffect(()=>{
    let data = {"action" : "getAllPatient"};
    Dispatch(FetchPatient(data))
    // Dispatch(FetchCattegoryData())   
  },[Dispatch]) 

  
  
 
  // const filterOptions = (options, filterString, values) => {
  //   return options.filter(
  //     x => x.data1.includes(filterString) || x.label.includes(filterString)
  //   );
  // };


   useEffect(() => {
    let opd_fetch      = {"action" : "getProductOPD"}
    let pharmacy_data  = {"action" : "getProductPharmacy"}
    let optical_fetch  = {"action" : "getProductOptical"}
    Dispatch(FetchProductPharmacy(pharmacy_data))
    Dispatch(FetchProductOptical(optical_fetch))
    Dispatch(FetchProductOpd(opd_fetch))
 }, [Dispatch])

 const colourStyles = {
  control: styles => ({ ...styles, cursor: 'text' }),
  
};

const currentVisit = () => {
setCurrent(true)
}
const history = () => {
  setCurrent(false)
  }

// const handleChange3 = (event) => {
//   setRadiovalue(event.target.value);
// };

// useEffect(() => {
//   let data = {"name" : 'sh', "action" : "SearchByName"}
//       Dispatch(getnamephoneaadhar(data))
// }, [radiovalue])

// console.log("radio value",radiovalue)
  //  useEffect(()=>{
   
  //   let singleData = { "action" : "getPatientByID"}
  //   Dispatch(FetchSinglePatient(singleData))
  //  },[Dispatch])
  
  const tabchange = (event, newValue) => {
    if(newValue==0){
    setTabvalue(newValue);
    console.log('change',newValue)
    }
    else if(newValue==1){
      setTabvalue(newValue);
      let data = {"id" : visit.supplier_name, "action" : "PrescreptionDetail"}
      Dispatch(prescriptionDetail(data))
      console.log("inside",visit.supplier_name)
    }
  };
  console.log("checkingdataaaa",opdpharmecyoptical)

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
              Submit
            </Button>
            </Box>
           
            <Box className="react_select_box" sx={{width:'100%', marginBottom: 2}}>
            {/* <FormControl >
            <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup 
              className={classes.radio_button}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={radiovalue}
              onChange={handleChange3}
            >
              <FormControlLabel value="Search By Name" control={<Radio />} label="Search By Name" />
              <FormControlLabel value="Search By Number" control={<Radio />} label="Search By Number" />
              <FormControlLabel value="Search By Aadhar Number" control={<Radio />} label="Search By Aadhar Number" />
            </RadioGroup>
          </FormControl> */}
              <Select
                options={options}
                styles={colourStyles}
                isClearable={true}
                openMenuOnClick={false}
                openMenuOnFocus={false}
                defaultMenuIsOpen={false}
                selectMenuOpen={false}
                isOptions={true}
                isSearchable={true}
                placeholder={'Type to search'}
                getOptionValue ={(options)=>options.data1}
                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                defaultValue={visit.supplier_name}
                onChange={handleChange}
                onInputChange={Onkey}
               
              />
              {/* <input
            type="text"
            id="header-search"
            ref={inputElement}
            placeholder="Search blog posts"
            onKeyUp={() => Onkey()} 
        />
              <ul>
                {Searchdata.map((items) => {
                  return(
                    <>
                    <li>{items.name}</li>
                    </>
                  )
                })}
                
              </ul> */}
            </ Box>
            <Box>
            {/* <Autocomplete
        style={{ width: 1000 }}
        freeSolo
        autoComplete
        autoHighlight
        openOnFocus={false}
        onChange={handleChange}
        options={options}
        renderInput={(params) => (
          <TextField {...params}
          openOnFocus={false}
            variant="outlined"
            label="Search Box"
          />
        )}
      /> */}
            </Box>
            {/* <input className="form-control" type="checkbox" checked={chkValue}/>
            <FormControlLabel 
                    control= { 
                    <Checkbox  
                      checked={chkValue}
                      />  
                      }
                    /> */}

                    <Box>{
                      
                            visit.supplier_name !=="" ?
                            <>
                            <Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem',marginTop:'22px' }}>
              Selected Patient
            </Typography>
                          <TableContainer key={SingleData.data?.id} >
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Phone Number</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">State</TableCell>
                            <TableCell align="left">Pincode</TableCell>
                            <TableCell align="left">Aadhar Number</TableCell>
                          </TableRow>

                          </TableHead>

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="left">{SingleData.data?.name}</TableCell>
                            <TableCell align="left">{SingleData.data?.phone_number}</TableCell>
                            <TableCell align="left">{SingleData.data?.address}</TableCell>
                            <TableCell align="left">{SingleData.data?.city}</TableCell>
                            <TableCell align="left">{SingleData.data?.state}</TableCell>
                            <TableCell align="left">{SingleData.data?.pincode}</TableCell>
                            <TableCell align="left">{SingleData.data?.adhar_number}</TableCell>
                          </TableRow>
                          </TableBody>
                          </Table> 
                         </TableContainer>
                         </>
                       :null
                       
                    }
                    </Box>
                  {/* <Box>
                    {
                    PatientNameReducer.map((items,index)=>{
                      return(
                        <>
                          {
                          visit.supplier_name === items.id ?
                          <>
                          <TableContainer key={index} >
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
                  </Box>  */}
                  <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabvalue} onChange={tabchange} aria-label="basic tabs example">
          <Tab label="Current" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={tabvalue} index={0}>
      <Grid container>
  <Grid item xs={6}>
    
    {(tabvalue=='0')? <Box sx={{width:'100%',boxSizing:'border-box'}}>
    <Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem',marginBottom:'10px' }}>
    Prescription
            </Typography>
    <TextareaAutosize
  aria-label="empty textarea"
  placeholder="Prescription"
  style={{ width: '100%', height: '150px',fontSize: '16px',
  border: '1px solid rgba(224, 224, 224, 1)',
  padding: '10px 10px',outline:'none',boxSizing:'border-box' }}
/>
<Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%',marginTop:'15px'}}>
<Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem'}}>
    File :
            </Typography>
<label htmlFor="upload-photo" style={{marginLeft:'10px',marginRight:'20px'}}>
  <input
    style={{ display: 'none' }}
    id="upload-photo"
    name="upload-photo"
    type="file"
  />

  <Fab
    sx={{color:'#fff',backgroundColor:'rgb(105 105 105)',"&.MuiButtonBase-root:hover": {
      backgroundColor: "rgb(73 73 73)"
    }}}
    size="small"
    component="span"
    aria-label="add"
    variant="extended"
  >
    <AddIcon /> Upload Prescription
  </Fab>
</label>

</Box>
    </Box>:null}
    
  </Grid>
  <Grid item xs={6}>
  {visit.supplier_name !==''? 
               <>         
            <Box  sx={{marginBottom:'2%',padding:'4px',display:'flex', width: "100%", justifyContent: "space-around"}}>
               
              {ButtonsName.map((itemsname,i)=>{
                return(
                  <Box key={i} sx={{marginBottom:'2%',padding:'4px',display:'flex'}}>
                   
                    <Button sx={{ marginRight:'2%',background: '#e9e9e9',boxShadow: 'none',border: '1px solid #000',color: '#000!important',width:'100%'}}
                        variant="contained"
                        className={active === i ? "con" : null }
                        value={itemsname.id} 
                        name ={itemsname.name}
                        onClick={(items)=>clickOpd(items,i)}
                        >
                        {itemsname.name} 
                      </Button>
                     
                  </Box>
                  ) 
              })
             }
             
              
            </Box>
            <Box sx={{display:'flex',paddingLeft:'20px'}}>
            <div style={{width:'50%'}}>
              <Select
                 options={options1}
                 value={value}
               //  defaultValue={defaultvalue}
                 onChange={handleChange1}
                
               />
               </div>
               <AddIcon  sx={{marginTop:'7px',marginLeft:'15px',color:'white', backgroundColor:'blue', borderRadius:'50%'}} 
                             name='more_input_fields'  onClick={()=>handleServiceAdd()} />
             </Box>
</>
           :  null
           
          }
          

<Box sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          maxHeight: 150,
          overflow: "hidden",
          overflowY: "scroll",
          width: "100%",
          marginTop: "30px"
         
        }}>
                    <>
                    {inputAdddata !='' || addOpticaldata !='' || addPharmacydata !=''? 
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow sx={{display : 'flex'}}>                    
                            <TableCell sx={{flexBasis : '50%'}}  align="left">Product Name</TableCell>
                            
                            
                            <TableCell sx={{flexBasis : '50%'}} align="left">Price</TableCell>
                            
                          
                            
                            
                          </TableRow>

                          </TableHead>
                          <TableBody >
                    {
                    inputAdddata.map((items,index)=>{
                      return(
                          <TableRow key={index} sx={{display : 'flex'}}>                    
                            <TableCell align="left" sx={{flexBasis : '50%'}}>{items.product_name}</TableCell>
                                <TableCell align="left" sx={{flexBasis : '50%'}}>{items.opd_price}</TableCell>
                          </TableRow> 
                      )
                    })
                    }

                   {
                    addPharmacydata.map((items,index)=>{
                      return(
                          <TableRow key={index} sx={{display : 'flex'}}>                    
                            <TableCell align="left" sx={{flexBasis : '50%'}}>{items.product_name}</TableCell>
                                <TableCell align="left" sx={{flexBasis : '50%'}}>{items.selling_price}</TableCell>
                          </TableRow> 
                      )
                    })
                    }
                     {
                    addOpticaldata.map((items,index)=>{
                      return(
                          <TableRow key={index} sx={{display : 'flex'}}>                    
                            <TableCell align="left" sx={{flexBasis : '50%'}}>{items.product_name}</TableCell>
                                <TableCell align="left" sx={{flexBasis : '50%'}}>{items.selling_price}</TableCell>
                          </TableRow> 
                      )
                    })
                    }
                    </TableBody>

                     </Table> 
                         </TableContainer>
                         :null }
                    </>
                  </Box> 
                  <Box sx={{textAlign:"right", width: "100%", borderBottom: "none"}}>
                  {inputAdddata !='' || addOpticaldata !='' || addPharmacydata !=''? 
                   <TableContainer sx={{borderBottom: "none"}}>
                   <Table sx={{borderBottom: "none"}}>
                     <TableHead sx={{borderBottom: "none"}}>
                     <TableRow sx={{borderBottom: "none"}}>
                       <TableCell sx={{borderBottom: "none",paddingBottom:"0px"}} align="right">Total</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody sx={{borderBottom: "none"}}>
                     <TableRow sx={{borderBottom: "none"}}>
                     <TableCell sx={{borderBottom: "none"}} align="right">{price+price1+price2}</TableCell>
                       </TableRow>
                     </TableBody>
                   </Table>
                 </TableContainer>
                    : null }
                  </Box>
  </Grid>
</Grid>
     
      </TabPanel>
      <TabPanel value={tabvalue} index={1}>
      <Box>
                   { visit.supplier_name!="" ?
                          <TableContainer  >
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell sx={{width:'100px'}} align="left">Visit Date</TableCell>
                          
                          
                          <TableCell sx={{width:'600px'}} align="left">Prescription</TableCell>
                          
                                            
                            <TableCell align="left">Medical</TableCell>
                          
                                            
                            <TableCell align="left">File</TableCell>
                          </TableRow>
                            
                          </TableHead>

                          <TableBody >
                          <TableRow>                    
                            <TableCell align="left">{Prescriptiondata.data?.visit_date}</TableCell>
                          
                                              
                            <TableCell align="left">{`${Prescriptiondata.data?.PrescreptionDetail.substring(0,100)}...`}<button
                            
                            
                            >Read More</button></TableCell>
                          </TableRow>
                          </TableBody>
                          </Table> 
                         </TableContainer>
                    :null
                   }
                  </Box> 
      </TabPanel>
      
    </Box>
   
                  {/* <Box sx={{display:"flex",justifyContent:"flex-start",width:"100%",marginTop:"20px"}}>
                  <Button variant="contained" sx={{marginRight:"20px"}} onClick={currentVisit}>Current Visit</Button>
                  <Button variant="contained" onClick={history}>History</Button>
                  </Box> */}
          
          
          
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


                  

                 

{/* 
                  <Box sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          maxHeight: 150,
          overflow: "hidden",
          overflowY: "scroll",
          width: "100%"
         
        }}>
                    <>
                    {addPharmacydata !=''? 
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Product Name</TableCell> */}
                            
                            
                            {/* <TableCell align="right">Item MSRP</TableCell>
                            <TableCell align="right">Cost Price</TableCell> */}
                            {/* <TableCell align="right">Price</TableCell> */}
                            
                          
                            
                            
                          {/* </TableRow>

                          </TableHead>
                    {
                    addPharmacydata.map((items,index)=>{
                      return(
                        

                          <TableBody key={index}>
                          <TableRow>                    
                            <TableCell align="right">{items.product_name}</TableCell> */}
                            
                            
                            
                                {/* <TableCell align="right">{items.item_msrp}</TableCell>
                                <TableCell align="right">{items.cost_price}</TableCell> */}
                                {/* <TableCell align="right">{items.selling_price}</TableCell>
                            
                           
                        
                            
                          
                            
                           
                          </TableRow>
                         
                          </TableBody>
                         
                         
                        
                      
                      )
 
                 
                    })
                    }

                     </Table> 
                         </TableContainer>
                         :null }
                    </>
                  </Box>  */}

                  {/* <Box sx={{textAlign:"right", width: "100%", borderBottom: "none"}}>
                 
                 {visit1.supplier_name !=''? 
                     <TableContainer sx={{borderBottom: "none"}}>
                       <Table sx={{borderBottom: "none"}}>
                         <TableHead sx={{borderBottom: "none"}}>
                         <TableRow sx={{borderBottom: "none"}}>
                           <TableCell sx={{borderBottom: "none",paddingBottom:"0px"}} align="right">Total</TableCell>
                           </TableRow>
                         </TableHead>
                         <TableBody sx={{borderBottom: "none"}}>
                         <TableRow sx={{borderBottom: "none"}}>
                         <TableCell sx={{borderBottom: "none"}} align="right">{price1}</TableCell>
                           </TableRow>
                         </TableBody>
                       </Table>
                     </TableContainer>
                     : null }
                  </Box> */}




                  {/* <Box sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          maxHeight: 150,
          overflow: "hidden",
          overflowY: "scroll",
          width: "100%"
         
        }}>
                    <>
                    {addOpticaldata !=''? 
                  <TableContainer>
                    <Table sx={{marginBottom:2, width:'100%'}}> 
                          <TableHead>
                          
                          <TableRow>                    
                            <TableCell align="right">Product Name</TableCell> */}
                            
                            
                            {/* <TableCell align="right">Item MSRP</TableCell>
                            <TableCell align="right">Cost Price</TableCell> */}
                            {/* <TableCell align="right">Price</TableCell>
                            
                          
                            
                            
                          </TableRow>

                          </TableHead>
                    {
                    addOpticaldata.map((items,index)=>{
                      return(
                        

                          <TableBody key={index}>
                          <TableRow>                    
                            <TableCell align="right">{items.product_name}</TableCell> */}
                            
                            
                            
                                {/* <TableCell align="right">{items.item_msrp}</TableCell>
                                <TableCell align="right">{items.cost_price}</TableCell> */}
                                {/* <TableCell align="right">{items.selling_price}</TableCell>
                            
                           
                        
                            
                          
                            
                           
                          </TableRow>
                         
                          </TableBody>
                         
                         
                        
                      
                      )
 
                 
                    })
                    }

                     </Table> 
                         </TableContainer>
                         :null }
                    </>
                  </Box>  */}

                 
{/* 
                  <Box sx={{textAlign:"right", width: "100%", borderBottom: "none"}}>
                 
                 {visit1.supplier_name !=''? 
                     <TableContainer sx={{borderBottom: "none"}}>
                       <Table sx={{borderBottom: "none"}}>
                         <TableHead sx={{borderBottom: "none"}}>
                         <TableRow sx={{borderBottom: "none"}}>
                           <TableCell sx={{borderBottom: "none",paddingBottom:"0px"}} align="right">Total</TableCell>
                           </TableRow>
                         </TableHead>
                         <TableBody sx={{borderBottom: "none"}}>
                         <TableRow sx={{borderBottom: "none"}}>
                         <TableCell sx={{borderBottom: "none"}} align="right">{price2}</TableCell>
                           </TableRow>
                         </TableBody>
                       </Table>
                     </TableContainer>
                     : null }
                  </Box> */}
                  


          

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
                            FetchVisitData.map((items,index) => {
                              return(
                              
                              <TableBody key={index}>
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
          <Button autoFocus onClick={pharmacydata}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>


      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
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
                          <TableCell align="right">Selling Prices</TableCell>
                          </TableRow>
                        </TableHead>

                           {
                            FetchVisitData.map((items,index) => {
                              return(
                              
                              <TableBody key={index}>
                            <TableRow>
                            <TableCell align="right">{<FormControlLabel value={items.id} control={<Checkbox  />} 
                             label={items.product_name} onChange={() => SelectedCheckboxes1(items)} />}</TableCell>
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
          <Button autoFocus onClick={pharmacydata1}>
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
