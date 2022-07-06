import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { NavLink } from 'react-router-dom';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import TableViewIcon from '@mui/icons-material/TableView';



const SideBar = ({ sidebarData }) => {

    const [open, setOpen] = useState()
    const handleClick = () => {
        setOpen(!open)
    }
    //console.log('sidebarData',sidebarData)

    const openTo = open ? <ExpandLess /> : <ExpandMore />
    
    return (
        <Box >
           <List 
              sx={{ width: '100%'}}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
                    <>

                    <ListItemButton component={NavLink} to={`/${sidebarData.path}`}>
                            <ListItemIcon > {sidebarData.icon}  </ListItemIcon>
                            <ListItemText primary={sidebarData.name} />
                        </ListItemButton>

                       {/* {sidebarData.id !==5 ?     
                       <ListItemButton onClick={() => handleClick(sidebarData.id)}>
                            <ListItemIcon >
                                {sidebarData.icon} 
                            </ListItemIcon>
                             <ListItemText primary={sidebarData.name} />
                            {openTo } 
                        </ListItemButton>
                      :
                        <ListItemButton component={NavLink} to={`/${sidebarData.path}`}>
                            <ListItemIcon > {sidebarData.icon}  </ListItemIcon>
                            <ListItemText primary={sidebarData.name} />
                        </ListItemButton>
                        } */}
                     {/* <ListItemText primary={sidebarData.name} component={NavLink} to={`/${sidebarData.path}`} />  */}
                       {/* {sidebarData.id !==5 ? 
                            <Collapse in={open} timeout="auto"  >
                              {sidebarData.package.map((subItems) => {
                                return (
                                    <List component="div" disablePadding key={subItems.id} >
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName}`} >
                                            <ListItemIcon>
                                              {(subItems.id ==='1' || subItems.id ==='3') 
                                               ? 
                                              <GroupsIcon/> : <TableViewIcon />  } 
                                            </ListItemIcon>
                                            <ListItemText primary={subItems.text} />
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 4 }} component={NavLink} to={`/${subItems.pathName2}`} >
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={subItems.text2} />
                                        </ListItemButton>
                                    </List>
                                )
                              })}
                            </Collapse> 
                        : null
                        } */}
                    </>
                </List>
            
        </Box>
    );

}
export default SideBar;