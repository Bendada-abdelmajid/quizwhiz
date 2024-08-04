import { Resulte } from '@/utils/types';
import React, { Dispatch, SetStateAction } from 'react';



type Props = {
    index: number;
    el: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
    setResulte: Dispatch<SetStateAction<Resulte[]>>;
    resulte: Resulte[];
};

const Item = ({ el, setResulte, resulte, index }: Props) => {
    const handleClick = (option: string) => {
        // Create a new array based on the previous state
        const newResulte = [...resulte];
        const existingResultIndex = newResulte.findIndex(item => item.i === index);
        
        if (existingResultIndex >= 0) {
            // Update the existing result
            newResulte[existingResultIndex].answer = option;
        } else {
            // Add a new result
            newResulte.push({
                question: el.question,
                answer: option,
                correctAnswer: el.correctAnswer,
                i: index,
                correct:option == el.correctAnswer,
            });
        }

        setResulte(newResulte);
        localStorage.setItem("resulets", JSON.stringify(newResulte));
    };

    return (
        <div className="p-5 w-screen">
            <h3 className='text-xl md:text-2xl leading-[1.3] mb-16 text-center text-balance font-medium max-w-4xl mx-auto'>{el.question}</h3>
            <div className='grid md:grid-cols-2 gap-5  items-center max-w-md md:max-w-3xl px-5 mx-auto'>
                {el.options.map((option, i) => (
                    <div 
                        onClick={() => handleClick(option)} 
                        className={`${resulte[index]?.answer === option ? "border-orange" : "border-[#747a8a]"} flex w-full cursor-pointer gap-5 items-center border transition duration-200  py-4 pl-6 pr-7 rounded-[40px] hover:shadow-custom hover:bg-white `} 
                        key={"Option" + i}
                    >
                        <span className={`${resulte[index]?.answer === option ? "bg-orange border-orange" : "border-[#747a8a]"} size-3 grid place-content-center transition duration-200 rounded-full border font-medium`}></span>
                        <h4 className='sm:text-lg'>{option}</h4>
                   
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Item;
