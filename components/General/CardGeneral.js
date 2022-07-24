import {BsArrowRightShort, BsCheck, BsExclamation} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import ModalGeneral from "./ModalGeneral";
import { useState } from "react";
import axios from "axios";


const CardGeneral = ( props ) => {
    const {title, subtitle, status, ide} = props;
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDetails = async () => {
      setShowModal(true);
      setLoading(true);

      //Agregar Lógica para los Dispositivos
      const listDetails = await new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/branch_office/status/${ide}`, { withCredentials: true })
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                if (error.response.status === 401) {
                    resolve(error.response.status)
                }
                resolve(error);
            })
      });

      setDetails(listDetails);
      setLoading(false);

    }

    const getIcon = () => {
      if(status === 0){
        return(<div className="self-end h-[24px] w-[24px] mt-[22px] mr-[25px] bg-[#FADDDD] rounded-full">
        <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
      </div>)
      }else if(status === 1){
        return(<div className="self-end h-[24px] w-[24px] mt-[22px] mr-[25px] bg-[#E8EFD2] rounded-full">
        <BsCheck className=' h-[24px] w-[24px]  text-[#9EC431]' />
      </div>)
      }else if(status === 2){
        return(  <div className="self-end h-[24px] w-[24px] mt-[22px] mr-[25px] bg-[#F9EAD0] rounded-full">
        <BsExclamation className=' h-[24px] w-[24px]  text-[#CC6026]' />
      </div>)
      }else{
        return(<div className="self-end h-[24px] w-[24px] mt-[22px] mr-[25px] bg-[#FADDDD] rounded-full">
        <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
      </div>)
      }
    
    }

    return(
        <div className='flex flex-col h-[115px] mx-[24px] m:mx-0 m:mr-[15px] m:w-[327px] bg-white rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%]'>
              <div className='flex'>
                <div className='flex-auto mt-[24px] ml-[24px] font-bold text-[18px]'>{title}</div>
                {getIcon()}
            </div>
            <div className='mt-[4px] ml-[24px] text-[14px]'>{subtitle}</div> 
            <div className='self-end text-[14px] mt-[20px] flex mr-[24px] cursor-pointer font-semibold'
                onClick={() => getDetails()}    >Ver detalle <BsArrowRightShort className='mt-[4px] ml-[6px]'/></div> 
            <ModalGeneral show={showModal} details={details} loading={loading} title={title} onClose={() =>  setShowModal(false) }/>
        </div>
   );

}

export default CardGeneral;