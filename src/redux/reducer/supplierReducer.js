
//import { DATEAPI , ADDSUPPLIER, SINGLESUPPLIER ,DELETESUPPLIER , UPDATESUPPLIER  }  from '../actionType/Types';
import { SUPPLIERINSERT,  SUPPLIERFETCH, SUPPLIERBYID, UPDATESUPPLIER, DELETEESUPPLIER} 
 from '../actionType/ActionType'


const InitialData = {apiState:[] , SingleApi :[] , deleteApi:[]};


// const  SupplierReducerData =(state=InitialData,action)=>{
//     switch(action.type){

//         case ADDSUPPLIER  :    return{  ...state }

//         case DATEAPI: return{  ...state,
//             apiState : action.payload };

//         case SINGLESUPPLIER : return{ ...state,
//             stateApi : action.payload };    

//         case DELETESUPPLIER :  return{ ...state };

//         case UPDATESUPPLIER :   return{ ...state  };

//         default   :  return {...state};
    
//     }

// }
// export default SupplierReducerData;


// NEW REDUCER  //


const  SupplierReducerData =(state=InitialData,action)=>{
    switch(action.type){

        case SUPPLIERINSERT  :    return{  ...state }

        case SUPPLIERFETCH: return{  ...state,
            apiState : action.payload };

        case SUPPLIERBYID : return{ ...state,
            SingleApi : action.payload };    

        case DELETEESUPPLIER :  return{ ...state };

        case UPDATESUPPLIER :   return{ ...state  };

        default   :  return {...state};
    
    }

}
export default SupplierReducerData;

