import {
     Box, Typography, Table, TableBody,
    TableRow, TableCell, TableHead, TableContainer, 
  } from "@mui/material";


const Selected_patient = (props) => {
   
  return (
    <Box>{
        props.visit.supplier_name !== "" ?
          <>
            <Typography variant="h6" component="h6" sx={{ fontSize: '0.9rem', marginTop: '22px' }}>
              Selected Patient
            </Typography>
            <TableContainer key={props?.SingleData.data?.id} >
              <Table sx={{ marginBottom: 2, width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Pincode</TableCell>
                    <TableCell align="left">Aadhar Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  <TableRow>
                    <TableCell align="left">{props?.SingleData.data?.name}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.phone_number}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.address}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.city}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.state}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.pincode}</TableCell>
                    <TableCell align="left">{props?.SingleData.data?.adhar_number}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
          : null
      }
      </Box>
  )
}

export default Selected_patient