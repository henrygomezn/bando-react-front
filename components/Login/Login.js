import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/router";
import EncryptConfig from "./utils/encryptConfig"
import {signIn} from "next-auth/react"

const Login = () => {
  
    const {register, handleSubmit,formState:{errors}} = useForm();
    const {push} = useRouter();
    
    const onSubmit = async (event) => {
      
      
      const email = event.email;
      const pass = event.password;
      

       push("/general");
  };
 
  return (
    
    <>
       
        <div className='login-container'>
        
            <span className='mt-[-1rem] mb-[0.5rem]'>
            <Image src="/logo.svg" alt="HwMonit Logo" width={167} height={109} />
            </span>

            <div className='login-frame-container'>
                
                <span className='ml-7 mt-7'>
                <Image src="/coopeuch-logo.svg" alt="Coopeuch Logo" width={174} height={53} />
                </span>

                <span className='font-bold text-white ml-7 mt-4 text-2xl font-body'>
                    Inicia Sesión
                </span>

                <p className='text-white ml-7 mt-4 text-base'>
                    Bienvenido a HwMonit
                </p>

                <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-white/40 mx-7"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                <label className='text-white text-sm flex flex-col mx-7'>
                    <span className='mb-0.5'>Email:</span>
                    <input 
                        {...register("email", {required: {value: true, message: "* Campo Requerido"}, 
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "* Formato inválido"}})} name='email' placeholder="correo@correo.cl" type="text"  
                        className={
                            `login-email-base
                            ${errors.email && "login-email-error"}
                        `}
                        autoComplete='off'/>
                </label>
                {errors.email && <span className='text-xs text-red-600 ml-7 '>{errors.email.message}</span>}

                <label  className='text-white text-sm flex flex-col mx-7 mt-1 '>
                    <span  className='mb-0.5'>Password:</span>
                    <input {...register("password", {required: {value: true, message: "* Campo Requerido"},  minLength: {value: 1,message: "El campo no debe quedar vacío",
                  }})}  id="password" label="Password" placeholder="Password" name='password' type="password"  
                    className={
                    `login-password-base
                    ${errors.password && "login-password-error"}
                    `} />
                </label>
                {errors.password && <span className='text-xs text-red-600 ml-7'>{errors.password.message}</span>}
                
                <div className='flex flex-col '>
                    <button type="submit" 
                    className={
                    `login-submit
                    ${errors.email && "mt-[0.475rem]"}
                    ${errors.password && "mt-[0.3rem]"}
                    ${(errors.password && errors.email) && "mt-[0.225rem]"}
                    `}>
                        Iniciar sesión
                    </button>

                    <span className='text-white text-xs text-center mt-[0.75rem]'>2022 todos los derechos reservados, HWMonit </span>
                </div>
                </form>

            </div> 

            <span className='text-white text-xs text-center mt-[0.5rem]'>v1.0</span>
        
        </div>
    </>
  )
}

export default Login;
