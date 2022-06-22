import {useState} from 'react'
import Card from "../card"
import {MdPhoneInTalk} from "react-icons/md"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {FaPhoneAlt} from "react-icons/fa"
 const Notifications=({ me, callAccepted, name, setName, callEnded, leaveCall, callUser })=> {
  const [idToCall, setIdToCall] = useState('');
  console.log(me,"me>>>>>>")
  return (
    <div className='flex flex-row  justify-center w-1/2'>
       <Card>
         <h2>Account Info</h2>
         <input className='w-1/2 border-2 block' value={name} onChange={(e) => setName(e.target.value)}/>
         <CopyToClipboard  text={me}  className="w-1/2 h-24 border-4 block">
                <button>
                  Copy Your ID
                </button>
              </CopyToClipboard>

         </Card>
         <Card>
         <h2>Make a call</h2>
         <input className='w-1/2 border-2 block'  value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
           {callAccepted && !callEnded ?
              <button >
              <span> Call Ongoing </span> 
              <MdPhoneInTalk />
             </button>
             :
             <button  onClick={() => callUser(idToCall)} >
           <span>Call</span>
              <FaPhoneAlt />
           </button>
           }
            
            

         </Card>
        
    </div>
  )
}
export default Notifications