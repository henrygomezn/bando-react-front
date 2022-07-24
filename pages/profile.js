import Layout from '../components/Layout/Layout'
import CardSetting from '../components/Setting/CardSetting'
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { BsCamera, BsGraphUp } from 'react-icons/bs';
import { IoImagesOutline } from 'react-icons/io5';

import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';

const dataComments = [
    {
        imgProfile: "",
        username: "@user1",
        comment: "",
        likes: 22,
        contComments: 43,
    },
    {
        imgProfile: "",
        username: "@user2",
        comment: "",
        likes: 5,
        contComments: 55,
    },
    {
        imgProfile: "",
        username: "@user3",
        comment: "",
        likes: 11,
        contComments: 2,
    },
    {
        imgProfile: "",
        username: "@user4",
        comment: "",
        likes: 222,
        contComments: 10,
    },
]


export default function Profile() {

    return (

        <Layout refreshDate='' selected="bg-[#F3F3F3]" position="profile">

            <div class="flex border-solid border-[1px] border-[gray] pt-[1rem]">
                <div class="flex-initial w-36  h-20 text-[white]">


                    <div class="grid grid-cols-2 gap-0">
                        <div className='ml-[16px]'>
                            <div className='w-[40px] h-[40px]'>
                                <Image src="/perfil-example.jpg" alt="profile" height={40} width={40} className="rounded-full w-[40px] h-[40px]" />
                            </div>
                        </div>

                        <div>
                            <div className='  font-bold  text-[#ffff]  mr-[8px]'>@IOS</div>
                            <div className='font-bold  text-[#ffff]  mr-[8px]'>@IOS</div>

                        </div>
                    </div>



                </div>
                <div class="grow h-20 ">
                    02
                </div>
                <div class="flex-none w-14 h-20 text-[white]">
                    <BsCamera className='w-[40px] h-[40px] cursor-pointer' />


                </div>
            </div>



            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                <div class="col-start-1 col-end-4 border-solid border-[1px] border-[gray]">
                    <div className='font-bold text-[32px] text-[#ffff]  mt-[27px] mb-[27px] ml-[1rem]'>
                        MOST RECENT
                    </div>

                    {dataComments && dataComments.length > 0 && dataComments.map((item) =>
                        <div className='flex ml-[1rem]'>
                            <div className='w-[40px] h-[40px]'>
                                <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />
                            </div>

                            <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                                <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{item.username}</div>
                                <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>asasdasdassasdasdasdasdasdas asdasdas asdasdasdas asdasdadas asdasdasdd</div>

                                <div className='flex mt-[1rem]'>

                                    <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                                    <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.likes} LIKES</div>
                                    <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                                    <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.contComments}  COMMENTS</div>
                                </div>


                            </div>
                        </div>

                    )}




                </div>

                <div className='container'>

                    <div className='flex h-[200px] border-solid border-[1px] border-[gray]'>
                        <div className='flex text-[32px] self-center text-[#1BE56C] font-bold ml-[auto] mr-[auto] '>TOP POSTS
                            <BsGraphUp className='self-center ml-[16px] text-white' />
                        </div>

                    </div>
                    <div className='flex h-[200px] border-solid border-[1px] border-[gray]'>
                        <div className='flex text-[32px] self-center text-[#1BE56C] font-bold ml-[auto] mr-[auto] '>PHOTOS
                            <IoImagesOutline className='self-center ml-[16px] text-white' />
                        </div>
                    </div>
                    <div className=' h-[200px] border-solid border-[1px] border-[gray]'>
                        <div className=' text-[32px]  text-[#1BE56C] font-bold ml-[24px] text-center '>CONNECTIONS: {"11.1" + "K"}</div>
                        <div className='flex justify-center mt-[16px] '>
                            <div className='w-[50px] h-[50px] ml-[16px]'>
                                <Image src="/perfil-example.jpg" alt="profile" height={50} width={50} className="rounded-full " />
                            </div>
                            <div className='w-[50px] h-[50px] ml-[16px]'>
                                <Image src="/perfil-example.jpg" alt="profile" height={50} width={50} className="rounded-full " />
                            </div>
                            <div className='w-[50px] h-[50px] ml-[16px]'>
                                <Image src="/perfil-example.jpg" alt="profile" height={50} width={50} className="rounded-full " />
                            </div>
                        </div>
                        <div className=' text-[32px]  text-[#1BE56C] font-bold ml-[24px] text-center '>VIEW MORE</div>

                    </div>


                </div>

            </div>




        </Layout>

    )
}




