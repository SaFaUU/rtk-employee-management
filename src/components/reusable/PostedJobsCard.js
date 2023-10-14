import React from 'react';
import { useToggleJobStatusMutation } from '../../features/job/jobAPI';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const PostedJobsCard = ({ job }) => {
    const [toggleJobStatus] = useToggleJobStatusMutation()
    const dispatch = useDispatch()
    const {
        _id,
        companyName,
        position,
        experience,
        workLevel,
        employmentType,
        salaryRange,
        location,
        overview,
        responsibilities,
        applicants,
        skills,
        requirements,
        jobOpen
    } = job || {};

    const handleJobStatus = () => {
        const data = {
            _id,
            jobOpen: !jobOpen
        }
        dispatch(toggleJobStatus(data))
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-72 h-[380px]">
            <h1 className="text-2xl font-semibold">{position}</h1>
            <p className="text-gray-500 mb-2">{companyName} - {location}</p>
            <div className="mb-4">
                <strong>Experience:</strong> {experience}
            </div>
            <div className="mb-4">
                <strong>Work Level:</strong> {workLevel}
            </div>
            <div className="mb-4">
                <strong>Employment Type:</strong> {employmentType}
            </div>
            <div className="mb-4">
                <strong>Salary Range:</strong> {salaryRange}
            </div>
            <h2 className="text-lg font-semibold my-2">Requirements</h2>
            <ul className="list-disc list-inside">
                {requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                ))}
            </ul>
            <div className="grid grid-cols-2 mt-4 gap-3">
                <Link className=' bg-blue-500 text-white rounded-full px-2 py-1 text-center text-sm' to={`/dashboard/applicants/${_id}`}>Applied: {applicants?.length || 0}</Link>
                <button className={`${!jobOpen ? "bg-red-500" : "bg-green-500"} text-white rounded-full px-2 py-1 text-center`} onClick={handleJobStatus}>{
                    jobOpen ? "Open" : "Close"
                }</button>
            </div>
        </div>
    );
};

export default PostedJobsCard;
