import React from 'react'
import axios from 'axios';
import {TOGGLE_ALL, POSTAPI, ADDCATEGORY, DATEAPI, FETCHCATEGORY, DELETECATEGORY, SINGLECATEGORY, UPDATEPURCHASE,
    SINGLEPATIENT, SINGLESUPPLIER, DELETESUPPLIER, DELETEPATIENT, UPDATEPATIENT, ADDPATIENT, ADDSUPPLIER, 
    ADDINVOICE, UPDATESUPPLIER, UPDATECATTEGORY, FETCHPURCHASE, FETCHSUPPLIERNAME, EDITPURCHASE, DELETEPURCHASE
    }from '../actionType/Types';
import { baseUrl } from '../../Components/baseurl';


export const toggle = () => {
    return{
        type:TOGGLE_ALL,
        
    }
}

//ADDCATEGORY
export const AddCategories = (data) => async dispatch => {
    const AddCategorypi = await axios.post( baseUrl + '/product_insert.php',{ ...data });

    dispatch({
        type    : ADDCATEGORY
    })
}

//ADDPATIENT
export const AddPatient = (data) => async dispatch => {
    const AddPatientapi = await axios.post( baseUrl + '/insert.php',{ ...data });
    //console.log('AddPatientapi',AddPatientapi.status)
    // if(AddPatientapi.status ==='200'){
    //     console.log('AddPatientapi',AddPatientapi.status) 
    // }
    // else{
    //     alert('Invalid Ceredentials');
    // }
    dispatch({
        type    : ADDPATIENT 
    })
}

//ADDSUPPLIER
export const AddSupplierData = (data) => async dispatch => {
    const AddSupplierapi = await axios.post( baseUrl + '/insert_supplier.php',{ ...data });

    dispatch({
        type    : ADDSUPPLIER
    })
}

//fetchPatientData
export const FetchData = () => async dispatch => {
    const ResponseApi = await axios.get( baseUrl + '/patient_data.php');

    dispatch({

        type    : POSTAPI,
        payload : ResponseApi.data

    })
}

//FetchSupplierData
export const FetchSupplierData = () =>async dispatch =>{
    const FetchDateApi = await axios.get(baseUrl + '/supplier_data.php');

    dispatch({

        type    : DATEAPI,
        payload : FetchDateApi.data
    })

}

//FETCHCATEGORY
export const FetchCattegoryData = () => async dispatch =>{
    const FetchCategory = await axios.get(baseUrl + '/product_data.php')

    dispatch({
        type    :   FETCHCATEGORY,
        payload : FetchCategory.data
    })
}

//DELETECATEGORY
export const DeleteCattegoryData = (id) => async dispatch =>{
    const DeleteCategory = await axios.post(baseUrl + `/category_update.php?id=${id}`)

    dispatch({
        type    :   DELETECATEGORY,
        payload :   DeleteCategory.data
    })
}

//SINGLECATEGORY
export const FetchSingleCattegory = (id) => async dispatch =>{
    const SingleCategory = await axios.get(baseUrl + `/single_category_data.php?id=${id}`)
    
    dispatch({
        type    :   SINGLECATEGORY,
        payload :   SingleCategory.data
    })
}

//SINGLEPATIENT
export const FetchSinglePatient = (id) => async dispatch =>{
    const SinglePatient = await axios.get(baseUrl + `/single_patient_data.php?id=${id}`)
    
    dispatch({
        type    :   SINGLEPATIENT,
        payload :   SinglePatient.data
    })
}

//SINGLESUPPLIER
export const FetchSingleSupplier = (id) => async dispatch =>{
    const SingleSupplier = await axios.get(baseUrl + `/single_supplier_data.php?id=${id}`)
    
    dispatch({
        type    :   SINGLESUPPLIER,
        payload :   SingleSupplier.data
    })
}

//EDITPURCHASE
export const FetchSinglePurchase = (id) => async dispatch =>{
    const SinglePurchase = await axios.get(baseUrl + `/single_purchase_data.php?id=${id}`)
    
    dispatch({
        type    :   EDITPURCHASE,
        payload :   SinglePurchase.data
    })
}

//DELETESUPPLIER
export const DeleteSupplierData = (id) => async dispatch =>{
    const DeleteCategory = await axios.post(baseUrl + `/supplier_delete.php?id=${id}`)

    dispatch({
        type    :   DELETESUPPLIER,
        payload :   DeleteCategory.data
    })
}

//DELETEPATIENT
export const DeletePatientData = (id) => async dispatch =>{
    const DeleteCategory = await axios.post(baseUrl + `/patient_delete.php?id=${id}`)

    dispatch({
        type    :   DELETEPATIENT,
        payload :   DeleteCategory.data
    })
}


//DELETEPURCHASE
export const DeletePurchaseData = (id) => async dispatch =>{
    const DeletePurchase = await axios.post(baseUrl + `/purchase_delete.php?id=${id}`)

    dispatch({
        type    :   DELETEPURCHASE,
        payload :   DeletePurchase.data
    })
}

//UPDATEPATIENT
export const UpdatePatientData = (id,data) => async dispatch =>{
    const UpdateCategory = await axios.put(baseUrl + `/patient_update.php?id=${id}`,{...data})

    dispatch({
        type    :   UPDATEPATIENT,
        
    })
}

//UPDATESUPPLIER
export const UpdateSupplierData = (id,data) => async dispatch =>{
    const UpdateSupplier = await axios.put(baseUrl + `/supplier_update.php?id=${id}`,{...data})

    dispatch({
        type    :   UPDATESUPPLIER,
        
    })
}

//UPDATECATTEGORY
export const UpdateCattegoryData = (id,data) => async dispatch =>{
    const UpdateCattegory = await axios.put(baseUrl + `/product_update.php?id=${id}`,{...data})

    dispatch({
        type    :   UPDATECATTEGORY,
        
    })
}

//UPDATEPURCHASE
export const UpdatePurchaseData = (id,data) => async dispatch =>{
    const UpdatePurchase = await axios.put(baseUrl + `/purchase_update.php?id=${id}`,{...data})

    dispatch({
        type    :   UPDATEPURCHASE,
        
    })
}

//ADDINVOICE
export const AddInvoiceData = (data) => async dispatch => {
    //const AddInvoiceapi = await axios.post( baseUrl + '/insert_purchase.php',{ ...data });
    const AddInvoiceapi = await axios.post( baseUrl + '/visit.php',{ ...data });


    dispatch({

        type    : ADDINVOICE
      

    })
}

//FETCHPURCHASE
export const FetchPurchases = () => async dispatch => {
    const ResponseApi = await axios.get( baseUrl + '/purchase_data.php');
    //console.log('action data',ResponseApi.data)
    dispatch({

        type    : FETCHPURCHASE,
        payload : ResponseApi.data

    })
}

//FETCHSUPPLIERNAME
export const FetchSupplName = () => async dispatch => {
    const ResponseApi = await axios.get( baseUrl + '/supplier_name.php');
    //console.log('action data',ResponseApi.data)
    dispatch({

        type    : FETCHSUPPLIERNAME,
        payload : ResponseApi.data

    })
}