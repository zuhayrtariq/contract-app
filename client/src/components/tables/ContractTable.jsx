import React, { useCallback, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


import { useGetAllContractsQuery, useGetAllContractsWithCoffQuery, useGetContractsQuery } from '../../store/store';
import { convertDateMMMFormat, getDateAfter } from '../../hooks/date.hook';
import { formatToCurrency } from '../../hooks/formatToCurrency.hook';
import './table.style.css'
import { getStatus } from '../../layout/getValidityStatus.hook';
import ContractNoCell from '../cells/ContractNoCell';
import { FaGear, FaGears } from 'react-icons/fa6';
import ReqNoCell from '../cells/ReqNoCell';


const ContractTable = () => {
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
  
  const [searchFilter, setSearchFilter] = useState('')
  const [searchSection, setSearchSection] = useState(
    localStorage.getItem("contractSearchSection") || undefined
  );

  const [getArchived,setGetArchived] = useState(0)
  const {data,error,isLoading} = useGetAllContractsWithCoffQuery({
    archived: getArchived,
    sectionCode: searchSection,
  });
 
  const handleSearchSectionChange = (value) => {
    setSearchSection(value); 
    if (value == undefined) localStorage.removeItem("contractSearchSection");
    else localStorage.setItem("contractSearchSection", value);
  };

  function onGridReady(params){
    setGridApi(params.api);
    setGridColumnApi(params.columnApi)
  } 

const [colDefs, setColDefs] = useState([
  {
    headerName: "#",
    valueGetter: "node.rowIndex + 1",
    filter: false,
    maxWidth: 50,
  },
  { headerName: "Section" , field: 'sectionCode',filter:'agTextColumnFilter',minWidth: 100,},
  { headerName: "Contract No.", field: 'contractNo',filter:'agTextColumnFilter', minWidth: 140,
    cellRenderer: ContractNoCell
  },
  { headerName: "Title", field: 'title',filter:'agTextColumnFilter', minWidth: 300,},
  { headerName: "Vendor Name", field: 'vendorName',filter:'agTextColumnFilter', minWidth: 200, valueFormatter:(x)=>{

    return  x.data.vendorCode + " " + x.value 
  } },
  { headerName: "Start Date", field: 'startDate',filter: 'agTextColumnFilter',minWidth: 120, valueFormatter:(x)=>{

    return convertDateMMMFormat(x.value)
  }  },
  { headerName: "End Date", field: 'endDate',filter: 'agTextColumnFilter',minWidth: 120,  valueFormatter:(x)=>{
    
    return convertDateMMMFormat(x.value)
  } },{ headerName: "Req No",headerClass: 'ag-center-header',minWidth: 120,field: 'reqNo',filter:'agTextColumnFilter',cellRenderer:ReqNoCell },
  { headerName: "Call-offs",field:'callOffs', minWidth: 110, cellRenderer: ({data}) =>{ 
  
    return <div className='text-center'>{data.callOffs?.length}</div>
  } },
  { headerName: "Value", field: 'contractTRXValue',filter:'agNumberColumnFilter', valueFormatter : (x)=>{
    return formatToCurrency(x.value,x.data.contractCurrency)} },
  { headerName: "Remaining ", field: 'contractOpenValue',filter:'agNumberColumnFilter', valueFormatter : (x=>formatToCurrency(x.value,x.data.contractCurrency)) },
  

]);

let dateAfter7months = getDateAfter(7,'months');
const gridOptions = {
  columnDefs: colDefs,
defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: "agTextColumnFilter",
    
  },

  rowClassRules: {
    "expired": (params) => { 
      if(getStatus(params.data.endDate) == -1)
      return true;},
      "expiring-soon": (params) => { 
        if(getStatus(params.data.endDate,dateAfter7months) == 0)
        return true;},
  }, onSortChanged(e){
    e.api.refreshCells();
  },
};
  const toggleColumn = (columnName,value) =>{
    gridColumnApi.setColumnVisible(columnName,value)
  }
  const headerToggle =  <div className='flex mb-4 gap-x-4'>
  <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='sectionCode' name='sectionCode' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="sectionCode">Section</label>
   </div>
   {/* <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractNo' name='contractNo' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractNo">Contract No.</label>
   </div> */}
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='vendorName' name='vendorName' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="vendorName">Vendor Name</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='startDate' name='startDate' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="startDate">Start Date</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='endDate' name='endDate' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="endDate">End Date</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='reqNo' name='reqNo' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="reqNo">Req No.</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='callOffs' name='callOffs' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="callOffs">Call-offs</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractTRXValue' name='contractTRXValue' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractTRXValue">Total Value</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractOpenValue' name='contractOpenValue' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractOpenValue">Remaining Value</label>
   </div>
  
  </div>
  return (
    <div className='w-full h-full'>
     
     
       <div className="flex items-center h-[40px] mb-1  gap-x-2 justify-between">
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
          placeholder="Filter..."
          className="input input-bordered w-[200px] my-2 input-sm"
        />

<div className="join join-vertical lg:join-horizontal ">
         
          <button
            onClick={() => {
              setGetArchived(0);
            }}
            className={`btn font-bold btn-sm join-item ${
              getArchived == 0 && "btn-primary"
            }`}>
            Active
          </button>
          <button
            onClick={() => {
              setGetArchived(1);
            }}
            className={`btn font-bold btn-sm join-item ${
              getArchived == 1 && "btn-primary"
            }`}>
            Archived
          </button>
         
         
        </div>

        <div className="join join-vertical lg:join-horizontal ">
          <button
            onClick={() => {
              handleSearchSectionChange(undefined);
            }}
            className={`btn font-bold btn-sm  join-item ${
              searchSection == undefined && "btn-primary"
            }`}>
            ALL
          </button>
          <button
            onClick={() => {
              handleSearchSectionChange("PNI");
            }}
            className={`btn font-bold btn-sm join-item ${
              searchSection == "PNI" && "btn-primary"
            }`}>
            PNI
          </button>
          <button
            onClick={() => {
              handleSearchSectionChange("PTA");
            }}
            className={`btn font-bold btn-sm join-item ${
              searchSection == "PTA" && "btn-primary"
            }`}>
            PTA
          </button>
          <button
            onClick={() => {
              handleSearchSectionChange("PBA");
            }}
            className={`btn font-bold btn-sm join-item ${
              searchSection == "PBA" && "btn-primary"
            }`}>
            PBA
          </button>
          <button
            onClick={() => {
              handleSearchSectionChange("PBO");
            }}
            className={`btn font-bold btn-sm join-item ${
              searchSection == "PBO" && "btn-primary"
            }`}>
            PBO
          </button>
        </div>

      </div>
      

    <div
    className="ag-theme-quartz w-full h-[calc(100%-48px)] " // applying the grid theme
     // the grid will fill the size of the parent container
   >
      
     <AgGridReact
         onGridReady={onGridReady}
         rowData={data}
         gridOptions={gridOptions}
         columnDefs={colDefs}
         isRowSelectable={false}
         enableCellTextSelection={true}
         quickFilterText={searchFilter}
     />
   </div>
   
   </div>
  )
}

export default ContractTable