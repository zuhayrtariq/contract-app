import React from "react";
import DashboardStats from "../components/stats/DashboardStats";

import ConsolidatedBudgetPieChart from "../components/charts/ConsolidatedBudgetPieChart";

import DashboardValidityCharts from "../components/charts/DashboardValidityCharts";

import DashboardCostCards from "../components/cards/DashboardCostCards";
import SectionDataCard from "../components/cards/SectionDataCard";


const DashboardPage = () => {
  return (
    <div className="w-full bg-base-200">
    
    <div className="grid xs:grid-cols-1 md:grid-cols-2 justify-items-center  lg:flex lg:justify-between w-full pt-1 px-1  gap-4 my-2 h-full overflow-hidden mb-4 ">
             <SectionDataCard sectionCode="PNI" />
             <SectionDataCard sectionCode="PTA" />
             <SectionDataCard sectionCode="PBA" />
             <SectionDataCard sectionCode="PBO" />
            
         
    </div>

    <div className="flex w-full  min-h-80 h-full">
    
    <div className="lg:flex md:w-full lg:w-4/5 gap-x-2">
    <div className="md:w-full lg:w-1/2 bg-base-300 px-2 pt-2 rounded-lg shadow-inner shadow-base-300">
    <h1 className="text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded mb-4  border-2 border-primary">
               Validity Status
             </h1>
             <DashboardValidityCharts />
    </div>
 <div className="md:w-full lg:w-1/2 flex flex-col bg-base-300 px-2 pt-2 rounded-lg shadow-inner shadow-base-300">
 <h1 className="text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded mb-4  border-2 border-primary">
               Contract Values
             </h1>
             <div className="  flex items-stretch grow">

 <DashboardCostCards />
             </div>
    </div>
    </div>
    
    <div className=" w-1/5 items-start hidden lg:flex justify-center ">
    <DashboardStats/>
    </div>

    </div>

    </div>
  );
};

export default DashboardPage;

    // <div className="flex flex-col mt-4 w-full  px-2">
    //   <div className="flex justify-between gap-x-4 xxl:justify-around mb-4">
    //         <SectionDataCard sectionCode="PNI" />
    //         <SectionDataCard sectionCode="PTA" />
    //         <SectionDataCard sectionCode="PBA" />
    //         <SectionDataCard sectionCode="PBO" />
    //       </div>
    //   <div className="dashboard  grid grid-cols-4 xl:grid-cols-5  gap-x-4 w-full h-fit  justify-between overflow-x-clip">
    //     <div className="col-span-4 ">
        

    //       <div className="flex gap-x-6   w-full  px-1">
    //         <div className="  min-w-[340px] w-1/2 h-full ">
    //           <h1 className="text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded mb-4  border-2 border-primary">
    //             Validity Status
    //           </h1>
    //           <DashboardValidityCharts />
    //         </div>
    //         <div className=" w-1/2 min-w-[340px] h-full  ">
    //           {/* <SectionConsolidatedBarChart/> */}
    //           <h1 className="text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded mb-4  border-2 border-primary">
    //             Contract Values
    //           </h1>

    //           <DashboardCostCards />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="col-span-1  xl:block sm:hidden  ">
    //       <div className=" flex flex-col items-center justify-center">

         
    //       <DashboardStats />
        
    //     </div>
    //     </div>
    //   </div>
    // </div>