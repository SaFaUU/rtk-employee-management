
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    endpoints: (build) => ({

    })
})

export default apiSlice;