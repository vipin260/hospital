
// import { POSTAPI , ADDPATIENT, SINGLEPATIENT ,DELETEPATIENT , UPDATEPATIENT  }  from '../actionType/Types';
import { PATIENTINSERT,  PATIENTFETCH, PATIENTBYID, UPDATEPATIENT, DELETEPATIENT}  from '../actionType/ActionType'

const InitialData = {apiState:[] , stateApi :[], deleteApi:[]};

// const  PatientReducerData =(state=InitialData,action)=>{
//     switch(action.type){

//         case ADDPATIENT  :    return{  ...state }

//         case POSTAPI: return{  ...state,
//             apiState : action.payload };

//         case SINGLEPATIENT : return{ ...state,
//             stateApi : action.payload };    

//         case DELETEPATIENT :  return{ ...state  };

//         case UPDATEPATIENT :   return{ ...state  };

//         default   :  return {...state};
    
//     }

// }
// export default PatientReducerData;

const  PatientReducerData =(state=InitialData,action)=>{
    switch(action.type){

        case PATIENTINSERT  :    return{  ...state }

        case PATIENTFETCH : return{  ...state,
            apiState : action.payload };

        case PATIENTBYID : return{ ...state,
            stateApi : action.payload };    

        case DELETEPATIENT :  return{ ...state  };

        case UPDATEPATIENT :   return{ ...state  };

        default   :  return {...state};
    
    }

}
export default PatientReducerData;
