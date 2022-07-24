import { useEffect, useState } from "react";
import {BsArrowRightShort, BsCheck, BsExclamation} from "react-icons/bs";
import {IoClose, IoGridOutline} from "react-icons/io5";

const Chip = ( props ) => {

    const {name, selectedChip, status} = props;
    const [selected, setSelected] = useState("");
    
    useEffect(() => {
        if(selectedChip === 'true'){
            setSelected(" chip chip-selected");
        }else{
            setSelected(" chip");
        }
    
    }, []);

    const handleSelect = (event) => {
        let selected = document.getElementsByClassName("chip");

        for (let i = 0; i < selected.length; i++) {
            selected[i].className = selected[i].className.replace(" chip-selected", "");
        }
        event.currentTarget.className += " chip-selected";
      }

    const getIcon = () => {
        if(status === "0"){
            return(
                <div className="h-[24px] w-[24px] mx-[8px] bg-[#FADDDD] rounded-full">
                    <IoClose className=' h-[24px] w-[24px]  text-[#E00000]' />
                </div>
            )
        }

        if(status === "1"){
            return(
                <div className="h-[24px] w-[24px]  mx-[8px] bg-[#E8EFD2] rounded-full">
                    <BsCheck className=' h-[24px] w-[24px]  text-[#9EC431]' />
                </div>
            )
        }

        if(status === "2"){
            return(  
                <div className="h-[24px] w-[24px] mx-[8px] bg-[#F9EAD0] rounded-full">
                    <BsExclamation className=' h-[24px] w-[24px] text-[#CC6026]' />
                </div>
            )
        }

        return(  
            <div className="h-[24px] w-[24px] mx-[8px] bg-[#2A8BEB]/[0.2] rounded-full">
                <IoGridOutline className=' h-[16px] w-[16px] ml-[3.5px] mt-[3.5px]  text-[#2A8BEB]' />
            </div>
        )

    }
    

   return(

    <div className= {`h-[40px] select-none border-2 bg-white flex min-w-fit items-center rounded-[10px] ml-[8px] cursor-pointer ${selected}`} onClick={(event)=>handleSelect(event)}>
        {getIcon()}
        <div className='text-[16px] text-black mr-[16px]'>{name}</div>
    </div>

   );
}

export default Chip;