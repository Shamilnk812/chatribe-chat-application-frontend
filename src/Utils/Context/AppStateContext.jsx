import { Children, createContext, useContext, useState } from "react";



const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [pendingRequestCount, setPendingRequestCount] = useState(0);
    const [activeTab, setActiveTab] = useState('home')
    // const [chatUsersList, setChatUsersList] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([])


    return (
        <AppStateContext.Provider value={{ users, setUsers, pendingRequests, setPendingRequests, pendingRequestCount, setPendingRequestCount, activeTab, setActiveTab, onlineUsers, setOnlineUsers}}>
            {children}
        </AppStateContext.Provider>
    )
};


export const useAppStateContext = () => useContext(AppStateContext)