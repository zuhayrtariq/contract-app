const { convertDateMMMFormat } = require("../helpers/date.helper")
const formatToCurrency = require("../helpers/formatToCurrency.hook");
const { emailTemplate } = require("./emailTemplate");

const sesEmailTemplate = async(data) =>{
  const emailToName = 'Zuhayr';
  const text = `The following service entries are expiring with-in ${process.env.Ses_Expiry_Limit_Days} days.`
  const tableHeaders = ['#','Section','Call-off No','Title','Vendor Name','SES End Date','Coff End Date','Coff Amount']
  let emailData = '';

  for(let i = 0 ; i< data.length; i++)
    {
       
            emailData+= `
            <tr >
              <td >${i+1}</td>
              <td >${data[i].sectionCode}</td>
              <td >${data[i].coffNo}</td>
              <td >${data[i].title}</td>
              <td >${data[i].vendorName}</td>
              <td style="width:120px;color:rgb(239,68,68);font-weight:700">${convertDateMMMFormat(data[i].sesEndDate,'YYYY-MM-DD') }</td>
              <td >${convertDateMMMFormat(data[i].endDate,'YYYY-MM-DD') }</td>
              <td >${formatToCurrency(data[i].amountToBeDelivered,data[i].coffCurrency)} </td>
            </tr>
   
`
    }

    return emailTemplate(emailToName,text,tableHeaders,emailData)
}

module.exports = sesEmailTemplate;