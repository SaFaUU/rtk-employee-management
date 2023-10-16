import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobAPI";
import { appliedJobFilterChange } from "../../features/auth/authSlice";

const AppliedJobs = () => {
  const [menuState, setMenuState] = useState(false);
  const { appliedJobFilter } = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  console.log(data?.data);

  let content;
  if (appliedJobFilter === "all" || appliedJobFilter === "none") {
    content = data?.data?.map((job, index) => (
      <JobCard key={index} jobData={job} />
    ));
  }
  if (appliedJobFilter === "pending") {
    content = data?.data?.filter((job) => job.approvalStatus === "pending").map((job, index) => (
      <JobCard key={index} jobData={job} />
    ));
  }
  if (appliedJobFilter === "approved") {
    content = data?.data?.filter((job) => job.approvalStatus === "approved").map((job, index) => (
      <JobCard key={index} jobData={job} />
    ));
  }
  if (appliedJobFilter === "recent") {
    if (data?.data.length > 1) {
      const unsortedData = [...data?.data];
      content = unsortedData.sort((a, b) => { return new Date(b.timestamp) - new Date(a.timestamp) }).map((job, index) => (
        <JobCard key={index} jobData={job} />
      ));
    }
    else {
      content = data?.data.map((job, index) => (
        <JobCard key={index} jobData={job} />
      ));
    }
  }
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className="flex grow justify-end mb-10">
        <div className="relative inline-block text-left">
          <div>
            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setMenuState(!menuState)}>
              {toTitleCase(appliedJobFilter)}
              <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {
            menuState &&
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <p href="#" className="cursor-pointer hover:bg-slate-400 hover:text-white text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => dispatch(appliedJobFilterChange("recent"))}>Recent</p>
                <p href="#" className="cursor-pointer hover:bg-slate-400 hover:text-white text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => dispatch(appliedJobFilterChange("approved"))}>Approved</p>
                <p href="#" className="cursor-pointer hover:bg-slate-400 hover:text-white text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1" onClick={() => dispatch(appliedJobFilterChange("pending"))}>Pending</p>
                <p href="#" className="cursor-pointer hover:bg-slate-400 hover:text-white text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2" onClick={() => dispatch(appliedJobFilterChange("rejected"))}>Rejected</p>
                <p href="#" className="cursor-pointer hover:bg-slate-400 hover:text-white text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2" onClick={() => dispatch(appliedJobFilterChange("all"))}>All</p>
              </div>
            </div>
          }
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {content}
      </div>
    </div>
  );
};

export default AppliedJobs;
