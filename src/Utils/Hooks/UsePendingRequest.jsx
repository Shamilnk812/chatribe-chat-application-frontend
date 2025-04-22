import axiosInstance from "../Axios/AxiosInstance";
import { useState, useEffect } from "react";


const usePendingRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [pendingRequestCount, setPendingRequestCount] = useState(0);
    const [loading, setLoading] = useState(true);
  
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('chat/get-interest-request/');
        setPendingRequests(response.data);
        setPendingRequestCount(response.data.length);
      } catch (error) {
        console.error('Failed to fetch pending requests:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPendingRequests();
    }, []);
  
    return {
      pendingRequests,
      pendingRequestCount,
      loading,
      setPendingRequests,
      setPendingRequestCount,
      fetchPendingRequests,
    };
  };
  
  export default usePendingRequests;