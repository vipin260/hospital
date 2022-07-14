
import { DOWNLOADFILE }  from '../actionType/ActionType'

const InitialData = {apiState:[]};


const  FileReducerData =(state=InitialData,action)=>{
    switch(action.type){

        case DOWNLOADFILE : return{  ...state,
            apiState : action.payload };
        default   :  return {...state};
    
    }

}
export default FileReducerData;
