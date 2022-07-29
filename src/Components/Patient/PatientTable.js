import { makeStyles } from '@mui/styles';
import React, { useEffect,useState,useCallback } from 'react';
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Container from '@mui/material/Container';
import { Paper, Button } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector,useDispatch } from 'react-redux';
import { toggle } from '../../redux/action/action';
// import { FetchData ,FetchSinglePatient ,DeletePatientData} from '../../redux/action/action';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import linkData from '../baseurl/links';
import {Box} from '@mui/material';
import { FetchPatient, FetchSinglePatient, DeletePatient } from '../../redux/action/Actions';



const useStyle = makeStyles((theme)=>({
   root:{
    paddingTop:theme.spacing(10),
     paddingLeft:theme.spacing(3),
     paddingRight:theme.spacing(3),
     //border:'1px solid red',
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
  }
}))
const PatientTable = () => {
  const [data,setData] = useState([])
  const [tableData,setTableData] = useState({})

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll);
  const patientData = useSelector((state) =>state.PatientReducerData.apiState);
  //const patientData = useSelector((state) =>state.FetchDataReducer.apiState);
  console.log("patient",patientData);

  const [deleteSuccess, setDeleteSuccess] = useState("");

  //console.log('length',patientData);
  // if(patientData.length === 0){
  //   dispatch(FetchData());

  // }
  console.log('patientData',patientData);

  const edithandle = (id) => {
    let singleData = {"id" : id, "action" : "getPatientByID"}
    dispatch(FetchSinglePatient(singleData))
    .then(()=> Navigate('/editpatient'))
  };

 

  const handledelete = (id) => {
    let data = {"action" : "getAllPatient"};

    if (window.confirm("Are you sure to delete the patient ?")) {
      let deleteData = {"id" : id,  "action" : "DeletePatientData"}
      dispatch(DeletePatient(deleteData))
        .then(() => dispatch(FetchPatient(data)))
        .then(() => setDeleteSuccess("Delete patient Successfully"));
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
        {
          name: "Action",
          sortable: false,
          selector: rows => rows.null,
            cell: (d,id) => [ 
              <Box key={id}>
                  <EditIcon className={classes.edit} onClick={()=>edithandle(d.id)}  />
                  <DeleteIcon className={classes.delete} onClick={() => handledelete(d.id)} />
              </Box>
          ],
        },
       ];


    const clickNavigate =() =>{
        Navigate('/addpatient')
    }

       useEffect(()=>{
        setData(patientData)
        dispatch(toggle());
       },[patientData])
       


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
console.log('setTableData',tableData)
       
       useEffect(() => {
         let data = {"action" : "getAllPatient"};
         
         dispatch(FetchPatient(data))
         
      }, [dispatch])

      
       
  return (
     
    <Box >
    <Layout  >
       <div className={classes.root} >
          {/* <div className='table_data'  style={{border : '1px solid red'}} > */}
              <Button sx={{float:'right',marginRight:'10%',marginBottom:'5%',color:'#00a1ff',
                backgroundColor:'white', border:'1px solid #00a1ff'}}
                variant="contained"
                onClick={()=> clickNavigate()} 
                >  
                Add Patient
              </Button>
              <Paper variant='outlined' className={classes.table}
               style={{  marginTop:'5%' }}>
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
    </Box>
  )
}

export default PatientTable;