import React, { useEffect } from "react";
import PostedJobsCard from "../../components/reusable/PostedJobsCard.js";
import { useDispatch, useSelector } from "react-redux";
import { usePostedJobsQuery } from "../../features/job/jobAPI.js";

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth.user);
  const { data: postedJobs, isLoading } = usePostedJobsQuery(email)

  return (
    <div className='flex justify-center items-center overflow-auto p-10'>
      <div className="grid gap-4 grid-cols-3">
        {
          postedJobs?.data?.map((job, index) => (
            <PostedJobsCard job={job} key={index}></PostedJobsCard>
          ))
        }
      </div>
    </div>
  );
};

export default EmployerDashboard;
