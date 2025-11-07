import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { IncomeContext } from "../context/context";



function LoginPage() {
    const { setuserID, } = useContext(IncomeContext)

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

    const [login, setlogin] = useState({
        email: "",
        password: "",


    })
    const [user, setuser] = useState([])


    useEffect(() => {
        fetch("http://localhost:4000/users")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setuser(data)

            })
    }, [])


    function handlelogin(e) {
        e.preventDefault();

        const userfind = user.find((i) => i.gMail === login.email && i.password === login.password)

        if (userfind) {
            console.log("userlogin ", userfind.id);

            setuserID(userfind.id)
            localStorage.setItem("gmail", login.email)
        } else {
            alert("Enter a valid email and password")
        }




    }







    return (
        <>
            <div className="flex w-full  justify-center items-center text-black">
                <div className="w-fit bg-transparent text-black p-8 border rounded-2xl border-[#00d6f0] ">
                    <h1 className="text-4xl mb-5">Welcome <span className="text-2xl text-[#00d6f0]">Back</span></h1>
                    <form onSubmit={handlelogin}  >
                        <div className="flex flex-col gap-1.5">
                            <label>Email</label>

                            <input type="text" name='email' value={login.email} onChange={(e) => setlogin({ ...login, [e.target.name]: e.target.value })} placeholder="johan@gmial.com" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none focus:border-red  " />
                        </div >
                        <div className="flex flex-col gap-1.5 mt-4">
                            <label>Password</label>
                            <input type="password" name="password" value={login.password} onChange={(e) => setlogin({ ...login, [e.target.name]: e.target.value })} placeholder="******" className="p-1 pl-2 border-0  border-b-1 rounded-2xl border-[#00d6f0] focus:outline-none" />
                        </div>
                        <div className="flex justify-center mt-8">

                            <button className="py-2 px-8 text-xl border rounded-2xl relative  overflow-hidden border-[#00d6f0]"
                                onMouseEnter={mouseEnder}
                                onMouseLeave={onMouseLeave}
                                type="sumbit"
                            >
                                <span className="relative z-1">Login</span>

                                <span
                                    ref={animat}
                                    className="absolute  bottom-0 bg-cyan-400 left-0 w-full h-0 z-0 transition-all duration-300 " > </span>
                            </button>

                        </div>



                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginPage;