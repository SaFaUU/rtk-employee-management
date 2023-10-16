import React, { useState } from 'react';
import { useGetCandidateMessagesQuery } from '../../features/job/jobAPI';
import { useSelector } from 'react-redux';
import MessageModal from '../../components/reusable/MessageModal';

const CandidateMessages = () => {
    const { email, _id } = useSelector(state => state.auth.user)
    const [jobId, setJobId] = useState('')
    const { data } = useGetCandidateMessagesQuery(email)
    const [modalOpen, setModalOpen] = useState(false)
    console.log(data?.data);

    const getLastMessage = (messages) => {
        if (messages && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            return lastMessage.text;
        } else {
            return 'No messages';
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='text-xl py-5'>
            <p>Inbox</p>
            {
                modalOpen && <MessageModal closeModal={closeModal} candidateID={_id} jobID={jobId}></MessageModal>
            }
            <div className='mt-5 space-y-4'>
                {
                    data?.data?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="p-4 border rounded hover:bg-white hover:shadow-md transition duration-300 cursor-pointer"
                                onClick={() => {
                                    setJobId(item._id);
                                    openModal();
                                }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-500">
                                            {item.companyName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{item.position}</p>
                                        <p className="text-xs text-gray-700">{item.location}</p>
                                    </div>
                                    <div>
                                        <div className="text-right text-sm text-gray-700">
                                            Last Message:
                                        </div>
                                        <p className="text-right text-sm font-semibold text-blue-600">
                                            {getLastMessage(item?.applicants?.messages)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CandidateMessages;