import { Fragment, useRef, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { Dialog, Transition } from '@headlessui/react'
import CardModalGeneral from './CardModalGeneral'
import {Bars} from 'react-loader-spinner';

const ModalGeneral = ( props ) =>  {

    const { show, onClose, details, loading, title } = props;
    const cancelButtonRef = useRef(null);

    return (
       
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-autogrid" initialFocus={cancelButtonRef} onClose={onClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center content-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 "
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 "
                        leaveTo="opacity-0 translate-y-4 "
                    >
                        <div className="inline-block w-[20.438rem] h-[36.188rem] m:h-[556px] m:w-[630px] align-bottom bg-[#FFFFFF] text-left overflow-hidden shadow-xl transform transition-all mx-[1.5rem] my-[2.5rem] m:my-[5rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className="px-4 pt-5 justify-end">
                                <div className="flex flex-col">
                                    <div className='flex justify-end mr-[0.5rem]'>
                                        <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full bg-[#F5F5F5] cursor-pointer" onClick={onClose}>
                                            <RiCloseFill className='w-[1.5rem] h-[1.5rem] text-[#000]/60' aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="mt-3 ml-[0.5rem]">
                                        <Dialog.Title as="h3" className="text-[16px] font-bold leading-[18px] tracking-[-2%] text-black mt-[0.938rem]">
                                            {title}
                                        </Dialog.Title>
                                        <Dialog.Title as="h3" className="text-[22px] font-bold leading-[42px] text-hw-black tracking-[-3%] whitespace-nowrap mb-[19px]">
                                            Estado de dispositivos
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>

                            <hr className='bg-[#FAFAFA] border-none h-[8px] mb-[16px]' />

                            { loading &&
                                <div className='flex flex-row justify-center mt-[24px]'>
                                    <Bars color="#004466" height={80} width={80} />
                                </div>
                            }

                            { !loading &&
                                details.map((detail) => {

                                    if(detail.description.description_error === "Sucursal sin dispositivos"){
                                       return( <div className='flex-wrap text-center'>
                                            <span className='text-[24px]'>😱</span> <span className='text-[16px] font-semibold text-[#666666]'> Sucursal sin dispositivos asignados o sin reportar ... </span>
                                        </div>)
                                    }
                                })
                            }

                            { !loading && details.length === 0 &&
                                <div className='flex-wrap text-center'>
                                    <span className='text-[24px]'>😱</span> <span className='text-[16px] font-semibold text-[#666666]'> Sucursal sin dispositivos asignados o sin reportar ... </span>
                                </div>
                            }
    
                            <div className="overflow-y-auto h-[360px] m:ml-[32px] m:flex m:flex-wrap gt-scroll">
                            { !loading &&
                                details.map((detail) => {
                                    if(detail.description.description_error !== "Sucursal sin dispositivos"){
                                        return(
                                        <CardModalGeneral title={detail.label} subtitle={detail.status_general === 1 ? "Dispositivo sin problemas" : detail.description} status={detail.status_general} ide={detail.device_id}/>
                                        )
                                    }
                                })
                            }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default ModalGeneral;