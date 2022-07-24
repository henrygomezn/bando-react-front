import {RiUserSettingsLine, RiRoadMapLine, RiDeviceLine, RiStoreLine, RiComputerLine} from "react-icons/ri";
import { useRouter } from "next/router";
import {GoGraph} from 'react-icons/go';


const CardSetting = ( props ) => {
    const {title, detail, icon, path} = props;
    const {push} = useRouter();
    
       const getIcon = () => {
      if(icon === "permiso"){
        return(<div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <RiUserSettingsLine className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>)
      }else if(icon === "zona"){
        return(<div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <RiRoadMapLine className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>)
      }else if(icon === "tipo dispositivo"){
        return(   <div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <RiDeviceLine className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>
        )
      }else if(icon === "sucursal"){
        return(<div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <RiStoreLine className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>)
      }else if(icon === "dispositivo"){
        return(<div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <RiComputerLine className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>);
      }else if(icon === "estadistica"){
        return(<div className="h-[74px] w-[74px] ml-[24px] mt-[20px] bg-[#004466]/10 rounded-full">
        <GoGraph className=' h-[44px] w-[44px]  text-[#004466] ml-[14px] mt-[14px]' />
      </div>);
      }
    }

    const navigate = (url) => {
      push(url);
   }

    return(
        <div className='flex flex-col h-[242px] mx-[24px] m:mx-0 m:mr-[15px] m:w-[327px] bg-[white] rounded-[16px] mb-[11px] leading-[18px] tracking-[-2%] cursor-pointer' onClick={()=>{navigate(path)}}>
              <div className='flex flex-col'>
              
                {getIcon()}
              
                <div className='mt-[12px] ml-[24px] font-bold text-[20px] text-[#004466]'>{title}</div>
              </div>
            <div className='mt-[12px] mx-[24px] text-[12px]'>{detail}</div> 
        </div>
   );

}

export default CardSetting;