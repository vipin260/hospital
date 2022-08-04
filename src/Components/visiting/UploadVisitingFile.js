import React, {  useState } from "react";
import {Box,  Typography} from "@mui/material";
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';

const UploadVisitingFile = (props) => {

console.log(props.fileName)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', marginTop: '15px' }}>
    <Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem' }}>
      File :
    </Typography>
    <label htmlFor="upload-photo" style={{ marginLeft: '10px', marginRight: '20px' }}>
      <input
        style={{ display: 'none' }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        multiple
        onChange={props.saveFile}
      />

      <Fab
        sx={{
          color: '#fff', backgroundColor: 'rgb(105 105 105)', "&.MuiButtonBase-root:hover": {
            backgroundColor: "rgb(73 73 73)"
          }
        }}
        size="small"
        component="span"
        aria-label="add"
        variant="extended"
        // onClick={props.uploadFile}
      >
        <AddIcon /> Upload Prescription
      </Fab>
      &nbsp;&nbsp;
      {props.fileName} 
    </label>
  </Box>
  )
}

export default UploadVisitingFile