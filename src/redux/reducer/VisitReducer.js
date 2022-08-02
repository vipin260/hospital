import { INVENTORYFILE,VISITDATASEARCH,PRESCRIPTIONDETAIL} 
from '../actionType/ActionType'

const InitFetch   ={fetchApi :[], fetchApis :[] ,supplierApi:[], purchaseDetail :[], 
    visitUploadFile:[], medical:[], quantityproduct:[],savedata:[] }

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
            case 'VISIT_FILE_UPLOAD' :
                return { ...state,
                    visitUploadFile : action.payload
                };
                case 'MEDICAL_DETAIL' :
                    return { ...state,
                        medical : action.payload
                    };
                case 'QUANTITY' :
                    return { ...state,
                        quantityproduct : action.payload
                        };
                case 'SAVEDATA' :
                    return { ...state,
                        savedata : action.payload
                        };

        default  : return {...state};
    }
}

export default VisitReducer;