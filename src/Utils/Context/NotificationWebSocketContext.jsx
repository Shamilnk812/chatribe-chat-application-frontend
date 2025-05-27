import { createContext, useEffect, useState, useContext, Children, useRef } from "react";
import { useAppStateContext } from "./AppStateContext";
import axiosInstance, { WS_URL } from "../Axios/AxiosInstance";
import ChatNotificationToast from "../../Components/NotificationMessage/ChatNotificationToast";
import { updateUserInterestRequestStatus } from "../Api/InterestRequestApi";
import { toast } from 'sonner';
import { fetchSingleChatUser, fetchChatUserList } from "../Api/FetchChatUsers";




export const NotificatoinWebSocketContext = createContext();



export const NotificatoinWebSocketProvider = ({ children }) => {

    const userId = localStorage.getItem('userId');
    const access = localStorage.getItem('access_token');
    const wsRef = useRef(null);
    const [chatUsersList, setChatUsersList] = useState([]);
    const chatUsersRef = useRef([]);

    const { users, setUsers, setPendingRequests, setPendingRequestCount, setOnlineUsers } = useAppStateContext();


    useEffect(() => {
        chatUsersRef.current = chatUsersList;
    }, [chatUsersList]);



    useEffect(() => {
        if (!userId) return;

        const ws = new WebSocket(`${WS_URL}/notifications/${userId}/?token=${access}`)
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Global WebSocket connected');
        };


        ws.onmessage = async (event) => {
            const response = JSON.parse(event.data);

            const data = response.message || response;

            const { type } = data

            if (type === 'interest_notification') {

                toast.custom((t) => (
                    <ChatNotificationToast 
                        username={data.username} 
                        content={data.content} 
                        timestamp={data.timestamp} t={t} 
                    />
                ), {
                    duration: 3000,
                    position: 'top-right'
                });

                if (data.updated_data) {
                    let userToUpdate = null;

                    if (data.updated_data.status === 'pending') {
                        userToUpdate = data.updated_data.sender;
                    } else {
                        userToUpdate = data.updated_data.receiver;
                    }

                    const sentByMe = parseInt(userId) === data.updated_data.sender.id;

                    setUsers((prevUsers) => {
                        const updatedUsers = updateUserInterestRequestStatus(prevUsers, userToUpdate, {
                            id: data.updated_data.id,
                            status: data.updated_data.status,
                            sent_by_me: sentByMe,
                        });
                        return updatedUsers;
                    });


                    if (data.updated_data.status === 'pending') {
                        setPendingRequests((prev) => {
                            const isAlreadyExists = prev.some((req) => req.id === data.updated_data.id);
                            if (!isAlreadyExists) {
                                const updatedList = [...prev, data.updated_data];
                                setPendingRequestCount(updatedList.length);
                                return updatedList;
                            }
                            return prev;
                        });
                    } else {
                        setPendingRequests((prev) => {
                            const updatedRequests = prev.filter((req) => req.id !== data.updated_data.id);
                            setPendingRequestCount(updatedRequests.length);
                            return updatedRequests;
                        });
                    }
                }

            } else if (type === 'chat_notification') {
                
                    toast.custom((t) => (
                        <ChatNotificationToast 
                            username={data.username} 
                            content={data.content} 
                            timestamp={data.timestamp} t={t} 
                        />
                    ), {
                        duration: 3000,
                        position: 'top-right'
                    });

            }
            else if (type === 'unread_update') {

                try {

                    if (chatUsersRef.current.length === 0) {
                        const chatUsers = await fetchChatUserList(userId);

                        if (chatUsers) {
                            setChatUsersList(chatUsers);
                            chatUsersRef.current = chatUsers;
                        }
                    }

                    // Check if chat room already exist ?
                    const chatRoomExists = chatUsersRef.current.some(
                        user => user?.id === data.chat_room_id
                    );

                    // If not exists, fetch the single chat user
                    if (!chatRoomExists) {
                        const newUser = await fetchSingleChatUser(data.chat_room_id);

                        if (newUser) {
                            setChatUsersList(prev => [...prev, newUser]);
                        }
                    }

                    // Update the unread count and sort
                    setChatUsersList(prevChatUsers => {
                        const updatedChatUsers = prevChatUsers.map(chatUser => {
                            if (chatUser && chatUser.id === data.chat_room_id) {
                                const isUser1 = chatUser.user1 && chatUser.user1.id === data.sender_id;
                                const updatedChatUser = { ...chatUser };

                                if (isUser1) {
                                    updatedChatUser.unread_count_user2 = data.unread_count;
                                } else {
                                    updatedChatUser.unread_count_user1 = data.unread_count;
                                }

                                updatedChatUser.last_message_timestamp = data.timestamp;
                                updatedChatUser.last_message = data.last_message;

                                return updatedChatUser;
                            }
                            return chatUser;
                        });

                        // Filter out any undefined/null chat users just in case
                        const filteredChatUsers = updatedChatUsers.filter(chatUser => chatUser);

                        filteredChatUsers.sort((a, b) => {
                            const aTimestamp = new Date(a.last_message_timestamp).getTime();
                            const bTimestamp = new Date(b.last_message_timestamp).getTime();
                            return bTimestamp - aTimestamp;
                        });

                        return filteredChatUsers;

                    });
                } catch (error) {
                    console.error('Error handling unread_update:', error);
                }
            } else if (type === 'online_users') {
                setOnlineUsers(data.online_users)
            }





        };





        ws.onclose = () => {
            console.log('Global WebSocket disconnected');
        };


        return () => {
            ws.close();
        };


    }, [])


    return (
        <NotificatoinWebSocketContext.Provider value={{ notificationWebSocket: wsRef.current, chatUsersList, setChatUsersList }}>
            {children}
        </NotificatoinWebSocketContext.Provider>
    )

}