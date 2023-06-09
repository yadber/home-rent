import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinner from '../components/Spinner';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = React.useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })  
  
  const {name, email} = formData;
  
  function onLogout(){
    auth.signOut();
    navigate("/")
  }

  function onChangeValue(e){
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  async function ApplyChange(){
    if(changeDetail){
      
      try {
        if(auth.currentUser.displayName !== name){
          //update display name in firebase authentication 
          await updateProfile(auth.currentUser, {
            displayName:name
          });

          // fire store update
          const docRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(docRef,{name})
          toast.success("profile updated successfully!");
        }else{
          
          toast.info("There is no new change!")
        }
        

      } catch (error) {
        
        toast.error("sorry, something went wrong")
      }
    }
   
    setChangeDetail(prevState => !prevState);
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-center text-3xl mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>
            <input type='text' id="name" value={name} onChange={onChangeValue} disabled = {!changeDetail} 
            className={`w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 
            rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
             <input type='email' id="email" value={email} onChange={onChangeValue} disabled className='w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 
            rounded transition ease-in-out'/>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>Do you want to change your name? <span onClick={ApplyChange}
               className='text-red-600 hover:text-red-700 hover:underline transition ease-in-out duration-200 ml-1 cursor-pointer'>
                {changeDetail ? "apply change" : "Edit"}</span></p>
              <p className='text-blue-600 hover:text-blue-800 hover:underline transition duration-200 ease-in-out cursor-pointer' onClick={onLogout}>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
