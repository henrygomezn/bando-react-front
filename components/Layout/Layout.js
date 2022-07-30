import Image from 'next/image';
import {CgMenuLeft} from 'react-icons/cg';
import { useState } from "react";
import { HiHome} from 'react-icons/hi';
import {BsGearFill, BsPersonCircle,BsSearch} from 'react-icons/bs';
import {BiExit} from 'react-icons/bi';
import {FiMenu} from 'react-icons/fi';
import {GoGraph} from 'react-icons/go';
import { useRouter } from "next/router";


const Layout = ( props ) => {

    const {children, refreshDate, refreshText, selected, position} = props;
    const [isOpened, setisOpened] = useState(false);
    const [isReferalCode, setIsReferalCode] = useState(false);
    const {push} = useRouter();

    const handledOpenMenu = () => {
        setisOpened(!isOpened);
        (isOpened ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden');
    }

    const navigate = (url) => {
       push(url);
    }

   return(
    <div className='bg-[black]  min-h-screen'>
        {/*NavBar*/}
        <div className="bg-[#1BE56C] bg-cover h-[80px] flex flex-inline">
            <div className="flex justify-start ml-[24px]">
                <Image src="/bando-logo.png" className='cursor-pointer' alt="Bando logo"  width={80} height={60} onClick={() => {navigate("/general")}}/>
            </div>

            {!isOpened &&
                <div className='flex flex-auto justify-end text-black items-center mr-[24px]'>
                    <div className='ml-[auto] mr-[auto]'> <Image src="/bando-text.png" alt="Bando logo"  width={120} height={80}/></div>
                    <FiMenu className='justify-end w-[32px] h-[32px] cursor-pointer' onClick={()=>handledOpenMenu()}/>
                </div>
            }

            {isOpened &&
                <>
                    <div className="fixed inset-0 min-h-screen bg-[#202020] bg-opacity-30 z-10" >
                    <div className="fixed right-0 h-screen w-[16.875rem]  bg-[#FAFAFA] z-20 overflow-hidden">
                        <div className="absolute  h-[35rem] w-[35rem]  bg-[#1BE56C] bg-cover rounded-full top-[-18.375rem] left-[-8.938rem]">
                            <div className=" ml-[13rem] mt-[20rem] ">
                                <Image src="/perfil-example.jpg" alt="profile" width={150} height={150} className="rounded-full" />
                                <div className='ml-[24px] font-bold' >{'@' + JSON.parse(localStorage.getItem('currentUser')).username}</div>
                            </div>
                 
                        </div>

                        <div className={`w-[16.875rem] h-[3.563rem] mt-[18.688rem] cursor-pointer ${position === "general"?selected:""}`} onClick={() =>{if(position !== "general"){navigate("/general")}}}>
                            <div className="flex">
                                <HiHome className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Home </div>
                            </div>
                        </div>

                  

                        <div className={`w-[16.875rem] h-[3.563rem] cursor-pointer ${position === "profile"?selected:""}`} onClick={() =>{if(position !== "profile"){navigate("/profile")}}}>
                            <div className="flex">
                                <BsPersonCircle className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Profile  </div>
                            </div>
                        </div>

                        <div className={`w-[16.875rem] h-[3.563rem] cursor-pointer ${position === "searchPage"?selected:""}`} onClick={() =>{if(position !== "searchPage"){navigate("/searchPage")}}}>
                            <div className="flex">
                                <BsSearch className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Search  </div>
                            </div>
                        </div>

                        <div className=" w-[16.875rem] h-[3.563rem] cursor-pointer">
                            <div className="flex" onClick={() => {setIsReferalCode(!isReferalCode)}}>
                                <BiExit className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Referal Code </div>
                            </div>
                           {isReferalCode && 
                            <div className=" w-[16.875rem] h-[3.563rem] cursor-pointer">
                            <div className="flex" >
                               
                                <div className="ml-[2rem] mt-[1.188rem] font-semibold text-[1rem] 
                                bg-black text-white pl-[16px] pr-[16px] rounded-[16px] "> 
                                {JSON.parse(localStorage.getItem('currentUser')).referalCode} </div>
                            </div>
                        </div>
                           } 
                        </div>

                        <div className=" w-[16.875rem] h-[3.563rem] cursor-pointer">
                            <div className="flex" onClick={() => {navigate("/home")}}>
                                <BiExit className="ml-[1.5rem] mt-[10rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                <div className="ml-[1rem] mt-[10rem] font-semibold text-[1rem]"> Log Out </div>
                            </div>
                        </div>



                    </div>
                    </div>   
                    
                </>
            }       

        </div>
        
        {/*RefreshBar*/}{/*18/11/2021 · 11:13:20*/}
     
        
        {/*Content*/}
        <div>
            {children}
        </div>

    </div>
   );
}

export default Layout;