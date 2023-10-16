import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useChangeApplicationStatusMutation, useGetApplicantsQuery } from '../../features/job/jobAPI';
import MessageModal from '../../components/reusable/MessageModal';

const CandidateInfoTable = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const { data, isLoading } = useGetApplicantsQuery(id)
    const [changeApplicationStatus] = useChangeApplicationStatusMutation()
    const applicants = data?.data
    const [modalOpen, setModalOpen] = useState(false)
    const [appicantID, setApplicantID] = useState("")

    const { userId } = useSelector(state => state.auth.user)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const [selectedValue, setSelectedValue] = useState(''); // State to hold the selected value

    // Function to handle value changes
    const handleValueChange = (e) => {
        setSelectedValue(e.target.value);
        console.log(e.target.value);
        const newData = {
            jobId: id,
            userId: userId,
            status: e.target.value
        }
        dispatch(changeApplicationStatus(newData))
    };
    console.log(applicants);

    return (
        <div className='flex justify-center items-center overflow-clip py-10'>
            {
                modalOpen && <MessageModal closeModal={closeModal} candidateID={appicantID} jobID={id}></MessageModal>
            }
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postcode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants?.map((applicant, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.gender}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.country}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.city}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{applicant.postcode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    id="dropdown"
                                    name="dropdown"
                                    value={applicant?.approvalStatus}
                                    onChange={handleValueChange}
                                    className="mt-2 p-2 border rounded-lg w-36"
                                >
                                    <option value="reject">Reject</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                                <button className='bg-purple-500 rounded-xl px-3 text-white py-1' onClick={() => {
                                    openModal()
                                    setApplicantID(applicant._id)
                                }}>Message</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateInfoTable;