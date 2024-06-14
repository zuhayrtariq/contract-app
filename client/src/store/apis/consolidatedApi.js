import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const consolidatedApi = createApi({
    reducerPath : 'consolidated',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL + '/data'}),
    endpoints : (builder) =>({
        getTotalData : builder.query({
            query: () =>{
                return{
                    url: '/total?archived=0',
                    method: 'GET'
                }
             }
        })
     })
})
export const {useGetTotalDataQuery} = consolidatedApi

export {consolidatedApi}