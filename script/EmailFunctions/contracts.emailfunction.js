
const {getSectionDetails, getContractsExpiring } = require("../query");
const sendMail = require("../sendMail");
const contractEmailTemplate = require("../Templates/contractEmailTemplate");


const contractEmailReport = async() =>{
    const data = await getContractsExpiring();
   
    if(!data?.length )
    { 
      console.log("No Contract Expiring") 
      return 0;}
    const sectionData = await getSectionDetails();
    const sendEmailTo =  sectionData.filter(x =>{
        if(data.some(y=>y.sectionCode == x.sectionCode))
            {
               return x.sectionHeadEmail
            }
      
    })
    // console.log(sendEmailTo)
    const toEmail = sendEmailTo.map(x=>x.sectionHeadEmail)
    console.log(toEmail)
  
    const emailHTML = await contractEmailTemplate(data,'Team',`The Contracts below have either expired or are expiring with-in ${process.env.Contract_Expiry_Limit_Months} months. You are requested to kindly raise requisition against the contracts. If the requisition is raised, kindly provide the updated status against the on-going requisitions.`);
    const subject = 'ICT Contracts Expiry Report'
    sendMail(subject,emailHTML, toEmail)
}

const contractDailyEmail = async() =>{
  const sectionData = await getSectionDetails();

  for(let i = 0 ; i < sectionData?.length; i++)
  {
    const data = await getContractsExpiring(sectionData[i].sectionCode);
    if(data?.length)
    { 
     
      const emailHTML = await contractEmailTemplate(data,sectionData[i].sectionHead,`The Contracts below are expiring in ${process.env.Contract_Expiry_Limit_Months} months. You are requested to kindly raise requisition against the contracts. If the requisition is raised, kindly provide the updated status against the on-going requisitions.`);
      const subject = `${sectionData[i].sectionCode} - Contracts Expiring Soon`
      sendMail(subject,emailHTML, sectionData[i].sectionHeadEmail)
    
    }
    else{
      console.log("Contracts Not Expiring for Section : ",sectionData[i].sectionCode)
    }

  } 
}

module.exports = {
    contractEmailReport,
    contractDailyEmail
  }