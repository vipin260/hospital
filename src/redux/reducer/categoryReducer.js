
import { FETCHCATEGORY , ADDCATEGORY, SINGLECATEGORY ,DELETECATEGORY , UPDATECATTEGORY  }  from '../actionType/Types';
import {CATEGORYDATA} from '../actionType/ActionType'

const InitialData = {apiState:[] , stateApi :[] , deleteApi:[]};

const  CategoryReducerData =(state=InitialData,action)=>{
    switch(action.type){

        case ADDCATEGORY  :    return{  ...state }

        case FETCHCATEGORY: return{  ...state,
            apiState : action.payload };

        case SINGLECATEGORY : return{ ...state,
            stateApi : action.payload };    

        case DELETECATEGORY :  return{ ...state };

        case UPDATECATTEGORY :   return{ ...state  };

        default   :  return {...state};
    
    }

}


const InitData ={ApiStat : []}
const CategoryDataReducers = (state = InitData, action) =>{
    switch(action.type){
        case CATEGORYDATA : return{ ...state,
            ApiStat : action.payload } 
            
          default : return{...state}  
        }

}

export  {CategoryReducerData, CategoryDataReducers};