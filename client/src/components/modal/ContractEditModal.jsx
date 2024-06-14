import React, { useContext, useEffect, useState } from "react";
import { useUpdateContractMutation } from "../../store/store";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { ModalDataContext } from "../../context/ModalDataContext";
import { convertDateDotFormat } from "../../hooks/date.hook";
import { useDeleteContractMutation } from "../../store/apis/contractsApi";

const ContractEditModal = () => {
  const { modalData,setModalName } = useContext(ModalDataContext);
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loaded,setLoaded] = useState(false)
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      contractNo : modalData.contractNo,
      reqNo: modalData.reqNo,
      sectionCode: modalData.sectionCode,
      title: modalData.title,
      vendorName: modalData.vendorName,
      startDate: convertDateDotFormat(modalData.startDate,'YYYY-MM-DD'),
      endDate: convertDateDotFormat(modalData.endDate,'YYYY-MM-DD'),
      notes: modalData.notes,
      emailAlerts : modalData.emailAlerts,
      archived : modalData.archived,
    });
    setLoaded(true);
  }, [modalData]);

  const [valuesChanged, setValuesChanged] = useState([]);
  const [updateContracts, results] = useUpdateContractMutation();
  const [deleteContract, deleteResults] = useDeleteContractMutation();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateContracts(data);

    setFormSubmitted(true);
  };
  if (formSubmitted) {
    if (results.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Updating Contract");
    }
    if (results.isSuccess) {
      // document.getElementById('ContractEditModal').close();
      toast.dismiss();
      toast.success(`Contract ${data.contractNo} Updated`);
    }
    setFormSubmitted(false);
  }
  if (deleted) {
    if (deleteResults.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Deleting Contract");
    }
    if (deleteResults.isSuccess) {
      // document.getElementById('ContractEditModal').close();
      toast.dismiss();
      toast.success(`Contract ${data.contractNo} Deleted`);
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
    await deleteContract(data.contractNo);
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
          Contract Form
        </h1>
        <hr />
        <form onSubmit={handleFormSubmit} className="form-control">
        <div className="flex space-x-4 mb-4 mt-4  items-center justify-around">
          <label className="input input-bordered flex items-center gap-2 font-bold ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary">
              Contract No.
            </span>
            <span className="w-[150px]">{data.contractNo}</span>
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
          <label className="input input-bordered flex items-center gap-2 font-bold ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary">
              Requisition No.
            </span>
            <input className="w-[150px]" value={data.reqNo || ""}  onChange={(e) => {
              onValueChange("reqNo", e.target.value);
            }}/>
          </label>
        </div>

        <label className="input input-bordered flex items-center gap-2 mb-4 ">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Title
          </span>
          <input
            required
            type="text"
            maxLength={75}
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
            <div className="flex w-full items-center justify-around gap-x-8">

          
        <label className="input input-bordered w-1/2 max-w-[400px] flex items-center gap-2 mb-4">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            Start Date
          </span>
          <input
            type="text"
            onChange={(e) => {
              onValueChange("startDate", e.target.value);
            }}
            value={data.startDate}
            className="grow"
            placeholder="Optional"
          />
        </label>
        <label className="input input-bordered w-1/2 max-w-[400px] flex items-center gap-2 mb-4">
          <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit">
            End Date
          </span>
          <input
            type="text"
            onChange={(e) => {
              onValueChange("endDate", e.target.value);
            }}
            value={data.endDate}
            className="grow"
            placeholder="Optional"
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

export default ContractEditModal;
