const initfetch = {reportpharmacydata : [] }

const reportReducer = (state = initfetch, action) =>{
   switch(action.type) {
         case 'REPORTPHARMECY' :
            return { ...state,
                reportpharmacydata : action.payload

            };

        default : return {...state};
   }
}

export default reportReducer;