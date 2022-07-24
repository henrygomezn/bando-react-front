import {BsArrowRightShort, BsCheck, BsExclamation} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import ModalEditarZone from "./ModalEditarZone";
import ModalDelete from "./ModalDelete";

const CardZone = ( props ) => {
    const {title, amount, status, ide, creationDate} = props;
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [details, setDetails] = useState([]);
    const [branchDetail, setBranchDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCard, setLoadingCard] = useState(true);
    const [active, setActive] = useState(false);

    let timeOptions = {year: "numeric", month: "long", day: "numeric"};
    const [dateUpdate, setDateUpdate] = useState(new Date(creationDate).toLocaleString("es-ES", timeOptions))
    
    const getDetails = async (id) => {
      setShowModal(true);
      setLoadingCard(true);

      const listDetails = await new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/zone/${id}`, { withCredentials: true })
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
      setActive(listDetails.zone.active);

      if(listDetails !== undefined && listDetails.zone !== undefined && listDetails.zone.branch_office.length > 0) {
        setBranchDetail(listDetails.zone.branch_office.map((branch)=>{return branch}))
      }

      setLoadingCard(false);

    }

    const handleCallback = (childData) =>{
      if(childData){
        props.parentCallback(childData);
      }
  }

    const getChip = () => {
     
      if(status === true){
        return(<div className="flex self-end h-[24px] w-[56px] mt-[22px] mr-[25px] bg-[#E8EFD2] rounded-[31px] text-[#9EC431]  leading-[18px] tracking-[-4%] text-[14px]">
        <div className="self-center ml-[9px] font-semibold">
          Activo
        </div>
    </div>)
      }else if(status === false){
        return(<div className="flex self-end h-[24px] w-[66px] mt-[22px] mr-[25px] bg-[#FADDDD] rounded-[31px] text-[#E00000]  leading-[18px] tracking-[-4%] text-[14px]">
        <div className="self-center ml-[9px] font-semibold">
          Inactivo
        </div>
      </div>)
      }
    
    }

    const changeToDelete = () => {
      setShowModal(false)
      setShowModalDelete(true)
    }

    return(
        <div className='flex flex-col h-[115px] mx-[24px] m:mx-0 m:mr-[15px] m:w-[327px] bg-white rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%]'>
              <div className='flex'>
                <div className='flex-auto mt-[24px] ml-[24px] font-bold text-[18px]'>{title}</div>
                {getChip()}
            </div>

            <div className='mt-[4px] ml-[24px] text-[14px]'>
              <div className="font-bold text-[16px]"> {amount} <span className="font-semibold text-black/60">sucursales</span> </div>
            </div> 

            <div className="flex">
            <div className="flex-auto ml-[24px] text-black/60 text-[12px] font-semibold mt-[4px] ">Creación: {dateUpdate}</div>
              <div className='self-end text-[14px] mt-[20px] flex mr-[24px] cursor-pointer font-semibold'
                  onClick={( )=> getDetails(ide) }    >Editar <BsArrowRightShort className='mt-[4px] ml-[6px]'/>
                  <ModalEditarZone  show={showModal} onClose={() =>  setShowModal(false) } parentCallback = {handleCallback} loading = {loadingCard} details = {details} branchDetail = {branchDetail} active={active} showModalDelete={changeToDelete}/>
                  <ModalDelete  show={showModalDelete} onClose={() =>  setShowModalDelete(false) } parentCallback = {handleCallback} details = {details} />
              </div> 
            </div>

        </div>
   );

}

export default CardZone;