import React, { useContext, useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { IncomeContext } from '../context/context'

function Fixeddeposit() {
    const { availableBalance, userID, fixdeposit, setFixdeposit, setEx, ex, } = useContext(IncomeContext)
    const rowColors = ["bg-[#00b368]", "bg-[#D7928B]", "bg-[#6594AB]"];
    const animat = useRef(null);



    const [fdform, setfdfrom] = useState({
        y: 0,
        date: "",
        fdyear: 0,
        label: "FD"
    })
    const [endDate, setendDate] = useState();

    useEffect(() => {
        if (fdform.date && fdform.fdyear) {
            const date = new Date(fdform.date);
            const unloackdate = new Date(date);
            unloackdate.setFullYear(unloackdate.getFullYear() + Number(fdform.fdyear));
            const end = unloackdate.toLocaleDateString();
            setendDate(end);



        }
    }, [fdform.date, fdform.fdyear]);





    const amount = Number(fdform.y) || 0;
    const year = Number(fdform.fdyear) || 0;
    const rate = 0.06;
    const interst = amount * year * rate;
    const finalReturn = amount + interst;

    const finalFd = {
        amount: amount,
        rate: rate,
        year: year,
        totalInterst: interst,
        finalReturn: finalReturn,
        startdate: fdform.date,
        endDate: endDate,
        userID: userID

    }


    function hadnlesubmit(e) {
        e.preventDefault()

        if (availableBalance < Number(fdform.y)) {
            alert("invelid Blance")
            return;
        }

        fetch("http://localhost:4000/FD", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalFd)
        })


        fetch("http://localhost:4000/expness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...fdform, userID: userID, })
        })
        setEx([...ex, fdform])




        setFixdeposit([...fixdeposit, finalFd])

        setfdfrom({
            y: 0,
            date: "",
            fdyear: 0
        })

        setendDate("")

        console.log(fixdeposit);

    }



    const mouseEnder = () => {
        gsap.to(animat.current, {
            height: "100%",
            duration: 0.1,
            ease: ' elastic'

        })

    }
    const onMouseLeave = () => {
        gsap.to(animat.current, {
            height: "0%",
            duration: 0.1,
            ease: 'elastic'

        })

    }



    return (<>

        <div className='w-full my-9 mt-25 p-4'>
            <h1 className='text-2xl capitalize'>Fixed deposit interest (6%)</h1>
        </div>

        <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap'>
            <div className='w-full md-w-[50%] lg:w-[50%]'>

                <form className="px-4" onSubmit={hadnlesubmit} >
                    <div className="flex flex-col gap-3 mb-4">
                        <label>Amount You Deposit</label>
                        <input type="number" name="y" value={fdform.y} onChange={(e) => setfdfrom({ ...fdform, [e.target.name]: e.target.value })} required className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
                    </div>
                    <div className="flex flex-col gap-3 mb-4">
                        <label>For Year </label>
                        <input type="number" name="fdyear" value={fdform.fdyear} onChange={(e) => setfdfrom({ ...fdform, [e.target.name]: e.target.value })} required className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
                    </div>
                    <div className="flex flex-col gap-3 mb-4">
                        <label>Start Date</label>
                        <input type="date" name="date" value={fdform.date} onChange={(e) => setfdfrom({ ...fdform, [e.target.name]: e.target.value })} required className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
                    </div>



                    <div className="flex justify-center mt-8">

                        <button className="py-2 px-8 text-xl border rounded-2xl relative  overflow-hidden border-[#00d6f0]"
                            onMouseEnter={mouseEnder}
                            onMouseLeave={onMouseLeave}
                            type="sumbit"
                        >
                            <span className="relative z-1">Sumit</span>

                            <span
                                ref={animat}
                                className="absolute  bottom-0 bg-cyan-400 left-0 w-full h-0 z-0 transition-all duration-300 " > </span>
                        </button>

                    </div>

                </form>

            </div>


            <div className='w-full px-4 md:w-[50%] lg:w-[50%]'>
                <div>
                    <div className='flex  justify-between px-4 my-2'><p>Fiexd Deposit</p><span>₹ {amount}</span></div>
                    <div className='flex  justify-between px-4 my-2'><p>Interst</p> <span>₹ {interst}</span></div>
                    <div className='flex  justify-between px-4 my-2'><p>Total Return</p><span>₹ {finalReturn}</span></div>
                    <div className='flex  justify-between px-4 my-2'><p>Rate </p> <span>{rate} %</span></div>
                    <div className='flex  justify-between px-4 my-2'><p>Start Date </p> <span>{fdform.date ? new Date(fdform.date).toLocaleDateString() : "0/00/0000"}</span></div>
                    <div className='flex  justify-between px-4 my-2'><p>Unloack Date</p> <span>{endDate}</span></div>


                </div>

            </div>





        </div>



        <div className='my-8 p-4 overflow-x-auto'>
            <table className='w-full overflow-x-auto border-spacing-2 border-spacing-x-4 text-black'>
                <tr className="text-left py-4 bg-[#6594AB] transition duration-300 ">
                    <th className='py-2 px-2'>Amount</th>
                    <th className='py-2 px-2'>Total Interest</th>
                    <th className='py-2 px-2'>total Return</th>
                    <th className='py-2 px-2'>Rate</th>
                    <th className='py-2 px-2'>Tenure</th>
                    <th className='py-2 px-2'>start Date</th>
                    <th className='py-2 px-2'>Unloack Date</th>

                </tr>
                <tbody className='text-[13px] md:text-[16px] lg:text-[19px]'>
                    {fixdeposit.map((i, index) => (
                        <tr key={index} className={`${rowColors[index % rowColors.length]} transition duration-300 text-base font-semibold`}>
                            <td className='p-2'>{i.amount}</td>
                            <td className='p-2'>{i.totalInterst}</td>
                            <td className='p-2'>{i.finalReturn}</td>
                            <td className='p-2'>{i.rate}</td>
                            <td className='p-2'>{i.year}</td>
                            <td className='p-2'>{i.startdate}</td>
                            <td className='p-2'>{i.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    </>)
}

export default Fixeddeposit