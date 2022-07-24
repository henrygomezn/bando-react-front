import {BsArrowRightShort, BsCheck, BsExclamation} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import { useRouter } from "next/router";

const CardModalGeneral = ( props ) => {
    const {title, subtitle, status, ide} = props;
    const {push} = useRouter();

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
      /*h-[115px]*/
        
        <div className='flex flex-col h-[150px] mx-[24px] m:mx-0 m:mr-[15px] m:w-[270px] bg-[#F5F5F5] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%]'>
        <div className='flex mb-[2px]'>
            <div className='flex-auto mt-[24px] ml-[24px] font-bold text-[14px]'>{title}</div>
            {getIcon()}
        </div>
        <div className='mt-[4px] ml-[24px] text-[12px] font-normal h-[50px]'>  
            {   typeof subtitle === "object" ? subtitle.map((desc) => {return <div> · {desc.description_error}</div>}) : <div> · {subtitle}</div>  }
        </div> 
        <div className='self-end text-[12px] mt-[20px] flex mr-[24px] cursor-pointer font-semibold' onClick={() =>push(`/device_details/${ide}`) }>Ver dispositivo <BsArrowRightShort className='mt-[4px] ml-[6px]'/></div> 
    </div>    
   );

}

export default CardModalGeneral;