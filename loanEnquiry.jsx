import React, { useContext, useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { IncomeContext } from '../context/context'

function LoanEnquiry() {
  const { loan, setloan, userID } = useContext(IncomeContext)
  const animat = useRef(null);



  const [loanInput, setLoanInput] = useState({
    loanType: "",
    loanAmount: "",
    year: "",
    interst: "",
    sdate: "",
  })

  const [finalloan, setfinalloan] = useState({
    totalReturn: "",
    rate: "",
    emi: "",
    tenure: "",
    date: "",
    endLoan: ""
  })


  const HandleChange = (e) => {
    setLoanInput({
      ...loanInput,
      [e.target.name]: e.target.value
    })

  }

  useEffect(() => {
    const totalam = Number(loanInput.loanAmount);
    const interst = Number(loanInput.interst);
    const ryear = Number(loanInput.year)
    const stdate = new Date(loanInput.sdate)
    const enDate = new Date(stdate);
    enDate.setFullYear(stdate.getFullYear() + ryear); // ✅ This is correct
    const totalInterst = totalam * interst * ryear / 100
    const totalReturn = totalInterst + totalam
    const totalMonth = 12 * ryear
    const monthlyEMI = totalReturn / totalMonth

    setfinalloan({
      type: loanInput.loanType,
      amount: loanInput.loanAmount,
      totalReturn: totalReturn,
      rate: loanInput.interst,
      ratetotal: totalInterst,
      emi: monthlyEMI,
      tmonth: totalMonth,
      tenure: ryear,
      date: loanInput.sdate,
      endLoan: enDate.toLocaleDateString()


    })
  }, [loanInput])


  function handleSubmit(e) {
    e.preventDefault();


    fetch("http://localhost:4000/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...finalloan, userID: userID })
    })

    setloan(p => [...p, finalloan])

    setLoanInput({
      loanType: "",
      loanAmount: "",
      year: "",
      interst: "",
      sdate: "",
    })

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



  return (
    <>
      <div className='mt-16 p-4'>

        <h1 className='text-4xl align-center  my-8'>Need a Loan? Start Your <span className='text-[#00d6f0]'>Enquiry</span> Here</h1>
      </div>
      <div className='w-full flex p-4 flex-wrap md:flex-nowrap lg:flex-nowrap  '>
        <div className='w-full md:w-[50%] lg:w-[50%] '>
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-12'>

              <div className='flex flex-col gap-1'>
                <label>Loan type</label>
                <input type='text' required name='loanType' value={loanInput.loanType} onChange={HandleChange} placeholder='Enter loan type' className='border-0 border-b-2 border-[#CAF0F8] rounded hover:border-b-[#00B4D8] hover:text-[#00d6f0]  focus:outline-none focus:border-b-[#00d6f0]' ></input>
              </div>

              <div className='flex flex-col gap-1'>
                <label>Loan Amount</label>
                <input type='number' required name='loanAmount' value={loanInput.loanAmount} onChange={HandleChange} placeholder='Enter loan Amount' className='border-0 border-b-2 border-[#CAF0F8] rounded hover:border-b-[#00B4D8] hover:text-[#00d6f0] focus:outline-none focus:border-b-[#00d6f0]' ></input>
              </div>

              <div className='flex flex-col gap-1'>
                <label>Rate of Interest </label>
                <input type='number' required name='interst' value={loanInput.interst} onChange={HandleChange} placeholder='rate of interest' className='border-0 border-b-2 border-[#CAF0F8] rounded hover:border-b-[#00B4D8] hover:text-[#00d6f0]  focus:outline-none focus:border-b-[##00d6f0]'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <label>Loan Year </label>
                <input type='number' required name='year' value={loanInput.year} onChange={HandleChange} placeholder='Start Loan' className='border-0 border-b-2 border-[#CAF0F8] rounded hover:border-b-[#00B4D8] hover:text-[#00d6f0]  focus:outline-none focus:border-b-[#00d6f0]' ></input>
              </div>

              <div className='flex flex-col gap-1'>
                <label>Loan Start year</label>
                <input type='date' required max={new Date().toISOString().split("T")[0]}
                  name='sdate' value={loanInput.sdate} onChange={HandleChange} placeholder='End Loan' className='border-0 border-b-2 border-[#CAF0F8] rounded hover:border-b-[#00B4D8] hover:text-[#00d6f0]  focus:outline-none focus:border-b-[#00d6f0]' ></input>
              </div>
              <div className="flex justify-center my-8">

                <button className="py-2 px-8 text-xl border rounded-2xl relative  overflow-hidden border-[#00d6f0]"
                  onMouseEnter={mouseEnder}
                  onMouseLeave={onMouseLeave}
                  type="sumbit"
                >
                  <span className="relative z-1">Submit</span>

                  <span
                    ref={animat}
                    className="absolute  bottom-0 bg-cyan-400 left-0 w-full h-0 z-0 transition-all duration-300 " > </span>
                </button>

              </div>
            </form>
          </div>


        </div>
        <div className='w-full md:w-[50%] lg:w-[50%] text-[14px] md:text-[18px] lg:text-[21px] font-sans'>
          <div c>
            <h1 className='text-2xl my-4' >loan Summary</h1>
            <div>
              <p className='flex justify-between py-1 px-4'>Loan Type <span>{finalloan.type}</span></p>
              <p className='flex justify-between py-1 px-4'>Loan Amount <span>₹{finalloan.amount}</span></p>
              <p className='flex justify-between py-1 px-4'>Total Return <span>₹{finalloan.totalReturn}</span></p>
              <p className='flex justify-between py-1 px-4'>Rate <span>{finalloan.rate}%</span></p>
              <p className='flex justify-between py-1 px-4'>Total Interst <span>₹{finalloan.ratetotal}</span></p>
              <p className='flex justify-between py-1 px-4'>Start Date <span>{finalloan.date}</span></p>
              <p className='flex justify-between py-1 px-4'>End Date <span>{finalloan.endLoan}</span></p>
              <p className='flex justify-between py-1 px-4'>Month <span>{finalloan.tmonth}</span></p>
              <p className='flex justify-between py-1 px-4'>Tenure <span>{finalloan.tenure}Year</span></p>

            </div>
          </div>


        </div>
      </div>


      <div className='overflow-x-auto w-full mb-8'>
        <table className='w-full table-auto'>
          <thead>
            <th>Loan Type</th>
            <th>Loan Amount</th>
            <th>Total Return</th>
            <th>Rate</th>
            <th>Total Interst</th>
            <th>Month Emi</th>
            <th>Month</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Tenure</th>
          </thead>
          <tbody>
            {loan.map((i, index) => (
              <tr key={index}>
                <td className="py-2 text-center">{i.type}</td>
                <td className="py-2 text-center">{i.amount}</td>
                <td className="py-2 text-center">{i.totalReturn}</td>
                <td className="py-2 text-center">{i.rate}</td>
                <td className="py-2 text-center">{i.ratetotal.toFixed(2)}</td>
                <td className="py-2 text-center"> {i.emi ? i.emi.toFixed(2) : "0.00"} </td>
                <td className="py-2 text-center">{i.tmonth}</td>
                <td className="py-2 text-center">{i.date}</td>
                <td className="py-2 text-center">{i.endLoan}</td>
                <td className="py-2 text-center">{i.tenure}</td>




              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </>
  )
}

export default LoanEnquiry