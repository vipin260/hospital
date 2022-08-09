
import { combineReducers } from "redux";
import { togglingReducer   } from "./reducer";
import PurchaseReducer   from "./PurchaseReducer";
import PatientReducerData from "./PatientReducer";
import {CategoryReducerData} from "./categoryReducer";
import SupplierReducerData from "./supplierReducer";
import {CategoryDataReducers } from "./categoryReducer";
import {ProductReducersData} from './productReducers';
import { PurchaseDetailReducersData } from "./PurchaseDetailReducer";
import FileReducerData from "./FileReducer";
import VisitReducer from "./VisitReducer";
import reportReducer from "./reportReducer";


const rootReducer = combineReducers({togglingReducer,  PurchaseReducer ,PatientReducerData, CategoryDataReducers,
  ProductReducersData, CategoryReducerData, SupplierReducerData, PurchaseDetailReducersData, FileReducerData, VisitReducer, reportReducer });

export default rootReducer;