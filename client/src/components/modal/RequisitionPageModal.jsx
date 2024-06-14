import React, { useContext, useState } from "react";

import { ModalDataContext } from "../../context/ModalDataContext";
import { convertDateMMMFormat } from "../../hooks/date.hook";
import DeleteReqButton from "../buttons/DeleteReqButton";
import { formatToCurrency } from "../../hooks/formatToCurrency.hook";

const RequisitionPageModal = () => {
  const { modalData: data } = useContext(ModalDataContext);

  return (
    <div className="w-full">
      <h1 className="font-bold flex w-full items-center justify-center text-xl uppercase text-primary">
        Requisition Form
      </h1>
      <hr />
      <div className="mt-4 ">
              <div className="flex  justify-around">
        <div className="join flex items-center justify-center mb-4 font-bold  text-center">
          <div className="p-2 bg-primary text-primary-content w-[150px] join-item">
            Requisition No.
          </div>
          <div className="p-2 join-item bg-base-300 w-[130px] ">{data.reqNo}</div>
        </div>
        <div className="join  flex items-center justify-center mb-4 font-bold  text-center">
          <div className="p-2 bg-primary text-primary-content w-[100px] join-item">
            Section
          </div>
          <div className="p-2 join-item bg-base-300 w-[80px]">{data.sectionCode}</div>
        </div>
      </div>

      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Requisition Title
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {data.title}
        </div>
      </div>

      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Vendor Name
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {data.vendorName}
        </div>
      </div>
      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Buyer Name
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {data.buyerName}
        </div> 
      </div>

      <div className="flex w-full  mb-4 items-center justify-around gap-x-4">
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden ">
          <div className="  font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center ">
            Requisition ACV
          </div>

          <div className="  py-1 flex w-full justify-center  items-center  ">
            {formatToCurrency(data.reqACV) }
          </div>
        </div>
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Requisition Type
          </div>

          <div className="  py-1 flex w-full justify-center  items-center  ">
            {data.reqType}
          </div>
        </div>
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Requisition Date
          </div>

          <div className="  py-1 flex w-full justify-center  items-center  ">
            {convertDateMMMFormat(data.reqDate)}
          </div>
        </div>
      </div>

      <div className="w-full bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Notes
          </div>

          <div className="text-base px-4  py-2 min-h-[40px] ">
            {data.notes || 'No Notes.'}
          </div>
        </div>
    </div>
      </div>

  );
};

export default RequisitionPageModal;
