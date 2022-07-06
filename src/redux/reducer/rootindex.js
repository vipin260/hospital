
import { combineReducers } from "redux";
import { togglingReducer   } from "./reducer";
import PurchaseReducer   from "./PurchaseReducer";
import PatientReducerData from "./PatientReducer";
import {CategoryReducerData} from "./categoryReducer";
import SupplierReducerData from "./supplierReducer";
import {CategoryDataReducers } from "./categoryReducer";
import {ProductReducersData} from './productReducers';
import { PurchaseDetailReducersData } from "./PurchaseDetailReducer";


const rootReducer = combineReducers({togglingReducer,  PurchaseReducer ,PatientReducerData, CategoryDataReducers,
  ProductReducersData, CategoryReducerData, SupplierReducerData, PurchaseDetailReducersData });

export default rootReducer;