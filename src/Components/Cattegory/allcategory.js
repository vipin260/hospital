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
  const [tableOPDData, setTableOPDData] = useState(false);
  
  


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

  const [columns, setColumns] = useState( [
    {
      id: 1,
      name: "Product Name",
      selector : row => row.product_name,
      sortable: true,
    },
    {
      name: "Product Category",
      selector: row =>  row.name,
      sortable: true,
    },
  
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
  ]);

  // const newColumn = [
  //   {
  //     id: 1,
  //     name: "Product Name",
  //     selector : row => row.product_name,
  //     sortable: true,
  //   },
    
  //   {
  //     name: "Product Category",
  //     selector: row =>  row.name,
  //     sortable: true,
  //   },
  //   {  
  //     name: "Opd Price",
  //     selector : row => row.opd_price,
  //     sortable: true,
  //   },
  
  //   {
  //     name: "Status ",
  //     selector: row => row.status,
  //     sortable: true,
  //     cell : (rows)  =>{
  //       if(rows.status ==="0"){
  //         return "inactive"
  //       }else{
  //         return "active"
  //       }
  //     }
  //   },

  //   {
  //     name: "Action",
  //     sortable: row => row.false,
  //     selector: row => row.null,
  //     cell: (d, product_id) => [
  //       <Box key={product_id}>
  //       <EditIcon className={classes.edit}  onClick={()=>edithandle(d.product_id)} />
  //       <DeleteIcon className={classes.delete} onClick={() => handledelete(d.product_id)} />
  //       </Box>
  //     ],
  //   },
  // ]

 
  

  const clickNavigate =() =>{
    Navigates('/addproduct')
  }

  const add = {  
    name: "Opd Price",
    selector : row => row.opd_price,
    sortable: true,
  }
let text= false;

  const clickNavigateCattegory =(e) =>{
    let {name} = e.target
    if(name === 'pharmacy'){ 
      const newColumn1 = columns.filter((v) => {
        return v.name!=="Opd Price";
      })
      // const newColumn1 = columns.slice(0,4);
      setTableOPDData(false)
      setData(FetchPharmacyData)
      setColumns(newColumn1);
      console.log("after",columns)
      
      let run = columns[2]; 
     }
    else if(name === 'optical'){
      setData(FetchOpticalData);
      const newColumn1 = columns.filter((v) => {
        return v.name!=="Opd Price";
      })
      setColumns(newColumn1);
    }
    else if(name === 'opd'){
      setTableOPDData(true)
      // setColumns(newColumn);
      columns.map((t) => {
        if(t.name=="Opd Price"){
          text=true;
          
        }
        
      })
      if(text==false){
        console.log("in loop")
          let newColumn2 = columns.concat(add);
          console.log("column is",columns)
          console.log("column2 is",newColumn2)
          
          const moveArrayItemToNewIndex = (arr, old_index, new_index) => {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; 
        };
        
        
        const latestColumn = moveArrayItemToNewIndex(newColumn2, 4, 2);

          setColumns(latestColumn)
          
      }
      
      setData(FetchOpdData);
      
      console.log("before",columns)
    }
    else{
      setData(FetchProductData);
      console.log('dd')
    }
    
  }
  
  
  


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


  

  return (
    <>
      <Layout>
        <div className={classes.root}>
        
          <Grid container spacing={2} sx={{justifyContent:'center'}}>
             <Grid item sx={4}  >
                <Button sx={{marginRight:'10%',marginBottom:'5%',color:'#00a1ff',
                  backgroundColor:'white', border:'1px solid #00a1ff'}}
                  variant="contained"
                  name = 'pharmacy'
                  onClick={(e)=> clickNavigateCattegory(e)} 
                  >  
                  Pharmacy
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
