import { Children, createContext, useContext, useState } from "react";



const AppStateContext = createContext();

export const AppStateContextProvider = ({children}) => {
    
    const [users, setUsers] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [pendingRequestCount, setPendingRequestCount] = useState(0);

    return(
        <AppStateContext.Provider value={{ users, setUsers, pendingRequests, setPendingRequests, pendingRequestCount, setPendingRequestCount }}>
         {children}
        </AppStateContext.Provider>
    )
};


export const useAppStateContext  = ()=> useContext(AppStateContext)