
import './App.css'
import LoginPage from './componets/loginpage'
import NavBar from './componets/navbar'
import SignUp from './componets/signup'
import { useEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import DeshBord from './componets/deshbord';
import AddEntery from './componets/addEntery';
import { IncomeContext } from './context/context.jsx';
import LoanEnquiry from './componets/loanEnquiry.jsx';
import Reports from './componets/reports.jsx';
import Fixeddeposit from './componets/fixeddeposit.jsx';


function App() {
  const [changeState, setchangestate] = useState()
  const [userID, setuserID] = useState()
  const [incomeData, setincomeData] = useState([]);
  const [sendmid, setsendmid] = useState()
  const [loan, setloan] = useState([])
  const [listbank, setlistbank] = useState([])
  const [t, setT] = useState(1)
  const [showpop, setshowpop] = useState(false)
  const [availableBalance, setAvailableBalance] = useState();
  const [fixdeposit, setFixdeposit] = useState([])



  const [ex, setEx] = useState([])


  useEffect(() => {

    const s = localStorage.getItem("gmail")


    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => {
        const u = data.find((i) => i.gMail == s)
        console.log("api", u.id);

        setuserID(u.id)


      })
      .catch(error => {
        console.log("Error:", error);
      });








  }, [])


  useEffect(() => {
    if (!userID) return;

    fetch("http://localhost:4000/income")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.userID === userID)
        console.log("id base se data churay ha ", userData)
        setincomeData(userData);
      })
      .catch(error => {
        console.log("Error:", error);
      });




    fetch("http://localhost:4000/expness")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.userID === userID)
        setEx(userData);
      })
      .catch(error => {
        console.log("Error:", error);
      });



    fetch("http://localhost:4000/loan")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.userID === userID)
        setloan(userData)
      })
      .catch(error => {
        console.log("Error:", error);
      });


    fetch("http://localhost:4000/bankList")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.userID === userID)
        console.log("id base se data churay ha ", userData)
        setlistbank(userData);
      })
      .catch(error => {
        console.log("Error:", error);
      });

    fetch("http://localhost:4000/FD")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.userID === userID)

        setFixdeposit(userData);
      })
      .catch(error => {
        console.log("Error:", error);
      });



  }, [userID, changeState])



  return (
    <>
      <IncomeContext.Provider value={{ fixdeposit, setFixdeposit, changeState, setchangestate, availableBalance, setAvailableBalance, sendmid, setsendmid, showpop, setshowpop, incomeData, t, listbank, setlistbank, setincomeData, ex, setEx, loan, setloan, setT, userID, setuserID }}>


        {userID ?
          (
            <div className=' flex justify-center flex-col bg-[#eaf3f3] text-black '>

              <NavBar />
              <Routes>
                <Route path="/" element={<DeshBord />} />
                <Route path="/loan/Enquiry" element={<LoanEnquiry />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/netbanking" element={<AddEntery />} />
                <Route path="/fixed/deposit" element={<Fixeddeposit />} />
                <Route path="/settings" element={<h1>Settings Page</h1>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />

              </Routes>


            </div>
          ) : (
            <div className=' flex justify-center flex-col bg-[#eaf3f3] text-black  h-screen'>




              <SignUp />








            </div>
          )

        }









      </IncomeContext.Provider >
    </>
  )
}

export default App
