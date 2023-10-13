import apiSlice from "../../api/apiSlice";

const jobAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getJobs: build.query({
            query: () => ({
                url: "/jobs",
                method: "GET",
            })
        }),
        postJob: build.mutation({
            query: (body) => ({
                url: "/job",
                method: "POST",
                body,
            })
        }),
        getJobById: build.query({
            query: (id) => ({
                url: `/job/${id}`,
                method: "GET",
            }),
            providesTags: ["Job"],
        }),
        apply: build.mutation({
            query: (body) => ({
                url: `/apply`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Job"],
        })
    }),
})

export const { useGetJobsQuery, usePostJobMutation, useGetJobByIdQuery, useApplyMutation } = jobAPI;