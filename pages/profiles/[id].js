import Layout from '../../components/Layout/Layout'
import { useRouter } from "next/router";
import Image from 'next/image';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Bars } from 'react-loader-spinner';
import { BsCamera, BsGraphUp } from 'react-icons/bs';
import { IoImagesOutline } from 'react-icons/io5';

import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';

const dataComments = [
    {
        imgProfile: "",
        username: "user1",
        comment: "",
        likes: 22,
        contComments: 43,
    },
    {
        imgProfile: "",
        username: "user2",
        comment: "",
        likes: 5,
        contComments: 55,
    },
    {
        imgProfile: "",
        username: "user3",
        comment: "",
        likes: 11,
        contComments: 2,
    },
    {
        imgProfile: "",
        username: "user4",
        comment: "",
        likes: 222,
        contComments: 10,
    },
]


const dataUser = [
    {
        id: 1,
        username: "user1",
        connections: 100,
    },
    {
        id: 2,
        username: "user2",
        connections: 200,
    },
    {
        id: 3,
        username: "user3",
        connections: 300,
    },
    {
        id: 4,
        username: "user4",
        connections: 400,
    },

]

export default function Profiles() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { push } = router;
    const { id } = router.query;

    const [user, setUser] = useState(null);
    const [dataPost, setDataPost] = useState([]);

    useEffect(() => {
        async function fetchUser() {
          await refreshUser();
          await refeshPost();
      }
      fetchUser();
    
    }, [])
    
    
    const refreshUser = async () => {
    
      setLoading(true);
    
      const response = await new Promise((resolve, reject) => {
          axios.get('http://localhost:8080/api/user/'+id )
              .then(response => {
                  resolve(response.data);
                  console.log(response.data)   
                  setUser(response.data)       
     
              }).catch(error => {
                  if (error.response.status === 401) {
                      resolve(error.response.status)
                  }
                  resolve(error);
              })
      });

      console.log(response.data)
 
      setLoading(false);
    }

    const refeshPost = async () => {
    
        setLoading(true);
      
        const response = await new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/userPost/'+id )
                .then(response => {
                    resolve(response.data);
                    console.log(response.data)   
                    setDataPost(response.data)       
       
                }).catch(error => {
                    if (error.response.status === 401) {
                        resolve(error.response.status)
                    }
                    resolve(error);
                })
        });
  
        console.log(response.data)
   
        setLoading(false);
      }


    return (

        <Layout refreshDate='' selected="bg-[#F3F3F3]" position="profile">
               {console.log(user)}
            { user  &&  <div className="flex border-solid border-[1px] border-[gray] pt-[1rem] h-fit pb-[1rem]">
                <div className="flex-initial w-30  h-fit text-[white]">


                    <div className="grid grid-cols-2 gap-0">
                        <div className='ml-[16px]'>
                            <div className='w-[40px] h-[40px]'>
                                <Image src="/perfil-example.jpg" alt="profile" height={40} width={40} className="rounded-full w-[40px] h-[40px]" />
                            </div>
                        </div>


                    </div>



                </div>
                <div className="grow h-fit  ">
                    <div className="flex flex-nowrap">
                        <div className='ml-[16px] '  >
                            <div className='font-bold  text-[#ffff]  mr-[8px]'>IOS</div>
                            <div className='font-bold  text-[#1BE56C]  mr-[8px]'>{"@"+user.username}</div>

                            <div className='font-bold text-[#000] bg-[#1BE56C] pl-[8px] pr-[8px] rounded-[16px]'>CONNECT</div>


                        </div>

                        <div className='ml-[1rem]'>
                            <div className='text-white'>
                                Curated for the connoisseur  #cookiesenterprises #nothingforsale
                                Content intended for 21+
                            </div>
                        </div>

                    </div>


                </div>

            </div> }



            {user  &&     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                <div className="col-start-1 col-end-4 border-solid border-[1px] border-[gray]">
                    <div className='font-bold text-[32px] text-[#ffff]  mt-[27px] mb-[27px] ml-[1rem]'>
                        MOST RECENT
                    </div>

                    {dataPost && dataPost.length > 0 && dataPost.map((item) =>
                        <div className='flex ml-[1rem]'>
                            <div className='w-[40px] h-[40px]'>
                                <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />
                            </div>

                            <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                                <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{"@"+item.username}</div>
                                <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{item.content}</div>

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
}



        </Layout>

    )
}



