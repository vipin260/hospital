import { makeStyles } from '@mui/styles';
import React, { useEffect,useState } from 'react';
import Layout from '../../Pages/Layout';
import { Paper, Box, Typography } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useNavigate } from 'react-router-dom';
import { SortableContainer, SortableElement, sortableHandle, arrayMove } from "react-sortable-hoc";
import {arrayMoveImmutable} from 'array-move';
import { FetchSupplName, FetchPurchases } from '../../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Row ,Col} from 'react-bootstrap';

  const useStyle = makeStyles((theme)=>({
    table:{
      margin:'10px',
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99,
    },
    root: {
      width: "100%",
      height: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99,
      //border: '1px solid red',
      "& .MuiPaper-root": {
       width: "45%",
       height: "auto",
       marginTop :'10%',
       padding: `${theme.spacing(4)} 0`,
        [theme.breakpoints.down("lg")]: {
         width: "70%",
        padding: `${theme.spacing(2)} 0`,
       },
       // border: '1px solid black'
      },
    },
    inputs: {
      height: "100%",
      width : "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99,
      "& .MuiInputLabel-root": {
        fontSize: 15,
        fontWeight: 500,
      },
      "& .MuiButton-root": {
        color: theme.palette.secondary.light,
      },
      "& .css-1nrlq1o-MuiFormControl-root": {
        width: "90%",
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: theme.spacing(2),
        fontSize: 15,
        fontWeight: 500,
      },
    },
  }))

  const SortableData = () => {

      //const DragHandle = sortableHandle(() => <span>::</span>)
      const Navigate = useNavigate()

      const toggleState         = useSelector((state)=>state.togglingReducer.togglingAll);
      const SupplierNameReducer = useSelector((state)=>state.PurchaseReducer.fetchApi)

      const dispatch = useDispatch();

      const data = []
 
      if(SupplierNameReducer.length === 0){
          dispatch(FetchPurchases());
      }
 
      const [tasks, setTasks] = useState([])
       //const [tasks, setTasks] = useState(data)

      if(tasks.length == 0){
        SupplierNameReducer.map((items)=>
          tasks.push({  title: items.supplier_name, description: items.supplier_name })
          )
      }
   
      const classes = useStyle()
  
      const SortableItem = SortableElement(({ value }) => {
        const index = tasks.indexOf(value);
        //console.log('index is', index) #E8E8E8
          return (
            <> 
              <Col xs={4} lg={6} style={{borderBottom:'1px solid #E8E8E8',  
                   backgroundColor:'white',borderRight:'1px solid #E8E8E8', borderTop:'1px solid red'}}>
                <div style={{marginLeft:'1%'}} >  
                  <h3>
                    {value.sorting} {index} :  {value.title} 
                  </h3>
                  <p>{value.description}</p>
                  <p>{value.id}</p>
                </div>
              </Col>
            </>
          )
        })
  
      const SortableList = SortableContainer(({ items }) => {
          return (
            <>
              <Row>
                  {items.map((value, index) => (
                     <SortableItem key={items.id} index={index} value={value} />
                  ))}
                  
              </Row>
           
            </>
          );
        });
      const onSortEnd = async ({ oldIndex, newIndex }) => {
          let tasksCopy = [...tasks];
          tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
          setTasks(tasksCopy);  
      }
      useEffect(()=>{
          dispatch(FetchSupplName())  
      },[dispatch])
  
        //  console.log('task is',tasks)
        //  console.log('data is',data)
        //  console.log('data length is',data.length)
        //  console.log('tasks length is',tasks.length)
       
      return (
        <>
          <Layout>
              <div className={classes.root}  elevation={0} >
                  <Paper variant='outlined' className={classes.paper}  >
                    <Box className={classes.table} > 
                     <Typography variant="h5" component="h5" sx={{ marginBottom: 2 }}> Sortable Data</Typography>
                        <div className='react_sortable_table' >
                          <Table>
                            <SortableList items={tasks} onSortEnd={onSortEnd}  />
                          </Table>
                        </div> 
                    </Box>
                  </Paper>
              </div> 
          </Layout>
        </>
      )
  }

export default SortableData;