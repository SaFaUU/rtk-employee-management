import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const navigate = useNavigate();
  const { _id, position, companyName, location, employmentType, approvalStatus } =
    jobData || {};

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        {
          !window.location.pathname.includes("/jobs") &&
          <p className={`${approvalStatus === 'approved' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full`}>{approvalStatus}</p>
        }
        <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
