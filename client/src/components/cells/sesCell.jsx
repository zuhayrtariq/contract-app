import React from 'react'
import { compareDates, convertDateMMMFormat, getDateAfter, getTodayDate } from '../../hooks/date.hook'

const sesCell = ({value,data}) => {
    let status = 0;
  const today = getTodayDate();
  const dateAfter10days = getDateAfter(10,'days');
  if(compareDates(today,value,'YYYY-MM-DD'))
  {
    status = -1;
  }
  else if(compareDates(dateAfter10days,value,'YYYY-MM-DD'))
  {
    status = 1
  }
  return (
    <div className={`${status == -1 && 'decoration-error underline font-bold'} ${status == 1 && 'underline decoration-warning  font-bold'} w-full text-center `}>{convertDateMMMFormat(value)}</div>
  )
}

export default sesCell