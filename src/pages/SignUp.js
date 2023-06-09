import React from 'react'
import key from '../img/key2.jpg'
import {BiHide,BiShowAlt} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name : "",
    email : "",
    password : ""
  })
  const {name, email, password} = formData;
  const navigate = useNavigate()
  function onChangeValue(e){
    setFormData(prevState => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }
  async function onSubmit(e){
    e.preventDefault();
      
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {displayName: name})
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid),
      formDataCopy)
      toast.success("Sign up Successful!")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("something went wrong with the registration")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'> 
          <img src={key} alt='Key' className='w-full rounded-2xl'/>
        </div>
        <div  className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>

            <input type='text' id='name' value={name} placeholder='Full name' 
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' 
              onChange={onChangeValue}/>
            <input type='email' id='email' value={email} placeholder='Email address' 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6' 
            onChange={onChangeValue}/>
          
          
          <div className='relative mb-6'>
            <input type={`${!showPassword ? 'password':'text'}`} id="password" value={password} placeholder='Password' 
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
              onChange={onChangeValue} />
            {!showPassword ? <BiHide className='cursor-pointer  absolute right-3 top-3 text-xl ' onClick={()=>setShowPassword(true)}/> 
            : <BiShowAlt className='cursor-pointer absolute top-3 right-3 text-xl' onClick={()=>setShowPassword(false)}/>}
          </div>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6'>have an account? 
            <Link to="/sign-in" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>
              Sign In</Link></p>
            <p><Link to="/forgot-password" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>
              Forgot password?</Link></p>
          </div>
          
          <button 
          className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
           type='submit'>Sign Up</button>
           <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
           </div>
          <OAuth/>
          </form> 
        </div>
      </div>
    </section>
  )
}
