
import React from 'react'
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import ArticleIcon from '@mui/icons-material/Article';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const linkData = [
    {   id:'1', text: 'All Patient', text2: 'Add New Patient', state: true, 
     data: 'false', pathName2: 'addpatient',pathName:'allpatient'
    },

    {   id:'2', text2: 'Add Category',text: 'All Products', 
    pathName:'allproduct' , pathName2: 'addproduct'
    },

    {  id:'3', text: 'All Supplier', text2: 'Add Supplier', 
    pathName:'allsupplier' ,pathName2: 'addsupplier'  
    },

    { id:'4', text: 'All Purchase', text2: 'Add New Purchase', 
    pathName:'allpurchase', pathName2: 'addpurchase'
    },

    {   id:'5', text: 'Visiting', pathName:'visiting'
    },
   
 ]
 export  default linkData ;