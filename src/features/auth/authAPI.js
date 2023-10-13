import apiSlice from "../../api/apiSlice"
import { getUser } from "./authSlice";


const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/user",
                method: "POST",
                body,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(body.email));
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }),
})

export const { useRegisterMutation } = authAPI;