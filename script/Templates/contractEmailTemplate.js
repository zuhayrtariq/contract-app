const { convertDateMMMFormat } = require("../helpers/date.helper")
const formatToCurrency = require("../helpers/formatToCurrency.hook");
const { emailTemplate } = require("./emailTemplate");

const contractEmailTemplate = async(data,emailTo,text) =>{
    const tableHeaders = ['#','Section','Contract No.','Title','Vendor Name','End Date','Requisition No.','Remaining Amount']
    let emailData = '';
  
    for(let i = 0 ; i< data.length; i++)
      {
         
              emailData+= `
              <tr >
                <td >${i+1}</td>
                <td >${data[i].sectionCode}</td>
                <td >${data[i].contractNo}</td>
                  <td >${data[i].title}</td>
                <td >${data[i].vendorName}</td>
                <td style="width:120px;color:rgb(239,68,68);font-weight:700">${convertDateMMMFormat(data[i].endDate,'YYYY-MM-DD') }</td>
                <td ${!!data[i].reqNo || 'style ="color:rgb(239,68,68);font-weight:700"'}>${data[i].reqNo || 'Not Raised'}</td>
                <td >${formatToCurrency(data[i].contractOpenValue,data[i].contractCurrency)} </td>
              </tr>
     
  `
      }
  
      return emailTemplate(emailTo,text,tableHeaders,emailData)
}

module.exports = contractEmailTemplate;