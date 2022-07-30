import Layout from '../components/Layout/Layout'

import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form'
import {BsSearch} from 'react-icons/bs';

export default function SearchPage() {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();


    return (

        <Layout refreshDate='' selected="bg-[#F3F3F3]" position="searchPage">

            <div className='flex flex-wrap font-bold  text-[#ffff] pb-[16px] pt-[16px]  border-solid border-[1px] border-[gray] '>


                <input
                    {...register("post", {
                        required: { value: true, message: "* Campo Requerido" },
                    })}
                    name='post'
                    type="text"
                    className="flex  ml-[auto] border-[2px] border-[#EDEDED] rounded-l-[9px] w-[50vw] h-[48px] text-[black] text-center focus:outline-none focus-visible:ring-[1px] focus-visible:ring-[#1BE56C]"
                    placeholder='Username Search?'
                    autoComplete='off' />
                <button className='mr-[auto] h-[48px] bg-[#1BE56C] w-[3rem]  rounded-r-[9px] hover:bg-[#1be56c9c]' type='submit'>
                    <BsSearch className='self-center text-[24px] ml-[auto] mr-[auto]  ' />
                </button>

     
            </div>



        </Layout>

    )
}




