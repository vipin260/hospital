import { makeStyles } from '@mui/styles';
import React, { useEffect,useState,useCallback } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Container from '@mui/material/Container';
import { Paper, Button, Box } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/action';
import { FetchData } from '../../redux/action/action';
import { FetchSupplierData  ,DeleteSupplierData } from '../../redux/action/action';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTable from '../EditTable/editcategory';
import {useNavigate} from 'react-router-dom'
import linkData from '../baseurl/links';
import { SupplierFetch, FetchSingleSupplier, DeleteSupplier } from '../../redux/action/Actions';



const useStyle = makeStyles((theme)=>({
   root:{
    paddingTop:theme.spacing(10),
    paddingLeft:theme.spacing(3),
    paddingRight:theme.spacing(3),
    //  marginLeft:'300px',
   },
   table:{
     
    //  width:'90%',
     margin:'auto',
   
   },
   edit :{
    color :"#2E2EFF"
  },
  delete :{
    color :"red"
  },
 
}))

const SupplierTable = () => {
  const [data,setData] = useState([]);
  const [tableData,setTableData] = useState({});
  
  const [editTable , setEditTable] = useState(null);

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll);
  const supplierData = useSelector((state) =>state.SupplierReducerData.apiState);

  const [deleteSuccess, setDeleteSuccess] = useState("");


   console.log(' data',supplierData);

    // if(supplierData.length == 0){
    //   dispatch(FetchSupplierData());
    // }

    const edithandle = (id) => {
      //let data = {"action" : "getSupplierByID"}
      let data = {"id": id, "action" : "getSupplierByID"}
      dispatch(FetchSingleSupplier(data))
      .then(()=> Navigate('/editsupplier'))
    };

    const handledelete = (id) => {
      let data = {"action" : "getAllSupplier"}
      if (window.confirm("Are you sure to delete the supplier ?")) {
        let delete_supplier = {"id":id, "action":"DeleteSupplier"}
        dispatch(DeleteSupplier(delete_supplier))
          .then(() => dispatch(SupplierFetch(data)))
          .then(() => setDeleteSuccess("Delete product Successfully"));
      }
    };

    const classes = useStyle()
  

    const columns = [
        // {
        //   name:'.S.No',
        //   selector:'.s.no',
        //   sortable: true,
        //   cell: (row,index) => index+1
        // }
         , {
           name: "Name",
           selector: row=> row.name,
           sortable: true
         },
         {
           name: "Phone Number",
           selector: row=> row.phone_number,
           sortable: true
         },
        {
          name: "Address ",
          selector: row=> row.address,
          sortable: true
        },
        {
          name: "City",
          selector: row=> row.city,
          sortable: true
        },
        {
          name: "State",
          selector: row=> row.state,
          sortable: true
        },
        {
          name: "Pincode",
          selector: row=> row.pincode,
          sortable: true
        },
        {
          name: "Action",
          sortable: false,
          selector: row=> row.null,
          cell: (d, id) => [
           <Box key={id}>
            <EditIcon className={classes.edit} onClick={() => edithandle(d.id)} />
            <DeleteIcon className={classes.delete} onClick={() => handledelete(d.id)}/>
           </Box>
          ]
        }
       ];


    const clickNavigate =() =>{
      Navigate('/addsupplier')
     }

       useEffect(()=>{
        setData(supplierData)
        dispatch(toggle());
       },[supplierData])
       


       useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns 
          }
        })
       },[data])

      useEffect(()=>{
        let data = {"action" : "getAllSupplier"}
        let sdata ={"action" : "getProductByID"}
        dispatch(FetchSingleSupplier())
        dispatch(SupplierFetch(data))
      },[dispatch])
       
  return (
     
    <>
    <Layout>
       <div className={classes.root} >

          {/* <div className={classes.student}> */}
                  <Button sx={{float:'right',marginRight:'10%',marginBottom:'5%',color:'#00a1ff',
                    backgroundColor:'white', border:'1px solid #00a1ff'}}
                    variant="contained"
                    //href={linkUrl + `${curElem.pathName2}`}
                    onClick={()=> clickNavigate()} 
                    >  
                    Add Supplier
                  </Button>
     
              <Paper variant='outlined' className={classes.table}
               style={{ marginTop:'5%'}}>
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
  )
}

export default SupplierTable;