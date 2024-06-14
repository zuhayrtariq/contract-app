import { compareDates, getTodayDate } from "../hooks/date.hook";

export const getStatus = (date,expDate) =>{
    const expired = compareDates(getTodayDate(),date,'YYYY-MM-DD');
    if(expired)
    {     
        return -1;
    }
    else{
        if(expDate)
        if(compareDates(expDate,date,'YYYY-MM-DD'))
        return 0;
    }
    return 1;
  }