import axiosInstance from "../Axios/AxiosInstance"



const useFetchSingleChatUser = (chatRoomId) => {
    console.log('neeeew chat room data', chatRoomId)
    
    const fetchSingleChatUser = async ()=> {
      
        try{
            const response = await axiosInstance.get(`chat/get-single-chat-user/${chatRoomId}`)
            return response.data
        }catch(err){
            console.error('Filed to fetch chat user',err)
            throw err;
        }
    }


    return {fetchSingleChatUser}
}

export default useFetchSingleChatUser;