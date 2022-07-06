import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../Pages/Layout";
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Button, Box, Grid } from "@mui/material";
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import { toggle ,  FetchCattegoryData,DeleteCattegoryData,FetchSingleCattegory } from "../../redux/action/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTable from "../EditTable/editcategory";
import { useNavigate } from "react-router-dom";
import linkData from '../baseurl/links';
import { FetchProduct, FetchSingleProduct, DeleteProduct, FetchProductPharmacy, FetchProductOptical, FetchProductOpd } 
from "../../redux/action/Actions";
import { Routes, Route, Navigate, useLocation, NavLink, useParams } from 'react-router-dom';
import { generatePath, createPath } from "react-router-dom";



const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    marginLeft:'300px',
  },
  table: {
    //  width:'90%',
    margin: "auto",
  },
  edit :{
    '&: hover':{
      color : "#FF0000 !important"
    },
    color :"#2E2EFF",
    // border :"2px solid black",
  },
  delete :{
    color :"#FF0000"
  },
  opd :{
    display :"none"
  },
}));

const CattegoryTable = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [tableOPDData, setTableOPDData] = useState({});
  
  


  const dispatch = useDispatch();
  const Navigates = useNavigate();
  const Parms   = useParams();

  // console.log('ss', Parms);

  const toggleState  = useSelector((state) => state.togglingReducer.togglingAll);
  const CategoryData = useSelector((state) => state.CategoryReducerData.apiState);
  const FetchProductData = useSelector((state) => state.ProductReducersData.FetchApi);
  const FetchPharmacyData = useSelector((state) => state.ProductReducersData.PharmacyFetch);
  const FetchOpticalData = useSelector((state) => state.ProductReducersData.OpticalFetch);
  const FetchOpdData = useSelector((state) => state.ProductReducersData.OpdFetch);
  //const FetchAllProductData = useSelector((state) => state.ProductReducersData.FetchApi);

  //const SingleCategoryData = useSelector((state) => state.SingleCattegoryReducer.stateApi);

  //console.log(' datas are',FetchOpdData);



  // if (CategoryData.length == 0) {
  //   dispatch(FetchCattegoryData());
  // }

  // if (FetchProductData.length == 0) {
  //   dispatch(FetchProduct());
  // }

  const Location = useLocation();

  const [url, setUrl] = useState('')

  //console.log('object', url);

  const edithandle = (product_id) => {
    dispatch(FetchSingleProduct(product_id))
    .then(()=> Navigates('/editcategory'))
  };


  const handledelete = (product_id) => {
    let data = {"action" : "getAllProduct"}
    let deleteData = {"id" : product_id ,"action" : "DeleteProduct"}
    if (window.confirm("Are you sure to delete the product ?")) {
      dispatch(DeleteProduct(deleteData))
        .then(() => dispatch(FetchProduct(data)))
        .then(() => setDeleteSuccess("Delete product Successfully"));
    }
  };

  const classes = useStyle();

  const columns = [
    // {
    //   name: ".S.No",
    //   selector: ".s.no",
    //   sortable: true,
    //   cell: (row, index) => index + 1,
    // },
    {
      id: 1,
      name: "Product Name",
      selector : row => row.product_name,
      sortable: true,
    },
    {
      name: "Product Category",
      selector: row => row.name  ,
      //selector: row => row.product_category ==='1' ? 'Pharmacy' : (row.product_category ==='2' ?'Optical' : 'OPD') ,
      sortable: true,
    },
    {
      name: "Opd Price",
      selector : row => row.opd_price,
      sortable: true,
      // cell : (rows) =>{
      //   data.map((v) => {
      //     console.log("fun",v.name)
      //     if(v.name=="OPD"){
      //       console.log("hfsdhf");
      //       return{}
              
              
          
            
                
            
      //   }
            
      //       })
      // }
          
    },
    
    // { 
    //   cell : (rows) =>{
    //     if(rows.opd_price){
    //       return{
    //         name: "Opd Price",
    //         selector : row => row.opd_price,
    //         sortable: true,
    //       }
    //     }
    //   },
    //   // name: "Opd Price",
    //   // selector : row => row.opd_price,
    //   // sortable: true,
    //   //cell : (row) => row.product_category === '3' ? row.opd_price  : null
    // },

    {
      name: "Status ",
      selector: row => row.status,
      sortable: true,
      cell : (rows)  =>{
        if(rows.status ==="0"){
          return "inactive"
        }else{
          return "active"
        }
      }
    },

    {
      name: "Action",
      sortable: row => row.false,
      selector: row => row.null,
      cell: (d, product_id) => [
        <Box key={product_id}>
        <EditIcon className={classes.edit}  onClick={()=>edithandle(d.product_id)} />
        <DeleteIcon className={classes.delete} onClick={() => handledelete(d.product_id)} />
        </Box>
      ],
    },
  ];

 
  

  const clickNavigate =() =>{
    Navigates('/addproduct')
  }





  const clickNavigateCattegory =(e) =>{
    let {name} = e.target
    if(name === 'pharmacy'){ 
      //setUrl(Location + '/add')
      setData(FetchPharmacyData)
      //  Navigates(Location.pathname + '/pharmacy')
      //Navigates('/pharmacydata') 
     }
    else if(name === 'optical'){
      setData(FetchOpticalData);
      //Navigates('/opticaldata')
    }
    else if(name === 'opd'){
      setData(FetchOpdData);
      //Navigates('/opddata')
      let run = columns[2];
      const fast = columns.filter((v) => {
        return v.name!==run.name;
      })
      
     console.log(run)
     console.log(fast)

    }
    else{
      setData(FetchProductData);
      console.log('dd')
    }
    
  }
  
  // useEffect(() => {
  //   setCol({fast});
    
  // }, [clickNavigateCattegory]);


  useEffect(() => {
    setData(FetchProductData);
    dispatch(toggle());
  }, [FetchProductData]);

  useEffect(() => {
    setTableData((state) => {
      return {
        ...state,
        data,
        columns,
      };
    });
  }, [data]);

  useEffect(() => {
    let data = {"action" : "getAllProduct"}
    let pharmacy_data  = {"action" : "getProductPharmacy"}
    let optical_fetch  = {"action" : "getProductOptical"}
    let opd_fetch      = {"action" : "getProductOPD"}
    dispatch(FetchSingleProduct())
    dispatch(FetchProduct(data))
    dispatch(FetchProductPharmacy(pharmacy_data))
    dispatch(FetchProductOptical(optical_fetch))
    dispatch(FetchProductOpd(opd_fetch))
 }, [dispatch])

  useEffect(()=>{
    dispatch(FetchCattegoryData());
  },[dispatch])


  //console.log('location', Location.pathname);

  return (
    <>
      <Layout>
        <div className={classes.root}>
          {/* <div className={classes.student}> */}
          <Grid container spacing={2} sx={{justifyContent:'center'}}>
             <Grid item sx={4}  >
                <Button sx={{marginRight:'10%',marginBottom:'5%',color:'#00a1ff',
                  backgroundColor:'white', border:'1px solid #00a1ff'}}
                  variant="contained"
                  name = 'pharmacy'
                  onClick={(e)=> clickNavigateCattegory(e)} 
                  >  
                  Pharmacy1
                </Button>
              </Grid>
              <Grid item sx={4}>
                <Button sx={{color:'#00a1ff',
                  backgroundColor:'white', border:'1px solid #00a1ff'}}
                  variant="contained"
                  name = 'optical'
                  onClick={(e)=> clickNavigateCattegory(e)} 
                  >  
                  Optical
                </Button>
              </Grid>
              <Grid item sx={4}>
                <Button sx={{color:'#00a1ff',
                  backgroundColor:'white', border:'1px solid #00a1ff'}}
                  variant="contained"
                  name = 'opd'
                  onClick={(e)=> clickNavigateCattegory(e)} 
                  >  
                  OPD
                </Button>
              </Grid>
              <Grid item sx={4}>
                <Button sx={{color:'#00a1ff',
                  backgroundColor:'white', border:'1px solid #00a1ff'}}
                  variant="contained"
                  onClick={()=> clickNavigate()} 
                  >  
                  Add Product
                </Button>
              </Grid>
              
            </Grid>
            <Paper
              variant="outlined"
              className={classes.table}
              style={{ marginTop:'2%' }}
            >
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
            </Paper>
          {/* </div> */}
        </div>
      </Layout>
    </>
  );
};

export default CattegoryTable;
