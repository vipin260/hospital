
import {PRODUCTINSERT, FETCHPRODUCT, PRODUCTBYID, UPDATEPRODUCT, DELETEPRODUCT,
    FETCHPPHARMACY, FETCHPOPTICAL, FETCHPOPD } from '../actionType/ActionType'

 const InitialData = {ApiState : [], FetchApi :[], SingleApi :[], PharmacyFetch :[], OpticalFetch :[], OpdFetch :[]}
 export const ProductReducersData = (state = InitialData, action ) =>{
    switch(action.type){

        case PRODUCTINSERT : return{ ...state }
        case FETCHPRODUCT  :  return{ ...state,
            FetchApi : action.payload} 
        case FETCHPPHARMACY  :  return{ ...state,
            PharmacyFetch : action.payload}
        case FETCHPOPTICAL  :  return{ ...state,
            OpticalFetch : action.payload}
        case FETCHPOPD  :  return{ ...state,
            OpdFetch : action.payload}  
        case PRODUCTBYID   : return{...state,
            SingleApi : action.payload}
        case UPDATEPRODUCT : return{...state}
        case DELETEPRODUCT : return{...state}

        default : return{...state}
    }
    
     

 }