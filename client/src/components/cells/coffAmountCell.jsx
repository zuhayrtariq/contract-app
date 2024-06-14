import React from 'react'
import { formatToCurrency } from '../../hooks/formatToCurrency.hook'

const coffAmountCell = ({value,data}) => {
    const {coffCurrency} = data
  return (
    <div>
    
        {formatToCurrency(value,coffCurrency)} 
    </div>
  )
}

export default coffAmountCell