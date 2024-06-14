import { createApi, fetchBaseQuery } from  "@reduxjs/toolkit/query/react"

const contractsApi = createApi({
    reducerPath: 'contract',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL+'/contracts', credentials: "include",}),
   
    endpoints:(builder)=>({
        getAllContracts : builder.query({
            providesTags: ['Contracts'],
            query: () =>{
                return{
                    url: '/',
                    method: 'GET'
                }
            }
        }),
        getContract : builder.query({
            providesTags: ['Contracts'],
            query: (contractNo) =>{
                return{
                    url: `/${contractNo}`,
                    method: 'GET'
                }
            }
        }),

        getContractWithCoff : builder.query({
            providesTags: ['Contracts'],
            query: (contractNo) =>{
                return{
                    url: `/${contractNo}?withCoff=true`,
                    method: 'GET'
                }
            }
        }),

        getAllContractsWithCoff : builder.query({
            
            providesTags: ['Contracts'],
            query: (args) =>{
                const {sectionCode,archived,emailAlerts,startDateGT,startDateLT,endDateGT,endDateLT} = args;
              
                return{
                    url: '?withCoff=1',
                    method: 'GET',
                    params : {sectionCode,archived,emailAlerts,startDateGT,startDateLT,endDateGT,endDateLT}
                }
            }
        }),
        getContracts : builder.query({
            providesTags: ['Contracts'],
            query: () =>{
                return{
                    url: '/',
                    method: 'GET'
                }
            }
        }),
        getContractsValue : builder.query({
            providesTags: ['Contracts'],
            query : () =>{
                return{
                    url: '/value',
                    method: 'GET'
                }
            }
        }),
        getContractValidity : builder.query({
            providesTags: ['Contracts'],
            query : (sectionCode) =>{
                
                return{
                    url : '/validity',
                    params : {sectionCode},
                    method : 'GET',
                }
            }
        }),
        updateContract : builder.mutation({
            invalidatesTags: ['Contracts'],
            query: (contractDetails) =>{
                return{
                    url: `/${contractDetails.contractNo}`,
                    body: contractDetails,
                    method: 'PATCH',
                }
            }
        }),
        deleteContract : builder.mutation({
            invalidatesTags: ['Contracts'],
            query: (contractNo) =>{
                return{
                    url: '/delete',
                    body: {contractNo},
                    method: 'POST',
                }
            } 
        })
    })
})

// contractsApi.useGetContractsQuery();

export const {useGetContractsQuery,useGetContractsValueQuery,useGetContractValidityQuery,useGetAllContractsQuery,useGetAllContractsWithCoffQuery, useUpdateContractMutation, useDeleteContractMutation,useLazyGetContractQuery,
    useLazyGetContractWithCoffQuery
} = contractsApi;
export {contractsApi}