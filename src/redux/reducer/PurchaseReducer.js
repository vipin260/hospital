//import {  ADDINVOICE ,FETCHPURCHASE, FETCHSUPPLIERNAME ,EDITPURCHASE, DELETEPURCHASE, UPDATEPURCHASE } from '../actionType/Types';
import { PURCHASEINSERT, PURCHASEFETCH, PURCHASEBYID, UPDATEPURCHASE, DELETEEPURCHASE, FETCHPURCHASEDETAIL} 
from '../actionType/ActionType'

 const InitFetch   ={fetchApi :[], fetchApis :[] ,supplierApi:[], purchaseDetail :[] }

// const PurchaseReducer = (state=InitFetch,action) =>{
//     switch(action.type){
//         case ADDINVOICE  :  
//             return {  ...state }
            
//         case FETCHPURCHASE: 
//             return{  ...state,
//             fetchApi : action.payload };

//         case FETCHSUPPLIERNAME: return{  ...state,
//             supplierApi : action.payload }; 

//         case DELETEPURCHASE: return{  ...state }; 

//         case EDITPURCHASE: return{  ...state,
//             fetchApis : action.payload };  

//         case UPDATEPURCHASE :   return{ ...state  };

//     default  : return {...state};

//    }

// }

// export default PurchaseReducer;


            

//New Reducer//


const PurchaseReducer = (state=InitFetch,action) =>{
    switch(action.type){
        case PURCHASEINSERT  :  
            return {  ...state }
            
        case PURCHASEFETCH: 
            return{  ...state,
            fetchApi : action.payload }; 

        case DELETEEPURCHASE: return{  ...state }; 

        case PURCHASEBYID: return{  ...state,
            fetchApis : action.payload };  

        case UPDATEPURCHASE :   return{ ...state  };

        case FETCHPURCHASEDETAIL : return{ ...state,
            purchaseDetail : action.payload };

    default  : return {...state};

   }

}

export default PurchaseReducer;