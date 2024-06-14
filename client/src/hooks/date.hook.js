import moment from 'moment'

export const isCorrectDateFormat = (date,format = 'D/M/YY') =>{
  return moment(date,format,true).isValid()
}

export const convertDateToISOFormat = (date,format = 'DD.MM.YYYY') =>{
  if (moment(date, format).isValid()) {
      return moment(date, format).format("YYYY-MM-DD");
    } 
    else return date;
}

export const compareDates = (date1,date2,format = 'DD.MM.YYYY') =>{

  date1 = moment(date1,format).format();
  date2 = moment(date2,format).format();
  const dateIsAfter = moment(date1).isAfter(moment(date2));
  return dateIsAfter
}

export const convertDateDotFormat = (date,format= 'D/M/YY') =>{

  if(format)
  return moment(date,format).format('DD.MM.YYYY')
  else
  return moment(date).format('DD.MM.YYYY');
}

export const convertDateMMMFormat = (date,format) =>{

    if(format)
    return moment(date,format).format('DD-MMM-YYYY')
    else
    return moment(date).format('DD-MMM-YYYY');
  }


export const getDateAfter = (number, type = "days") => {
  let date = moment().add(number, type).calendar();
  date = moment(date, "MM/DD/YYYY").format("YYYY-MM-DD");
  return date;
  // return date;
};

export const getTodayDate = () => {
  return moment().format('YYYY-MM-DD')
};

