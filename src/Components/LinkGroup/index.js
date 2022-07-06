import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField, FormControlLabel, Checkbox   } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Select from 'react-select';
import { useDispatch ,useSelector} from 'react-redux';
import {arrayMoveImmutable} from 'array-move';
import { toggle ,  FetchCattegoryData,DeleteCattegoryData,FetchSingleCattegory } from "../../redux/action/action";
import {  useNavigate } from 'react-router-dom';
import { SortableContainer, SortableElement, sortableHandle, arrayMove } from "react-sortable-hoc";


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    //border:'2px solid red',
    
    '& .MuiPaper-root': {
      width: '35%',
      height: 'auto',
      marginTop :'10%',
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down('lg')]: {
        width: '70%',
        padding: `${theme.spacing(2)} 0`,
      },
      //border:'2px solid green ',
    },

  },
  inputs: {
     height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    //border:'2px solid green ',
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,
    },
    '& .css-1nrlq1o-MuiFormControl-root': {
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    },
    '& .css-b62m3t-container':{
      width:'90%',
      marginBottom:15,
      border: theme.palette.secondary.light,
      '& .css-1s2u09g-control':{
        padding: `${theme.spacing(1)} 5px`,
    
      },
      '& .css-14el2xx-placeholder':{
        fontSize: 16,
        fontWeight: 500,
        },
        '& .css-1pahdxg-control':{
            outline:'none',
            padding: `${theme.spacing(1)} 5px`,
            // borderColor: 'hsl(0, 0%, 80%)',
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow:'none'
        },
    },
    
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked':{
      color:theme.palette.primary.green,
      },
      '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track':{
        background:theme.palette.primary.green,
      },
      '& .makeStyles-inputs-20':{
        background:'red'
      },
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase':{
      color:'red'
    },
    '& .css-1yjjitx-MuiSwitch-track':{
      background:'red'
    },
    
  },
  statusDiv:{
    display:'flex',
    alignItems:'center',
  },
  active:{
    fontSize: '17px!important',
      fontWeight: '500!important',
      color:theme.palette.primary.green,
      marginBottom:2
  },
  inactive:{
    fontSize: '17px!important',
    fontWeight: '500!important',
      color:theme.palette.primary.red,
      marginBottom:2
  },
    buttons : {
        width: '100%',
        maxWidth : '90%',
    }
 
}))

const LinkGroup = (props) => {

  

  const classes = useStyle(props)

  const Navigate = useNavigate();

 
  const CategoryData = useSelector((state) => state.CategoryReducerData.apiState);

  const dispatch = useDispatch()

  //console.log('CategoryData',CategoryData)

   const groupOptions = []
   CategoryData.map((items)=>
   groupOptions.push({ value: items.id, label: items.product_name })
  )

  const dataservice  = []

  const [addGroup, setAddGroup] = useState({
    parent       : 2,
    checkbox     : "",
    group        : '',
    attribute    : '',
    inputOption : groupOptions
   
  })

  // const [tasks,setTasks] = useState([])
  
  //console.log('addGroup',addGroup.inputOption)

  const [linkGroups, setLinkGroups] = useState([]);

  const [linkAttribute, setLinkAttribute] = useState([]);

//   if(tasks.length == 0){
//     linkGroups.map((items)=>
//       tasks.push({  title: items.service, description: items.service })
//       )
//   }

  const handleLinkGroupsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...linkGroups];
    list[index][name] = value;
    setLinkGroups(list);
 
  };

  const handleLinkAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...linkAttribute];
    list[index][name] = value;
    setLinkAttribute(list);
 
  };


  const handleLinkGroupsAdd = () => {
      let addItems = [...linkGroups, { service: addGroup.group }]
      const linkgrouparray = [...addItems]
      const uniqueData = [...new Set(linkgrouparray.map((cueElem)=> cueElem.service))]
      //console.log('uniqueData',uniqueData)
      setLinkGroups (addItems);
  };

  const handleLinkAttributeAdd = () =>{
    let addItems = [...linkAttribute, { serviceattribute: addGroup.attribute }]
    const linkgrouparray = [...addItems]
    //const uniqueData = [...new Set(linkgrouparray.map((cueElem)=> cueElem.service))]
    //console.log('uniqueData',uniqueData)
    setLinkAttribute (addItems);
}

  

  
  // let addItems = [...linkGroups, { service: addGroup.group }]
  // const linkgrouparray = [...addItems]
  // const linkgrouparraies = [...new Set(linkgrouparray.map((cueElem)=> cueElem.service))]
  // console.log('linkgrouparray',linkgrouparray)

  //  let myArray = [{'id':'1'},{'id':'2'},{'id':'3'},{'id':'1'},{'id':'2'}];
  //  //let myArray  =['1','2','3','1','2','4','5']
  //  let uni = [... new Set(myArray)]
  //  let unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
  //  for(let j=0;j<myArray.length;j++){
  //    console.log('datas is',myArray[j].id)
  //  }
   //console.log('uniques',uni)



  const handleLinkGroupsRemove = (index) => {
    const list = [...linkGroups];
    list.splice(index, 1);
    setLinkGroups(list);
  };

  const handleLinkAttributeRemove = (index) => {
    const lists = [...linkAttribute];
    lists.splice(index, 1);
    setLinkAttribute (lists);
  };

  const handleaddGroup = (e) => {
    setAddGroup((prev) => {
      const {name,value} = e.target
      return {
        ...prev,
        [name]:value
      }
    })
  }

  //console.log('attributes are', linkAttribute)

  const  handleGroupChangeOpt=(selectedOptions)=> {
    setAddGroup((prev) => {
      return {
        ...prev,
        group  : selectedOptions.value
      }
    })
}
const  handleAttributeChangeOpt=(selectedOptions)=> {
  setAddGroup((prev) => {
    return {
      ...prev,
      attribute  : selectedOptions.value
    }
  })
}
//console.log('group',addGroup.group)

const SortableItem = SortableElement(({ value }) => {
  const index = linkGroups.indexOf(value);
   const ValueAddGrps =()=>{
    let arr = groupOptions.filter((items) => value.service === items.value) 
    for(let i=0;i<arr.length;i++){
      return (arr[i].label)
   }
  }
  //console.log('data is', ValueAddGrps)
    return (
      <Box sx={{marginBottom:'10px',marginTop:'10px',alignItems:'center', border:'1px solid red'}}> 
          <Box sx={{marginBottom:'10px',marginTop:'10px',display:'flex',alignItems:'center'}} >  
            <Typography  variant='body2' sx={{width:'35%',border:'1px solid #dcdde0',padding:' 12px 7px',
            borderRadius:'5px'}}  name='service' key={index} onChange={(e) => handleLinkGroupsChange(e, index)}  >
               {index}  {ValueAddGrps()} 
              </Typography>
          
            {/* < TextField 
                       name="service"
                       value={ValueAddGrps()} disabled
                        ></TextField> */}
                <Button sx={{marginLeft:'10px',backgroundColor:'#808080'}}
                  variant="contained"
                   onClick={() => handleLinkGroupsRemove(index)} >
                    -
                </Button>
        </Box>

      </Box>
    )
    //console.log('index is', index) #E8E8E8
  })

  const SortableAttributeItem = SortableElement(({ value }) => {
    const indexs = linkAttribute.indexOf(value);
     const ValueAddGrps =()=>{
      let arr = groupOptions.filter((items) => value.serviceattribute === items.value) 
      for(let i=0;i<arr.length;i++){
        return (arr[i].label)
     }
    }
    //console.log('data is', ValueAddGrps)
      return (
        <Box sx={{marginBottom:'10px',marginTop:'10px',alignItems:'center', border:'1px solid red'}}> 
            <Box sx={{marginBottom:'10px',marginTop:'10px',display:'flex',alignItems:'center'}} >  
              <Typography  variant='body2' sx={{width:'35%',border:'1px solid #dcdde0',padding:' 12px 7px',
              borderRadius:'5px'}}  name='serviceattribute' 
               onChange={(e) => handleLinkAttributeChange(e)}  >
                  {indexs} {ValueAddGrps()} 
                </Typography>
            
                  <Button sx={{marginLeft:'10px',backgroundColor:'#808080'}}
                    variant="contained"
                     onClick={(e) => handleLinkAttributeRemove(e)} >
                      -
                  </Button>
          </Box>
         
        </Box>
      )
      //console.log('index is', index) #E8E8E8
    })


const SortableList = SortableContainer(({ items }) => {
    return (
      <Box>
            {items.map((value, index) => (
               <SortableItem key={items.id} index={index} value={value} />
            ))} 
      </Box>
    );
  });


  const SortableAttributeList = SortableContainer(({ items }) => {
    return (
      <Box>
            {items.map((value, index) => (
               <SortableAttributeItem key={items.id} index={index} value={value} />
            ))} 
      </Box>
    );
  });


const onSortEnd = async ({ oldIndex, newIndex }) => {
    let tasksCopy = [...linkGroups];
    tasksCopy = arrayMoveImmutable(tasksCopy, oldIndex, newIndex);
    setLinkGroups(tasksCopy);  
}

const onSortAttributeEnd = async ({ oldIndex, newIndex }) => {
  let tasksCopy = [...linkAttribute];
  tasksCopy = arrayMoveImmutable(tasksCopy, oldIndex, newIndex);
  setLinkAttribute(tasksCopy);  
}

  const handleLinkGroups = () => {
    }

 
    if(CategoryData.length==0){
      dispatch(FetchCattegoryData())
    }

    //console.log(' groupOptions items are',addGroup)
    //console.log('linkGroups is ',linkGroups)  
    //console.log('tasks is ',tasks)  

  return (
    <Layout>
      <Box className={classes.root} elevation={0}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}>
              Link Group
            </Typography>
              <Select
               options={groupOptions}
               defaultValue={addGroup.group}
               onChange={handleGroupChangeOpt}
            />
                 
             {    <Box className={classes.buttons}>
             
                    <Button sx={{marginTop:'10px',backgroundColor:'#808080',display:'flex',justifyContent:'flex-start'}}
                        variant="contained"
                        onClick={()=>handleLinkGroupsAdd()} >
                        Add Group
                    </Button> 
                </Box> }

                {/* { addGroup.group !== ''? */}
                 <Select
                  options={groupOptions}
                  defaultValue={addGroup.attribute}
                  onChange={handleAttributeChangeOpt}
                />
               {/* : null} */}

              <Box className={classes.buttons}>
              <Button sx={{marginTop:'10px',backgroundColor:'#808080',display:'flex',justifyContent:'flex-start'}}
                  variant="contained"
                  onClick={()=>handleLinkAttributeAdd()} >
                  Add Attribute
              </Button> 
         </Box> 
       
            <FormControl className={classes.radionBtns}>
      
            { <Box className="output">
            <SortableList items={linkGroups} onSortEnd={onSortEnd}  />

            <SortableAttributeList items={linkAttribute} onSortAttributeEnd={onSortAttributeEnd}  />
              {/* <h2>Output</h2> */}
            
              {/* { linkGroups.map((singleService, index) => {
                   
                  const ValueAddGrp =()=>{
                  let arr = groupOptions.filter((items) => singleService.service === items.value) 
                  for(let i=0;i<arr.length;i++){
                    return (arr[i].label)
                 }
                }
                  //console.log('arr',arr)
                return(
                  <>
                   
                  {  singleService.service !=='' ?  
                  < TextField sx={{marginBottom:'15px',marginTop:'15px'}}
                       name="service"
                       value={ValueAddGrp()}   
                       onChange={(e) => handleLinkGroupsChange(e, index)} 
                        />
      
                        :null}
                        { singleService.service!==''? (
                        <Button sx={{marginTop:'25px',marginLeft:'10px',backgroundColor:'#808080'}}
                        variant="contained"
                        onClick={() => handleLinkGroupsRemove(index)} >
                        -
                      </Button>
                    ) :null
                    
                }
                  </>
                )
          
                
                })} */}
            </Box> }
       
            </FormControl>
            <Button
              variant="contained"
              className={classes.stundentBtn}
              onClick={() => handleLinkGroups()}
             >
              Add
            </Button>
            
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}

export default LinkGroup;
 //value={singleService.service === groupOptions[index].value ? groupOptions[index].label : groupOptions[index].label}