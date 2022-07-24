import Layout from '../../components/Layout/Layout'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import {RiComputerFill, RiContactsBookFill, RiRouterFill} from 'react-icons/ri'
import {HiOutlineRefresh} from 'react-icons/hi'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import {Bars} from 'react-loader-spinner';
import axios from 'axios';
import {BsCheck, BsPrinterFill, BsDiscFill, BsCpuFill, BsCpu, BsExclamation} from 'react-icons/bs'
import {CgSmartphoneRam} from 'react-icons/cg'
import {IoClose} from 'react-icons/io5'
import ModalRam from '../../components/DeviceDetails/ModalRam';
import ModalScreen from '../../components/DeviceDetails/ModalScreen';
import ModalContact from '../../components/DeviceDetails/ModalContact';
import ModalGPU from '../../components/DeviceDetails/ModalGPU';
import ModalDisk from '../../components/DeviceDetails/DiskDetail/ModalDisk';
import ModalRed from '../../components/DeviceDetails/RedDetail/ModalRed';
import ModalCPU from '../../components/DeviceDetails/CPUDetail/ModalCPU';
import ModalPrinter from '../../components/DeviceDetails/ModalPrinter';

export default function DeviceDetails() {

    const router = useRouter();
    const {push} = router;
    const {id} = router.query;

    const [device, setDevice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalRam, setShowModalRam] = useState(false);
    const [showModalScreen, setShowModalScreen] = useState(false);
    const [showModalContact, setShowModalContact] = useState(false);
    const [showModalGPU, setShowModalGPU] = useState(false);
    const [showModalDisk, setShowModalDisk] = useState(false);
    const [showModalRed, setShowModalRed] = useState(false);
    const [showModalCPU, setShowModalCPU] = useState(false);
    const [showModalPrinter, setShowModalPrinter] = useState(false);
    const [monitorCtrl, setMonitorCtrl] = useState(0);
    const [printCtrl, setPrintCtrl] = useState(0);

    const navigate = (url) => {
        push(url);
     }

     useEffect(() => {

        async function fecthDevice(id){
            await getDevice(id);
         }
         
        if(id !== undefined){
             fecthDevice(id);           
        }

    
      }, [id])

      
    const getIcon = (status) => {
        if(status === 0){
            return(<div className="h-[24px] w-[24px] mx-[8px] bg-[#FADDDD] rounded-full">
            <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
        </div>)
        }else if(status === 2){
          return(  <div className="h-[24px] w-[24px] mx-[8px] bg-[#F9EAD0] rounded-full">
          <BsExclamation className=' h-[24px] w-[24px]  text-[#CC6026]' />
        </div>)
        }else{
          return(<div className="h-[24px] w-[24px] mx-[8px] bg-[#FADDDD] rounded-full">
          <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
         </div>)
        }
      
      }
  

    const getDevice = async (ide) => {

        setLoading(true);

        const response = await new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/device_data_details/${ide}`, { withCredentials: true })
                .then(response => {
                    resolve(response.data);
                }).catch(error => {
                    if (error.response.status === 401) {
                        resolve(error.response.status)
                    }
                    resolve(error);
                })
            });
            

            const error_cont_monitor = 0;
            const error_cont_print = 0;

            response[1].map((error) =>{
                if(error.description_error === 'Monitor principal con problemas' || error.description_error === 'La Pantalla se encuentra apagada'){
                    error_cont_monitor += 1;
                }

                if(error.description_error === 'Impresora con problemas'){
                    error_cont_print += 1;
                }
            })

            if(error_cont_monitor > 0){
                setMonitorCtrl(1);
            }

            if(error_cont_print > 0){
                setPrintCtrl(1);
            }

            setDevice(response);
            setLoading(false);
    }

    return (
    
    <Layout refreshDate='' selected ='bg-[#F3F3F3]' position="">
    
        <div className='flex mt-[4px] mb-[22px]'>
            <div className='flex-auto'></div>
            <div className='flex cursor-pointer' onClick={() => getDevice(id)}>
                <div className='w-[24px] h-[24px] rounded-full bg-[#D6E1E7]'>
                    <HiOutlineRefresh className=' h-[20px] w-[20px] ml-[2px] mt-[2px] text-[#004466]' />
                </div>
                <div className='text-[16px] leading-[18px] tracking-[-2%] font-bold text-[#004466] mt-[3px] ml-[8px] mr-[24px]'>Actualizar</div>
            </div>
        </div>

        <div className="flex ml-[24px] cursor-pointer w-[80px]" onClick={()=>{navigate("/general")}}>
            <div className='w-[24px] h-[24px] rounded-full bg-[#D6E1E7]'>
                <FaChevronLeft className=' h-[12px] w-[7px] ml-[8px] mt-[6px] text-[#004466]' />
            </div>
            <div className='text-[16px] leading-[18px] tracking-[-2%] font-bold text-[#004466] mt-[3px] ml-[8px]'>Volver</div>
        </div>

    { device.length > 0 && !loading && <>
       <div className='font-bold text-[32px] text-hw-black ml-[24px] mt-[12px] mb-[27px]'>
            {device[0].label}
        </div>
        
        <div className='flex flex-wrap mb-[24px] ml-[24px]'>
            {device[1].map(
                (description) => {
                    return(
                        <div className= 'h-[40px] select-none bg-white flex min-w-fit items-center rounded-[10px] mb-[8px] mr-[8px]'>
                        <div className='text-[16px] text-black ml-[12px] font-bold leading-[19.2px]'>{description.description_error}</div>
                            {getIcon(description.status)}
                        </div>
                    )
                }
            )}
           
        </div>

        <div className='flex flex-wrap bg-white mb-[16px] mx-[24px] rounded-[16px] text-[16px] leading-[18px] tracking-[-2%] font-semibold'>

            <div className='m:flex m:flex-wrap ml-[24px] mt-[20px]'>
                <div className='m:flex'>
                    <div className='text-black/50 m:mr-[10px]'>Oficina sucursal:</div>
                    <div className='mb-[20px] m:mr-[40px]'>{device[0].branch_id.label}</div>
               </div>

               <div className='m:flex'>
               <div className='text-black/50 m:mr-[10px]'>Sistema:</div>
               <div className='mb-[20px] m:mr-[40px]'>{device[0].device_data.system_info.system}</div>
                </div>

                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Node name:</div>
                <div className='mb-[20px] m:mr-[40px]'>{device[0].device_data.system_info.node_name}</div>
                </div>
                
                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Tipo de dispositivo:</div>
                <div className='mb-[20px] m:mr-[40px]'>{device[0].device_type.label}</div>
                </div>
             
                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Estado del dispositivo:</div>
                <div className='mb-[20px] m:mr-[40px]'>{(device[0].active?"Enabled":"Disabled")}</div>
                </div>
             
                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Release:</div>
                <div className='mb-[20px] m:mr-[40px]'>{device[0].device_data.system_info.release}</div>

                </div>

                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Versión:</div>
                <div className='mb-[20px] m:mr-[40px]'>{device[0].device_data.system_info.version}</div>
                </div>

                <div className='m:flex'>
                <div className='text-black/50 m:mr-[10px]'>Procesador:</div>
                <div className='mb-[20px] m:mr-[40px]'>{device[0].device_data.system_info.processor}</div>
                </div>

            </div>

        </div>
        
        <div className='flex flex-wrap '>
            
        <div className='flex flex-wrap bg-white mb-[16px] mx-[24px] rounded-[16px] m:w-[325px] h-[238px] pb-[40px]'>
                
                <div className='flex'>
                <div className='mt-[32px] ml-[24px] font-bold leading-[18px] tracking-[-2%] text-[18px] h-[20px] flex-auto'>Monitor</div>
                <div className="self-end ml-[40px]"></div>
                </div> 

                <div className='flex flex-wrap h-[80px]'>
                
                <div className='flex ml-[24px] mb-[8px]'>
                    <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] cursor-pointer'  onClick={() => setShowModalScreen(true)}>
                        
                        <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <RiComputerFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Pantalla</div>
                        </div>

                           {monitorCtrl > 0 && 
                                <div className="h-[24px] w-[24px] mr-[16px] bg-[#F9EAD0] rounded-full ml-[16px] justify-end">
                                    <BsExclamation className=' h-[24px] w-[24px]  text-[#CC6026]' />
                                </div>
                            }

                            {monitorCtrl === 0 && 
                                <div className="h-[24px] w-[24px] mr-[16px] bg-[#E8EFD2] rounded-full ml-[16px] justify-end">
                                    <BsCheck className=' h-[24px] w-[24px]  text-[#9EC431]' />
                                </div>
                            }

                            <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black' />   
                            <ModalScreen show={showModalScreen} onClose={() =>  setShowModalScreen(false) } details={device[0].device_data.display_info}/>  
                    </div>
                </div>  

                <div className='flex ml-[24px]'>
                    <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] cursor-pointer' onClick={() => setShowModalPrinter(true)}>
                        
                        <div className='flex flex-auto'>
                        <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                            <BsPrinterFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                        </div>
                        <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Impresora</div>
                        </div>
                        
                            {printCtrl > 0 && 
                                <div className="h-[24px] w-[24px] mr-[16px] bg-[#FADDDD] rounded-full ml-[16px] justify-end">
                                    <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
                                </div>
                            }

                            {printCtrl === 0 && 
                                <div className="h-[24px] w-[24px] mr-[16px] bg-[#E8EFD2] rounded-full ml-[16px] justify-end">
                                    <BsCheck className=' h-[24px] w-[24px]  text-[#9EC431]' />
                                </div>
                            }

                            <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black' />  
                            <ModalPrinter show={showModalPrinter} onClose={() =>  setShowModalPrinter(false) } details={(device[0].device_data.printer_info !== undefined && device[0].device_data.printer_info !== null)?device[0].device_data.printer_info: null} />    
                    </div>
                </div>  

                </div>

        </div>

             
        <div className='flex flex-wrap bg-white mb-[16px] mx-[24px] rounded-[16px] m:w-[325px] pb-[40px] flex-auto'>
                
                <div className='flex mt-[32px] ml-[24px] mb-[12px]  font-bold leading-[18px] tracking-[-2%] text-[18px]'>Información</div>
                
                <div className='flex flex-wrap'>

                    <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer'  onClick={() => setShowModalDisk(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <BsDiscFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Discos</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' />      
                                <ModalDisk show={showModalDisk} onClose={() =>  setShowModalDisk(false) } details={(device[0].device_data.disk_info !== undefined && device[0].device_data.disk_info !== null)?device[0].device_data.disk_info: null}/>
                        </div>
                    </div>  

                    <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer'  onClick={() => setShowModalGPU(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <BsCpu className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>GPU</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' />      
                                <ModalGPU show={showModalGPU} onClose={() =>  setShowModalGPU(false) } details={(device[0].device_data.gpu_info !== undefined && device[0].device_data.gpu_info !== null)?device[0].device_data.gpu_info: null}/>

                        </div>
                    </div>  

                    <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer'  onClick={() => setShowModalRed(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <RiRouterFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Red</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' /> 
                                <ModalRed show={showModalRed} onClose={() =>  setShowModalRed(false) } details={(device[0].device_data.red_info !== undefined && device[0].device_data.red_info !== null)?device[0].device_data.red_info: null}/>     
                        </div>
                    </div>  

                    <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer' onClick={() => setShowModalRam(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <CgSmartphoneRam className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Memoria RAM</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' />      
                        </div>

                        <ModalRam show={showModalRam} onClose={() =>  setShowModalRam(false) } details={device[0].device_data.memory_info}/>

                    </div>  

                    <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer' onClick={() => setShowModalCPU(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <BsCpuFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>CPU</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' />
                                <ModalCPU show={showModalCPU} onClose={() =>  setShowModalCPU(false) } details={(device[0].device_data.cpu_info !== undefined && device[0].device_data.cpu_info !== null)?device[0].device_data.cpu_info: null}/>      
                        </div>
                    </div>  

                     <div className='flex ml-[24px] mt-[8px]'>
                        <div className= 'h-[56px] select-none bg-[#F5F5F5] flex min-w-fit items-center rounded-[16px] mb-[8px] mr-[8px] w-[279px] flex-row cursor-pointer' onClick={() => setShowModalContact(true)}>
                            
                            <div className='flex flex-auto'>
                            <div className="h-[32px] w-[32px] mx-[8px] bg-white rounded-full ml-[16px] flex">
                                <RiContactsBookFill className=' h-[20px] w-[20px] ml-[6px] text-[#004466] self-center' />
                            </div>
                            <div className='text-[16px] text-black ml-[14px] font-bold leading-[19.2px] flex self-center'>Contacto</div>
                            </div>
                                <FaChevronRight className=' h-[16px] w-[16px] mr-[16px] text-black justify-end' />     
                                <ModalContact show={showModalContact} onClose={() =>  setShowModalContact(false) } details={(device[0].branch_id.contact !== undefined && device[0].branch_id.contact !== null)?device[0].branch_id.contact:null}/> 
                        </div>
                    </div>  
                </div>

               
                
                
        </div>
        
        </div>

        </>
        }


        { loading &&
         <div className='flex justify-center mt-[24px]'>
            <Bars color="#004466" height={80} width={80} />
         </div>
         }
        

   </Layout>
      
  )
}




