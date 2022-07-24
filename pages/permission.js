import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { HiOutlineRefresh } from 'react-icons/hi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FiUserCheck } from 'react-icons/fi'
import { BsUiChecks } from 'react-icons/bs'
import { IoMdAddCircle } from 'react-icons/io'
import { useRouter } from "next/router";
import ModalNewUser from '../components/Permission/ModalNewUser';
import ModalNewRol from '../components/Permission/ModalNewRol';
import ModalUserRol from '../components/Permission/ModalUserRol';
import axios from "axios";
import { Bars } from 'react-loader-spinner';
import { BsCheck } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

const permission = () => {
    const { push } = useRouter();
    const [showModalRol, setShowModalRol] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [saveOK, setSaveOK] = useState(false);
    const [countRolNull, setCountRolNull] = useState(false);
    const navigate = (url) => {
        push(url);
    }


    useEffect(() => {

        async function fetchRoles() {
            await getRoles();
        }
        async function fetchUsers() {
            await getUsers();
        }
        fetchRoles();
        fetchUsers();

    }, [])


    const getRoles = async () => {
        setLoading(true);
        const response = await new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/configRol', { withCredentials: true })
                .then(response => {
                    resolve(response.data);

                    setRoles(response.data.configRol);
        
                }).catch(error => {
                    if (error.response.status === 401) {
                        resolve(error.response.status)
                    }
                    resolve(error);
                })
        });


        setLoading(false);

    }

    const getUsers = async () => {
        setLoading(true);
        const response = await new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/usersNull', { withCredentials: true })
                .then(response => {
                    resolve(response.data);
            
                    setUsers(response.data.usuarios);
                    setCountRolNull(response.data.cuantos)
              
                }).catch(error => {
                    if (error.response.status === 401) {
                        resolve(error.response.status)
                    }
                    resolve(error);
                })
        });


        setLoading(false);

    }

    const handleCallback = (childData) => {

        if (childData && childData.state) {
            getRoles()
            getUsers()
        
        }

        if (childData && childData.status === 200 && childData.message === "save") {
            setSaveOK(true);
        }


    }


    return (<>
        <Layout refreshDate='' selected='bg-[#F3F3F3]' position="setting">

            <div className='flex mt-[4px] mb-[22px]'>
                <div className='flex-auto'></div>
                <div className='flex cursor-pointer' onClick={() => getRoles()}>
                    <div className='w-[24px] h-[24px] rounded-full bg-[#D6E1E7]'>
                        <HiOutlineRefresh className=' h-[20px] w-[20px] ml-[2px] mt-[2px] text-[#004466]' />
                    </div>
                    <div className='text-[16px] leading-[18px] tracking-[-2%] font-bold text-[#004466] mt-[3px] ml-[8px] mr-[24px]'>Actualizar</div>
                </div>
            </div>

            <div className="flex ml-[24px] cursor-pointer w-[80px]" onClick={() => { navigate("/setting") }}>
                <div className='w-[24px] h-[24px] rounded-full bg-[#D6E1E7]'>
                    <FaChevronLeft className=' h-[12px] w-[7px] ml-[8px] mt-[6px] text-[#004466]' />
                </div>
                <div className='text-[16px] leading-[18px] tracking-[-2%] font-bold text-[#004466] mt-[3px] ml-[8px]'>Volver</div>
            </div>
            <div className='font-bold text-[32px] text-hw-black ml-[24px] mt-[12px] mb-[27px]'>
                Permisos
            </div>

            <div className='flex mt-[20px] flex-wrap ml-[24px]'>

                <button type="submit"
                    className="h-[48px] w-[187px] bg-[#ffffff] rounded-[10px] mr-[8px] font-bold text-[16px] leading-[22px] tracking-[-1px] mb-[8px] "  onClick={() => setShowModal(true)}>
                    <div className='flex ml-[8px]'>
                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25">
                            <BsUiChecks className='w-[20px] h-[20px] text-[#004466]' aria-hidden="true" />
                        </div>
                        <div className='text-black ml-[8px] font-bold'>Gestionar módulos</div>
                    </div>
                 
                </button>

                <button
                    className="h-[48px] w-[172px] bg-[#ffffff] rounded-[10px] mr-[8px] font-bold text-[16px] leading-[22px] tracking-[-1px] mb-[8px] " onClick={() => setShowModalUser(true)}>
                    <div className='flex ml-[8px]'>
                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25">
                            <FiUserCheck className='w-[20px] h-[20px] text-[#004466]' aria-hidden="true" />
                        </div>
                        <div className='text-black ml-[8px] font-bold'>Registrar usuario</div>
                    </div>
                    <ModalNewUser show={showModalUser} onClose={() => setShowModalUser(false)} parentCallback={handleCallback}/>
                </button>
            </div>

            <div className='flex mt-[20px] flex-wrap ml-[24px]'>

             { users && users.length > 0 && users.find( item => item.typeUser == null) && 
                <>    <div className='absolute h-[16px] w-[16px] bg-[#E00000] rounded-full left-[210px] '>
                     <div className='text-white ml-[5px] font-bold text-xs '>{countRolNull}</div>
                </div>
                   <button type="submit"
                    className="h-[48px] w-[197px] bg-[#ffffff] rounded-[10px] mr-[8px] font-bold text-[16px] leading-[22px] tracking-[-1px] mb-[8px] border-[2px] border-solid border-[#E00000]"
                    onClick={() => setShowModal(true)}>
                  
                    <div className='flex ml-[8px]'>
                      
                        <div className='text-black ml-[8px] font-bold'>Usuarios sin Rol asignado</div>
                     
                    </div>
                    <ModalUserRol show={showModal} onClose={() => setShowModal(false)} userList={users} rolesList={roles} parentCallback={handleCallback}/>
                </button>
                </>
             
             }
            </div>

            {saveOK &&
                <div className="bg-[#E5ECF0] border-t-8 border-[#004466] rounded-b text-[#004466] px-4 py-3 shadow-md mx-[24px] mb-[24px] rounded-[8px] w-[327px]" role="alert">
                    <div className="flex">
                        <BsCheck className='text-[#004466] w-[20px] h-[20px] self-center mr-[4px]' />
                        <p className="text-[14px] leading-[22px] tracking-[-1px] flex-auto">Guardado exitosamente.</p>
                        <IoClose className='self-center cursor-pointer' onClick={() => setSaveOK(false)} />
                    </div>
                </div>
            }



            <div className='flex mt-[4px] mb-[22px]'>
                <div className='flex-auto'></div>
                <div className='flex cursor-pointer'>

                    <IoMdAddCircle className=' h-[25px] w-[25px] ml-[2px] mt-[2px] text-[#004466]' />

                    <div className='text-[16px] leading-[18px] tracking-[-4%] font-bold text-[#004466] mt-[3px] ml-[8px] mr-[24px] self-center' onClick={() => setShowModalRol(true)} >Crear nuevo Rol</div>
                    <ModalNewRol show={showModalRol} onClose={() => setShowModalRol(false)} parentCallback={handleCallback}/>
                </div>
            </div>
            <div className='flex mt-[20px] flex-wrap ml-[24px]'>
                {!loading &&

                    <>  {roles && roles.length > 0 && roles.map((item) => {
                        return <button
                            onClick={()=>push(`/role_settings/${item._id}`)}
                            className="h-[63px] w-[327px] bg-[#ffffff] rounded-[16px] mr-[8px] font-bold text-[16px] leading-[22px] tracking-[-3%] mb-[8px]">
                            <div className='flex ml-[8px]'>

                                <div className='text-black ml-[24px] font-bold '>{item.typeUser}</div>

                                <FaChevronRight className='w-[9px] h-[14px] text-[black] ml-auto mr-[24px] self-center' aria-hidden="true" />

                            </div>
                        </button>
                    })}</>
                }

            </div>

            {loading &&
                <div className='flex justify-center items-center align mt-[24px]'>
                    <Bars color="#004466" className="mr-[auto] ml-[auto]" height={80} width={80} />
                </div>
            }

        </Layout>

    </>


    )
}

export default permission