import {useState} from "react"
import Card from "../card"
import { PaystackButton } from 'react-paystack'

const PaystackGateway=()=>{
    const [email, setEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [amount,setAmount]=useState(null)
     const publicKey ="pk_test_bda5595e8bfa843cdbe8e905444cdacdc4a4b4fe"
     const componentProps = {
        email,
        amount,
        metadata: {
          fullname,
          phone,
        },
        publicKey,
        text: "Pay with Paystack",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }

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
                     className="outline-none text-xs inline rounded-sm bg-slate-300 px-1 py-1"
                     />
                </div>
                <div className='w-2/5'>
                    <label className=' text-xs'>Email:</label>
                    <input 
                     type="text"
                     name="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     className="outline-none text-xs inline rounded-sm bg-slate-300 px-1 py-1"/>
                     
                </div>

            </Card>

            <Card cname="flex flex-row space-x-8 items-center">
                <div className="w-2/5">
                   <label className=' text-xs'>Phone number:</label>
                   <input 
                     type="text"
                     name="fullname"
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}
                     className="outline-none inline text-xs rounded-sm bg-slate-300 px-1 py-1"
                     />
                    
                </div>
                <div className='w-2/5'>
                   <label className=' text-xs'>Amount:</label>
                   <br></br>
                    <input 
                     type="text"
                     name="amount"
                     value={amount}
                     onChange={(e)=>setAmount(e.target.value)}
                     className="outline-none text-xs inline rounded-sm  bg-slate-300 px-1 py-1 ml-1 w-24 h-5"/>
                 </div>
            </Card>
              <div className="flex justify-center py-3">
                  <PaystackButton {...componentProps}  className="hover:bg-slate-600 rounded-lg bg-slate-500 text-white text-sm px-2" />
              </div>
            </div>
    )
}

export default PaystackGateway