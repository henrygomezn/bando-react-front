import Layout from '../../components/Layout/Layout'
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form'
import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { useRouter } from "next/router";
import { RiSendPlaneFill } from 'react-icons/ri';



export default function Comment() {
    const router = useRouter();
    const { push } = router;
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [selectComment, setSelectComment] = useState(null);
    const [saveForm, setSaveForm] = useState(true)

    useEffect(() => {

        async function fetchComment(id) {
            await getComment(id);
        }

        if (id !== undefined) {
            fetchComment(id);
        }


    }, [id])

    const getComment = async (ide) => {


        setLoading(true);

        const response = await new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/post/' + id)
                .then(response => {
                    resolve(response.data);
                    console.log(response.data)
                    setSelectComment(response.data)

                }).catch(error => {
                    if (error.response.status === 401) {
                        resolve(error.response.status)
                    }
                    resolve(error);
                })
        });

        setLoading(false);

    }





    const onSubmit = async (event) => {

        if (saveForm) {
            setSaveForm(false);
            const comment = event.comment;

            const dataComment = {
                content : comment,
                username : JSON.parse(localStorage.getItem('currentUser')).username,
                postId : selectComment._id
            }



            const createPost = await new Promise((resolve, reject) => {
                axios.post('http://localhost:8080/api/comment', dataComment)
                    .then(response => {
                        resolve(response);
                        console.log(response.data.comment)
                        selectComment.comments.push(response.data.comment)
                        alert("add comment successfully")

                    }).catch(error => {
                        if (error.response.status === 401) {
                            resolve(error.response.status)
                        }
                        resolve(error);
                    })
            }); 

            setSaveForm(true);
            reset({ comment: "" });

        }


    };



    return (

        <Layout refreshDate='18/11/2021 · 11:13:21' refreshText="Última actualización" selected="bg-[#F3F3F3]" position="comment">


            {selectComment &&
                <div className='flex justify-center mt-[24px] ml-[8px]'>
                    <div className='w-[40px] h-[40px]'>
                    {selectComment.imgAvatar ? <Image src={selectComment.imgAvatar} alt="profile" width={40} height={40} className=" rounded-full" /> : <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />}
                    </div>

                    <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px]  mr-[16px]'>

                        <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{'@' + selectComment.username}</div>
                        <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{selectComment.content}</div>

                        {selectComment.imgContent &&
                        <div className='flex'>
                          <img src={selectComment.imgContent} className="ml-auto mr-auto mt-[8px]" width={200} height={200}/>
                        </div>

                      }

                        <div className='flex mt-[1rem] mb-[1rem]'>

                            <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                            <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{selectComment.likes} LIKES</div>
                            <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                            <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{selectComment.comments.length}  COMMENTS</div>
                        </div>

                        <div className='pt-[1rem] pl-[2rem] bg-[#f7f7f7] pb-[16px] rounded-b-[16px]'>

                            {selectComment && selectComment.comments.length > 0 && selectComment.comments.map((comment) =>
                                <>
                                    <div className=' mx-[16px] text-[16px] self-center  text-[#1BE56C] font-semibold'>{'@' + comment.username}</div>
                                    <div className=' mx-[16px] text-[12px] mt-[8px] self-center '>{comment.content}</div>
                                    <div className='flex mt-[1rem]'>
                                        <AiFillLike className='w-[15px] h-[15px] cursor-pointer ml-[24px] text-[#2d6e47]' />
                                        <div className=' text-[12px] text-[#2d6e47] font-bold self-center ml-[8px] mb-[8px]'>{comment.likes} LIKES</div>

                                    </div>
                                </>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)} id="commitComment">
                                <div className='flex'>
                                    <input
                                        {...register("comment", {
                                            required: { value: true, message: "* Campo Requerido" },
                                        })}
                                        name='comment'
                                        type="text"
                                        className=" border-[2px] border-[#EDEDED] rounded-l-[9px] w-[90%] h-[40px] text-[black] text-center focus:outline-none focus-visible:ring-[2px] focus-visible:ring-[#1BE56C]"
                                        placeholder='Add comment'
                                        autoComplete='off' />
                                    <button className='flex h-[40px] bg-[#1BE56C] w-[2rem]  rounded-r-[9px] hover:bg-[#1be56c9c] mr-[16px]' type='submit'>
                                        <RiSendPlaneFill className='self-center text-[24px] ml-[4px]  ' />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>}

        </Layout>

    )
}




