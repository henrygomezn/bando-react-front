import Layout from '../components/Layout/Layout'
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Bars } from 'react-loader-spinner';
import { useForm } from 'react-hook-form'
import { BsCamera } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { data } from 'autoprefixer';
import { Fragment } from 'react/cjs/react.production.min';
import { useRouter } from "next/router";
import { RiSendPlaneFill } from 'react-icons/ri';


const dataComments = [
  {
    id: 445,
    userId: 1,
    imgProfile: "",
    username: "user1",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    contComments: 3,
    likes: 22
  },
  {
    id: 455,
    userId: 1,
    imgProfile: "",
    username: "user2",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    contComments: 3,
    likes: 22
  },
  {
    id: 485,
    userId: 3,
    imgProfile: "",
    username: "user3",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    contComments: 3,
    likes: 22
  },
  {
    id: 495,
    userId: 3,
    imgProfile: "",
    username: "user3",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    contComments: 3,
    likes: 22
  },
]


export default function General() {

  const router = useRouter();
  const { push } = router;
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
  const [saveForm, setSaveForm] = useState(true)
  const [posteo, setPosteo] = useState([])

  useEffect(() => {
    async function fetchPost() {
      await refreshPost();
    }
    fetchPost();

  }, [])


  const refreshPost = async () => {

    setLoading(true);

    const response = await new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/api/posts',)
        .then(response => {
          resolve(response.data);
          console.log(response.data)

        }).catch(error => {
          if (error.response.status === 401) {
            resolve(error.response.status)
          }
          resolve(error);
        })
    });

    setPosteo(response);
    setLoading(false);
  }


  const navigate = (url) => {
    push(url);
  }

  const addPost = (post) => {
    console.log(post)
  }

  const onSubmit = async (event) => {

    if (saveForm) {
      setSaveForm(false);
      const post = event.post;


      const data = {
        userId: JSON.parse(localStorage.getItem('user'))._id,
        username: JSON.parse(localStorage.getItem('user')).username,
        content: post,

      }

      const createPost = await new Promise((resolve, reject) => {
        axios.post('http://localhost:8080/api/post', data)
            .then(response => {
                resolve(response);
                console.log(response.data)
                posteo.unshift(response.data.post)              
            }).catch(error => {
                if (error.response.status === 401) {
                    resolve(error.response.status)
                }
                resolve(error);
            })
    });

      setSaveForm(true);
      reset({ post: "" });

    }


  };


  return (

    <Layout refreshDate='18/11/2021 · 11:13:21' refreshText="Última actualización" selected="bg-[#F3F3F3]" position="general">
      <form onSubmit={handleSubmit(onSubmit)} id="commitPost">
        <div className='flex font-bold  text-[#ffff] pb-[16px] pt-[16px]  border-solid border-[1px] border-[gray] '>
          <BsCamera className='w-[40px] h-[40px] cursor-pointer ml-[24px]' />

          <input
            {...register("post", {
              required: { value: true, message: "* Campo Requerido" },
            })}
            name='post'
            type="text"
            className="ml-[16px] border-[2px] border-[#EDEDED] rounded-l-[9px] w-[90%] h-[48px] text-[black] text-center focus:outline-none focus-visible:ring-[2px] focus-visible:ring-[#1BE56C]"
            placeholder='What are you smoking on?'
            autoComplete='off' />
          <button className='flex h-[48px] bg-[#1BE56C] w-[2rem]  rounded-r-[9px] hover:bg-[#1be56c9c]' type='submit'>
            <RiSendPlaneFill className='self-center text-[24px] ml-[4px]  ' />
          </button>

          <div className="flex ml-[8px] mr-[16px] ">
            <div className='self-center font-bold  text-[#ffff]  mr-[8px]'>{'@' + JSON.parse(localStorage.getItem('user')).username}</div>
            <div className='w-[40px] h-[40px]'>
              <Image src="/perfil-example.jpg" alt="profile" height={40} width={40} className="rounded-full w-[40px] h-[40px]" />
            </div>
          </div>
        </div>

      </form>
      <div className=' border-solid border-[1px] border-[gray] h-full'>
        <div className='font-bold text-[32px] text-[#ffff] ml-[48px] mt-[27px] mb-[27px]'>
          MOST RECENT
        </div>



        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-start-1 col-end-4">

              {posteo && posteo.length > 0 && posteo.map((item) =>
                <div className='flex'>
                  <div className='w-[40px] h-[40px]'>
                    <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />
                  </div>

                  <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                    <div className='cursor-pointer mx-[16px] text-[24px] self-center  text-[#1BE56C]' onClick={() => { navigate("/profiles/" + item.userId) }}  >{"@" + item.username}</div>
                    <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{item.content}</div>

                    <div className='flex mt-[1rem]'>

                      <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                      <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.likes} LIKES</div>
                      <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' onClick={() => { navigate("/comment/" + item.id) }} />
                      <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.contComments}  COMMENTS</div>
                    </div>


                  </div>
                </div>

              )}


            </div>

            <div className='container ml-[8px]'>
              <div className='text-[2rem] text-[#1BE56C] text-center font-bold'>
                TOP POST
              </div>
              <div className='flex mb-[8px]'>
                <div className='self-center text-[1rem] text-[#1BE56C]  font-bold'>
                  {"1. " + "@" + "asdhasdadha"}
                </div>

                <div className='w-[30px] h-[30px] ml-[16px]'>
                  <Image src="/perfil-example.jpg" alt="profile" width={30} height={30} className=" rounded-full" />
                </div>
              </div>
              <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{"@Cookies.hollywood"}</div>
                <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>asasdasdassasdasdasdasdasdas asdasdas asdasdasdas asdasdadas asdasdasdd</div>

              </div>

            </div>

          </div>
        </div>



        { // loading &&
          //   <div className='flex justify-center mt-[24px]'>
          //    <Bars color="#004466" height={80} width={80} />
          // </div>
        }
      </div>
    </Layout>

  )
}




