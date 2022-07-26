import { INVENTORYFILE,VISITDATASEARCH,PRESCRIPTIONDETAIL} 
from '../actionType/ActionType'

const InitFetch   ={fetchApi :[], fetchApis :[] ,supplierApi:[], purchaseDetail :[] }

const VisitReducer = (state = InitFetch, action) => {
    switch(action.type){
        case INVENTORYFILE :
            return { ...state,
                fetchApi : action.payload
            };

        case VISITDATASEARCH :
            return { ...state,
                fetchApis : action.payload
            };

        case PRESCRIPTIONDETAIL :
            return { ...state,
                supplierApi : action.payload
            };

        default  : return {...state};
    }
}

export default VisitReducer;