import axiosInstance from "../Axios/AxiosInstance"



export const fetchSingleChatUser = async(chatRoomId)=> {
    console.log('feching single user chat romid', chatRoomId)
    try{
        const response = await axiosInstance.get(`chat/get-single-chat-user/${chatRoomId}`)
        return response.data ;
        
    }catch(err){
        console.log('Failed to fetch new chatuser. Please try again later',err)
        return 
    }
}



export const fetchChatUserList = async (userId) => {
    console.log('fetch all chat users',userId)
    try{

        const response = await axiosInstance.get(`chat/get-chat-users/${userId}`)
        return response.data ;
    }catch(err){
        console.log('Failed to fetch chat users. Please try again later')
        
    }
}