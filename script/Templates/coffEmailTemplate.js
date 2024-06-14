const { convertDateMMMFormat } = require("../helpers/date.helper")
const formatToCurrency = require("../helpers/formatToCurrency.hook");
const { emailTemplate } = require("./emailTemplate");

const coffEmailTemplate = async(data,emailTo,text) =>{
    const tableHeaders = ['#','Section','Contract No.','Call-off No.','Title','Vendor Name','Coff End Date','Contract End Date','Contract Amount']
    let emailData = '';
  
    for(let i = 0 ; i< data.length; i++)
      {
         
              emailData+= `
              <tr >
                <td >${i+1}</td>
                <td >${data[i].sectionCode}</td>
                <td >${data[i].contractNo}</td>
                <td >${data[i].coffNo}</td>
                <td >${data[i].title}</td>
                <td >${data[i].vendorName}</td>
                <td style="width:120px;color:rgb(239,68,68);font-weight:700">${convertDateMMMFormat(data[i].endDate,'YYYY-MM-DD') }</td>
                <td >${convertDateMMMFormat(data[i].contractEndDate,'YYYY-MM-DD') }</td>
                <td >${formatToCurrency(data[i].contractOpenValue,data[i].contractCurrency)} </td>
              </tr>
     
  `
      }
  
      return emailTemplate(emailTo,text,tableHeaders,emailData)
}

module.exports = coffEmailTemplate;