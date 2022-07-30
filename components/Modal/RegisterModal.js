import { Fragment, useRef, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/router";


const RegisterModal = (props) => {

    const { show, onClose } = props;
    const cancelButtonRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [active, setActive] = useState(false)
    const [saveForm, setSaveForm] = useState(true)
    const { push } = useRouter();

    const closeModal = () => {
        reset({ username: "", password: "", email: "", password2:"", code: "" });
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

        if (saveForm) {
            setSaveForm(false);
            const code = event.code;
            const username = event.username;
            const email = event.email
            const password = event.password;
            const confirmPassword = event.password2;


             console.log(username)
             console.log(email)
            const data = {
                username: username,
                email: email,
                password: password,
                roles: ["user","admin"]

            }

            const createPost = await new Promise((resolve, reject) => {
                axios.post('http://localhost:8080/api/auth/signup', data)
                    .then(response => {
                        resolve(response);
                        console.log(response.data)
                        alert("User was registered successfully!")
                        closeModal()             
                    }).catch(error => {
                        if (error.response.status === 401) {
                            resolve(error.response.status)
                        }
                        resolve(error);
                    })
            });

            setSaveForm(true);

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
                        <div className="inline-block w-[327px] h-[600px] align-bottom bg-[#1BE56C] text-left overflow-hidden shadow-xl transform transition-all my-[1.5rem] m:my-[10rem] rounded-[1.875rem]">
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
                                            REGISTER
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>


                            <div className="h-[360px]">

                                {/*Contenido*/}


                                <form onSubmit={handleSubmit(onSubmit)} id="registerUser">
                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]'>REFERAL CODE</div>
                                    <input
                                        {...register("code", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })} name='code'
                                        type="text"
                                        className="ml-[24px] mb-[8px] border-[2px] border-[#EDEDED] rounded-full w-[279px] h-[48px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                        autoComplete='off' />

                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]'>USERNAME</div>
                                    <input
                                        {...register("username", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })} name='username'
                                        type="text"
                                        className="ml-[24px] mb-[8px] border-[2px] border-[#EDEDED] rounded-full w-[279px] h-[48px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                        autoComplete='off' />
                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]'>EMAIL</div>
                                    <input
                                        {...register("email", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })} name='email'
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
                                    <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]'>CONFIRM PASSWORD</div>
                                    <input
                                        {...register("password2", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })} name='password2'
                                        type="password"
                                        className="ml-[24px] mb-[8px] border-[2px] border-[#EDEDED] rounded-full w-[279px] h-[48px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                        autoComplete='off' />
                                    <div className='flex mt-[20px]'>

                                        <button type="submit"
                                            className="h-[48px] w-[135px] bg-[#000000] rounded-full font-bold text-[16px] leading-[22px] tracking-[-1px] ml-[auto] mr-[auto] pl-[16px] pr-[16px]">
                                            <div className='flex '>

                                                <div className='text-white ml-[auto] mr-[auto] font-bold '>CREATE ACCOUNT</div>
                                            </div>
                                        </button>


                                    </div>
                             
                                </form>





                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default RegisterModal;