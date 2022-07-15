import { INVENTORYFILE} 
from '../actionType/ActionType'

const InitFetch   ={fetchApi :[], fetchApis :[] ,supplierApi:[], purchaseDetail :[] }

const VisitReducer = (state = InitFetch, action) => {
    switch(action.type){
        case INVENTORYFILE :
            return { ...state,
                fetchApi : action.payload
            };

        default  : return {...state};
    }
}

export default VisitReducer;