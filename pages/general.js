import Layout from '../components/Layout/Layout'
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { BsCamera } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { useRouter } from "next/router";
import { RiSendPlaneFill } from 'react-icons/ri';


export default function General() {

  const router = useRouter();

  const { push } = router;


  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
  const [saveForm, setSaveForm] = useState(true)
  const [flagChange, setFlagChange] = useState(true)
  const [posteo, setPosteo] = useState([])
  const [postRanking, setPostRanking] = useState([])
  const [imgUpload, setImgUpload] = useState([])

  useEffect(() => {
    async function fetchPost() {
      await refreshPost();
      await getRanking();
    }
    fetchPost();

  }, [flagChange])


  const refreshPost = async () => {

    setLoading(true);

    const response = await new Promise((resolve, reject) => {
      axios.get(process.env.REACT_APP_API_URL+'api/lastPost',)
        .then(async (response) => {
          resolve(response.data);
          console.log(response.data)
          setPosteo(response.data)

          const detailsUserResponse = await new Promise((resolve, reject) => {  // save userDetails in localStorage
            axios.get(process.env.REACT_APP_API_URL+'api/userDetails/' + JSON.parse(localStorage.getItem('user_id')))
              .then(responseDetails => {
                resolve(responseDetails.data);
                console.log(responseDetails.data)
                localStorage.setItem('currentUser', JSON.stringify(responseDetails.data))
            //    setLoading(false);
              }).catch(error => {
                if (error.response.status === 401) {
                  resolve(error.response.status)
                }
                resolve(error);
              })
          });



        }).catch(error => {
          if (error.response.status === 401) {
            resolve(error.response.status)
          }
          resolve(error);
        })
    });


  }

  const getRanking = async () => {


    setLoading(true);

    const response = await new Promise((resolve, reject) => {
      axios.get(process.env.REACT_APP_API_URL+'api/postRanking')
        .then(response => {
          resolve(response.data);
          console.log(response.data)
          setPostRanking(response.data)

        }).catch(error => {
          if (error.response.status === 401) {
            resolve(error.response.status)
          }
          resolve(error);
        })
    });

    setLoading(false);

  }



  const navigate = (url) => {
    push(url);
  }


  const onSubmit = async (event) => {

    if (saveForm) {
      setSaveForm(false);
      const post = event.post;


      var filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = async (fileLoadedEvent) => {
          var srcData = fileLoadedEvent.target.result; // <--- data: base64


          const data = {
            userId: JSON.parse(localStorage.getItem('currentUser')).userId,
            username: JSON.parse(localStorage.getItem('currentUser')).username,
            imgAvatar: JSON.parse(localStorage.getItem('currentUser')).imgAvatarBase64,
            imgContent: srcData,
            content: post,

          }

          const createPost = await new Promise((resolve, reject) => {
            axios.post(process.env.REACT_APP_API_URL+'api/post', data)
              .then(response => {
                resolve(response);
                console.log(response.data)
                posteo.unshift(response.data.post)
                setFlagChange(!flagChange)
                alert("add post successfully")
              }).catch(error => {
                if (error.response.status === 401) {
                  resolve(error.response.status)
                }
                resolve(error);
              })
          });

        }
        fileReader.readAsDataURL(fileToLoad);
        setSaveForm(true);
        reset({ post: "" });
      }
      else {

        const data = {
          userId: JSON.parse(localStorage.getItem('currentUser')).userId,
          username: JSON.parse(localStorage.getItem('currentUser')).username,
          imgAvatar: JSON.parse(localStorage.getItem('currentUser')).imgAvatarBase64,
          content: post,

        }

        const createPost = await new Promise((resolve, reject) => {
          axios.post(process.env.REACT_APP_API_URL+'api/post', data)
            .then(response => {
              resolve(response);
              console.log(response.data)
              posteo.unshift(response.data.post)
              setFlagChange(!flagChange)
              alert("add post successfully")
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





    }


  };


  const addLike = async (id) => {

    console.log(id)

    const response = await new Promise((resolve, reject) => {
        axios.put(process.env.REACT_APP_API_URL+'api/postLike/'+ id)
            .then(response => {
                console.log(response.data)
                let post = posteo.find(item => item._id = id)

                post.likes = post.likes + 1
        
                console.log(post)
                setFlagChange(!flagChange)
                alert("add like successfully")

            }).catch(error => {
               
            })
    });


}


  return (
    <Layout position="general">
      {!loading && <div className='overflow-y-scroll h-[90vh]'>
        <form onSubmit={handleSubmit(onSubmit)} id="commitPost">
          <div className='flex font-bold  text-[#ffff] pb-[16px] pt-[16px]  border-solid border-[1px] border-[gray] '>

            <label className='cursor-pointer text-[white]'>
              <BsCamera className='w-[40px] h-[40px] cursor-pointer ml-[24px]' />
              <input
                type="file"
                id="inputFileToLoad"
                className=' hidden'
              />
            </label>
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
              <div className='self-center font-bold  text-[#ffff]  mr-[8px]'>{'@' + JSON.parse(localStorage.getItem('currentUser')).username}</div>
              <div className='w-[40px] h-[40px]'>
                <img src={
                                            JSON.parse(localStorage.getItem('currentUser')).imgAvatarBase64=="" ? 
                                        "https://i.ibb.co/WkrMKBJ/default-img.jpg" :
                                         JSON.parse(localStorage.getItem('currentUser')).imgAvatarBase64
                                      }
                   alt="profile" height={40} width={40} className="rounded-full w-[40px] h-[40px]" />
              </div>
            </div>
          </div>


        </form>


        <div className=' border-solid border-[1px] border-[gray] '>
          <div className='font-bold text-[32px] text-[#ffff] ml-[48px] mt-[27px] mb-[27px]'>
            MOST RECENT
          </div>

          <div className="container mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="col-start-1 col-end-4">

                {posteo && posteo.length > 0 && posteo.map((item) =>
                  <div className='flex'>
                    <div className='w-[40px] h-[40px]'>
                      {item.imgAvatar ? <Image src={item.imgAvatar} alt="profile" width={40} height={40} className=" rounded-full" /> : <Image src="/perfil-example.jpg" alt="profile" width={40} height={40} className=" rounded-full" />}
                    </div>

                    <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                      <div className='cursor-pointer mx-[16px] text-[24px] self-center  text-[#1BE56C]' onClick={() => { navigate("/profiles/" + item.userId) }}  >{"@" + item.username}</div>
                      <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{item.content}</div>

                      {item.imgContent &&
                        <div className='flex'>
                          <img src={item.imgContent} className="ml-auto mr-auto mt-[8px]" width={200} height={200}/>
                        </div>

                      }

                      <div className='flex mt-[1rem]'>

                        <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]'  onClick={() => addLike(item._id)}/>
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.likes} LIKES</div>
                        <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' onClick={() => { navigate("/comment/" + item._id) }} />
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.comments.length}  COMMENTS</div>
                      </div>


                    </div>
                  </div>

                )}


              </div>

              <div className='container ml-[8px]'>
                <div className='text-[2rem] text-[#1BE56C] text-center font-bold'>
                  TOP POST
                </div>

                {postRanking && postRanking.length > 0 && postRanking.map((item, index) =>
                  <>
                    <div className='flex mb-[8px]'>
                      <div className='self-center text-[1rem] text-[#1BE56C]  font-bold'>
                        {(index + 1) + ". " + item.username}
                      </div>

                      <div className='w-[30px] h-[30px] ml-[16px]'>
                        <Image src="/perfil-example.jpg" alt="profile" width={30} height={30} className=" rounded-full" />
                      </div>
                    </div>
                    <div className='bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] ml-[8px] w-[90%] pt-[8px] pb-[8px] mr-[16px]'>

                      <div className=' mx-[16px] text-[24px] self-center  text-[#1BE56C]'>{"@" + item.username}</div>
                      <div className=' mx-[16px] text-[16px] mt-[8px] self-center '>{item.content}</div>
                      <div className='flex mt-[1rem]'>

                        <AiFillLike className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' />
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.likes} LIKES</div>
                        <MdModeComment className='w-[20px] h-[20px] cursor-pointer ml-[24px] text-[#1BE56C]' onClick={() => { navigate("/comment/" + item._id) }} />
                        <div className=' text-[16px] text-[#1BE56C] font-bold self-center ml-[8px]'>{item.comments.length}  COMMENTS</div>
                      </div>
                    </div>
                  </>

                )


                }


              </div>

            </div>
          </div>



          { // loading &&
            //   <div className='flex justify-center mt-[24px]'>
            //   
            // </div>
          }
        </div>

      </div>}
    </Layout>

  )
}




