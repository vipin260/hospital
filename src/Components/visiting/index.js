import React, { useEffect, useState, useRef } from "react";
import {
  FormControlLabel, Paper, Box, Button, Typography, TextField, Checkbox, FormLabel, Table, TableBody,
  TableRow, TableCell, TableHead, TableContainer, Autocomplete
} from "@mui/material";
import '../../index.css';
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";

import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { FetchPatient, FetchSinglePatient,medicalDetail,quantitydata,AddInvoiceData,downloadFile } from '../../redux/action/Actions';

import { FetchProductOpd, FetchProductPharmacy, FetchProductOptical, getAllInventory, getnamephoneaadhar, prescriptionDetail } from "../../redux/action/Actions";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { linkUrl } from '../../Components/baseurl';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';
import UploadVisitingFile from "./UploadVisitingFile";
import Selected_patient from "./Selected_patient";
import GetAppIcon from '@mui/icons-material/GetApp';






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
      boxShadow: "none",
      height: "auto",
      padding: `${theme.spacing(4)} 30px`,
      marginTop: '2%',
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
  radio_button: {
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
    '& #react-select-3-listbox': {
      backgroundColor: 'white !important',
      zIndex: '99',
      // visibility: 'hidden'
    },
    '& #react-select-5-listbox': {
      backgroundColor: 'white !important',
      zIndex: '99'
    },
    //#react-select-3-listbox
    //.css-2613qy-menu
  },
  '& .css-2kitwc-MuiFormControlLabel-root.MuiFormControlLabel-label': {
    justifyContent: 'space-between',
    width: '100% !important'
  },
  '& .css-6j8wv5-Input': {
    cursor: 'text',
  },
  '& .MuiFormControlLabel-label': {
    width: '100%'
  },
  buttonsgrp: {
    width: '100%',
    maxWidth: '90%',
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
  const Dispatch = useDispatch();

  const PatientNameReducer = useSelector((state) => state.PatientReducerData.apiState)
  const SingleData = useSelector((state) => state.PatientReducerData.stateApi);
  const FetchOpdData = useSelector((state) => state.ProductReducersData.OpdFetch);
  const FetchPharmacyData = useSelector((state) => state.ProductReducersData.PharmacyFetch);
  const FetchOpticalData = useSelector((state) => state.ProductReducersData.OpticalFetch);
  const FetchVisitData = useSelector((state) => state.VisitReducer.fetchApi);
  const Searchdata = useSelector((state) => state.VisitReducer.fetchApis);
  const Prescriptiondata = useSelector((state) => state.VisitReducer.supplierApi);
  const medicalData = useSelector((state) => state.VisitReducer.medical);
  const quantityData = useSelector((state) => state.VisitReducer.quantityproduct);
  const downloadfilelist = useSelector((state) => state.VisitReducer.downloaddata);

console.log("quantitydatata",downloadfilelist)


  const [data, setData] = useState([])

  const [options1, setOptions1] = useState([])
  const [options, setOptions] = useState([])
  const [value, setValue] = useState("one");
  const [opdpharmecyoptical, setOpdpharmecyoptical] = useState([])
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

  const [current, setCurrent] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);

  const [active, setActive] = useState(false);
  const [readMore,setReadMore] = useState(false)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [quantity, setQuantity] = useState();
  const [VisitingID, setVisitingID] = useState();
  const [combineData, setCombineData] = useState([]);
  const [maincombine, setMaincombine] = useState([]);
  const [prescriptionsavedata, setPrescriptionsavedata] = useState();
  const [totalprice, setTotalprice] = useState(0);
  const [allfile, setAllfile] = useState([]);


  const prescriptionsave = useRef();




  const ButtonsName = [{ id: '1', name: 'OPD', para: 'OPD' }, { id: '2', name: 'Pharmacy', para: 'Pharmacy' },
  { id: '3', name: 'Opticals', para: 'Opticals' }]



  const saveFile = (e) => {
    setFile(e.target.files);
    setFileName(e.target.files[0].name);
  };
  console.log("slectedfiless",file)
  const uploadFile = async (e) => {
    const data = new FormData();
    data.append("VisitingID", VisitingID);
    for (let i = 0; i < file.length; i++) {
      data.append("file[]", file[i]);
    }
    
    try {
      const res = await axios.post( linkUrl+'visit_file_upload.php', data );
      console.log('res', res)
  
    } catch (ex) {
      console.log(ex);
    }
    setOpen2(false);
  };

  useEffect(() => {
    if (Searchdata != "") {
      console.log("SearchdataOption", Searchdata)
      setOptions(Searchdata?.map((items) => {
        return (
  
          { label: `${items.name} (${items.address})`, value: items.id, data1: items.phone_number + items.adhar_number }
        )
      }))
    }

  }, [Searchdata])




  const [visit, setVisit] = useState({
    id: "",
    supplier_name: "",
    buttonName: "",
  });

  const [visit1, setVisit1] = useState({
    id: "",
    supplier_name: "",
    buttonName: "",
  });

  const handleServiceAdd = () => {
    let itemsdata = ""
    opdpharmecyoptical.map((items) => {
      if (visit1.supplier_name === items.id) {
        return (
          itemsdata = items
        )

      }}
    )

    if (itemsdata.name === "OPD") {
      setInputAdd([...inputAdd,
      {
        product_name: itemsdata.product_name,
        id: itemsdata.id,
        product_name: itemsdata.product_name,
        product_category: itemsdata.product_category,
        opd_price: itemsdata.opd_price,
        quantity: quantity,
        priceTotal : itemsdata.opd_price
      }])
    }
    else if (itemsdata.name === "pharmacy") {

      let data = { "pharmacy_id": itemsdata.id, "action": "getAllInvertory" }
      Dispatch(getAllInventory(data))
    }
    else if (itemsdata.name === "optical") {
   
      let data = { "pharmacy_id": itemsdata.id, "action": "getAllInvertory" }
      Dispatch(getAllInventory(data))
    
    }

  };
  
  

  useEffect(() => {
    if (visit1.buttonName == 'pharmacy') {
      if (FetchVisitData.length > 1 && visit1.buttonName == 'pharmacy') {
        handleClickOpen()
      }
      else {
        FetchVisitData.map((items) => {
          return (
            setAddPharmacy([...addPharmacy,
            {
              id: items.id,
              product_name: items.product_name,
              selling_price: items.selling_price,
              cost_price: items.cost_price,
              item_msrp: items.item_msrp,
              quantity : quantity,
              priceTotal : parseFloat(items.selling_price)*parseFloat(quantity)
            }
            ])
          )
        })


      }
    }

    else if (visit1.buttonName == 'optical') {
      if (FetchVisitData.length > 1 && visit1.buttonName == 'optical') {
        handleClickOpen1()
      }
      else {
        FetchVisitData.map((items) => {
          return (
            setAddOptical([...addOptical,
            {
              id: items.id,
              product_name: items.product_name,
              selling_price: items.selling_price,
              cost_price: items.cost_price,
              item_msrp: items.item_msrp,
              quantity : quantity,
              priceTotal : parseFloat(items.selling_price)*parseFloat(quantity)
            }
            ])
          )
        })
      }
    }
  }, [FetchVisitData])

  
  








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

  const [open, setOpen] = useState(false);

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

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };


  const pharmacydata = (items) => {
    setAddPharmacy([...addPharmacy, ...beforePharmacy]);
    setOpen(false);
  }
  const pharmacydata1 = (items) => {
    setAddOptical([...addOptical, ...beforeOptical]);
    setOpen1(false);
  }
const handleChange = (selectedOption) => {
    console.log("selected", selectedOption)
    if (selectedOption != null) {
      setVisit((prev) => {
        return {
          ...prev,
          supplier_name: selectedOption.value,
        };
      });
   
 
      let singleData = { "id": selectedOption.value, "action": "getPatientByID" }
      Dispatch(FetchSinglePatient(singleData))
      let data = { "id": selectedOption.value, "action": "PrescreptionDetail" }
      Dispatch(prescriptionDetail(data))
      let medicalData = { "id": selectedOption.value, "action": "MedicalData" }
      Dispatch(medicalDetail(medicalData))
      let downloaddata = { "id": selectedOption.value, "action": "FileData" }
      Dispatch(downloadFile(downloaddata))
    }
  };

  const Onkey = (value) => {
    if (value != "") {
      let data = { "name": value, "action": "SearchByName" }
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
  const clickOpd = (itemsname, i) => {
    let { name, value } = itemsname.target
    if (value === '1') {
      setActive(i)
      setCurrent(false)
      setValue(null)
      options1.splice(0, options1.length)
      FetchOpdData.map((items) => {
        return (
          options1.push({ value: items.id, label: items.product_name, data: items.name })
        )
      })
      setOpdpharmecyoptical(FetchOpdData)
    } else if (value === '2') {
      setActive(i)
      setCurrent(false)
      setValue(null)
      options1.splice(0, options1.length)
      FetchPharmacyData.map((items) => {
        return (
          options1.push({ value: items.id, label: items.product_name, data: items.name })
        )
      })
      setOpdpharmecyoptical(FetchPharmacyData)
    } else if (value === '3') {
      console.log("index", i)
      setActive(i)
      setCurrent(false)
      setValue(null)
      options1.splice(0, options1.length)
      FetchOpticalData.map((items) => {
        return (
          options1.push({ value: items.id, label: items.product_name, data: items.name })
        )
      })
      setOpdpharmecyoptical(FetchOpticalData)
    }
    else if (value === '4') {
      setValue(null)
      options1.splice(0, options1.length)
      setCurrent(true)
    }
    else {
      setActive(false)
    }
  }

  console.log("active", active)
  const SelectedCheckboxes = (value) => {

    setBeforePharmacy([...beforePharmacy,
    {
      id: value.id,
      product_name: value.product_name,
      selling_price: value.selling_price,
      cost_price: value.cost_price,
      item_msrp: value.item_msrp,
      quantity : quantity,
      priceTotal : parseFloat(value.selling_price)*parseFloat(quantity)
    }
    ])

  }
  const SelectedCheckboxes1 = (value) => {

    setBeforeOptical([...beforeOptical,
    {
      id: value.id,
      product_name: value.product_name,
      selling_price: value.selling_price,
      cost_price: value.cost_price,
      item_msrp: value.item_msrp,
      quantity : quantity,
      priceTotal : parseFloat(value.selling_price)*parseFloat(quantity)
    }
    ])

    


  }

 

  useEffect(() => {
  }, [visit1])

  useEffect(() => {
    setData(PatientNameReducer)
  }, [PatientNameReducer])

  useEffect(() => {
    setCombineData([...inputAdd,...addPharmacy,...addOptical
      ])
      let pricevar2 = 0;
    inputAdd.map((items) => {
      return (

        pricevar2 += parseFloat(items.priceTotal)
      )
    })
    setPrice(pricevar2)

    let pricevar = 0;
    addPharmacy.map((items) => {
      return (

        pricevar +=  parseFloat(items.priceTotal)
      )
    })
    setPrice1(pricevar)

    let pricevar1 = 0;
    addOptical.map((items) => {
      return (
        pricevar1 += parseFloat(items.priceTotal)
      )
    })
    setPrice2(pricevar1)
  }, [inputAdd,addPharmacy,addOptical])



 

  useEffect(() => {
    setTotalprice(price+price1+price2)

  }, [price,price1,price2])
 

  




useEffect(() => {
  const unique = new Date().valueOf();
  setVisitingID(unique)
},[])


  // console.log("addPharmacy222",addPharmacydata)

  const SubmitData = () => {
    let data = { "VisitingID":VisitingID,"patient": SingleData?.data,"products": combineData,"totalprice":totalprice,"prescription": prescriptionsavedata,"action": "AddNewVisit" };
   
        Dispatch(AddInvoiceData(data))
      
      //  .then(()=> Navigate('/allvisit'))
  };


  useEffect(() => {
    let data = { "action": "getAllPatient" };
    Dispatch(FetchPatient(data))
    // Dispatch(FetchCattegoryData())   
  }, [Dispatch])

  useEffect(() => {
    if(visit1.supplier_name!==""){
      let data = { "id": visit1.supplier_name,"action": "AllQuantity" };
    Dispatch(quantitydata(data))
    }   
  }, [visit1])



  useEffect(()=>{

  },[Dispatch])

  useEffect(() => {
    let opd_fetch = { "action": "getProductOPD" }
    let pharmacy_data = { "action": "getProductPharmacy" }
    let optical_fetch = { "action": "getProductOptical" }
    Dispatch(FetchProductPharmacy(pharmacy_data))
    Dispatch(FetchProductOptical(optical_fetch))
    Dispatch(FetchProductOpd(opd_fetch))
    
  }, [Dispatch])

  const colourStyles = {
    control: styles => ({ ...styles, cursor: 'text' }),

  };

  const quantityFunction = (quantityvalue) => {
   
    if ((parseInt((quantityData?.data?.item_qty))>=parseInt((quantityvalue)))){
      setQuantity(quantityvalue)
    }
    else if(quantityvalue==''){
      setQuantity(null)
    }
    else{
      alert("Out of Stock");
      
      setQuantity(null)
      
    }
    
  }

  const tabchange = (event, newValue) => {
    if (newValue == 0) {
      setTabvalue(newValue);
      
    }
    else if (newValue == 1) {
      setTabvalue(newValue);
      // let data = { "id": visit.supplier_name, "action": "PrescreptionDetail" }
      // Dispatch(prescriptionDetail(data))
      // console.log("inside", visit.supplier_name)
    }
  }

  const Attachment = () => {

  }

const prescriptionfunction = (event) => {
  setPrescriptionsavedata(event.target.value)
}

  const handleReadMore = () =>{
    setReadMore(true)
  }

const ProductName = `Product Name: ${medicalData[0]?.product_name},Quantity: ${medicalData[0]?.Quantity}`

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Box className={classes.inputs} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
              <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
                Add Visiting
              </Typography>
              <Box sx={{width:'auto'}}>
              <Button
              onClick={handleClickOpen2}
                sx={{marginRight:'20px'}}
                variant="contained"
                className={classes.stundentBtn}
              >
                Attachment
              </Button>
              <Button
                onClick={SubmitData}
                variant="contained"
                className={classes.stundentBtn}
              >
                Submit
              </Button>
              </Box>
            </Box>
            <Box className="react_select_box" sx={{ width: '100%', marginBottom: 2 }}>
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
                getOptionValue={(options) => options.data1}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                defaultValue={visit.supplier_name}
                onChange={handleChange}
                onInputChange={Onkey}
              />
            </ Box>
            <Box>
            </Box>


<Selected_patient visit={visit} SingleData={SingleData}/>



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
                    {(tabvalue == '0') ? <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                      <Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                        Prescription
                      </Typography>
                      <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Prescription"
                        ref = {prescriptionsave}
                        onInput = {(event) => prescriptionfunction(event)}
                        style={{
                          width: '100%', height: '150px', fontSize: '16px',
                          border: '1px solid rgba(224, 224, 224, 1)',
                          padding: '10px 10px', outline: 'none', boxSizing: 'border-box'
                        }}
                      />
                   
                    </Box> : null}
                  </Grid>
                  <Grid item xs={6}>
                    {visit.supplier_name !== '' ?
                      <>
                        <Box sx={{ marginBottom: '2%', padding: '4px', display: 'flex', width: "100%", justifyContent: "space-around" }}>
                          {ButtonsName.map((itemsname, i) => {
                            return (
                              <Box key={i} sx={{ marginBottom: '2%', padding: '4px', display: 'flex' }}>
                                <Button sx={{ marginRight: '2%', background: '#e9e9e9', boxShadow: 'none', border: '1px solid #000', color: '#000!important', width: '100%' }}
                                  variant="contained"
                                  className={active === i && "con"}
                                  value={itemsname.id}
                                  name={itemsname.name}
                                  onClick={(items) => clickOpd(items, i)}
                                >
                                  {itemsname.name}
                                </Button>

                              </Box>
                            )
                          })
                          }
                        </Box>
                        <Box sx={{ display: 'flex', paddingLeft: '20px' }}>
                          <div style={{ width: '50%' }}>
                            <Select
                              options={options1}
                              value={value}
                              //  defaultValue={defaultvalue}
                              onChange={handleChange1}

                            />
                          </div>
                          {visit1.buttonName==='OPD'? null :<div style={{ width: '36%' }}>
                           <input style={{ height:'80%',marginLeft:'10px',fontSize:'14px'}} type="text"  name="quantity" onKeyUp = {(event) => quantityFunction(event.target.value)} placeholder="Quantity"/>
                          </div>}
                          <AddIcon sx={{ marginTop: '7px', marginLeft: '15px', color: 'white', backgroundColor: 'blue', borderRadius: '50%' }}
                            name='more_input_fields' onClick={() => handleServiceAdd()} />
                        </Box>
                      </>
                      : null

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
                        {inputAdd != '' || addOptical != '' || addPharmacy != '' ?
                          <TableContainer>
                            <Table sx={{ marginBottom: 2, width: '100%' }}>
                              <TableHead>
                                <TableRow sx={{ display: 'flex' }}>
                                  <TableCell sx={{ flexBasis: '50%' }} align="left">Product Name</TableCell>
                                  <TableCell sx={{ flexBasis: '50%' }} align="left">Price</TableCell>
                                  <TableCell sx={{ flexBasis: '50%' }} align="left">quantity</TableCell>
                                  <TableCell sx={{ flexBasis: '50%' }} align="left">total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody >
                                {
                                  inputAdd.map((items, index) => {
                                    return (
                                      <TableRow key={index} sx={{ display: 'flex' }}>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.product_name}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.opd_price}</TableCell>
                                        {/* <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.quantity}</TableCell> */}
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}></TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.priceTotal}</TableCell>
                                      </TableRow>
                                    )
                                  })
                                }
                                {
                                  addPharmacy.map((items, index) => {
                                    return (
                                      <TableRow key={index} sx={{ display: 'flex' }}>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.product_name}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.selling_price}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.quantity}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.priceTotal}</TableCell>
                                        
                                      </TableRow>
                                    )
                                  })
                                }
                                {
                                  addOptical.map((items, index) => {
                                    return (
                                      <TableRow key={index} sx={{ display: 'flex' }}>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.product_name}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.selling_price}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.quantity}</TableCell>
                                        <TableCell align="left" sx={{ flexBasis: '50%' }}>{items.priceTotal}</TableCell>
                                      </TableRow>
                                    )
                                  })
                                }
                              </TableBody>
                            </Table>
                          </TableContainer>
                          : null}
                      </>
                    </Box>
                    <Box sx={{ textAlign: "right", width: "100%", borderBottom: "none" }}>
                      {inputAdd != '' || addOptical != '' || addPharmacy != '' ?
                        <TableContainer sx={{ borderBottom: "none" }}>
                          <Table sx={{ borderBottom: "none" }}>
                            <TableHead sx={{ borderBottom: "none" }}>
                              <TableRow sx={{ borderBottom: "none" }}>
                                <TableCell sx={{ borderBottom: "none", paddingBottom: "0px" }} align="right">Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody sx={{ borderBottom: "none" }}>
                              <TableRow sx={{ borderBottom: "none" }}>
                                <TableCell sx={{ borderBottom: "none" }} align="right">{totalprice}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        : null}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabvalue} index={1}>
                <Box>
                  {visit.supplier_name != "" ?
                    <TableContainer  >
                      <Table sx={{ marginBottom: 2, width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: '15%' }} align="left">Visit Date</TableCell>
                            <TableCell sx={{ maxWidth: '30%' }} align="left">Prescription</TableCell>
                            <TableCell sx={{ maxWidth: '25%' }} align="left">Medical</TableCell>
                            <TableCell sx={{ maxWidth: '20%' }} align="left">File</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody >
                          <TableRow>
                            <TableCell align="left">{Prescriptiondata.length<=0 ?  'not visit date' : Prescriptiondata.time  }</TableCell>
                            <TableCell align="left">{Prescriptiondata.length<=0 || Prescriptiondata?.PrescreptionDetail == ""  ? 'not Prescription' : readMore ? `${Prescriptiondata?.PrescreptionDetail?.substring(0, Prescriptiondata?.PrescreptionDetail.length)}`: Prescriptiondata?.PrescreptionDetail?.length > 100 ? `${Prescriptiondata?.PrescreptionDetail?.substring(0, 100)}...` : `${Prescriptiondata?.PrescreptionDetail?.substring(0, 100)}` }{Prescriptiondata?.PrescreptionDetail===undefined ? null : Prescriptiondata?.PrescreptionDetail?.length < 100 ? null : readMore && Prescriptiondata?.PrescreptionDetail?.length > 100 ? null :  <button
                           onClick={handleReadMore} >Read More</button>}</TableCell>
                             <TableCell align="left" sx={{display:'flex' ,flexDirection:'column'}}>{Prescriptiondata.length===0 ? 'not visit date' : ProductName  }
                         { medicalData.length>1?
                             <button style={{ width: '50%' }} onClick={handleClickOpen3}>view</button>:null
                         }
                             </TableCell>
                             <TableCell align="left">
                             {downloadfilelist.map((items) => {
                              return(
                               <a className={classes.download} href={linkUrl+`visit_file_download.php?id=${items.id}`} download >
                               <GetAppIcon/></a>
                              )
                             })
                             }
                             </TableCell>
                          </TableRow>
                          
                              
                        </TableBody>
                      </Table>
                    </TableContainer>
                    : null
                  }
                </Box>
              </TabPanel>
            </Box>
            <Box>
            </Box>
          </Box>
        </Paper>
        <div>
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
                    FetchVisitData.map((items, index) => {
                      return (

                        <TableBody key={index}>
                          <TableRow>
                            <TableCell align="right">{<FormControlLabel value={items.id} control={<Checkbox />}
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
                    FetchVisitData.map((items, index) => {
                      return (
                        <TableBody key={index}>
                          <TableRow>
                            <TableCell align="right">{<FormControlLabel value={items.id} control={<Checkbox />}
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


          <BootstrapDialog
            onClose={handleClose2}
            aria-labelledby="customized-dialog-title"
            open={open2}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
              Products Details
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <UploadVisitingFile uploadFile={uploadFile} saveFile={saveFile} file={file} fileName={fileName}/>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={uploadFile} >
                Submit
              </Button>
            </DialogActions>
          </BootstrapDialog>


          <BootstrapDialog
            onClose={handleClose3}
            aria-labelledby="customized-dialog-title"
            open={open3}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose3}>
              Medical Details
            </BootstrapDialogTitle>
            <DialogContent dividers>
              
                  <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Product Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  { medicalData?.map((items) => {
                return(
                  <TableBody>
                          <TableRow>
                            <TableCell align="right">{items.product_name}</TableCell>
                            <TableCell align="right">{items.Quantity}</TableCell>
                          </TableRow>
                        </TableBody> 
                )
              })}
              </Table>
                </TableContainer>
            </DialogContent>
           
          </BootstrapDialog>
        </div>
      </div>
    </Layout>
  );
};

export default Visiting;
