"use client"

import { questions } from "@/data"
import Item from "./item"
import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { Resulte } from "@/utils/types"



const Quiz = () => {
    const [resulte, setResulte] = useState<Resulte[]>(() => {
        const storedResulets = typeof window !== 'undefined' && localStorage.getItem("resulets");
        return storedResulets ? JSON.parse(storedResulets) : [];
    });
    const [step, setStep] = useState<number>(0)
    const [disable, setDisable] = useState(true)
    const [open, setOpen] = useState(false)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(resulte.filter(obj => obj.correct).length)

    const hundelClick = () => {
        
        if (step < questions.length) {
            setStep(step + 1)
        } else {
            setOpen(true)
        }


    }
    useEffect(() => {
        if (step == 0) {
            setDisable(false)
        } else if (resulte[step - 1]) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [step, resulte])
    const reset = () => {
        setOpen(false)
        setShowScore(false)
        setStep(0)
        setScore(0)
        setResulte([]);
        localStorage.setItem("resulets", JSON.stringify([]));
    }
    const sendResulte = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (resulte.length < questions.length) {
                alert("you mast complete the quiz")
                return false
            }
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email');
            const zipcode = formData.get('zipcode');
            setScore(resulte.filter(obj => obj.correct).length)
            setShowScore(true)
            await fetch(`/api/sendEmail/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, zipcode, resultes: resulte }),
            });
        } catch (error) {
            

        }
    }
    function getMessage() {
        switch (true) {
            case score < questions.length / 4:
                return "You have some room for improvement. Keep studying general culture!";
            case score < questions.length / 2:
                return "Good effort! You're improving in general culture.";
            case score >= questions.length / 2:
                return "Great job! You have a solid grasp of general culture.";
            case score == questions.length:
                return ">Well done for answering all questions!";
        }

    }
    return (
        <>
            <div className="w-full">
                <div style={{ marginLeft: `-${step * 100}vw` }} className="overflow-hidden transition-[margin-left] duration-300 relative grid items-center grid-cols-[repeat(11,100vw)] ">
                    <div className="w-screen">
                        <Image className="size-10 mx-auto" src="/quiz.png" width={200} height={200} alt="logo" />
                        <h1 className="text-xl capitalize mt-5 font-medium text-center text-balance max-w-4xl mx-auto ]">welcom to our website</h1>
                        <p className="text-sm text-gray-500 text-center text-balance max-w-4xl mx-auto mt-2"> Are You Ready to Challenge Yourself with the Quiz?</p>
                    </div>
                    {questions.map((el, i) => (
                        <Item key={"item," + i} el={el} setResulte={setResulte} resulte={resulte} index={i} />
                    ))}

                </div>
                <div className="flex justify-center items-center mt-10">
                    <button onClick={() => setStep(step > 0 ? step - 1 : step)} className={` ${step == 0 ? "-mr-36 sm:-mr-48" : "mr-10"} w-36 sm:w-48 flex justify-center items-center gap-3  bg-[#f0f0f0]  rounded-[30px] sm:text-xl pl-4 pr-5 py-2 sm:pl-8 sm:pr-10 sm:py-4 hover:gap-5  transition-[gap_margin-right] duration-300 active:bg-[#f5f5f5] `}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"></path></svg>
                        <span>Prev</span>
                    </button>
                    <button disabled={disable} onClick={hundelClick} className="w-36 sm:w-48 flex justify-center items-center gap-3  bg-orange-light rounded-[30px] sm:text-xl pl-4 pr-5 py-2 sm:pl-8 sm:pr-10 sm:py-4 hover:gap-5  transition-[gap] duration-300 active:bg-orange disabled:opacity-40"><span>{step == 0 ? "Start" : step == questions.length ? "Complete" : "Continue"}</span>
                        <svg className={`transition-transform duration-300 block ${step == questions.length ? "-rotate-90" : "rotate-0"}`} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg>
                    </button>

                </div>
            </div>
            <div className="fixed bottom-0 w-screen left-0 h-2 bg-white">
                <div style={{ width: `${step * 100 / (questions.length)}%` }} className="bg-orange transition-[width] duration-300 h-full"></div>
            </div>
            <div className={`fixed top-0 left-0 w-screen h-screen bg-black/30 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <form action={"/"} onSubmit={sendResulte} className={`p-10 rounded bg-white w-full min-[510px]:max-w-[500px]  max-w-[95vw]  center  transition-all duration-300 ${open && showScore == false ? "opacity-100 -translate-y-1/2" : "opacity-0 translate-y-[50vh]"}`}>
                    <button type="button" onClick={() => setOpen(false)} className="rounded-full border cursor-pointer size-8 absolute top-5 left-5 border-current grid place-content-center group"><svg className="group-hover:scale-150 transition-transform duration-300 group-active:scale-90" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368 144 144m224 0L144 368"></path></svg></button>
                    <h4 className="text-center text-2xl font-medium mb-3">Assessment complete. </h4>
                    <p className="text-balance text-sm text-center text-gray-400">We just need a little more information so that we can send your results.</p>
                    <input required name="name" className="block px-5 py-4 bg-light rounded-[30px] border mt-10 w-full" type="text" placeholder="Enter Your Full Name" />
                    <input required name="email" className="block px-5 py-4 bg-light rounded-[30px] border mt-5 w-full " type="email" placeholder="Enter Your Email" />
                    <input required name="zipcode" className="block px-5 py-4 bg-light rounded-[30px] border mt-5 w-full " type="text" placeholder="Enter Your Email" />
                    <button type="submit" className="w-fit mt-8 mx-auto flex items-center gap-3  bg-orange-light hover:bg-orange/80 transition-colors rounded-[30px] text-xl px-10 py-3 ">
                        See Resulte
                    </button>
                </form>
                <div className={`p-10 rounded bg-white w-full center min-[510px]:max-w-[500px] max-w-[95vw] transition-all duration-300 ${open && showScore == true ? "opacity-100 -translate-y-1/2" : "opacity-0 translate-y-[50vh]"}`}>
                    <div>
                        <h3 className={`text-4xl size-32 mx-auto grid place-content-center rounded-full ${score < questions.length / 4 ? "bg-red-50 text-red-600" : score < questions.length / 2 ? "bg-amber-100 text-amber-600" : "bg-green-50 rounded-full text-green-600"} font-merienda mb-10`}>{score}/{questions.length}</h3>
                        <p className="text-center text-balance text-xl ">{getMessage()}</p>
                    </div>

                    <button onClick={reset} className="w-fit mt-11 mx-auto flex items-center gap-3  bg-orange-light hover:bg-orange/80 transition-colors   rounded-[30px] text-xl px-10 py-3 ">
                        Done
                    </button>
                </div>
            </div>
        </>
    )
}

export default Quiz