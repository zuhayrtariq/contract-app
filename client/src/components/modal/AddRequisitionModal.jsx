import React, { useState } from 'react'
import { useInsertRequisitionMutation } from '../../store/store'
import { FaPlus } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';
import {convertDateToISOFormat} from '../../hooks/date.hook'
const AddRequisitionModal = () => {
    const [addRequisition,results] = useInsertRequisitionMutation();
    const [formSubmitted,setFormSubmitted] = useState(false)
    const [data, setData] = useState(
        {
            reqNo: '',
            sectionCode : '',
            title : '',
            vendorName : '',
            buyerName : '',
            reqACV : '',
            reqType : '',
            reqDate: '',
            notes: ''
        }
    )

    const handleFormSubmit = async(e) =>{
        e.preventDefault()
       data.reqDate = convertDateToISOFormat(data.reqDate);
        await addRequisition(data)
       
      
       setFormSubmitted(true);
    } 
    if(formSubmitted)
      {
        if(results.isError)
        {
          toast.dismiss()
          toast.error(results?.error?.data?.message || "Error While Creating New PR")
        }
        if(results.isSuccess)
          {
            document.getElementById('addRequisitionModal').close();
            toast.dismiss();
            toast.success(`Requisition ${data.reqNo} Added`);
            setData({
              reqNo: '',
              sectionCode : '',
              title : '',
              vendorName : '',
              buyerName : '',
              reqACV : '',
              reqType : '',
              reqDate: '',
              notes: ''
          })
          }
        setFormSubmitted(false)
      }
   const onSectionChange = (x) =>{
    setData(prevState =>({
        ...prevState,
        sectionCode: x
    }));
    const dropdown = document.getElementById('sectionDropdown');
    dropdown.open = false;
   
   }

   const onValueChange = (key,value) =>{
    setData(prevState =>({...prevState,
        [key] : value
    }))
   }
   
   const onReqTypeChange = (x) =>{
    setData(prevState =>({
        ...prevState,
        reqType: x
    }));
    const dropdown = document.getElementById('reqTypeDropdown');
    dropdown.open = false
   }
 
  return (
    <div>


    <button className="btn btn-primary   mr-4 btn-sm font-bold" onClick={()=>{document.getElementById('addRequisitionModal').showModal();}}>
      <FaPlus/> New Requisition
    </button>
<dialog id="addRequisitionModal" className="modal ">

<div className="modal-box max-w-max">
<form method="dialog">
  {/* if there is a button in form, it will close the modal */}
  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
</form>

<form onSubmit={handleFormSubmit} className='form-control'>
<h1 className='font-bold flex w-full items-center justify-center text-xl uppercase text-primary mb-1'>New Requisition Form</h1>
<hr />
<div className="flex space-x-4 mb-4 mt-4  items-center justify-around">
<label className="input input-bordered flex items-center gap-2 font-bold ">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary'>Requisition No.
    </span>
  <input required type="number" className="w-[150px]" placeholder="Required" value={data.reqNo} onChange={(e)=>{onValueChange('reqNo',e.target.value)}}/>
</label>

<label className="input required input-bordered flex items-center gap-2 ">
<input type="text" name='sectionCode' className='bg-red-500  absolute -z-30
' value={data.sectionCode} onChange={()=>{}}  required />
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit text-primary'>Section Code
    </span>
    <details className="dropdown " id='sectionDropdown'>
    
    <summary className="w-[100px] h-full p-2 font-bold">{data.sectionCode || 'Required'}</summary>
  <ul className="p-2 shadow menu  dropdown-content z-[1] bg-base-100 rounded-box w-full">
  <li className='' onClick={()=>{onSectionChange('PNI')}}><a>PNI</a></li>
  <li className='' onClick={()=>{onSectionChange('PTA')}}><a>PTA</a></li>
  <li className='' onClick={()=>{onSectionChange('PBA')}}><a>PBA</a></li>
  <li className='' onClick={()=>{onSectionChange('PBO')}}><a>PBO</a></li>
  </ul>
</details>
</label>

</div>






<label className="input input-bordered flex items-center gap-2 mb-4 ">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Title
    </span>
  <input required type="text" onChange={(e)=>{onValueChange('title',e.target.value)}} value={data.title} className="grow" placeholder="Required" />
</label>

<label className="input input-bordered flex items-center gap-2 mb-4">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Vendor
    </span>
  <input  type="text" onChange={(e)=>{onValueChange('vendorName',e.target.value)}} value={data.vendorName} className="grow" placeholder="Optional" />
</label>

<label className="input input-bordered flex items-center gap-2 mb-4">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Buyer Name
    </span>
  <input  type="text" onChange={(e)=>{onValueChange('buyerName',e.target.value)}} value={data.buyerName} className="grow" placeholder="Optional" />
</label>

<div className="flex space-x-4">
<label className="input input-bordered flex items-center gap-2 mb-4">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>ACV ($)
    </span>
  <input required type="number" onChange={(e)=>{onValueChange('reqACV',e.target.value)}} value={data.reqACV} className="w-[100px]" placeholder="USD Amount" />
</label>
<label className="input input-bordered flex items-center gap-2 ">
<input type="text" name='reqType' className='bg-red-500  absolute -z-30
' value={data.reqType} onChange={()=>{}} required />
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Type
    </span>
    <details className="dropdown dropdown-top" id='reqTypeDropdown'>
    <summary className="w-[150px] h-full p-2">{data.reqType || 'Required'}</summary>
  <ul className="p-2 shadow menu open  dropdown-content z-[1] bg-base-100 rounded-box w-full">
  <li className='' onClick={()=>{onReqTypeChange('Single Source')}}><a>Single Source</a></li>
  <li className='' onClick={()=>{onReqTypeChange('Tender')}}><a>Tender</a></li>
  <li className='' onClick={()=>{onReqTypeChange('Revision')}}><a>Revision</a></li>
  {/* <li className='' onClick={()=>{onSectionChange('PBO')}}><a>PBO</a></li> */}
  </ul>
</details>
</label>

<label className="input input-bordered flex items-center gap-2 mb-4">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Date
    </span>
  <input required type="text" onChange={(e)=>{onValueChange('reqDate',e.target.value)}} value={data.reqDate} className="w-[100px]" placeholder="DD.MM.YYYY" />
</label>
</div>

<label className="input input-bordered flex items-center gap-2 ">
  <span className='font-bold  h-full flex items-center pr-4 border-r border-inherit'>Notes
    </span>
  <input type="text" onChange={(e)=>{onValueChange('notes',e.target.value)}} value={data.notes} className="grow" placeholder="Optional" />
</label>
<div className='w-full mt-4 flex justify-end'>

<button className="btn btn-primary text-primary-content font-bold uppercase">Save</button>
</div>
</form>


</div>
</dialog>
</div>
  )
}

export default AddRequisitionModal