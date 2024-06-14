import React, { useContext, useEffect, useState } from "react";

import { FaPlus, FaTrashCan } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { ModalDataContext } from "../../context/ModalDataContext";
import { useDeleteCallOffMutation, useUpdateCallOffMutation } from "../../store/apis/coffApi";

const CoffEditModal = () => {
  const { modalData,setModalName } = useContext(ModalDataContext);
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loaded,setLoaded] = useState(false)
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      coffNo : modalData.coffNo,
     
      title: modalData.title,
      notes: modalData.notes,
      emailAlerts : modalData.emailAlerts,
      archived : modalData.archived,
    });
    setLoaded(true);
  }, [modalData]);

  const [valuesChanged, setValuesChanged] = useState([]);
  const [updateCallOff, results] = useUpdateCallOffMutation();
  const [deleteCallOff, deleteResults] = useDeleteCallOffMutation();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateCallOff(data);
    setFormSubmitted(true);
  };
  if (formSubmitted) {
    if (results.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Updating Call-off");
    }
    if (results.isSuccess) {
      // document.getElementById('CoffEditModal').close();
      toast.dismiss();
      toast.success(`Call-off ${data.coffNo} Updated`);
    }
    setFormSubmitted(false);
  }
  if (deleted) {
    if (deleteResults.isError) {
      toast.dismiss();
      toast.error(results?.error?.data?.message || "Error While Deleting Call-off");
    }
    if (deleteResults.isSuccess) {
      // document.getElementById('CoffEditModal').close();
      toast.dismiss();
      toast.success(`Call-off ${data.coffNo} Deleted`);
    }
    //Close Modal
    setModalName('')
  }

  const onValueChange = (key, value) => {

    setData((prevState) => ({ ...prevState, [key]: value }));
    if (value != modalData[key]) {
      if (!valuesChanged.includes(key))
        setValuesChanged((prevArray) => [...prevArray, key]);
     
    } 

  if (value == modalData[key]) {
      const index = valuesChanged.indexOf(key);

      if (index != -1) {
        setValuesChanged((prevArray) => prevArray.filter((x) => x != key));
      }
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    await deleteCallOff(data.coffNo);
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
          Call-off Edit Form
        </h1>
        <hr />
        <form onSubmit={handleFormSubmit} className="form-control">
        <div className="flex space-x-4 mb-4 mt-4  items-center justify-around">
          <label className="input input-bordered flex items-center gap-2 font-bold ">
            <span className="font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary">
              Call-off No.
            </span>
            <span className="w-[150px]">{data.coffNo}</span>
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

export default CoffEditModal;
