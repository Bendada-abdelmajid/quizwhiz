"use client";
import { Resulte } from '@/utils/types';

import React, { useEffect, useState } from 'react'



type Props = {
    index: number;
    option:string;
    handleClick: (option: string) => void
    resulte: Resulte[];
};
const Option=({option, resulte,index, handleClick}:Props)=>{
    const [active, setActive]=useState<boolean>(resulte[index]?.answer === option)
    useEffect(() => {
        setActive(resulte[index]?.answer === option)
    }, [])
    
    return (
        <div
        onClick={() => handleClick(option)}
        className={`${ active? "border-orange" : "border-[#747a8a]"} flex w-full cursor-pointer gap-5 items-center border transition duration-200  py-4 pl-6 pr-7 rounded-[40px] hover:shadow-custom hover:bg-white `}
      
    >
        <span className={`${active ? "bg-orange border-orange" : "border-[#747a8a]"} size-3 grid place-content-center transition duration-200 rounded-full border font-medium`}></span>
        <h4 className='sm:text-lg'>{option}</h4>
        {active ? "red": "blue"}

    </div>
    )
}

export default Option