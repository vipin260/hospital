import React, { useEffect, useState } from "react";
import { FormControlLabel, Paper, Box, Button, Typography, TextField , Checkbox  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../../Pages/Layout";
import { useNavigate } from "react-router-dom";
import {AddInvoiceData ,FetchSupplName, FetchData, FetchCattegoryData, FetchPurchases} from '../../redux/action/action'
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

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
      width: "35%",
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
  //console.log('CategoryData name',CategoryData);

  const [datasApi,setDatasApi] = useState({
    PurchaseDatais : '',
    CategoryDatais : '',
  })

  const [trueData, setTrueData]       = useState(true)
  const [trueDataOne, setTrueDataOne] = useState(true)
  const [trueDataTwo, setTrueDataTwo] = useState(true)
 



  const ButtonsName = [{id:'1',name :'OPD',para:'OPD'},{id:'2',name:'Pharmacy',para:'Pharmacy'},
  {id:'3',name:'Opticals',para:'Opticals'}]
  //console.log('ButtonsName is',ButtonsName);

  if(PatientNameReducer.length === 0){
    Dispatch(FetchData());
  }
  // if(CategoryData.length === 0){
  //   Dispatch(FetchCattegoryData());
  // }
  // if(PurchaseData.length === 0){
  //   Dispatch(FetchPurchases());
  // }

  const options = []
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
  };
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
    //const filterButton = ButtonsName.map((items)=>{return (items.name) })
    //   for(let i=0;i<filterButton.length;i++){
    //     return (filterButton[i].name)
    //  }
      //return items.name 
    
      // const filterItems =( itemsname)=>{ 
      //   let {name, value} = itemsname.target
      //     const filterButton = ButtonsName.filter((items)=> items.id === value )
      //     for (let i=0;i<=filterButton.length;i++){
      //       return (filterButton[i].id)
      //     }
      //     console.log('first', itemsname)
      //   }
      //   console.log('first', filterItems)

  const clickOpd =( itemsname)=>{ 
    let {name, value} = itemsname.target
      // const filterButton = ButtonsName.map((items)=>{
      //   return items.id === value 
      // })
      const ButtonFilter = ButtonsName.filter((items)=> { return value === items.id } )

      //const FiltBtn = () =>{
      // const filterButton = ButtonsName.filter((items)=>  value === items.id )
      // for (let i=0;i<=filterButton.length;i++){
      //   //return (console.log('filterButtonItems',filterButton[i].id))
      //   return (filterButton[i].id)
      // }
    //}
      //console.log('filterButton', FiltBtn)

      if(value  === '1' ){
          console.log('first button')
          Dispatch(FetchCattegoryData())   
      }else if(value === '2' ){
         console.log('second button')
         Dispatch(FetchPurchases())
      }else if(value === '3' ){
         console.log('third button')
        //Dispatch(FetchPurchases())
      }
      

  //  value === '1' ?  Dispatch(FetchCattegoryData()) : ( value === '2' ? Dispatch(FetchPurchases()) : 
  //  ( value === '3' ? console.log('third button') : console.log('sorry no button is clicked')))
    //console.log('hello1', value)


    
   // if(CategoryData.length === 0){
    //   Dispatch(FetchCattegoryData());
    // }

    //const filterButton = ButtonsName.map((items)=>{return items.name})
    //   for(let i=0;i<filterButton.length;i++){
    //     return (filterButton[i].name)
    //  }
      //return items.name 
   //    const datass = filterButton[0]

    //   const datass = filterButton[0] =='OPD' ? 
    //   console.log('have data')
    // : console.log('sorry')
      
    //console.log('hello',datass)
      //Dispatch(FetchCattegoryData())    
  }



  const SubmitData = () => {
//     Dispatch(AddInvoiceData(visit))
//    .then(()=> Navigate('/allvisit'))
  };

  useEffect(()=>{
    Dispatch(FetchData())
    // Dispatch(FetchCattegoryData())   
  },[Dispatch])

  // useEffect(()=>{
  //   setDatasApi({
  //     PurchaseDatais : PurchaseData,
  //     CategoryDatais : CategoryData
  //   })
  // },[PurchaseData ,CategoryData])
 
  //console.log('visit is ',visit)
  //console.log('supplier is' ,supplierList)
  //console.log('datasApi is',datasApi);

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
