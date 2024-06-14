import React, { useState } from "react";
import { useDeleteRequisitionMutation } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";

const DeleteReqButton = ({ reqNo,closeForm }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [deleteRequisition, results] = useDeleteRequisitionMutation();
  const handleBtnClick = async (e) => {
    e.preventDefault();
    await deleteRequisition(reqNo);
    setFormSubmitted(true);
  };
  if (formSubmitted) {
    if (results.isError) {
      toast.dismiss();
      toast.error(`Error While Deleting Requisition ${reqNo}`);
    } else if (results.isSuccess) {
      toast.dismiss();
      toast.success(`Requisition ${reqNo} Deleted Successfully`);
      closeForm()
      
    }
    setFormSubmitted(false)
  }
  return (
    <>
      <button
        className="btn btn-error text-white font-bold"
        onClick={(e) => {
          handleBtnClick(e);
        }}>
        Delete
      </button>
    </>
  );
};

export default DeleteReqButton;
