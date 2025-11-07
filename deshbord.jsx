import { useContext, useState } from "react";
import { FaUnlock } from "react-icons/fa";
import CanvasJSReact from '@canvasjs/react-charts';
import { TbBackground } from "react-icons/tb";
import { IncomeContext } from "../context/context";
import { SiToptal } from "react-icons/si";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DeshBord() {
  const { incomeData, setincomeData, ex, setEx, loan, userID, setAvailableBalance, availableBalance, fixdeposit, } = useContext(IncomeContext)

  const [formIncome, setFromincome] = useState("")
  const [formdate, setfromdate] = useState("")
  const [expenses, setExpenses] = useState({
    type: '', y: '', date: ''
  })
  const [type, setType] = useState("income")
  const rowColors = ["bg-[#6594AB]", "bg-[#00b368]", "bg-[#D7928B]"];

  // useEffect(() => {
  const totalExpense = ex.reduce((acc, curr) => acc + Number(curr.y), 0);
  const totalIncome = incomeData.reduce((i, item) => i + Number(item.formIncome), 0) + Number(formIncome)
  const loanmony = loan.reduce((i, item) => i + Number(item.amount), 0)
  const netIncome = totalIncome - totalExpense;
  const Balance = netIncome + loanmony;
  setAvailableBalance(Balance);
  // }, [ex, incomeData, loan])







  const handleSumit = (e) => {
    e.preventDefault();

    if (type === "income") {





      fetch("http://localhost:4000/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formIncome, userID: userID, lebel: type, date: formdate })
      })
      setFromincome("")
      setincomeData([...incomeData, { formIncome, userID, lebel: type, date: formdate }])
      setfromdate("")




    } else {



      if (Balance <= expenses.y) {
        alert("pls add the balance")
      } else {
        fetch("http://localhost:4000/expness", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...expenses, userID: userID, type: type })
        })

        setEx([...ex, expenses])
        setExpenses({
          label: '', y: '', date: ''
        })
      }
    }


  }



  const chartData = ex.map(item => ({
    label: item.label || "Unknown",
    y: Number(item.y) || 0
  }));

  // Total income ko calculate kar ke add kar do
  const totalIncomeValue = incomeData.reduce((sum, item) => sum + Number(item.formIncome || 0), 0);

  chartData.push({
    label: 'Total Income',
    y: totalIncomeValue,
    color: '#00BFFF'
  });
  const options = {
    backgroundColor: "#eaf3f3",
    animationEnabled: true,
    title: {
      text: "💸 Expense Breakdown",
      fontColor: "black"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: ₹{y}",
      indexLabelFontColor: "black",
      dataPoints: chartData
    }],
    responsive: true
  };



  return (
    <>
      <div className="w-full mt-16 p-4">
        <h1 className="align-center text-[25px] sm:text-2xl md:text-3xl lg:text-4xl my-8">🎯 Set Your Monthly <span className="text-[#00d6f0]">Budget</span> Target</h1>
        <div className="flex flex-wrap sm:flex-wrap  md:flex-nowrap ">
          <div className="w-full px-4 sm:px-0   lg:w-[40%] md:w-[40%]">
            <form onSubmit={handleSumit}>
              <div className="mb-4">
                <label>choice cetegary</label><br />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                >
                  <option value="expense" className="bg-black text-white">Expense</option>
                  <option value="income" className="bg-black text-white">Income</option>
                </select>
              </div>





              {type === "income" ?
                (
                  <>
                    <label>Enter the Monthly incom</label><br />
                    <input type="number" name="incom" required value={formIncome} onChange={(e) => setFromincome(e.target.value)}
                      className=" w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                    />
                    <div>
                      <label>Date</label><br />
                      <input
                        type="date"
                        value={formdate} required onChange={(e) => setfromdate(e.target.value)}

                        className=" w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                      />
                    </div>

                  </>

                ) :
                (
                  <>

                    <div>
                      <label> Expoeness</label><br />
                      <input type="text"
                        name="lebel"
                        value={expenses.label} required onChange={(e) => setExpenses({ ...expenses, label: e.target.value })}
                        className=" w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                      />
                    </div>
                    <div>
                      <label> Add Expenss</label><br />
                      <input
                        type="number" name="y"
                        value={expenses.y} required onChange={(e) => setExpenses({ ...expenses, y: e.target.value })}
                        className=" w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                      />
                    </div>

                    <div>
                      <label>Date</label><br />
                      <input
                        type="date"
                        value={expenses.date} required onChange={(e) => setExpenses({ ...expenses, date: e.target.value })}

                        className=" w-full p-2 border-0 border-b border-b-[#00d6f0] rounded-b-md focus:outline-none bg-transparent text-black"
                      />
                    </div>

                  </>


                )
              }
              <br />
              <button type="submit" className=" my-4 text-black font-[600]  border-2 rounded-2xl py-2 bg-[#00d6f0] px-4 hover:border-[#00d6f0] hover:border-2 hover:bg-black transition-all duration-300 active:scale-105 hover:text-[#00d6f0]"> Submit</button>
            </form>
          </div>

          <div className="w-full md:w-[60%] lg:w-[60%]">
            <CanvasJSChart options={options} />


          </div>



        </div>

        <div className="w-full 
      py-2
      justify-evenly 
      flex-wrap 
       md:p-4 lg:p-4 
       gap-4
       flex
       bg-[#eaf3f3]
      ">

          {/* {incomeData.map((i, index) => ( */}
          <div className="w-fit p-4 border rounded-2xl bg-[#6594AB]">
            <h1 className="text-center text-2xl">Total Income </h1>
            <h1 className="text-center text-2xl">₹ {totalIncome}</h1>

          </div>
          {/* ))} */}

          {/* {incomeData.map((i, index) => ( */}
          <div className="w-fit p-4 border rounded-2xl bg-[#00b368]">
            <h1 className="text-center text-2xl">Total Balance </h1>
            <h1 className="text-center text-2xl">₹ {availableBalance}</h1>

          </div>
          {/* ))} */}


          <div className="w-fit p-4 border rounded-2xl bg-[#D7928B]">
            <h1 className="text-center text-2xl">Total Expeness</h1>
            <h1 className="text-center text-2xl">₹ {totalExpense} </h1>
          </div>






        </div>

        <div className="overflow-x-auto p-4">
          <h1 className="text-2xl my-4">History Of Payment </h1>
          <table className="min-w-full table-fixed text-black">
            <thead className="bg-[#C9D7EA] text-left ">
              <tr >
                <th className="p-2">Expeness</th>
                <th>date</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody className=" text-[12px] md:text-[15px] lg:text-[19px]  font-[600]">
              {ex.map((i, index) => (
                <tr key={index} className={`${rowColors[index % rowColors.length]} transition duration-300`}>
                  <td className="p-2" >{i.label}</td>
                  <td>{i.date}</td>
                  <td className="text-[#ee341f]">-₹{i.y}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>



        <div className='my-8 p-4 w-full'>
          <div className="mb-4 ">
            <h1 className="text-2xl">Fixdeposite Reports</h1>
          </div>



          <div className="overflow-x-auto w-full">
            <table className='w-full  border-spacing-2 border-spacing-x-4 text-black'>
              <tr className="text-left py-4 bg-[#6594AB] transition duration-300 ">
                <th className='py-2 px-2'>Amount</th>
                <th className='py-2 px-2'>Total Interest</th>
                <th className='py-2 px-2'>total Return</th>
                <th className='py-2 px-2'>Rate</th>
                <th className='py-2 px-2'>Tenure</th>
                <th className='py-2 px-2'>start Date</th>
                <th className='py-2 px-2'>Unloack Date</th>

              </tr>
              <tbody className="text-[12px] md:text-[15px] lg:text-[19px] font-[600]">
                {fixdeposit.map((i, index) => (
                  <tr key={index} className={`${rowColors[index % rowColors.length]} transition duration-300 text-base font-semibold`}>
                    <td className='p-2'>{i.amount}</td>
                    <td className='p-2'>{i.totalInterst}</td>
                    <td className='p-2'>{i.finalReturn}</td>
                    <td className='p-2'>{i.rate}</td>
                    <td className='p-2'>{i.year}</td>
                    <td className='p-2'>{i.startdate}</td>
                    <td className='p-2 flex gap-2 items-center'><FaUnlock /> {i.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </>
  )
}

export default DeshBord;
