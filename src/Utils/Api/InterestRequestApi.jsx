import React from 'react'
import axiosInstance from '../Axios/AxiosInstance'
import { toast } from 'sonner';
import usePendingRequests from '../Hooks/UsePendingRequest';



// Send Interest
export const handleSendInterest = async (receiverId, fetchUsersCallback) => {
    try {
        const response = await axiosInstance.post('chat/send-interest-request/', {
            receiver_id: receiverId,
        });
        console.log('Interest sent:', response.data);
        if (fetchUsersCallback) fetchUsersCallback(); // optional callback
    } catch (error) {
        console.error('Error sending interest request:', error);
        toast.error('Failed to send interest request');
    }
};



// Accept/Reject Interest
export const handleInterestRequest = async (interestId, action, fetchUsersCallback) => {
    
    try {
        const response = await axiosInstance.post('chat/handle-interest-request/', {
            interest_id: interestId,
            action: action,
        });
        console.log('Interest updated:', response.data);
        toast.success('Interest request updated successfully');
        if (fetchUsersCallback) fetchUsersCallback(); 
    } catch (error) {
        console.error('Failed to update Interest request', error);
        toast.error('Failed to update Interest request');
    }
};
