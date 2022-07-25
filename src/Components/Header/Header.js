import React from 'react'
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import ArticleIcon from '@mui/icons-material/Article';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SideBar from '../SideBar';
import { Box } from '@mui/material';
import {makeStyles} from '@mui/styles'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PurchaseTable from '../Purchase/allpurchase';


const useStyle = makeStyles((theme)=>({
   root:{
    height:'100vh',
    width: '100%',
    //  position: 'fixed',
    //  top:0,
    //  left:0,
    //  width:'300px' ,
     background:'#fff',
     //border:'1px solid yellow',
     zIndex:999,
    transition:'1s all'
   },
//    image:{
//        textAlign:'center',
//       marginBottom:theme.spacing(1),
//       marginTop:theme.spacing(2),
//       border:'1px solid black',
//    }
}))


const schoolData = [
    { id: 1, name: 'Patient',  icon: <PeopleAltIcon />, path:'allpatient', package: [{ id:'1', text: 'All Patient', text2: 'Add New Patient', state: true, data: 'false', pathName2: 'addpatient',pathName:'patient' }] },
    { id: 2, name: 'Product', icon: <SubjectIcon />, path:'allproduct', package: [{ id:'2', text2: 'Add Category',text: 'All Products', pathName:'allcategory' , pathName2: 'addcategory'}] },
    { id: 3, name: 'Supplier', icon: <ArticleIcon />, path:'allsupplier', package: [{ id:'3', text: 'All Supplier', text2: 'Add Supplier', pathName:'allsupplier' ,pathName2: 'addsupplier' }] },
    { id: 4, name: 'Purchase', icon: <QuestionAnswerIcon />,path:'allpurchase', package: [{ id:'4', text: 'All Purchase', text2: 'Add New Purchase', pathName:'allpurchase', pathName2: 'addpurchase'}] },
    { id: 5, name: 'Visiting', icon: <QuestionAnswerIcon />,path:'visiting', package: [{ id:'5', text: 'Visiting', pathName:'visiting'}] },
   
]
const MainSidebar = () => {
    
    const classes = useStyle();
    return (
            <Box className={classes.root}  >
                <Box className={classes.image}>
              {/* <img src='/assets/images/logo.jpg' alt='logo' /> */}
              </Box>
                {schoolData.map((elem, i) =>{
                    return(
                        <Box key={i}>
                        <SideBar  sidebarData={elem} />
                        </Box>
                    )
                } 
                )}
            </Box>
    )
}

export default MainSidebar