import apiSlice from "../../api/apiSlice"


const authAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (data) => ({
                url: "/user",
                method: "POST",
                body: data,
            }),
        })
    })
})

export const { useRegisterMutation } = authAPI;