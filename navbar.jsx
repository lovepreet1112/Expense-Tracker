import { IoHomeSharp } from "react-icons/io5";
import { PiBankDuotone } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPiggyBank } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BsBank2 } from "react-icons/bs";
import { IncomeContext } from "../context/context";
import { IoMenu } from "react-icons/io5";
import { gsap } from "gsap";
import { useContext, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";




function NavBar() {
  const { setuserID } = useContext(IncomeContext)
  const [show, setshow] = useState(true)
  const ulRef = useRef(null)



  function handleMenu() {
    gsap.to(ulRef.current, {
      top: 60,
      duration: 0.8,
      ease: "power3.out",

    })
    setshow(false)
  }

  function handleMenuclose() {
    gsap.to(ulRef.current, {
      top: -360,
      duration: 0.8,
      ease: "power3.out",

    })
    setshow(true)
  }

  return (
    <>

      <div className="fixed top-0 left-0 right-0 z-10 w-full bg-[#2a8f9e] p-4 flex justify-between lg:px-8">
        <img src="/src/assets/logo.png " className="w-[150px] lg:w-[200px] relative" />

        <p className="flex justify-center items-center text-4xl lg:hidden relative cursor-pointer" >
          {show ? <IoMenu onClick={handleMenu} /> : <MdOutlineClose onClick={handleMenuclose} />

          }



        </p>

        <ul ref={ulRef} className=" absolute top-[-306px] text-white left-0 lg:static flex gap-4 pt-4 pl-4 flex-col w-full bg-[#2a8f9e] lg:bg-transparent   lg:gap-8 lg:flex-row lg:justify-end lg:items-center ">

          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group" ><span className="absolute left-0 bottom-0 h-0.5 bg-[rgb(0,214,240)] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" to="/" >Dash Bord</Link></li>
          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group"><span className="absolute left-0 bottom-0 h-0.5 bg-[#00d6f0] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" to="/netbanking" >Add Bank</Link></li>
          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group"><span className="absolute left-0 bottom-0 h-0.5 bg-[#00d6f0] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" to="/loan/Enquiry" > Loan Enquiry</Link></li>
          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group"><span className="absolute left-0 bottom-0 h-0.5 bg-[#00d6f0] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" to="/reports" >Reports</Link></li>
          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group"><span className="absolute left-0 bottom-0 h-0.5 bg-[#00d6f0] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" to="fixed/deposit" >Fixed Deposit</Link></li>
          <li onClick={handleMenuclose} className="cursor-pointer relative pb-2 group"><span className="absolute left-0 bottom-0 h-0.5 bg-[#00d6f0] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span><Link className="flex gap-4 text-xl" onClick={() => { setuserID(null); localStorage.removeItem("gmail"); }} >Log Out</Link></li>

        </ul>
      </div>



    </>
  )
}

export default NavBar
