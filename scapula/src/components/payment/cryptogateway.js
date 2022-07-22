import { useLazerpay } from 'lazerpay-react'
import Card from "../card"
import { useState } from "react"
const CryptoPayment=()=>{
   
    const PUBLIC_KEY="pk_test_ut23yYinJUDoORpSk2z0kIMMWOU3AmZreWQjTNnP9NhvP4PKTH"
   const [fullname,setFullname]=useState("")
   const [email,setEmail]=useState("")
   const [amount,setAmount]=useState(null)
   const [currency,setCurrency]=useState("NGN")

     const  config = {
    publicKey: "pk_test_ut23yYinJUDoORpSk2z0kIMMWOU3AmZreWQjTNnP9NhvP4PKTH",
    customerName:fullname,
    customerEmail: email,
    currency: currency, // USD, NGN, AED, GBP, EUR
    amount: amount, // amount as a number or string
    //reference: 'XUASO90120', // unique identifier
    acceptPartialPayment: false,
    onSuccess: (response) => {
       console.log(response,"success,>>>")
    },
    onClose: () => {
      //handle response here
    },
    onError: (response) => {
      // handle responsne here
      console.log(response,"err>>")
    }
  }
  
  const initializePayment = useLazerpay(config)
    return(
        <div className='w-full px-3 py-3 mt-5 flex flex-col justify-center space-y-3'>
            <Card cname="flex flex-row space-x-8">
                <div className='w-2/5'>
                    <label className=' text-xs'>Full Name:</label>
                    <input 
                     type="text"
                     name="fullname"
                     value={fullname}
                     onChange={(e)=>setFullname(e.target.value)}
                     className="outline-none inline rounded-sm bg-slate-300 px-1"
                     />
                </div>
                <div className='w-2/5'>
                    <label className=' text-xs'>Email:</label>
                    <input 
                     type="text"
                     name="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     className="outline-none inline rounded-sm bg-slate-300 px-1"/>
                     
                </div>

            </Card>
            <Card cname="flex flex-row space-x-8">
                <div className="w-2/5">
                   <label className=' text-xs'>Currency:</label>
                   <select name="currency" className="bg-slate-300 inline  px-1 text-xs h-5 w-24 ml-1 outline-none">
                    <option value="NGN" onClick={(e)=>setCurrency(e.target.value)}>Naira</option>
                    <option value="USD" onClick={(e)=>setCurrency(e.target.value)}>US Dollars</option>
                    
                                
                    </select>

                 </div>
                <div className='w-2/5'>
                   <label className=' text-xs'>Amount:</label>
                    <input 
                     type="text"
                     name="amount"
                     value={amount}
                     onChange={(e)=>setAmount(e.target.value)}
                     className="outline-none inline rounded-sm bg-slate-300 px-1 ml-1 w-24 h-5"/>
                 </div>
            </Card>
              <div className="flex justify-center py-3">
                 <button className="hover:bg-slate-600 rounded-lg bg-slate-500 text-white text-sm px-2"  onClick={initializePayment}>Pay with Lazerpay</button>
              </div>
        </div>
         
       
    )
}

export default CryptoPayment