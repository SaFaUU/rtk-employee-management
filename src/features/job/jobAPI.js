import apiSlice from "../../api/apiSlice";

const jobAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getJobs: build.query({
            query: () => ({
                url: "/jobs",
                method: "GET",
            })
        })
    }),
})

export const { useGetJobsQuery } = jobAPI;