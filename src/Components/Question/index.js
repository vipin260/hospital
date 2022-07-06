import React,{useState} from 'react'
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '35%',
      height: 'max-content',
      padding: `${theme.spacing(4)} 0`
    }
  },

  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
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
    }
  },


}))
const AddQuestion = () => {
  const classes = useStyle()


  const [questionData,setQuestionData] = useState({
    ques:'',
    active:''
  })
  const handleQuestion = (e) =>{
    const {value,name} = e.target
    setQuestionData((prev)=>{
     return{
      ...prev,
      [name]:value,
     }
    })
  }
  console.log('questionData',questionData);
  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={5}>
          <Box className={classes.inputs}>
            <Typography variant='h5' component='h5' sx={{ marginBottom: 2 }}>
           Question
            </Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} name='ques' 
            value={questionData.ques} onChange={handleQuestion} 
            />
            <FormControl className={classes.radionBtns} >
              <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name='active'
                value={questionData.active}
                onChange={handleQuestion} 
                >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>
            <Button variant='contained' className={classes.stundentBtn}>
            Add Question
            </Button>
            </Box>
            </Paper>
          </div>
        </Layout>
  )
}

export default AddQuestion;