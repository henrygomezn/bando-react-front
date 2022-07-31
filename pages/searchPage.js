import Layout from '../components/Layout/Layout'

import Image from 'next/image';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form'
import {BsSearch} from 'react-icons/bs';
import { useRouter } from "next/router";


export default function SearchPage() {
    
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [saveForm, setSaveForm] = useState(true)
    const [listSearch,setListSearch] = useState([])
    const [flagChange, setFlagChange] = useState(true)
    const { push } = router;



    useEffect(() => {
   
    
      }, [listSearch])

    const onSubmit = async (event) => {
   if (saveForm) {
      setSaveForm(false);

        const data = {
            usernameSearch : event.userSearch
        }

        console.log(data)

    
        const response = await new Promise((resolve, reject) => {
          axios.post('http://localhost:8080/api/userSearch',data)
            .then(response => {
              resolve(response.data);
              console.log(response.data)
              setListSearch(response.data)
     
            }).catch(error => {
              if (error.response.status === 401) {
                resolve(error.response.status)
              }
              resolve(error);
            })
        });

        setSaveForm(true);
        reset({userSearch: ""})
        
    
    }
    
      }
    
      const navigate = (url) => {
        push(url);
      }
    

    return (

        <Layout refreshDate='' selected="bg-[#F3F3F3]" position="searchPage">

    <form onSubmit={handleSubmit(onSubmit)} id="searchUser">

            <div className='flex flex-wrap font-bold  text-[#ffff] pb-[16px] pt-[16px]  border-solid border-[1px] border-[gray] '>

 
                <input
                    {...register("userSearch", {
                        required: { value: true, message: "* Campo Requerido" },
                    })}
                    name='userSearch'
                    type="text"
                    className="flex  ml-[auto] border-[2px] border-[#EDEDED] rounded-l-[9px] w-[50vw] h-[48px] text-[black] text-center focus:outline-none focus-visible:ring-[1px] focus-visible:ring-[#1BE56C]"
                    placeholder='Username Search?'
                    autoComplete='off' />
                <button className='mr-[auto] h-[48px] bg-[#1BE56C] w-[3rem]  rounded-r-[9px] hover:bg-[#1be56c9c]' type='submit'>
                    <BsSearch className='self-center text-[24px] ml-[auto] mr-[auto]  ' />
                </button>

        
            </div>

            </form>
            <div className='text-[white] text-center mb-[16px] mt-[16px] font-bold text-[20px]'>Results </div>
            { listSearch && listSearch.length> 0 &&  listSearch.map((item) => 
              <div className=''>
                  
                   <div className='flex bg-[white] w-[200px] mr-[auto] ml-[auto] p-[16px] rounded-[16px] mb-[8px]'> 
                   <div className='w-[40px] h-[40px]'>
                    <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />
                  </div>
                      <div className='text-[#1BE56C] font-bold mt-[8px] cursor-pointer'  onClick={() => { navigate("/profiles/" + item.userId) }} >{'@'+item.username}</div>
                   
                   </div>
              </div>
         
            )

            }
        

        </Layout>

    )
}




