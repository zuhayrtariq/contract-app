import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coffApi = createApi({
    reducerPath : 'coff',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL+ '/call-offs',credentials: 'include'}),
    credentials: "include",
    endpoints : (builder) =>({
        getAllCoff : builder.query({
            providesTags: ['Call-offs'],
            query: (args) =>{
                const {sectionCode,archived,emailAlerts,startDateGT,startDateLT,endDateGT,endDateLT} = args;
                return{
                    url: '/',
                    method: 'GET',
                    params: {sectionCode,archived,emailAlerts,startDateGT,startDateLT,endDateGT,endDateLT}
                }
             }
        }),
        getCoff : builder.query({
            providesTags: ['Call-offs'],
            query: (coffNo) =>{
                return{
                    url: `/${coffNo}`,
                    method: 'GET'
                }
            }
        }),
        getCoffValidity : builder.query({
            providesTags: ['Call-offs'],
            query : (sectionCode) =>{
                return{
                    url : '/validity',
                    params: {sectionCode},
                    method : 'GET',
                }
            }
        }),
        getSESValidity : builder.query({
            providesTags: ['Call-offs'],
            query : () =>{
                return{
                    url : '/validity/ses',
                    method : 'GET',
                }
            }
        }),
        updateCallOff : builder.mutation({
            invalidatesTags: ['Call-offs'],
            query: (coffDetails) =>{
                return{
                    url: `/${coffDetails.coffNo}`,
                    body: coffDetails,
                    method: 'PATCH',
                }
            }
        }),
        deleteCallOff : builder.mutation({
            invalidatesTags: ['Call-offs'],
            query: (coffNo) =>{
                return{
                    url: '/delete',
                    body: {coffNo},
                    method: 'POST',
                }
            } 
        })
     })
})
export const {useGetAllCoffQuery,useGetCoffValidityQuery,useGetSESValidityQuery,useUpdateCallOffMutation,useDeleteCallOffMutation,useLazyGetCoffQuery} = coffApi

export {coffApi}