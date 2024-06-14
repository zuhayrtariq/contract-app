import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const requisitionApi = createApi({
    
    reducerPath: 'requisition',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL+'/requisitions',credentials: 'include',}),
    credentials: "include",
    endpoints: (builder)=> ({
        getAllRequisitions : builder.query(
            {
                providesTags: ['Requisitions'],
                query : (args) =>{
                    const {sectionCode,archived,emailAlerts} = args;
                    return{
                        url: '/',
                        params: {sectionCode,archived,emailAlerts},
                        method: 'GET',
                    }
                }
            }
        ),
        getRequisition : builder.query(
            {
                providesTags: ['Requisitions'],
                query : (reqNo) =>{
                    return{
                        url: `/${reqNo}`,
                        method: 'GET',
                    }
                }
            }
        ),
        getSectionRequisitions : builder.query(
            {
                providesTags: ['Requisitions'],
                query : (sectionCode) =>{
                    return{
                        url: `/`,
                        params: {sectionCode},
                        method: 'GET',
                    }
                }
            }
        ),
        insertRequisition : builder.mutation(
            {
                invalidatesTags: ['Requisitions'],
                query : (reqDetails) =>{
                   return{
                    url: '/',
                    body: reqDetails,
                    method: 'POST'
                   }
                }
            },
        ),
        updateRequisition : builder.mutation(
            {
                invalidatesTags: ['Requisitions'],
                query : (reqDetails) =>{
                   return{
                    url: `${reqDetails.reqNo}`,
                    body: reqDetails,
                    method: 'PATCH'
                   }
                }
            },
        ),
        deleteRequisition : builder.mutation({
            invalidatesTags: ['Requisitions'],
            query: (reqNo) =>{
                return{
                    url: `/${reqNo}`,
                    method: 'DELETE',

                }
            }
        })
    })
})

export const {useInsertRequisitionMutation,useGetAllRequisitionsQuery,useGetSectionRequisitionsQuery,useDeleteRequisitionMutation,useGetRequisitionQuery,useUpdateRequisitionMutation,
    useLazyGetRequisitionQuery
} = requisitionApi

export {requisitionApi}