import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../Pages/Layout";
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Button, Box } from "@mui/material";
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import { toggle ,  FetchCattegoryData,DeleteCattegoryData,FetchSingleCattegory } from "../../redux/action/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTable from "../EditTable/editcategory";
import { useNavigate } from "react-router-dom";
import linkData from '../baseurl/links';
import { FetchProduct, FetchSingleProduct, DeleteProduct, FetchProductPharmacy } from "../../redux/action/Actions";



const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(20),
    width: "100%",
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
}));

const PharmacyFetch = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const toggleState  = useSelector((state) => state.togglingReducer.togglingAll);
  const CategoryData = useSelector((state) => state.CategoryReducerData.apiState);
  const FetchProductData = useSelector((state) => state.ProductReducersData.PharmacyFetch);
 

  //console.log(' datas are',FetchProductData);



  // if (CategoryData.length == 0) {
  //   dispatch(FetchCattegoryData());
  // }



  const edithandle = (product_id) => {
    dispatch(FetchSingleProduct(product_id))
    .then(()=> Navigate('/editcategory'))
  };


  const handledelete = (product_id) => {
    let data = {"action" : "getAllProduct"}
    let deleteData = {"id" : product_id ,"action" : "DeleteProduct"}
    if (window.confirm("Are you sure to delete the product ?")) {
      dispatch(DeleteProduct(product_id))
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
    Navigate('/addcategory')
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
    let data = {"action" : "getProductPharmacy"}
    dispatch(FetchSingleProduct())
    dispatch(FetchProductPharmacy(data))
 }, [dispatch])

  useEffect(()=>{
    dispatch(FetchCattegoryData());
  },[dispatch])

  return (
    <>
      <Layout>
        <div className={classes.root}>
          <div className={classes.student}>
            <Button sx={{float:'right',marginRight:'10%',marginBottom:'5%',color:'#00a1ff',
              backgroundColor:'white', border:'1px solid #00a1ff'}}
              variant="contained"
              //href={linkUrl + `${curElem.pathName2}`}
              onClick={()=> clickNavigate()} 
              >  
              Add Category
            </Button>
            <Paper
              variant="outlined"
              className={classes.table}
              style={{
                position: "absolute",
                right: 0,
                left: toggleState ? 300 : 0,
                width: toggleState ? "80%" : "90%",
                transition: ".3s all",
                marginTop:'8%'
              }}
            >
              <DataTableExtensions {...tableData}>
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PharmacyFetch;
