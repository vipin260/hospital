import { TOGGLE_ALL } from '../actionType/Types';
import { POSTAPI , DATEAPI, ADDCATEGORY, FETCHCATEGORY,DELETECATEGORY,SINGLECATEGORY ,
    SINGLEPATIENT ,SINGLESUPPLIER ,DELETESUPPLIER ,DELETEPATIENT , UPDATEPATIENT , UPDATESUPPLIER, UPDATECATTEGORY,
    ADDPATIENT, ADDSUPPLIER, ADDINVOICE ,FETCHPURCHASE } from '../actionType/Types';


const InitialData = {apiState:[]};
const DataInitial = {stateApi :[]};
const InitFetch   ={fetchApi :[]}

const togglingReducer = (state={togglingAll:true},action) => {
    switch(action.type){
        case TOGGLE_ALL : 
        return{
            ...state,
            togglingAll:!state.togglingAll,
        }
        default:return{
            ...state
        }
    }
}

// const AddCategoryReducer = (state=InitialData,action) =>{

// switch(action.type){
// case ADDCATEGORY  :  
//         return{ 
//                 ...state,
               
//           };
//         default   :  return {...state};
//     }

// }

// const AddPatientReducer = (state=InitialData,action) =>{

//     switch(action.type){
//     case ADDPATIENT  :  
//             return{ 
//                     ...state,
                   
//               };
//             default   :  return {...state};
//         }
    
//     }


//ADDSUPPLIER
// const AddSupplierReducer = (state=InitialData,action) =>{

//     switch(action.type){
//     case ADDSUPPLIER  :  
//             return{ 
//                     ...state,
                   
//               };
//             default   :  return {...state};
//         }
    
//     }


//ADDINVOICE
// const AddInvoiceReducer = (state=InitialData,action) =>{

//     switch(action.type){
//     case ADDINVOICE  :  
//             return{ 
//                     ...state,
                   
//               };
//             default   :  return {...state};
//         }
    
//     }


//FetchPatientData
// const FetchDataReducer = (state=InitialData,action) =>{
//     switch(action.type){
//         case POSTAPI: return{  ...state,
//         apiState : action.payload };
//         default        : return {...state};
//     }

// }


//FetchSupplierData
// const SupplierData = (state=DataInitial,action) => {

//     switch(action.type){
//         case DATEAPI : return{ ...state,
//             stateApi : action.payload };
//         default : return {...state};
//     }
// } 

//FETCHCATEGORY
// cons = (state=DataInitial,action) => {
//     switch(action.type){
//         case FETCHCATEGORY : return{ ...state,
//             stateApi : action.payload };
//         default : return {...state};
//     }
// }


//FETCHPURCHASE
// const FetchPurchaseReducer = (state=InitFetch,action) =>{

//     switch(action.type){
//         case FETCHPURCHASE: return{  ...state,
//             fetchApi : action.payload };
//         default        : return {...state};
//     }

// }


//DELETECATEGORY
// const DeleteDataReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case DELETECATEGORY : 
//         return{ ...state,
//             stateApi : action.payload 
//         };
//         default : return {...state};
//     }
// }


//SINGLECATEGORY
// const SingleCattegoryReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case SINGLECATEGORY : return{ ...state,
//             stateApi : action.payload };
//         default : return {...state};
//     }
// } 


//SINGLEPATIENT
// const SinglePatientReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case SINGLEPATIENT : return{ ...state,
//             stateApi : action.payload };
//         default : return {...state};
//     }
// } 


//SINGLESUPPLIER
// const SingleSupplierReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case SINGLESUPPLIER : return{ ...state,
//             stateApi : action.payload };
//         default : return {...state};
//     }
// } 


//DELETESUPPLIER
// const DeleteSupplierReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case DELETESUPPLIER : 
//         return{ ...state,
//             stateApi : action.payload 
//         };
//         default : return {...state};
//     }
// }


//DELETEPATIENT
// const DeletePatientReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case DELETEPATIENT : 
//         return{ ...state,
//             stateApi : action.payload 
//         };
//         default : return {...state};
//     }
// }


//UPDATEPATIENT
// const UpdatePatientReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case UPDATEPATIENT : 
//         return{ ...state
//             // stateApi : action.payload 
//         };
//         default : return {...state};
//     }
// }


//UPDATESUPPLIER
// const UpdateSupplierReducer = (state=DataInitial,action) => {
//     switch(action.type){
//         case UPDATESUPPLIER : 
//         return{ ...state
          
//         };
//         default : return {...state};
//     }
// }

//UPDATECATTEGORY
// const UpdateCattegoryReducer = (state=DataInitial,action) => {

//     switch(action.type){
//         case UPDATECATTEGORY : 
//         return{ ...state
          
//         };
//         default : return {...state};
//     }
// }



export {togglingReducer   };