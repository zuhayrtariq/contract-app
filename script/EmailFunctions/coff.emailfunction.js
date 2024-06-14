
const {getSectionDetails,getCoffsExpiring } = require("../query");
const sendMail = require("../sendMail");
const coffEmailTemplate = require("../Templates/coffEmailTemplate");


const coffEmailReport = async() =>{
    const data = await getCoffsExpiring();
   
    if(!data?.length )
    { 
      console.log("No Call-off Expiring") 
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
  
    const emailHTML = await coffEmailTemplate(data,'Team',`The following call-offs have either expired or are expiring with-in ${process.env.Coff_Expiry_Limit_Days} days. You are requested to kindly confirm if extension/renewal is required. Please share details for extension.`);
    const subject = 'ICT Call-offs Expiry Report'
    sendMail(subject,emailHTML, toEmail)
}

const coffDailyEmail = async() =>{
  const sectionData = await getSectionDetails();

  for(let i = 0 ; i < sectionData?.length; i++)
  {
    const data = await getCoffsExpiring(sectionData[i].sectionCode);
    if(data?.length)
    { 
      const emailHTML = await  coffEmailTemplate(data,sectionData[i].sectionHeadName,`The following call-offs are expiring with-in ${process.env.Coff_Expiry_Limit_Days} days. You are requested to kindly confirm if extension/renewal is required. Please share details for extension.`);
      const subject = `${sectionData[i].sectionCode} - Call-offs Expiring Soon`
      sendMail(subject,emailHTML, sectionData[i].sectionHeadEmail)
    
    }
    else{
      console.log("Call-offs Not Expiring for Section : ",sectionData[i].sectionCode)
    }

  } 
}

module.exports = {
    coffEmailReport,
    coffDailyEmail
  }