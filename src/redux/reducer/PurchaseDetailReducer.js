
import {PURCHASEDETAILINSERT, PURCHASEDETAILFETCH, PURCHASEDETAILBYID, UPDATEPURCHASEDETAIL, DELETEEPURCHASEDETAIL} 
    from '../actionType/ActionType'

 const InitialData = {ApiState : [], FetchApi :[], SingleApi :[]}
 export const PurchaseDetailReducersData = (state = InitialData, action ) =>{
    switch(action.type){
        case PURCHASEDETAILINSERT : return{ ...state,
            ApiState : action.payload}
        // case PURCHASEDETAILFETCH  :  return{ ...state,
        //     FetchApi : action.payload}   
        case PURCHASEDETAILBYID   : return{...state,
            SingleApi : action.payload}
        case UPDATEPURCHASEDETAIL : return{...state}
        case DELETEEPURCHASEDETAIL : return{...state}
        default : return{...state}
    }
    
     

 }