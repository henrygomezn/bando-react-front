import Layout from '../components/Layout/Layout'
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useForm } from 'react-hook-form'
import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { useRouter } from "next/router";


const dataComments =
{
    imgProfile: "",
    username: "@user1",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    comments: [
        {
            username: "@user1",
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            likes: 4,
        },
        {
            username: "@user99",
            comment: "Lorem Ipsum is simply dummy text of the printing.",
            likes: 40,
        },
        {
            username: "@user2",
            comment: "Lorem Ipsum is simply dummy text of the printing a industry.",
            likes: 1,
        }
    ],
    likes: 22
}




export default function Comment() {
    const router = useRouter();
    const {push} = router;
    const {id} = router.query;

    console.log(id)
   


    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();




    return (

        <Layout refreshDate='18/11/2021 · 11:13:21' refreshText="Última actualización" selected="bg-[#F3F3F3]" position="comment">

            <div className='flex justify-center mt-[24px]'>
                <div className='w-[40px] h-[40px]'>
                    <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />
                </div>

                <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px]  mr-[16px]'>

                    <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{dataComments.username}</div>
                    <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{dataComments.post}</div>

                    <div className='flex mt-[1rem] mb-[1rem]'>

                        <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{dataComments.likes} LIKES</div>
                        <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{ dataComments.comments.length}  COMMENTS</div>
                    </div>

                    <div className='pt-[1rem] pl-[2rem] bg-[#f7f7f7] pb-[16px] rounded-b-[16px]'>

                        {dataComments && dataComments.comments.length > 0 && dataComments.comments.map((comment) =>
                            <>
                                <div className=' mx-[16px] text-[16px] self-center  text-[#1BE56C] font-semibold'>{comment.username}</div>
                                <div className=' mx-[16px] text-[12px] mt-[8px] self-center '>{comment.comment}</div>
                                <div className='flex mt-[1rem]'>
                                    <AiFillLike className='w-[15px] h-[15px] cursor-pointer ml-[24px] text-[#2d6e47]' />
                                    <div className=' text-[12px] text-[#2d6e47] font-bold self-center ml-[8px] mb-[8px]'>{comment.likes} LIKES</div>

                                </div>
                            </>
                        )}

    
                    </div>
                </div>

            </div>



        </Layout>

    )
}




