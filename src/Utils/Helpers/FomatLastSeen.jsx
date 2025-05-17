import {format, isToday, isYesterday} from 'date-fns'


export const FormatLastSeen = (timestamp)=> {
    if (!timestamp) return ""; 
    const lastSeenTime = new Date(timestamp)
    if (isNaN(lastSeenTime)) return ""; 

    if(isToday(lastSeenTime)){
        return format(lastSeenTime, "hh:mm a");
    }else if(isYesterday(lastSeenTime)){
        return "Yesterday"
    }else{
        return format(lastSeenTime, "dd/MM/yy");
    }
};


 