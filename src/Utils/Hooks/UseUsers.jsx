import axiosInstance from "../Axios/AxiosInstance";
import { useState, useEffect } from "react";
import useDebounce from "./UseDebounce";

const useUsers = (initialSearch = '') => {
    const userId = localStorage.getItem('userId');
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [users, setUsers] = useState([]);
  
    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/get-all-users/${userId}/?search=${debouncedSearch}`);
        // setUsers(response.data);
        setUsers([...response.data]);

        console.log(response.data)
        console.log('iam working')
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    useEffect(() => {
      if (userId) {
        fetchAllUsers();
      }
    }, [debouncedSearch, userId]);
  
    return {
      users,
      searchQuery,
      setSearchQuery,
      fetchAllUsers,
    };
  };
  
  export default useUsers;