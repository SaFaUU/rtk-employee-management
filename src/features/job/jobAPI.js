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
            providesTags: ["Job", "Querry"],
        }),
        apply: build.mutation({
            query: (body) => ({
                url: `/apply`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Job"],
        }),
        querry: build.mutation({
            query: (body) => ({
                url: "/query",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Querry"],
        }),
        reply: build.mutation({
            query: (body) => ({
                url: "/reply",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Querry"],
        })
    }),
})

export const { useGetJobsQuery, usePostJobMutation, useGetJobByIdQuery, useApplyMutation, useQuerryMutation, useReplyMutation } = jobAPI;