import { useEffect, useState } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import { useAppStateContext } from "../Context/AppStateContext";



const useChatUsersList = (userId) => {

    const {chatUsersList,setChatUsersList} = useAppStateContext()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchChatUserList = async ()=> {
        try{
            setLoading(true);
            const response = await axiosInstance.get(`chat/get-chat-users/${userId}`);
            setChatUsersList(response.data);
        }catch(err){
            console.error('Failed to fetch chat user list',err);
            setError(err);
        }finally{
            setLoading(false);
        }
    };
    

    useEffect(()=> {
        if (userId){
            fetchChatUserList();
        }
    },[userId])


    return {chatUsersList, loading, error, fetchChatUserList}

}



export default useChatUsersList;