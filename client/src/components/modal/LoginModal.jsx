import React, { useContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAdminLoginMutation } from '../../store/apis/LoginApi';
import { AdminContext } from '../../context/AdminContext';

const LoginModal = () => {
    const [loginFunc,results] = useAdminLoginMutation();
    const {setIsAdmin} = useContext(AdminContext)
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        const temp = await loginFunc({username,password}).unwrap();
  
        
        if(temp)
        {
            localStorage.setItem('isAdmin',true);
            setIsAdmin(true);
        }

    }
  return (
    <div>
<dialog id="loginModal" className="modal backdrop-blur-md">
    <div className="modal-box  max-w-sm ">

<form onSubmit={handleFormSubmit} method="post">
<h1 className='flex w-full items-center justify-center font-bold text-primary text-xl mb-4'>Admin Login</h1>
<label className="input input-bordered flex items-center gap-2 mb-4">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
</label>
<label className="input input-bordered flex items-center gap-2 mb-4">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
</label>

<button className='flex w-full bg-primary text-primary-content text-lg font-bold hover:brightness-90 items-center justify-center rounded'>Login</button>

</form>

<form method="dialog"  >
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl w-[40px] h-[40px]"  >✕</button>
    </form>
    <Toaster/>
    </div>
  


   

 
</dialog>
    </div>
  )
}

export default LoginModal