import React, { useContext, useEffect, useState } from "react";
import { useDeleteRequisitionMutation, useUpdateRequisitionMutation } from "../../store/store";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { ModalDataContext } from "../../context/ModalDataContext";
import { convertDateDotFormat, convertDateToISOFormat } from "../../hooks/date.hook";
 
const RequisitionEditModal = () => {
  const { modalData,setModalName } = useContext(ModalDataContext);
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loaded,setLoaded] = useState(false)
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      reqNo: modalData.reqNo,
      sectionCode: modalData.sectionCode,
      title: modalData.title,
      vendorName: modalData.vendorName,
      buyerName: modalData.buyerName,
      reqACV: modalData.reqACV,
      reqType: modalData.reqType,
      reqDate: convertDateDotFormat(modalData.reqDate,'YYYY-MM-DD'),
      notes: modalData.notes,
      emailAlerts : modalData.emailAlerts,
      archived : modalData.archived,
    });
    setLoaded(true);
  }, [modalData]);

  const [valuesChanged, setValuesChanged] = useState([]);
  const [updateRequisition, results] = useUpdateRequisitionMutation();
  const [deleteRequisition, deleteResults] = useDeleteRequisitionMutation();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newDate = convertDateToISOFormat(data.reqDate)
    await updateRequisition({...data,reqDate : newDate});
    // data.reqDate = convertDateDotFormat(data.reqDate,'YYYY-MM-DD')
    setFormSubmitted(true);
  };
  if (formSubmitted) {
    if (results.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Updating PR");
    }
    if (results.isSuccess) {
      // document.getElementById('requisitionEditModal').close();
      toast.dismiss();
      toast.success(`Requisition ${data.reqNo} Updated`);
    }
    setFormSubmitted(false);
  }
  if (deleted) {
    if (deleteResults.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Deleting PR");
    }
    if (deleteResults.isSuccess) {
      // document.getElementById('requisitionEditModal').close();
      toast.dismiss();
      toast.success(`Requisition ${data.reqNo} Deleted`);
    }
    //Close Modal
    setModalName('')
  }

  const onValueChange = (key, value) => {
    
    setData((prevState) => ({ ...prevState, [key]: value }));
    
    if (value != modalData[key]) {
      if (!valuesChanged.includes(key))
        setValuesChanged((prevArray) => [...prevArray, key]);
      if (key == "sectionCode" || key == "reqType") {
        const dropdown = document.getElementById(key + "Dropdown");
        dropdown.open = false;
      }
    } else if (value == modalData[key]) {
      const index = valuesChanged.indexOf(key);

      if (index != -1) {
        setValuesChanged((prevArray) => prevArray.filter((x) => x != key));
      }
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteRequisition(data.reqNo);
    setDeleted(true);
  };
  return (
    <div>
      {loaded && 
      <>
        <h1 className="font-bold flex w-full items-center justify-center text-xl uppercase text-primary mb-1">
          <span className="absolute  left-4 ml-4 ">
            <button className=" font-bold  uppercase text-xl text-error" onClick={handleDelete}>
              
              {<FaTrashCan />}
            </button>
          </span>
          Requisition Form
        </h1>
        <hr />
        <form onSubmit={handleFormSubmit} className="form-control">
        <div className="flex space-x-4 mb-4 mt-4  items-center justify-around">
          <label className="input input-bordered flex items-center gap-2 font-bold ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary">
              Requisition No.
            </span>
            <span className="w-[150px]">{data.reqNo}</span>
          </label>

          <label className="input required input-bordered flex items-center gap-2 ">
            <input
              type="text"
              name="sectionCode"
              className="bg-red-500  absolute -z-30
"
              value={data.sectionCode}
              onChange={() => {}}
              required
            />
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary">
              Section Code
            </span>
            <details className="dropdown" id="sectionCodeDropdown">
              <summary className="w-[100px] h-full p-2 font-bold">
                {data.sectionCode || "Required"}
              </summary>
              <ul className="p-2 shadow menu  dropdown-content z-[1] bg-base-100 rounded-box w-full">
                <li
                  className=""
                  onClick={() => {
                    onValueChange("sectionCode", "PNI");
                  }}>
                  <a>PNI</a>
                </li>
                <li
                  className=""
                  onClick={() => {
                    onValueChange("sectionCode", "PTA");
                  }}>
                  <a>PTA</a>
                </li>
                <li
                  className=""
                  onClick={() => {
                    onValueChange("sectionCode", "PBA");
                  }}>
                  <a>PBA</a>
                </li>
                <li
                  className=""
                  onClick={() => {
                    onValueChange("sectionCode", "PBO");
                  }}>
                  <a>PBO</a>
                </li>
              </ul>
            </details>
          </label>
        </div>

        <label className="input input-bordered flex items-center gap-2 mb-4 ">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Title
          </span>
          <input
            required
            type="text"
            onChange={(e) => {
              onValueChange("title", e.target.value);
            }}
            value={data.title}
            className="grow"
            placeholder="Required"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Vendor
          </span>
          <input
            type="text"
            onChange={(e) => {
              onValueChange("vendorName", e.target.value);
            }}
            value={data.vendorName}
            className="grow"
            placeholder="Optional"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Buyer Name
          </span>
          <input
            type="text"
            onChange={(e) => {
              onValueChange("buyerName", e.target.value);
            }}
            value={data.buyerName}
            className="grow"
            placeholder="Optional"
          />
        </label>

        <div className="flex space-x-4 w-full  mb-4 items-center justify-evenly">
          <label className="input input-bordered flex items-center gap-2 ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
              ACV ($)
            </span>
            <input
              required
              type="number"
              onChange={(e) => {
                onValueChange("reqACV", e.target.value);
              }}
              value={data.reqACV}
              className="w-[100px]"
              placeholder="USD Amount"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="text"
              name="reqType"
              className="bg-red-500  absolute -z-30
"
              value={data.reqType}
              onChange={() => {}}
              required
            />
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
              Type
            </span>
            <details className="dropdown dropdown-top" id="reqTypeDropdown">
              <summary className="w-[150px] h-full p-2">
                {data.reqType || "Required"}
              </summary>
              <ul className="p-2 shadow menu open  dropdown-content z-[1] bg-base-100 rounded-box w-full">
                <li
                  className=""
                  onClick={() => {
                    onValueChange("reqType", "Single Source");
                  }}>
                  <a>Single Source</a>
                </li>
                <li
                  className=""
                  onClick={() => {
                    onValueChange("reqType", "Tender");
                  }}>
                  <a>Tender</a>
                </li>
                <li
                  className=""
                  onClick={() => {
                    onValueChange("reqType", "Revision");
                  }}>
                  <a>Revision</a>
                </li>
                {/* <li className='' onClick={()=>{onSectionChange('PBO')}}><a>PBO</a></li> */}
              </ul>
            </details>
          </label>

          <label className="input input-bordered flex items-center gap-2 ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
              Date
            </span>
            <input
              required
              type="text"
              onChange={(e) => {
                onValueChange("reqDate", e.target.value);
              }}
              value={data.reqDate}
              className="w-[100px]"
              placeholder="DD.MM.YYYY"
            />
          </label>
        </div>

        <label className="input input-bordered flex items-center gap-2 ">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Notes
          </span>
          <input
            type="text"
            onChange={(e) => {
              onValueChange("notes", e.target.value);
            }}
            value={data.notes || " "}
            className="grow"
            placeholder="Optional"
          />
        </label>

        <div className="flex gap-x-8 justify-end">
        <label className=" flex items-center gap-2 mt-4">
            <span>Email Alerts</span>
        <input type="checkbox" className="toggle toggle-success"  defaultChecked={data.emailAlerts}
           onClick={(e) => {
            onValueChange("emailAlerts", e.target.checked);
          }}
        />
        </label>

        <label className=" flex items-center gap-2 mt-4">
            <span>Archived</span>
        <input type="checkbox" className="toggle toggle-success"  defaultChecked={data.archived}
           onClick={(e) => {
            onValueChange("archived", e.target.checked);
          }}
        />
        </label>

        </div>

        <div className="w-full mt-4 flex justify-end ">
          {valuesChanged?.length ? (
            <button className="btn btn-primary text-primary-content font-bold uppercase">
              Update
            </button>
          ) : (
            <button
              className="btn btn-primary text-primary-content font-bold uppercase "
              disabled>
              Update
            </button>
          )}
        </div>
      
      
      </form>
      </>}
    </div>
  );
};

export default RequisitionEditModal;
