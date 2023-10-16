import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessagesQuery, useMessageMutation } from '../../features/job/jobAPI';

const MessageModal = ({ closeModal, candidateID, jobID }) => {
    const [newMessage, setNewMessage] = useState('');
    const messageContainerRef = useRef(null);
    const { _id: employerID, role } = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const [sendMessage, { isLoading }] = useMessageMutation();

    const { data } = useGetMessagesQuery({ jobId: jobID, employerId: employerID, candidateId: candidateID }, {
        pollingInterval: 1000
    })
    const messages = data?.data

    const handleSendMessage = (message) => {
        const newMessage = { text: message, sender: role };
        const newData = {
            jobID: jobID,
            employerID: employerID,
            candidateID: candidateID,
            messages: [...messages, newMessage],
        }
        async function fetchMessages() {
            dispatch(sendMessage(newData));
        }
        fetchMessages();
        setNewMessage('');
    };

    const handleSendClick = () => {
        if (newMessage.trim() !== '') {
            handleSendMessage(newMessage);
            setNewMessage('');
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newMessage.trim() !== '') {
            handleSendMessage(newMessage);
            setNewMessage('');
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="bg-gray-100 pb-4 w-1/3 h-96 z-10 fixed top-60 rounded-lg shadow-md border right-96">
            <div className="max-w-xl mx-auto flex flex-col justify-end rounded-lg  h-full">
                <div className='grow'>
                    <div className='bg-purple-500 w-full flex items-center'>
                        <p className='text-center text-white py-2 grow pl-3'>Messages</p>
                        <button className='bg-white p-2 rounded-full text-purple-500 h-5 w-5 text-center align-middle items-center justify-center flex mr-3 font-bold' onClick={closeModal}>X</button>
                    </div>
                </div>
                <div className="mb-4 overflow overflow-y-scroll pr-5 px-4 pt-4" ref={messageContainerRef}>
                    {
                        messages?.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${message.sender !== role ? 'text-left' : 'text-right'}`}
                            >
                                <div className="bg-white p-2 rounded-lg shadow-md inline-block">
                                    {message.text}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex space-x-2 px-4">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSendClick}
                        className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;