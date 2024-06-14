import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginApi = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL,credentials: 'include',}),
    
    endpoints : (builder) =>({
        adminLogin : builder.mutation({
            query : ({username,password}) =>{
               
                return{
                    url: '/admin/auth',
                    body: {username,password},
                    method : "POST"
                }
            }
        }),
        adminLogout : builder.mutation({
            query : () =>{
                return{
                    url : '/admin/logout',
                    method : "POST",
                }
            }
        })
    })
})

export {loginApi};
export const {useAdminLoginMutation,useAdminLogoutMutation} = loginApi
