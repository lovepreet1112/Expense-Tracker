import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IncomeContext } from "../context/context";
import Sendmony from "./sendmony";



function AddEntery() {
  const { userID, listbank, setlistbank, showpop, setshowpop, setsendmid, changeState, setchangestate } = useContext(IncomeContext)

  const animat = useRef(null);

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

  const [banklist, setbanklist] = useState({
    bankName: "",
    accountNo: "",
    holder: "",
    ifcode: "",
    userID: userID
  })
  function handlechange(e) {
    setbanklist({
      ...banklist,
      [e.target.name]: e.target.value

    })

  }




  function handlesumit(e) {
    e.preventDefault()



    fetch("http://localhost:4000/bankList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(banklist)
    })


    setlistbank([...listbank, banklist])


    setbanklist({
      bankName: "",
      accountNo: "",
      holder: "",
      ifcode: "",

    })
    setchangestate(changeState + 1)



  }


  useEffect(() => {

  }, [listbank])








  return (
    <>
      <div className="mt-16 p-1.5 md:p-4 lg:p-4">
        <h1 className="align-center text-2xl md:text-3xl lg:text-4xl my-8 ">Send Money Easily to<span className="text-[#00d6f0]">Bank</span> </h1>
        <div className="  flex flex-wrap md:flex-nowrap lg:flex-nowrap">
          <div className="w-full md:w-[50%] lg:w-[50%]">
            <form className="px-4" onSubmit={handlesumit}>
              <div className="flex flex-col gap-3 mb-4">
                <label>Name</label>
                <input type="name" name="holder" required value={banklist.holder} onChange={handlechange} className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <label>Acount No</label>
                <input type="text" name="accountNo" required value={banklist.accountNo} onChange={handlechange} className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <label>IFC Code </label>
                <input type="text" name="ifcode" required value={banklist.ifcode} onChange={handlechange} className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
              </div>
              <div className="flex flex-col gap-3 mb-4">
                <label>Bank Name</label>
                <input type="text" name="bankName" required value={banklist.bankName} onChange={handlechange} className="border-b-2 px-2 rounded-2xl focus:outline-0 focus:border-b-2 focus:border-b-cyan-200" />
              </div>


              <div className="flex justify-center mt-8">

                <button className="py-2 px-8 text-xl border rounded-2xl relative  overflow-hidden border-[#00d6f0]"
                  onMouseEnter={mouseEnder}
                  onMouseLeave={onMouseLeave}
                  type="sumbit"
                >
                  <span className="relative z-1">Add Bank</span>

                  <span
                    ref={animat}
                    className="absolute  bottom-0 bg-cyan-400 left-0 w-full h-0 z-0 transition-all duration-300 " > </span>
                </button>

              </div>

            </form>

          </div>



          <div className="w-full md:w-[50%] lg:w-[50%]  flex flex-col gap-4 px-4">
            {
              listbank.map((i, index) => (
                <div key={index} className="w-50%  bg-white rounded-2xl border  text-black p-2 px-4 h-fit flex justify-between align-center">
                  <div>
                    <h2 className="text-[17px] capitalize"> {i.holder}</h2>
                    <p className="text-[15px] text-[rgb(144,145,144)]">{i.accountNo}</p>
                    <p className="text-[15px]  text-[rgb(144,145,144)] uppercase">{i.bankName}</p>
                  </div>

                  <div className="flex align-center "><button className="capitalize" onClick={() => { setshowpop(true), setsendmid(i.id) }} >send money</button></div>
                </div>

              ))
            }







          </div>



        </div>


        {showpop ? <Sendmony /> : null}









      </div>
    </>
  )
}

export default AddEntery;
