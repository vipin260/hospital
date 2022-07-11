import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect,useState,useCallback } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper , Box, Button } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/action';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {  useNavigate } from 'react-router-dom';
import linkData from '../baseurl/links';
import { PurchaseFetch, FetchSinglePurchase, DeletePurchase } from '../../redux/action/Actions';
import { linkUrl } from '../../Components/baseurl';



const useStyle = makeStyles((theme)=>({
   root:{
     paddingTop:theme.spacing(20),
     marginLeft:'300px',
   },
   table:{
    //  width:'90%',
     margin:'auto',

   },
   edit :{
    color :"#2E2EFF"
  },
  download :{
    color :"black",
    padding: '0 23px'
  },
  delete :{
    color :"red"
  },
//   '& .data-table-extensions.data-table-extensions-action button.print':  {
//     display: 'none'
// }
'& .data-table-extensions-action':{
  display : 'none !important',
},
}))


const PurchaseTable = () => {

  const [data,setData] = useState([])
  const [datapurchase,setpurchase] = useState([])
  const [tableData,setTableData] = useState({})

  //console.log('linkData',linkData)

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const toggleState        = useSelector((state)=>state.togglingReducer.togglingAll);
  const PurchaseData       = useSelector((state) =>state.PurchaseReducer.fetchApi);
 

  const [deleteSuccess, setDeleteSuccess] = useState("");

  console.log('data of purchase is ',PurchaseData);

 
  const edithandle = (id) => {
    let data = {"id":parseInt(id),"action" : "getPurchaseByID"}
    dispatch(FetchSinglePurchase(data))
    .then(()=> Navigate('/editpurchase'))
  };

  const downloadFile = async (id) => {
    console.log('id is', id)
    try{
      const res = await axios.post( linkUrl+'downloadfile.php', {file_id:id});
      console.log('res',res);
    }catch (ex) {
        console.log(ex);
      }
  
  };

  const handledelete = (id) => {
    let data = {"action" : "getAllPurchase"}
    let delete_data = {"id": id, "action":"DeletePurchase"}
    if (window.confirm("Are you sure to delete the purchase data ?")) {
      dispatch(DeletePurchase(delete_data))
        .then(() => dispatch(PurchaseFetch(data)))
        .then(() => setDeleteSuccess("Delete purchase data Successfully"));
    }
  };

    const classes = useStyle()

    const columns = [
        // {
        //   name:'.S.No',
        //   selector: row=>row.s.no,
        //   sortable: true,
        //   cell: (row,index) => index+1
        // },
        {
          name: "ID ",
          selector: rows => rows.id,
          sortable: true
         },
          {
           name: "Supplier Name",
           selector: rows => rows.name,
           sortable: true
          },
          {
            name: "Purchase Date",
            selector: row => row.date_of_purchase,
            sortable: true
          },
          {
            name: " Invoice No ",
            selector: row => row.invoice_no,
            sortable: true
          },
          {
            name: "File Download",
            sortable: true,
            cell: (d,id) => [ 
              <Box key={id}>
                  <GetAppIcon className={classes.download} onClick={()=>downloadFile(d.id,'http://localhost/hospital_management/uploads/patient.php')}  />
              </Box>
            ],
          },
        {
          name: "Action",
          sortable: false,
          selector: row => row.null,
          cell: (d,id) => [ 
            <Box key={id}>
                <EditIcon className={classes.edit} onClick={()=>edithandle(d.id)}  />
                <DeleteIcon className={classes.delete} onClick={() => handledelete(d.id)} />
            </Box>
          ],
        },
       ];

      const clickNavigate =() =>{
        Navigate('/addpurchase')
      }

       useEffect(()=>{
        setData(PurchaseData)
        dispatch(toggle());
       },[PurchaseData])
       
       useEffect(()=>{
        setTableData((state)=>{
          return{
            ...state,
            data,
            columns 
          }
        })
       },[data])

console.log("data is",PurchaseData)
       
       useEffect(() => {
        let data = {"action" : "getAllPurchase"}
         dispatch(PurchaseFetch(data))
      }, [dispatch])
       
  return (
     
    <>
    <Layout>
       <div className={classes.root} >
          {/* <div className={classes.student}> */}
          <Box sx={{textAlign:'right', 'marginRight': '8%'}}>
            <Button sx={{marginBottom:'1%',color:'#00a1ff', justifyContent:'flex-end', 
                    backgroundColor:'white', border:'1px solid #00a1ff'}}
                    variant="contained"
                    //href={ `/${curElem.pathName2}`}
                    onClick={()=> clickNavigate()} 
                    >  
                    Add Purchase
            </Button>
          </Box>
              <Paper variant='outlined' className={classes.table} >
                     <DataTableExtensions {...tableData} >
                        <Table
                          columns={columns}
                          data={data}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={false}
                          pagination
                          highlightOnHover
                          print
                        />
                      </DataTableExtensions>
                    </Paper>
            {/* </div> */}
           </div> 
    </Layout>
    </>
  )
}

export default PurchaseTable;