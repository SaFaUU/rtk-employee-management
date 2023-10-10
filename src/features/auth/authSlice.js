import apiSlice from "../../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            }),
        })
    })
})