import React from 'react'
import axiosInstance from '../Axios/AxiosInstance'
import { toast } from 'sonner';
import usePendingRequests from '../Hooks/UsePendingRequest';



// Send Interest
export const handleSendInterest = async (receiverId, users, setUsers, userId) => {
    try {
        const response = await axiosInstance.post('chat/send-interest-request/', {
            receiver_id: receiverId,
        });
        const sentByMe = (parseInt(userId) === response.data.sender.id); 
        const updatedUsers = updateUserInterestRequestStatus(
            users,
            response.data.receiver,
            {
                id: response.data.id,
                status: response.data.status,
                sent_by_me: sentByMe
            }
        )
        
        setUsers(updatedUsers);
       
    } catch (error) {
        console.error('Error sending interest request:', error);
        toast.error('Failed to send interest request');
    }
};



// Accept/Reject Interest
export const handleInterestRequest = async (interestId, action, users, setUsers, pendingRequests, setPendingRequests, setPendingRequestCount, userId) => {
    
    try {
        const response = await axiosInstance.post('chat/handle-interest-request/', {
            interest_id: interestId,
            action: action,
        });
        toast.success('Interest request updated successfully');
        const sentByMe = (parseInt(userId) === response.data.sender.id); 
        const updatedUsers = updateUserInterestRequestStatus(
            users,
            response.data.sender,
            {
                id: response.data.id,
                status: response.data.status,
                sent_by_me: sentByMe

            }
        )

        setUsers(updatedUsers)

        setPendingRequests(prev => {
            const updatedRequests = prev.filter(request => request.id !== response.data.id);
            setPendingRequestCount(updatedRequests.length);  // update count too
            return updatedRequests;
        });
       

    } catch (error) {
        console.error('Failed to update Interest request', error);
        toast.error('Failed to update Interest request');
    }
};



export const updateUserInterestRequestStatus = (users, receiver, interestStatus) => {
    const updatedUser = {
        ...receiver,
        interest_status: {
            id: interestStatus.id,
            status: interestStatus.status,
            sent_by_me: interestStatus.sent_by_me
        }
    };


    return users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
    );
}