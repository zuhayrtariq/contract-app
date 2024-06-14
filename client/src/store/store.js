import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contractsApi } from "./apis/contractsApi";
import { consolidatedApi } from "./apis/consolidatedApi";
import { coffApi } from "./apis/coffApi";
import { requisitionApi } from "./apis/requisitionApi";
import { loginApi } from "./apis/LoginApi";
export const store = configureStore({
        reducer:{
            [contractsApi.reducerPath] : contractsApi.reducer,
            [coffApi.reducerPath] : coffApi.reducer,
            [consolidatedApi.reducerPath] : consolidatedApi.reducer,
            [requisitionApi.reducerPath] : requisitionApi.reducer,
            [loginApi.reducerPath] : loginApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>{
            return getDefaultMiddleware()
            .concat(contractsApi.middleware)
            .concat(coffApi.middleware)
            .concat(consolidatedApi.middleware)
            .concat(requisitionApi.middleware)
            .concat(loginApi.middleware)
        }
})

setupListeners(store.dispatch)

// export {useFetchActivitiesQuery,useFetchActivityFilesQuery,useAddActivityFileMutation,useDeleteActivityFileMutation} from './apis/ActivityApi'

export {useGetContractsQuery,useGetContractsValueQuery,useGetContractValidityQuery,useGetAllContractsQuery,useGetAllContractsWithCoffQuery,useUpdateContractMutation}  from "./apis/contractsApi";
export {useGetTotalDataQuery} from './apis/consolidatedApi'
export {useGetAllCoffQuery,useGetCoffValidityQuery} from './apis/coffApi'

export {useInsertRequisitionMutation,useGetAllRequisitionsQuery,useGetSectionRequisitionsQuery,useDeleteRequisitionMutation,useGetRequisitionQuery,useUpdateRequisitionMutation} from './apis/requisitionApi'