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
import { PurchaseFetch, FetchSinglePurchase, DeletePurchase, DownloadFiles } from '../../redux/action/Actions';
import { linkUrl } from '../../Components/baseurl';
import fileDownload from 'js-file-download';
import {useDownloader, specific} from "react-files-hooks";
import { saveAs } from "file-saver";



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
  const Filereducer        = useSelector((state)=>state.FileReducerData.apiState);
 
  // console.log('Filereducer data is', Filereducer)
   

  const [deleteSuccess, setDeleteSuccess] = useState("");



  const { downloader } = useDownloader({
    file: data,
    onError: error => {}
  });

  const { download } = specific.useJSONDownloader();

 
  
  //console.log('data of purchase is ',PurchaseData);

 
  const edithandle = (id) => {
    let data = {"id":parseInt(id),"action" : "getPurchaseByID"}
    dispatch(FetchSinglePurchase(data))
    .then(()=> Navigate('/editpurchase'))
  };

  const downloadFileBtn = async (id) => {
    
    dispatch(DownloadFiles(id))

      // let FileSaver = require('file-saver');
      // let blob = new Blob([Filereducer], {type: "text/plain;charset=utf-8"});
      // FileSaver.saveAs(blob, "hello world.txt");



    // const blob = new Blob(
    //   [ 'uploads/myw3schoolsimage.jpg' ],
    //   { type: 'image/jpeg' }
    // );
    console.log('id is', id)
    try{

      //  const res =  axios.post(linkUrl+'downloadfile.php', {file_id:parseInt(id), responseType: "blob"})
      //.then((resp)=> saveAs( resp.data))

       //.then((resp)=> download({data : resp.data}))
       //.then((resp)=> fileDownload(resp.data))
       

      //  saveAs(
      //   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      //   "example.pdf"
      // );
 

       
      //-----------------------------------------------------------------
      // .then(res => {
      //   const url = window.URL.createObjectURL(new Blob([res.data]
      //     ,{type: "application/pdf"}))
      //   var link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', 'get_started_with_smallpdf');
      //   document.body.appendChild(link);
      //   link.click();
      // })


      //-------------------------------------------------------

      //const originalImage="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png";
      // const originalImage="http://localhost/hospital_management/uploads/ninja-simple-512.png";
      // const image = await fetch(originalImage);
  
      // const nameSplit=originalImage.split("/");
      // const  duplicateName=nameSplit.pop();
      // const imageBlog = await image.blob()
      // const imageURL = URL.createObjectURL(imageBlog)
      // const link = document.createElement('a')
      // link.href = imageURL;
      // link.download = ""+duplicateName+"";
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link) 

     //---------------------------------------------------------

      //console.log('res',res.data);
 
      // .then((resp) => {
      // console.log('resp',resp);
      //   fileDownload(resp.data)
      // })
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
                  {/* <GetAppIcon className={classes.download} onClick={()=>downloadFileBtn(d.id)}   /> */}
                  <a className={classes.download} href={linkUrl+`downloadfile.php?id=${d.id}`} download >
                     <GetAppIcon/></a>
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

     //console.log("data is",PurchaseData)
       
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