import React,{useState , useEffect} from 'react';
import Login from './Pages/Auth/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/Header/AppBar';
import AddSubject from './Components/Subject';
import AddQuestion from './Components/Question';
import Patient from './Components/Patient';
import AddSupplier from './Components/Supplier';
import Purchase from './Components/Purchase/purchase';
import PurchaseAdd from './Components/Purchase';
import Addcategory from './Components/Cattegory';
import PatientTable from './Components/Patient/PatientTable';
import SupplierTable from './Components/Supplier/allsupplier';
import CattegoryTable from './Components/Cattegory/allcategory';
import PurchaseTable from './Components/Purchase/allpurchase';
import Editcategory from './Components/EditTable/editcategory';
import EditPatient   from './Components/EditTable/editpatient'
import EditSupplier from './Components/EditTable/editsupplier';
import EditPurchase from './Components/EditTable/editpurchase';
import SortableData from './Components/SortableData';
import LinkGroup from './Components/LinkGroup';
import Visiting from './Components/visiting';
import PharmacyFetch from './Components/Cattegory/pharmacyfetch';
import OpticalFetch from './Components/Cattegory/opticalfetch';
import OpdFetch from './Components/Cattegory/opdfetch';


const App = () => {
 
  return (
    <>
      <Routes>
        <Route path='/'              exact element={<Navigate to='/login' />} />
        <Route path='/login'         exact element={<Login />} />
        <Route path='/header'        exact element={<NavBar  />} />
        <Route path='/addpatient'    exact element={<Patient />} />
        <Route path='/addsubject'    exact element={<AddSubject/>} /> 
        <Route path='/addquestion'   exact element={<AddQuestion/>} /> 
        <Route path='/addsupplier'   exact element={<AddSupplier/>} /> 
        <Route path='/allpatient'    exact element={<PatientTable/>} /> 
        <Route path='/addproduct'    exact element={<Addcategory/>} /> 
        <Route path='/allsupplier'   exact element={<SupplierTable/>} />
        <Route path='/allproduct'    exact element={<CattegoryTable/>} />
        <Route path='/editcategory'  exact element={<Editcategory/>} />
        <Route path='/editpatient'   exact element={<EditPatient/>} />
        <Route path='/purchase'      exact element={<Purchase/>} />
        <Route path='/allpurchase'   exact element={<PurchaseTable/>} />
        <Route path='/editpurchase'  exact element={<EditPurchase/>} />
        <Route path='/editsupplier'  exact element={<EditSupplier/>} />
        <Route path='/sortable'      exact element={<SortableData/>} />
        <Route path='/linkgroup'     exact element={<LinkGroup/>} />
        <Route path='/visiting'      exact element={<Visiting/>} />
        <Route path='/addpurchase'   exact element={<PurchaseAdd/>} />
        <Route path='/pharmacydata'  exact element={<PharmacyFetch/>} />
        <Route path='/opticaldata'   exact element={<OpticalFetch/>} />
        <Route path='/opddata'       exact element={<OpdFetch/>} />
        
       
      </Routes>

    </>
  )
}

export default App