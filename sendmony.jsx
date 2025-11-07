import React, { useContext, useEffect, useState } from 'react'
import { IncomeContext } from '../context/context'
import { MdCancel } from "react-icons/md";


function Sendmony() {
  const { sendmid, expenses, setshowpop, userID, availableBalance, ex, setEx, incomeData, setincomeData } = useContext(IncomeContext)
  const [userData, setUserData] = useState([])
  const [sendmony, setsendmony] = useState()



  useEffect(() => {


    fetch("http://localhost:4000/bankList")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(i => i.id === sendmid)
        console.log("id base se data churay ha ", userData)
        setUserData(userData)

      })
      .catch(error => {
        console.log("Error:", error);
      });

  }, [sendmid])


  function handlesendmoney() {
    console.log("balnce ha ya ", availableBalance)
    if (availableBalance < sendmony) {
      alert("you don't have belence");



    } else {

      const newex = {
        label: 'send money',
        y: sendmony,
        date: new Date().toLocaleDateString()

      }


      fetch("http://localhost:4000/expness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...expenses, ...newex, userID: userID, })
      })

      setEx([...ex, newex])
      setshowpop(false)

      // Update total income by subtracting the sent amount
      const updatedIncomeData = incomeData.map(item => ({
        ...item,
        formIncome: Number(item.formIncome) - Number(sendmony)
      }));
      setincomeData(updatedIncomeData);




    }

  }


  return (<>


    <div className='w-screen h-screen bg-black/50 fixed inset-0 flex justify-center items-center z-41 '>

      <div className='bg-white rounded-2xl text-black '>
        <div className='flex justify-end p-4'><MdCancel onClick={() => setshowpop(false)} /></div>
        <div>
          {userData.map((i, index) => (
            <table key={index} className='border-separate border-spacing-x-6 border-spacing-y-3 w-full'>
              <tr>
                <td>Name</td>
                <td>{i.holder}</td>

              </tr>
              <tr>
                <td>Account no</td>
                <td>{i.accountNo}</td>

              </tr>
              <tr>
                <td>Bank Name</td>
                <td>{i.bankName}</td>

              </tr>
              <tr>
                <td>IFCE Code</td>
                <td>{i.ifcode}</td>

              </tr>

              <tr>
                <td> Send Mony</td>
                <td><input type='number' required name="sendmony" value={sendmony} onChange={(e) => setsendmony(e.target.value)} placeholder='Enter Amount' /></td>

              </tr>
              <tr>
                <td></td>

                <td colSpan={2}><button onClick={handlesendmoney}>Send</button></td>


              </tr>

            </table>

          ))}


        </div>

      </div>

    </div>
  </>
  )
}

export default Sendmony