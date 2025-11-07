import React, { useContext, useEffect, useState } from 'react'
import { IncomeContext } from '../context/context'
import { IoMdCloudDownload } from "react-icons/io";


function Reports() {
  const { loan, ex, incomeData } = useContext(IncomeContext)
  const [showtype, setshowtype] = useState("expenss")
  const rowColors = ["bg-[#6594AB]", "bg-[#00b368]", "bg-[#D7928B]"];

  const history = [
    ...loan.map(i => ({ type: i.type, date: i.date, amount: i.amount })),
    ...incomeData.map(i => ({ type: i.lebel, date: i.date, amount: i.formIncome })),
    ...ex.map(i => ({ type: i.label, date: i.date, amount: i.y }))
  ]
  console.log("jud gay sara data", history)

  useEffect(() => {



  }, [showtype])


  const downloadCSV = () => {
    // Decide which data to export
    const dataToExport = showtype === "expenss" ? history : loan;

    // Map data to CSV rows
    const csvRows = [];

    // Headers
    const headers = showtype === "expenss"
      ? ["History", "Date", "Payment"]
      : ["Loan Type", "Loan Amount", "Total Return", "Rate", "Total Interest", "Month Emi", "Month", "Start Date", "End Date", "Tenure"];

    csvRows.push(headers.join(","));

    // Data
    dataToExport.forEach(item => {
      const values = showtype === "expenss"
        ? [item.type, item.date, item.amount]
        : [
          item.loantypee,
          item.amount,
          item.totalReturn,
          item.rate,
          item.ratetotal.toFixed(2),
          item.emi ? item.emi.toFixed(2) : "0.00",
          item.tmonth,
          item.date,
          item.endLoan,
          item.tenure
        ];
      csvRows.push(values.join(","));
    });

    // Create CSV string
    const csvString = csvRows.join("\n");

    // Create Blob & trigger download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `report_${showtype}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <>
      <div className='w-full mt-25 mb-4 flex justify-between px-16 '>
        <ul className='w-fit flex gap-16 text-2xl tracking-wide '>
          <li onClick={() => setshowtype("expenss")} className="cursor-pointer relative pb-2 group" ><span className="absolute left-0 bottom-0 h-0.5 bg-[rgb(0,214,240)] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span>Expeness</li>
          <li onClick={() => setshowtype("loan")} className="cursor-pointer relative pb-2 group" ><span className="absolute left-0 bottom-0 h-0.5 bg-[rgb(0,214,240)] transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span>Loan</li>
        </ul>
        <button onClick={downloadCSV} className='text-4xl'><IoMdCloudDownload /></button>
      </div>

      {
        showtype === "expenss" ? (
          <>
            <div className='p-4 overflow-y-auto'>
              <table className="min-w-full table-fixed text-black">
                <thead className="bg-[#C9D7EA] text-left ">
                  <tr >
                    <th className="p-2">History</th>
                    <th>date</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] md:text-[16px] lg:text-[19px] font-[600]">
                  {history.map((i, index) => (
                    <tr key={index} className={`${rowColors[index % rowColors.length]} transition duration-300`}>
                      <td className="p-2" >{i.type}</td>
                      <td>{i.date}</td>
                      <td className="text-[#ee341f]">-₹{i.amount}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </>

        ) : (
          <>
            <div className='p-4 overflow-y-auto'>
              <table className="min-w-full table-fixed text-black">
                <thead className="bg-[#C9D7EA] text-left ">
                  <tr >
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
                  </tr>
                </thead>
                <tbody className="text-[13px] md:text-[16px] lg:text-[19px] font-[600]">
                  {loan.map((i, index) => (
                    <tr key={index} className={`${rowColors[index % rowColors.length]} transition duration-300`}>
                      <td className="py-2 text-center">{i.type}</td>
                      <td className="py-2 text-center">{i.amount}</td>
                      <td className="py-2 text-center">{i.totalReturn}</td>
                      <td className="py-2 text-center">{i.rate}</td>
                      <td className="py-2 text-center">{i.ratetotal.toFixed(2)}</td>
                      <td className="py-2 text-center">{i.emi ? i.emi.toFixed(2) : "0.00"}</td>
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

    </>
  )
}

export default Reports