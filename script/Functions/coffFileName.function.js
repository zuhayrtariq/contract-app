const { getCoffWithFileName, getSectionCodes, updateFileNameToNull, updateFileName } = require("../query")
const fs = require('fs')
const getDetails = async(sectionCode = 'PNI') =>{
    const data = await getCoffWithFileName(sectionCode);
    return data;
}


const getAllFilesInFolder = async(sectionCode = 'PNI') =>{
    return fs.readdirSync(`../Call-offs/${sectionCode}`, {withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => item.name)
}
const checkIfFileExists = async() =>{

}

const coffFileFunction = async() =>{
    const sections = await getSectionCodes();
    console.log(sections)
    const allCoffData = await getDetails();
    for(let i = 0 ; i<sections.length; i++)
        {
           const allFiles = await getAllFilesInFolder(sections[i].sectionCode);
           const allCoffData = await getDetails(sections[i].sectionCode);
           const allCoffNo = allCoffData.map(x=>x.coffNo);
           for(let j = 0 ; j< allCoffData.length; j++)
            {
                let newFileName = ''
             for(let k = 0 ; k<allFiles.length; k++)
                {
                    if(allFiles[k].includes(allCoffData[j].coffNo))
                        {
                            newFileName = allFiles[k];
                            break;
                        }
                }

                //File exists in folder
                if(newFileName.length > 0)
                {
                    // Check if the current file name is same as the one we found
                    if(newFileName != allCoffData[j].coffFileName)
                    {
                        await updateFileName(allCoffData[j].coffNo,newFileName);
                        console.log(`Coff ${allCoffData[j].coffNo} - File Name Updated : ${newFileName}`)
                    }
                }
                else{
                    if(allCoffData[j].coffFileName)
                        {
                            await updateFileNameToNull(allCoffData[j].coffNo);
                            console.log(`Coff ${allCoffData[j].coffNo} - File Deleted`)
                        }
                }
            }
        //    console.log(allFiles)
        //    console.log(allCoffData)

        }
    console.log("Coff File Function Completed")
}

module.exports = {coffFileFunction}