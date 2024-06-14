require('dotenv')
const emailTemplate = (toName = 'Team',text = `Email Text`,tableHeading,tableData) =>{
    let emailHTML = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #table td{
    border: 2px solid #ddd;
    padding: 8px;
    text-align:center;
 
  }
 
  #table tr:nth-child(even){background-color: #ffffff;}

  #table tr:hover {background-color: #ddd;}

  #table th {
    text-align: center;
    background-color: rgb(54,153,70);
    color: white;
    border: 2px solid #89C54A;
    padding: 8px;
    font-size: 13px;
 
  }

  #table td {
    text-align: center;
    border: 1px solid gray;
    padding: 8px;
    font-size: 12px;
 
  }
  </style>
  </head>
  <body >
  <!--[if !mso]>-->
  <div style="display:hidden;">
  <p style="font-size:14px;line-height:24px;margin:4px 0">Dear ${toName},</p>
          <p style="font-size:14px;line-height:24px;margin:16px 0">${text}</p>
<!--<![endif]-->
     </div>     
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid #eee;border-radius:10px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:95%;min-width:800px;margin:0 auto;padding:30px 15px;background-color:rgb(250,249,246)">
   
  <table align="center" width="75%">
    <tr>
        <th>
            <div style="margin: 0 auto; text-align: center;">
                <img align="center" alt="Prime Logo" src="${process.env.File_URL}/prime-logo.png" alt="" height="60" border="0"/>
            </div>
        </th>
    </tr>
</table>
    <tbody>
      <tr style="width:100%">
        <td>
          <p style="font-size:14px;line-height:24px;margin:4px 0">Dear ${toName},</p>
          <p style="font-size:14px;line-height:24px;margin:16px 0">${text}</p>
          <table align="center" width="100%" class="" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
              <tr>
                <td>
  <table id="table" align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid #eee;border-radius:10px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:95%;min-width:800px;margin:0 auto;padding:30px 15px;background-color:rgb(250,249,246)">
    <tr>
      
  `
  tableHeading.map(x=>{
    emailHTML += `<th >${x}</th>`;
  })
  emailHTML += `</tr> ${tableData}`
  emailHTML += `
  </table>
  
  </tbody>
      </table>
  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin-top:40px" />
  <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;font-weight:700">Your timely response is highly appreciated.</p>
  <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Contact <a href="mailto:zuhayr.tariq@prime-pakistan.com" style="color:#444;text-decoration:underline" target="_blank">here</a>, If you have any queries
  
  <div style="font-size:15px;line-height:23px;margin-top:20px;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.Dashboard_URL}" style="height:40px;v-text-anchor:middle;width:200px;" arcsize="25%" stroke="f" fillcolor="#8CC63F">
  <w:anchorlock/>
  <center>
<![endif]-->
    <a href="${process.env.Dashboard_URL}"
style="background-color:#8CC63F;font-weight:700;border-radius:10px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">Open Dashboard</a>
<!--[if mso]>
  </center>
</v:roundrect>
<![endif]--></div>
  </p>
  
  </td>
  </tr>
  </tbody>
  </table>
</body>

</html>`
return emailHTML;

}

module.exports = {emailTemplate}