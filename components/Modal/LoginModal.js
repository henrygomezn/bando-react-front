import { Fragment, useRef, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import HwSwitch from '../HwSwitch'
import axios from "axios";
import { useRouter } from "next/router";


const LoginModal = (props) => {

    const { show, onClose } = props;
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
                user: username,
                password: password
            }
            console.log(data)
            closeModal()
            setSaveForm(true);
            navigate("/general")
      
        }

 
    };

    
   

    return (

        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-autogrid" initialFocus={cancelButtonRef} onClose={() => closeModal()} >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center content-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#000000] bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 "
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 "
                        leaveTo="opacity-0 translate-y-4 "
                    >
                        <div className="inline-block w-[327px] h-[500px] align-bottom bg-[#1BE56C] text-left overflow-hidden shadow-xl transform transition-all my-[5rem] m:my-[10rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className="px-4 pt-5 justify-end">
                                <div className="flex flex-col">
                                    <div className='flex justify-end mr-[0.5rem]'>
                                        <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full bg-[black] cursor-pointer" onClick={() => closeModal()}>
                                            <RiCloseFill className='w-[1.5rem] h-[1.5rem] text-[#ffff]/60' aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="ml-[auto] mr-[auto]">
                                        <Dialog.Title as="h3" className="text-[32px] font-bold leading-[42px] text-black tracking-[-3%] whitespace-nowrap mb-[19px] ">
                                            SIGN IN
                                        </Dialog.Title>
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
                                    <label className='text-black text-sm flex flex-col mt-[1rem]'>
                                    <div className='text-black ml-[auto] mr-[auto] font-bold mt-[1rem] '>Forgot password?</div>
                                    <div className='text-black ml-[auto] mr-[auto] font-bold mt-[1rem] '>New Member?</div>
                                    <button type="submit"
                                        className="h-[48px] w-[180px] bg-[#000000] pl-[1rem] pr-[2rem] rounded-full font-bold text-[16px] leading-[22px] tracking-[-1px] ml-[auto] mr-[auto]">
                                        <div className='flex '>

                                            <div className='text-white ml-[auto] mr-[auto] font-bold '>SIGN UP WHIT YOUR CODE HERE</div>
                                        </div>
                                    </button>
                                    </label>

                                    </form>
                          




                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default LoginModal;