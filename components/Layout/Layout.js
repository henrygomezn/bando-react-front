import Image from 'next/image';
import { CgMenuLeft } from 'react-icons/cg';
import { useEffect, useState } from "react";
import { HiHome } from 'react-icons/hi';
import { BsGearFill, BsPersonCircle, BsSearch } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import { useRouter } from "next/router";
import { BsCamera } from 'react-icons/bs';
import axios from 'axios';
const Layout = (props) => {

    const { children, refreshDate, refreshText, selected, position } = props;
    const [isOpened, setisOpened] = useState(false);
    const [isReferalCode, setIsReferalCode] = useState(false);
    const { push } = useRouter();
    const [flagChange, setFlagChange] = useState(true)
    const [saveForm, setSaveForm] = useState(true)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchImgAvatar() {
          await refreshUserDetails();
 
        }
        fetchImgAvatar();
    
      }, [flagChange])


    const handledOpenMenu = () => {
        setisOpened(!isOpened);
        (isOpened ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden');
    }



    const navigate = (url) => {
        push(url);
    }

    const getFiles = (element) => {

        var filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64
                console.log(srcData)
                changeAvatar(srcData)
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }


    const changeAvatar = async (imgUrl) => {

        if (saveForm) {
          setSaveForm(false);

    
          const changeImgAvatar = await new Promise((resolve, reject) => {
            axios.put('http://localhost:8080/api/imgAvatarChange/' + JSON.parse(localStorage.getItem('currentUser')).userId, { imgAvatarBase64: imgUrl})
              .then(response => {
                resolve(response);
                console.log(response.data)
                setFlagChange(!flagChange)
        
              }).catch(error => {
                if (error.response.status === 401) {
                  resolve(error.response.status)
                }
                resolve(error);
              })
          });
    
          setSaveForm(true);
      
        }
    
    
      };


      const refreshUserDetails = async () => {

        setLoading(true);
    

              const detailsUserResponse = await new Promise((resolve, reject) => {  // save userDetails in localStorage
                axios.get('http://localhost:8080/api/userDetails/' + JSON.parse(localStorage.getItem('user_id')))
                  .then(responseDetails => {
                    resolve(responseDetails.data);
                    localStorage.setItem('currentUser', JSON.stringify(responseDetails.data))
                  }).catch(error => {
                    if (error.response.status === 401) {
                      resolve(error.response.status)
                    }
                    resolve(error);
                  })
              });
    
        setLoading(false);
      }


      const sendCode = async () => {

        const sendMail = document.getElementsByName("sendMail")[0].value;

        const data = 
        {
            service_id:"service_6g86x46",
            template_id:"template_qk3pxlj",
            user_id:"oxEIe97JgqUewTO4w",
                template_params: {
                para: sendMail,
                username: JSON.parse(localStorage.getItem('currentUser')).username,
                referal_code : JSON.parse(localStorage.getItem('currentUser')).referalCode
            }

        }


        const send = await new Promise((resolve, reject) => {
            axios.post('https://api.emailjs.com/api/v1.0/email/send',data)
                .then(response => {
                    resolve(response);
                    console.log(response.data)
                    alert("Send email Succesfully")

                }).catch(error => {

                   
                })
        });

      
    }


    return (
        <div className='bg-[black]  min-h-screen'>
            {/*NavBar*/}
            <div className="bg-[#1BE56C] bg-cover h-[10vh] flex flex-inline">
                <div className="flex justify-start ">
                    <Image src="/bando-logo.png" className='cursor-pointer' alt="Bando logo" width={80} height={60} onClick={() => { navigate("/general") }} />
                </div>

                {!isOpened &&
                    <div className='flex flex-auto justify-end text-black items-center mr-[24px]'>
                        <div className='ml-[auto] mr-[auto]'> <Image src="/bando-text.png" alt="Bando logo" width={120} height={80} /></div>
                        <FiMenu className='justify-end w-[32px] h-[32px] cursor-pointer' onClick={() => handledOpenMenu()} />
                    </div>
                }

                {isOpened &&
                    <>
                        <div className="fixed inset-0 min-h-screen bg-[#202020] bg-opacity-30 z-10" >
                            <div className="fixed right-0 h-screen w-[16.875rem]  bg-[#FAFAFA] z-20 overflow-hidden">
                                <div className="absolute  h-[35rem] w-[35rem]  bg-[#1BE56C] bg-cover rounded-full top-[-18.375rem] left-[-8.938rem]">
                                    <div className=" ml-[13rem] mt-[20rem] ">
                                    <label className='cursor-pointer text-[white] absolute  bg-[black] p-[8px] rounded-full' >

                                        
                                            <BsCamera className='w-[30px] h-[30px] cursor-pointer ' />
                                            <input
                                                type="file"
                                                id="inputFileToLoad"
                                                className=' hidden'
                                                onChange={() => getFiles(event.target)}
                                            />
                                        </label>

                                        <img src={JSON.parse(localStorage.getItem('currentUser')).imgAvatarBase64} className="rounded-full" width={150} height={150} />

                               


                                        <div className='ml-[24px] font-bold mt-[16px] text-xl' >{'@' + JSON.parse(localStorage.getItem('currentUser')).username}</div>
                                    </div>

                                </div>

                                <div className={`w-[16.875rem] h-[3.563rem] mt-[18.688rem] cursor-pointer ${position === "general" ? selected : ""}`} onClick={() => { if (position !== "general") { navigate("/general") } }}>
                                    <div className="flex">
                                        <HiHome className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                        <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Home </div>
                                    </div>
                                </div>



                                <div className={`w-[16.875rem] h-[3.563rem] cursor-pointer ${position === "profile" ? selected : ""}`} onClick={() => { if (position !== "profile") { navigate("/profile") } }}>
                                    <div className="flex">
                                        <BsPersonCircle className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                        <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Profile  </div>
                                    </div>
                                </div>

                                <div className={`w-[16.875rem] h-[3.563rem] cursor-pointer ${position === "searchPage" ? selected : ""}`} onClick={() => { if (position !== "searchPage") { navigate("/searchPage") } }}>
                                    <div className="flex">
                                        <BsSearch className="ml-[1.5rem] mt-[1.063rem] h-[1.5rem] w-[1.5rem] text-[#1BE56C]" />
                                        <div className="ml-[1rem] mt-[1.188rem] font-semibold text-[1rem]"> Search  </div>
                                    </div>
                                </div>

                                <div className=" w-[16.875rem] h-[3.563rem] cursor-pointer">
                                    <div className="flex" onClick={() => { setIsReferalCode(!isReferalCode) }}>
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
                                            <input
                                            name='sendMail'
                                            type="text"
                                            placeholder='  example@example.com'
                                            className="ml-[24px] mb-[8px] text-xs mt-[8px] border-[2px] border-[#dbdbdb] rounded-l-[8px] w-[200px] h-[32px]  focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                            autoComplete='off' />
                                            <div className='ml-[2rem] bg-[#1BE56C] w-fit p-[8px] rounded-md'> 
                                               <div className=' ml-auto mr-auto text-black font-bold' onClick={() => sendCode()}>SEND </div>
                                              </div>
                                        </div>
                                    }
                                </div>

                                <div className=" w-[16.875rem] h-[3.563rem] cursor-pointer">
                                    <div className="flex" onClick={() => { navigate("/home") }}>
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