import React, { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {
  compareDates,
  convertDateMMMFormat,
  getDateAfter,
  getTodayDate,
} from "../../hooks/date.hook";
import { formatToCurrency } from "../../hooks/formatToCurrency.hook";
import "./table.style.css";

import { useGetAllCoffQuery } from "../../store/store";
import CoffNoCell from "../cells/CoffNoCell";
import { getStatus } from "../../layout/getValidityStatus.hook";
import sesCell from "../cells/sesCell";
import coffAmountCell from "../cells/coffAmountCell";
import PrimaryCell from "../cells/PrimaryCell";
import { useLocation } from "react-router-dom";
import ContractNoCell from "../cells/ContractNoCell";

const CoffTable = () => {
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
  const [searchFilter, setSearchFilter] = useState("");
  const [searchSection, setSearchSection] = useState(
    localStorage.getItem("coffSearchSection") || undefined
  );

  const [getArchived, setGetArchived] = useState(0);

  const queryParams = { archived: 0, sectionCode: searchSection };

  const { data, error, isLoading } = useGetAllCoffQuery({
    archived: getArchived,
    sectionCode: searchSection,
  });
  const handleSearchSectionChange = (value) => {
    setSearchSection(value);
    if (value == undefined) localStorage.removeItem("coffSearchSection");
    else localStorage.setItem("coffSearchSection", value);
  };
  function onGridReady(params){
    setGridApi(params.api);
    setGridColumnApi(params.api)
  } 
  const [colDefs, setColDefs] = useState([
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      filter: false,

      maxWidth: 50,
    },
    {
      headerName: "Section",
      field: "contract.sectionCode",
      filter: "agTextColumnFilter",
      minWidth: 100,
    },
    {
      headerName: "Contract No.",
      field: "contractNo",
      filter: "agTextColumnFilter",
      minWidth: 140,
      cellRenderer: ContractNoCell,
    },

    {
      headerName: "Coff No.",
      field: "coffNo",
      filter: "agTextColumnFilter",
      minWidth: 140,
      cellRenderer: CoffNoCell,
    },
    {
      headerName: "Title",
      field: "title",
      filter: "agTextColumnFilter",
      minWidth: 300,
    },
    {
      headerName: "Vendor Name",
      field: "contract.vendorName",
      filter: "agTextColumnFilter",
      minWidth: 200,
      valueFormatter: (x) => {
        return x.data.contract.vendorCode + " " + x.value;
      },
    },
    {
      headerName: "Start Date",
      field: "startDate",
      filter: "agTextColumnFilter",
      minWidth: 120,
      valueFormatter: (x) => {
        return convertDateMMMFormat(x.value);
      },
    },
    {
      headerName: "End Date",
      field: "endDate",
      filter: "agTextColumnFilter",
      minWidth: 120,
      valueFormatter: (x) => {
        return convertDateMMMFormat(x.value);
      },
    },
    {
      headerName: "Contract End Date",
      field: "contract.endDate",
      filter: "agTextColumnFilter",
      minWidth: 120,
      cellRenderer: sesCell,
    },
    {
      headerName: "SES End Date",
      field: "sesEndDate",
      filter: "agTextColumnFilter",
      minWidth: 120,
      cellRenderer: sesCell,
    },
    {
      headerName: "Remaining Amount",
      field: "amountToBeDelivered",
      filter: "agTextColumnFilter",
      minWidth: 140,
      valueFormatter: (x) => {
        return formatToCurrency(x.value, x.data.coffCurrency);
      },
    },
  ]);
  let dateAfter20Days = getDateAfter(20, "days");

  const gridOptions = {
    columnDefs: colDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
    },

    rowClassRules: {
      expired: (params) => {
        if (getStatus(params.data.endDate) == -1) return true;
      },
      "expiring-soon": (params) => {
        if (getStatus(params.data.endDate, dateAfter20Days) == 0) return true;
      },
    },
    onSortChanged(e) {
      e.api.refreshCells();
    },
  };

  const toggleColumn = (columnName,value) =>{
    gridColumnApi.setColumnVisible(columnName,value)
  }
  const headerToggle =  <div className='flex mt-2 gap-x-4 justify-center h-[30px]'>
  <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='sectionCode' name='contract.sectionCode' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="sectionCode">Section</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractNo' name='contractNo' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractNo">Contract No.</label>
   </div>
   {/* <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractNo' name='contractNo' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractNo">Contract No.</label>
   </div> */}
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='vendorName' name='contract.vendorName' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
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
   <input type="checkbox" id='sesEndDate' name='sesEndDate' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="sesEndDate">SES End Date</label>
   </div>
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='contractEndDate' name='contract.endDate' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="contractEndDate">Contract End Date</label>
   </div>
   
   <div className='flex items-center justify-center gap-x-2'>
   <input type="checkbox" id='amountToBeDelivered' name='amountToBeDelivered' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
   <label htmlFor="amountToBeDelivered">Remaining Value</label>
   </div>
  
  </div>


  return (
    <div className="w-full mr-4">
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
          {headerToggle}
      <div
        className="ag-theme-quartz w-full h-[calc(100vh-155px)] min-h-[400px]" // applying the grid theme
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
  );
};

export default CoffTable;
