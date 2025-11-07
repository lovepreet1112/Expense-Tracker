import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IncomeContext } from "../context/context";
import LoginPage from "./loginpage";

function SignUp() {
    const [show, setshow] = useState("signup")
    //    const {  } = useContext(IncomeContext)


    const animat = useRef(null);

    const [signup, setSignup] = useState({
        firstName: "",
        lastName: "",
        gMail: "",
        password: "",
    })

    const mouseEnder = () => {
        console.log("museEnter")
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

    const handlesignup = (e) => {
        e.preventDefault()
        console.log("data", signup)



        fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signup)

        });



        setSignup({
            firstName: "",
            lastName: "",
            gMail: "",
            password: "",
        })

        localStorage.setItem("gmail", signup.gMail)

        setshow("login")


    }



    return (
        <>
            {show == "login" ? (<>
                <LoginPage />
            </>) :
                (
                    <>
                        <div className="flex w-full  justify-center items-center text-black">
                            <div className="w-fit bg-transparent text-black p-8 border rounded-2xl border-[#00d6f0] ">
                                <h1 className="text-4xl mb-5">Welcome <span className="text-2xl text-[#00d6f0]">Back</span></h1>
                                <form action="" >

                                    <div className="flex flex-col gap-1.5 mt-4">
                                        <label>First Name</label>
                                        <input type="text" name='firstName' value={signup.firstName || ""} onChange={(e) => setSignup({ ...signup, firstName: e.target.value })} placeholder="Enter the first name" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none focus:border-red  " />
                                    </div >

                                    <div className="flex flex-col gap-1.5 mt-4">
                                        <label>Last Name</label>
                                        <input type="text" name='lastName' value={signup.lastName || ""} onChange={(e) => setSignup({ ...signup, lastName: e.target.value })} placeholder="Enter the last name" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none focus:border-red  " />
                                    </div >

                                    <div className="flex flex-col gap-1.5 mt-4">
                                        <label>Email</label>
                                        <input type="mial" name='gMail' value={signup.gMail || ""} onChange={(e) => setSignup({ ...signup, gMail: e.target.value })} placeholder="johan@gmial.com" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none focus:border-red  " />
                                    </div >


                                    <div className="flex flex-col gap-1.5 mt-4">
                                        <label>Password</label>
                                        <input type="password" name="password" value={signup.password || ""} onChange={(e) => setSignup({ ...signup, password: e.target.value })} placeholder="******" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none" />
                                    </div>


                                    <div className="flex justify-center mt-8">

                                        <button className="py-2 px-8 text-xl border rounded-2xl relative  overflow-hidden border-[#00d6f0]"
                                            onMouseEnter={mouseEnder}
                                            onMouseLeave={onMouseLeave}
                                            onClick={handlesignup}
                                        >
                                            <span className="relative z-1">Sign up</span>




                                            <span
                                                ref={animat}
                                                className="absolute  bottom-0 bg-cyan-400 left-0 w-full h-0 z-0 transition-all duration-300 "> </span>
                                        </button>

                                    </div>
                                    <p className="mt-2 text-sm">You have already Accout <Link onClick={() => setshow("login")} className="cursor-pointer text-[#00d6f0]">Login</Link></p>



                                </form>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}
export default SignUp;