import MainLayout from "../layouts/mainlayout"
import Card from "../components/card"
import {FaEthereum} from "react-icons/fa"
import {useState,useEffect} from "react"
import {VscArrowSmallRight} from "react-icons/vsc"
import {scaapRewardContract, scaapContract} from "../web3utils/web3contractinstances"
const Wallet=()=>{
    const [Transactions,setTransactions]=useState([1,2,3])
    const [balance,setBalance]=useState(null)
    useEffect(()=>{
       const fetchBalance=async()=>{
            const res= await scaapRewardContract.methods.getReward("0x86A73E5fD9f797bb6D5985eBBbFBFDF667075Ba3").call(
                {from:"0xFac9478614ceEA5fEA43EA92f3273b82fb4cE85D"}
            )

        setBalance(res)
       }
       fetchBalance()
    },[])
   
    const ClaimReward=async()=>{
         const res=await scaapRewardContract.methods.claimReward("0x86A73E5fD9f797bb6D5985eBBbFBFDF667075Ba3","0xFac9478614ceEA5fEA43EA92f3273b82fb4cE85D").send({
            from:"0xFac9478614ceEA5fEA43EA92f3273b82fb4cE85D"
         })
         console.log(res)
    }
    return(
      <MainLayout>
          <h1>My wallets</h1>
          <div className="flex flex-row">
          <div className="flex flex-col w-2/3 space-y-6">
           
               <div className="flex flex-row justify-around  space-x-4 ">
               
                   <Card cname="bg-green-300 rounded-sm px-4 py-3 w-2/5 h-16 space-y-2">
                      <div className="flex flex-row w-full items-center justify-between">
                        <span className="text-xs text-slate-600 font-bold">ETH</span>
                        <span className="bg-slate-700 opacity-40 px-1 py-1 relative"><FaEthereum className="text-sm text-white "/> </span>
                     </div>
                      <div className="flex flex-row w-full items-center justify-between">
                          <span className="text-xs text-slate-200 font-light" >Ethereum</span>
                         <span className="text-xs text-slate-200 font-light">0.00</span>
                      </div>

                   </Card>
             
                   <Card cname="bg-green-300 rounded-sm px-3 py-3 w-1/3 h-16 space-y-2">
                      <div className="flex flex-row w-full items-center justify-between">
                         <span className="text-xs text-slate-600 font-bold">MATIC</span>
                         <span className="bg-slate-700 opacity-40 px-1 py-1 relative"><FaEthereum className="text-sm text-white "/> </span>
                     </div>
                     <div className="flex flex-row w-full items-center justify-between">
                         <span className="text-xs text-slate-200 font-light" >Polygon</span>
                         <span className="text-xs text-slate-200 font-light">0.00</span>
                      </div>
           
                   </Card>
            
                 <Card cname="bg-green-300 rounded-sm px-3 py-3 w-1/3 h-16 space-y-2">
                    <div className="flex flex-row w-full items-center justify-between">
                        <span className="text-xs text-slate-600 font-bold">SCAAP</span>
                        <span className="bg-slate-700 opacity-40 px-1 py-1 relative"><FaEthereum className="text-sm text-white "/> </span>
                   </div>
                    <div className="flex flex-row w-full ">
                       <span className="text-xs text-slate-200 font-light" >Scapula </span>
                     
                     </div>

             </Card>

            </div>
               <div className="flex flex-row items-center space-x-2">
                   <Card cname="bg-slate-800 w-1/2 px-2 py-3 rounded-lg shadow h-24">
                      <div className=" flex flex-row items-center justify-between">
                         <span className="font-size text-slate-200">SCAAP</span>
                          <h1 className="flex flex-row items-center space-x-2">
                            <span className="font-size text-slate-200">Balance:</span>
                            <span className="bg-slate-500 opacity-20 px-2 text-white font-size">{balance}</span>
                          </h1>
                          </div>
                           <div className="w-full flex justify-center mt-4">
                              <button className="rounded-full font-size font-light text-white border-white border px-2 py-0.5 hover:bg-slate-300" onClick={ClaimReward}>Claim Reward</button>
                           </div>
                        

                   </Card>
                   <Card cname="bg-slate-800 rounded-lg shadow w-1/2 px-2 py-3 h-24">
                        <div className="flex flex-row space-x-2">
                            <h1 className="flex flex-row font-size text-white">
                                Wallets:<select name="token" className="bg-slate-500 inline opacity-20 px-1 font-size text-white outline-none">
                                <option value="scaap">SCAAP</option>
                                <option value="matic">MATIC</option>
                                <option value="eth">ETH</option>
                                
                                </select>
                            </h1>
                            <h1 className="font-size text-white">
                                Amount:<input placeholder="0.00" className="bg-slate-500 inline w-7 outline-none opacity-20 px-1 font-size text-white" />
                            </h1>
                        </div>
                        <div className="flex flex-row w-full mt-2">
                          <span className="font-size w-1/4 text-white">Send To</span>
                          <input placeholder="0xfbacxvb..." className="bg-slate-500 text-white opacity-20 w-3/4 rounded-md h-4 py-1 px-2 text-xs outline-none"/>

                        </div>
                        <div className="flex w-full justify-end">
                            <button className="font-size border rounded-full px-2 py-0.5 mt-2 text-white">Send</button>
                        </div>
                   </Card>
               </div>
          
          </div>
            <div className="w-1/3 px-3">
                <Card cname="bg-slate-800 px-3">
                    <div className="flex flex-row justify-between items-center">
                      <span className="font-size text-white font-medium ">Transactions</span>
                      <h1 className="w-3/4 px-3 flex space-x-2">
                      <span className="font-size text-white font-medium ">All</span>
                      <span className="font-size text-white font-medium ">Claims</span>
                      <span className="font-size text-white font-medium">Send</span>
                      </h1>
                     </div>

                     <div className="mt-3">
                        {
                            Transactions.map(()=>{
                                return(
                                 <Card cname="px-2 py-1 mb-3 bg-slate-400 border w-full rounded-sm shadow">
                                    <h1 className="flex flex-row items-center">
                                        <span className="font-size text-white">dd/mm/yy</span>
                                        <span className="font-size text-white flex items-center"><VscArrowSmallRight className="text-green-400 text-xs"/> 0.00 SCAAP</span>
                                        </h1>

                                 </Card>
                                )
                            })

                        }

                     </div>
                   
                </Card>
            </div>
          </div>
      </MainLayout>
    )
}

export default Wallet