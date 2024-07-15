import React, { useCallback, useContext, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import {
  useDeleteRequisitionMutation,
  useGetAllContractsQuery,
  useGetAllContractsWithCoffQuery,
  useGetAllRequisitionsQuery,
  useGetContractsQuery,
} from "../../store/store";
import { convertDateMMMFormat, getDateAfter } from "../../hooks/date.hook";
import { formatToCurrency } from "../../hooks/formatToCurrency.hook";
import "./table.style.css";
import { getStatus } from "../../layout/getValidityStatus.hook";
import AddRequisitionModal from "../modal/AddRequisitionModal";
import { ModalDataContext } from "../../context/ModalDataContext";
import ReqNoCell from "../cells/ReqNoCell";
import { AdminContext } from "../../context/AdminContext";

const RequisitionTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [showColumn, setShowColumn] = useState(false);
  const [searchSection, setSearchSection] = useState(
    localStorage.getItem("requisitionSearchSection") || undefined
  );

  const [getArchived, setGetArchived] = useState(0);
  const { data, error, isLoading } = useGetAllRequisitionsQuery({
    archived: getArchived,
    sectionCode: searchSection,
  });
  const { modalData, setModalData } = useContext(ModalDataContext);
  const { isAdmin } = useContext(AdminContext);

  const handleSearchSectionChange = (value) => {
    setSearchSection(value);
    if (value == undefined) localStorage.removeItem("requisitionSearchSection");
    else localStorage.setItem("requisitionSearchSection", value);
  };

  const [colDefs, setColDefs] = useState([
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      filter: false,

      maxWidth: 50,
    },
    {
      headerName: "Section",
      field: "sectionCode",
      filter: "agTextColumnFilter",
      minWidth: 100,
    },
    {
      headerName: "Requisition No.",
      field: "reqNo",
      filter: "agTextColumnFilter",
      minWidth: 160,
      cellRenderer: ReqNoCell,
    },
    {
      headerName: "Title",
      field: "title",
      filter: "agTextColumnFilter",
      minWidth: 300,
    },
    {
      headerName: "Vendor Name",
      field: "vendorName",
      filter: "agTextColumnFilter",
      minWidth: 180,
    },
    {
      headerName: "Buyer ",
      field: "buyerName",
      filter: "agTextColumnFilter",
      minWidth: 120,
    },
    {
      headerName: "Req Date",
      field: "reqDate",
      filter: "agTextColumnFilter",
      minWidth: 120,
      valueFormatter: (x) => {
        return convertDateMMMFormat(x.value);
      },
    },

    {
      headerName: "Type",
      field: "reqType",
      filter: "agTextColumnFilter",
      minWidth: 120,
    },

    {
      headerName: "Requisition ACV ($)",
      field: "reqACV",
      filter: "agNumberColumnFilter",
      valueFormatter: (x) => {
        return formatToCurrency(x.value);
      },
    },
  ]);
  function onGridReady(params){
    setGridApi(params.api);
    setGridColumnApi(params.api)
  } 
  let dateAfter7months = getDateAfter(7, "months");
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
        if (getStatus(params.data.endDate, dateAfter7months) == 0) return true;
      },
    },
  };
  if (showColumn) {
    gridOptions.columnApi.setColumnsVisible(["sectionCode"], false);
  }
  const toggleColumn = (columnName, value) => {
    gridColumnApi.setColumnVisible(columnName, value);
  };
  const headerToggle = (
    <div className="flex mt-2 gap-x-4 justify-center h-[30px]">
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="sectionCode"
          name="sectionCode"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="sectionCode">Section</label>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="vendorName"
          name="vendorName"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="vendorName">Vendor Name</label>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="buyerName"
          name="buyerName"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="buyerName">Buyer</label>
      </div>
      {/* <div className='flex items-center justify-center gap-x-2'>
 <input type="checkbox" id='contractNo' name='contractNo' onChange={(e)=>{toggleColumn(e.target.name,e.target.checked)}} defaultChecked className="checkbox checkbox-sm checkbox-primary" />
 <label htmlFor="contractNo">Contract No.</label>
 </div> */}
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="reqDate"
          name="reqDate"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="reqDate">Date</label>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="reqType"
          name="reqType"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="reqType">Type</label>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="checkbox"
          id="reqACV"
          name="reqACV"
          onChange={(e) => {
            toggleColumn(e.target.name, e.target.checked);
          }}
          defaultChecked
          className="checkbox checkbox-sm checkbox-primary"
        />
        <label htmlFor="reqACV">ACV</label>
      </div>
    
    </div>
  );
  return (
    <div className="w-full mr-4">
      <div className="flex items-center h-[40px] mb-1 justify-between">
        <div className="flex items-center  gap-x-2">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
            placeholder="Filter..."
            className="input input-bordered w-[200px] my-2 input-sm"
          />
        </div>
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
        {isAdmin && <AddRequisitionModal />}
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

export default RequisitionTable;
