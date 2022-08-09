import React from 'react'
import axios from 'axios';
import {ERROR, FETCHPPHARMACY, FETCHPOPTICAL, FETCHPOPD, 
     CATEGORYDATA, PRODUCTINSERT, FETCHPRODUCT, PRODUCTBYID, UPDATEPRODUCT, DELETEPRODUCT,
     SUPPLIERINSERT,  SUPPLIERFETCH, SUPPLIERBYID, UPDATESUPPLIER, DELETEESUPPLIER, 
     PURCHASEINSERT, PURCHASEFETCH, PURCHASEBYID, UPDATEPURCHASE, DELETEEPURCHASE, FETCHPURCHASEDETAIL,
     PURCHASEDETAILINSERT, PURCHASEDETAILFETCH, PURCHASEDETAILBYID, UPDATEPURCHASEDETAIL, DELETEEPURCHASEDETAIL,
     PATIENTINSERT,  PATIENTFETCH, PATIENTBYID, UPDATEPATIENT, DELETEPATIENT,
     DOWNLOADFILE,INVENTORYFILE,VISITDATASEARCH,PRESCRIPTIONDETAIL} 
     from '../actionType/ActionType'
import { linkUrl } from '../../Components/baseurl';



                    //PATIENT //
//PATIENTINSERT
export const InsertPatient = (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'patient.php',{"action" : "AddNewPatient",...data})
        dispatch({
            type    : PATIENTINSERT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//PATIENTFETCH
export const FetchPatient = (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'patient.php',{...data})
        dispatch({
            type    : PATIENTFETCH,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//PATIENTBYID
export const FetchSinglePatient = ( data) => async dispatch =>{
    //console.log("getSupplierByID",id)
    try{
      const res = await axios.post(linkUrl + `patient.php`,{...data})
      dispatch({
          type    :   PATIENTBYID,
          payload :   res.data
      })
    }catch(e){
      dispatch({
          type    : ERROR,
          payload : console.log(e)
      })
    }
  }

//UPDATEPATIENT
export const PatientUpdate= (id, data) => async dispatch =>{
    //console.log('hello',data)
    try{
    const response = await axios.post(linkUrl + `patient.php?${id}`,{"action" : "UpdatePatient",...data})
        dispatch({
            type    : UPDATEPATIENT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//DELETEPATIENT
export const DeletePatient = (data) => async dispatch =>{
    console.log('data of delete is', data)
    try{
        const response = await axios.post(linkUrl + `patient.php`,{...data})
        dispatch({
            type    : DELETEPATIENT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }


                     //PRODUCT AND FETCHCATTEGORY //

//CATEGORYDATA
 export const categoryData = (data) => async dispatch => {
    console.log("data is",data)
 try{
 const response = await axios.post(linkUrl + 'product.php',{...data}) 

 dispatch({
    type    : CATEGORYDATA,
    payload : response.data
 }) 
 }catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
 }

 } 

 //PRODUCTINSERT
 export const ProductInsert = (data) => async dispatch =>{
      //console.log("data is",data)
    try{
    //const response = await axios.post(linkUrl + 'product.php',{"action" : "AddNewProduct",...data})
    const response = await axios.post(linkUrl + 'product.php',{...data})
        dispatch({
            type    : PRODUCTINSERT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

 //FETCHPRODUCT
 export const FetchProduct = (fetch) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + 'product.php',{...fetch})
        dispatch({
            type    : FETCHPRODUCT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

 //FETCHPPHARMACY
 export const FetchProductPharmacy = (fetch) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + 'product.php',{...fetch})
        dispatch({
            type    : FETCHPPHARMACY,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//FETCHPOPTICAL
export const FetchProductOptical = (fetch) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + 'product.php',{...fetch})
        dispatch({
            type    : FETCHPOPTICAL,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//FETCHPOPD
export const FetchProductOpd = (fetch) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + 'product.php',{...fetch})
        dispatch({
            type    : FETCHPOPD,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }


//PRODUCTBYID
export const FetchSingleProduct = (data) => async dispatch =>{
    console.log('PRODUCTBYID is', data)
  try{
    const res = await axios.post(linkUrl + `product.php`,{...data})

    //const res = await axios.post(linkUrl + `product.php?product_id=${id}`,{"action" : "getProductByID",...data})
    //const res = await axios.post(linkUrl + `purchase.php`,{...data})

    dispatch({
        type    :   PRODUCTBYID,
        payload :   res.data
    })
  }catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
  }
}

 //UPDATEPRODUCT
 export const UpdateProduct = (data) => async dispatch =>{
    console.log('UPDATEPRODUCT is', data)
    try{
        const response = await axios.post(linkUrl + `product.php`,{...data})
        dispatch({
            type    : UPDATEPRODUCT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//DELETEPRODUCT
export const DeleteProduct = (data) => async dispatch =>{
    //console.log('first', data)
    try{
        const response = await axios.post(linkUrl + `product.php`,{...data})
        dispatch({
            type    : DELETEPRODUCT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }


                               // SUPPLIER  //

//SUPPLIERINSERT
export const SupplierInsert = (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'supplier.php',{"action" : "AddNewSupplier",...data})
        dispatch({
            type    : SUPPLIERINSERT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//SUPPLIERFETCH
export const SupplierFetch= (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'supplier.php',{...data})
        dispatch({
            type    : SUPPLIERFETCH,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//SUPPLIERBYID
export const FetchSingleSupplier = ( data) => async dispatch =>{
    //console.log("getSupplierByID",id)
    try{
      const res = await axios.post(linkUrl + `supplier.php`,{...data})
      dispatch({
          type    :   SUPPLIERBYID,
          payload :   res.data
      })
    }catch(e){
      dispatch({
          type    : ERROR,
          payload : console.log(e)
      })
    }
  }

//UPDATESUPPLIER
export const SupplierUpdate= (id, data) => async dispatch =>{
    console.log('hello',data)
    try{
    const response = await axios.post(linkUrl + `supplier.php?${id}`,{"action" : "UpdateSupplier",...data})
        dispatch({
            type    : UPDATESUPPLIER,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }

//DELETEESUPPLIER
export const DeleteSupplier = (data) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + `supplier.php`,{...data})
        dispatch({
            type    : DELETEESUPPLIER,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
 }


                 //       PURCHASE       //

// PURCHASEINSERT                   
export const PurchaseInsert = (data) => async dispatch =>{
    console.log('data is', data)
try{
const response = await axios.post(linkUrl + 'purchase.php',{...data})
    dispatch({
        type    : PURCHASEINSERT,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//PURCHASEFETCH
export const PurchaseFetch= (data) => async dispatch =>{
try{
const response = await axios.post(linkUrl + 'purchase.php',{...data})
    dispatch({
        type    : PURCHASEFETCH,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//PURCHASEBYID
export const FetchSinglePurchase = (data) => async dispatch =>{
    //console.log('data is', data)
try{
    const res = await axios.post(linkUrl + `purchase.php`,{...data})
    dispatch({
        type    :   PURCHASEBYID,
        payload :   res.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//UPDATEPURCHASE
export const PurchaseUpdate= (data) => async dispatch =>{
try{
const response = await axios.post(linkUrl + `purchase.php`,{...data})
    dispatch({
        type    : UPDATEPURCHASE,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//DELETEEPURCHASE
export const DeletePurchase = (data) => async dispatch =>{
try{
    const response = await axios.post(linkUrl + `purchase.php`,{...data})
    dispatch({
        type    : DELETEEPURCHASE,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//DELETEEPURCHASEDETAIL
export const DeletePurchaseDetail = (data) => async dispatch =>{
    try{
        const response = await axios.post(linkUrl + `purchase.php`,{...data})
        dispatch({
            type    : DELETEEPURCHASEDETAIL,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
    }

//FETCHPURCHASEDETAIL
export const FetchPurchaseDetail= (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'purchase.php',{...data})
        dispatch({
            type    : FETCHPURCHASEDETAIL,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
    }


                        //  PURCHASEDETAIL ACTION  //
// PURCHASEDETAILINSERT                   
export const PurchaseDetailInsert = (data) => async dispatch =>{
    try{
    const response = await axios.post(linkUrl + 'PurchaseDetail/purchase_detail.php',
    {"action":"AddNewPurchaseDetail",...data})
        dispatch({
            type    : PURCHASEDETAILINSERT,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
    }
    
//PURCHASEDETAILFETCH
export const PurchaseDetailFetch = (data) => async dispatch =>{
try{
const response = await axios.post(linkUrl + 'PurchaseDetail/purchase_detail.php',{...data})
    dispatch({
        type    : PURCHASEDETAILFETCH,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//PURCHASEDETAILBYID
export const FetchSinglePurchaseDetail = (id) => async dispatch =>{
try{
    const res = await axios.post(linkUrl + `product_fetch.php?id=${id}`)
    dispatch({
        type    :   PURCHASEDETAILBYID,
        payload :   res.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//UPDATEPURCHASEDETAIL
export const PurchaseDetailUpdate= (data, id) => async dispatch =>{
try{
const response = await axios.post(linkUrl + `PurchaseDetail/purchase_detail.php?${id}`,{...data})
    dispatch({
        type    : UPDATEPURCHASEDETAIL,
        payload : response.data
    })
}catch(e){
    dispatch({
        type    : ERROR,
        payload : console.log(e)
    })
}
}

//DOWNLOADFILE//

export const DownloadFiles= (id) => async dispatch =>{
    console.log('DownloadFiles id is', id)
    try{
    const response = await axios.post(linkUrl+`downloadfile.php?id=${id}`)
        dispatch({
            type    : DOWNLOADFILE,
            payload : response.data
        })
    }catch(e){
        dispatch({
            type    : ERROR,
            payload : console.log(e)
        })
    }
    }

   // inventoryaction//

   export const getAllInventory = (data) => async dispatch => {
    console.log('inventory id is', data)
    try{
        const response = await axios.post(linkUrl+ `inventory.php`,{...data})
        console.log('inventory ', response)
        dispatch({
            type : INVENTORYFILE,
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
    
   }

   // VISITDATASEARCH//

   export const getnamephoneaadhar = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        console.log('search ', response)
        dispatch({
            type : VISITDATASEARCH,
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }


   // prescriptionDetail//

   export const prescriptionDetail = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        console.log('search ', response)
        dispatch({
            type : PRESCRIPTIONDETAIL,
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }
   export const medicalDetail = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        console.log('search ', response)
        dispatch({
            type : 'MEDICAL_DETAIL',
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }

   export const quantitydata = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        console.log('quantiytyt ', response)
        dispatch({
            type : 'QUANTITY',
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }

   export const AddInvoiceData = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        
        dispatch({
            type : 'SAVEDATA',
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }

   export const downloadFile = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `visit.php`,{...data})
        
        dispatch({
            type : 'DOWNLOADDATA',
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }

   export const reportPharmacy = (data) => async dispatch => {
    try{
        const response = await axios.post(linkUrl+ `stock.php`,{...data})
        
        dispatch({
            type : 'REPORTPHARMECY',
            payload : response.data
        })
    }
    catch(e){
        dispatch({
            type : ERROR,
            payload : console.log(e)
        })
    }
   }

   


// //DELETEEPURCHASEDETAIL
// export const DeletePurchaseDetail = (data) => async dispatch =>{
// try{
//     const response = await axios.post(linkUrl + `purchase.php`,{...data})
//     dispatch({
//         type    : DELETEEPURCHASEDETAIL,
//         payload : response.data
//     })
// }catch(e){
//     dispatch({
//         type    : ERROR,
//         payload : console.log(e)
//     })
// }
// }