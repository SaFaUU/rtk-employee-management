import apiSlice from "../../api/apiSlice";

const jobAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getJobs: build.query({
            query: () => ({
                url: "/jobs",
                method: "GET",
            }),
            providesTags: ["AllJobs"],
        }),
        getApplicants: build.query({
            query: (id) => ({
                url: `/applicants/${id}`,
                method: "GET",
            }),
            providesTags: ["Applicants"],
        }),
        postJob: build.mutation({
            query: (body) => ({
                url: "/job",
                method: "POST",
                body,
            }),
            invalidatesTags: ["PostedJobs", "AllJobs"],
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
            invalidatesTags: ["Job", "AppliedJobs"],
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
        }),
        postedJobs: build.query({
            query: (email) => ({
                url: `/posted-jobs/${email}`,
                method: "GET",
            }),
            providesTags: ["PostedJobs", "JobOpen"],
        }),
        toggleJobStatus: build.mutation({
            query: (body) => ({
                url: `/toggle-job-status`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["JobOpen", "AllJobs"],
        }),
        message: build.mutation({
            query: (body) => ({
                url: "/message",
                method: "PATCH",
                body,
            }),
        }),
        getMessages: build.query({
            query: ({ jobId, employerId, candidateId }) => ({
                url: `/get-messages?jobId=${jobId}&employerId=${employerId}&candidateId=${candidateId}`,
                method: "GET",
            }),
        }),
        getAppliedJobs: build.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
                method: "GET",
            }),
            providesTags: ["AppliedJobs"],
        }),
        changeApplicationStatus: build.mutation({
            query: (body) => ({
                url: `/applicant-status-update`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Applicants"],
        }),
        getCandidateMessages: build.query({
            query: (email) => ({
                url: `/get-candidate-messages/${email}`,
                method: "GET",
            }),
        }),
    }),
})

export const { useGetJobsQuery, usePostJobMutation, useGetJobByIdQuery, useApplyMutation, useQuerryMutation, useReplyMutation, usePostedJobsQuery, useToggleJobStatusMutation, useGetApplicantsQuery, useMessageMutation, useGetMessagesQuery, useGetAppliedJobsQuery, useChangeApplicationStatusMutation, useGetCandidateMessagesQuery } = jobAPI;