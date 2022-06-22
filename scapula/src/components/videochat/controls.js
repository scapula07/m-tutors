import React from 'react'
import {MdPhoneDisabled} from "react-icons/md"
import {MdPhoneEnabled} from "react-icons/md"
import "../../styles/util.css"
import {BsTelephoneInboundFill} from "react-icons/bs"

function Controls( { callAccepted,callEnded, leaveCall,answerCall,call,setTrigger }) {
  return (
    <div className='flex-center w-1/12'>
       <div className="border-3 bg-slate-500 w-10 h-10">
          <button onClick={()=>setTrigger(true)}><MdPhoneEnabled className="text-white text-3xl font-bold"/></button>
       </div>
       {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          
          <button className="bg-green-600  mt-6" onClick={answerCall}>
             <BsTelephoneInboundFill  className="text-white text-3xl font-bold"/>
          </button>
        </div>
      )}

       <div className="border-3 bg-slate-500 w-10 h-10 mt-6" >
          <button onClick={leaveCall}><MdPhoneDisabled  className="text-white text-3xl font-bold"/></button>
        </div>

        </div>
  )
}

export default  Controls