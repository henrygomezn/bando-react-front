import Image from 'next/image'
import { useEffect, useState } from 'react';
import LoginModal from '../components/Modal/LoginModal';
import RegisterModal from '../components/Modal/RegisterModal';
import { Fragment, useRef } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'

import axios from "axios";
import { useRouter } from "next/router";


export default function home() {


    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);

    const cancelButtonRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [active, setActive] = useState(false)
    const [saveForm, setSaveForm] = useState(true)
    const { push } = useRouter();

    const closeModal = () => {
        reset({ username: "",  password: ""});
        clearErrors()
        onClose();
    }

    const handleCallback = (childData) => {
        setActive(childData);
    }
    const navigate = (url) => {
        push(url);
    }

    const onSubmit = async (event) => {

        if(saveForm){
            setSaveForm(false);
            const username = event.username;
            const password = event.password;

            const data = {
                username: username,
                password: password
            }


            const accessLogin = await new Promise((resolve, reject) => {
                axios.post('https://bando-back.herokuapp.com/api/auth/signin', data)
                    .then(response => {
                        resolve(response);
                        console.log(response)
                        localStorage.setItem('user_id', JSON.stringify(response.data.id))
                        setSaveForm(true);
                        alert("Sign in successfully!")
                        navigate("/general")
                    }).catch(error => {
                        if(error){
                            alert("bad credentials")
                   
                            window.location.reload()
                        }
                         
                    })
            });

            console.log(data)
            setSaveForm(true);
    
      
        }

 
    };

    
   


    return (

        <div className=' min-h-screen bg-[#000000]'>
   
          <div className="bg-[#1BE56C] bg-cover h-[80px] flex flex-inline">
                <div className="flex justify-start ml-[24px]">
                    <Image src="/bando-logo.png"  alt="Bando logo" width={80} height={60} />
                </div>
                <div className='flex flex-auto justify-end text-black items-center mr-[24px]'>
                        <div className='ml-[auto] mr-[auto]'> <Image src="/bando-text.png" alt="Bando logo" width={120} height={80} /></div>

                    </div>
                </div>

              <div className="flex items-end justify-center">
       



                        <div className="inline-block w-[327px] h-[500px] align-bottom pt-[5vh] pb-[5vh] bg-[#1BE56C] text-left overflow-hidden shadow-xl transform transition-all my-[5rem] m:my-[10rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className=" justify-end">
                                <div className="flex flex-col">
                                  
                                    <div className="ml-[auto] mr-[auto] font-bold text-[24px] mb-[8px]">
                                       
                                            SIGN IN
                                    
                                    </div>
                                </div>
                            </div>


                            <div className="h-[360px]">

                                {/*Contenido*/}

                          
                                <form onSubmit={handleSubmit(onSubmit)} id="loginUser">
                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]'>USERNAME</div>
                                    <input
                                        {...register("username", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })} name='username'
                                        type="text"
                                        className="ml-[24px] border-[2px] border-[#EDEDED] rounded-full w-[279px] h-[48px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                        autoComplete='off' />
                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px] mt-[18px]'>PASSWORD</div>
                                    <input
                                      {...register("password", {
                                        required: { value: true, message: "* Campo Requerido" },
                                    })} name='password'
                                        type="password"
                                        className="ml-[24px] border-[2px] border-[#EDEDED] rounded-full w-[279px] h-[48px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                        autoComplete='off' />

                                    <div className='flex mt-[20px]'>

                                        <button type="submit"
                                            className="h-[48px] w-[135px] bg-[#000000] rounded-full font-bold text-[16px] leading-[22px] tracking-[-1px] ml-[auto] mr-[auto]">
                                            <div className='flex '>

                                                <div className='text-white ml-[auto] mr-[auto] font-bold '>SIGN IN</div>
                                            </div>
                                        </button>


                                    </div>
                                

                                    </form>
                          

                                    <label className='text-black text-sm flex flex-col mt-[1rem]'>
                                    <div className='text-black ml-[auto] mr-[auto] font-bold mt-[1rem] '>Forgot password?</div>
                                    <div className='text-black ml-[auto] mr-[auto] font-bold mt-[1rem] '>New Member?</div>
                                    <button type="submit"
                                        className="h-[48px] w-[180px] bg-[#000000] pl-[1rem] pr-[2rem] rounded-full font-bold text-[16px] leading-[22px] tracking-[-1px] ml-[auto] mr-[auto]">
                                        <div className='flex '>

                                            <div className='text-white ml-[auto] mr-[auto] font-bold ' onClick={() => setShowModalRegister(true)}>SIGN UP WHIT YOUR CODE HERE</div>
                                            <RegisterModal show={showModalRegister} onClose={() => setShowModalRegister(false)} parentCallback={handleCallback} />
                                        </div>
                                    </button>
                                    </label>


                            </div>

                        </div>
                 
                </div>
        </div>

    )
}




