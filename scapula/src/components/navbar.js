import {AiOutlineVideoCameraAdd,AiFillHome} from "react-icons/ai"
import {GrNotification} from "react-icons/gr"

import Badge from "./badge"
import {RiMessengerFill} from "react-icons/ri"
import { Link } from "react-router-dom"
import {MdOndemandVideo}  from "react-icons/md"
import {FaWallet,FaRegUser} from "react-icons/fa"
import Info from "./info/index"
import {useState} from "react"

const NavBar=()=>{
   const [isHomeHovering, setHomeIsHovering] = useState(false);
   const [isWatchHovering, setWatchIsHovering] = useState(false);
   const [isWalletHovering, setWalletIsHovering] = useState(false);
    
    return(
       <nav className="flex flex-row justify-between items-center" >
          <div className="flex flex-row w-1/2  justify-center space-x-2 items-center">
            <div className="px-5 hover:rounded-lg hover:bg-slate-300 hover:opacity-50 hover:shadow py-0.5 relative cursor "
              onMouseOver={()=> setHomeIsHovering(true)} 
              onMouseOut={()=>setHomeIsHovering(false)}
              >
            
              <AiFillHome  className="text-sm font-extralight"/>
              <Info isHovering={isHomeHovering}cname="bg-slate-800 text-white text-center w-16 absolute z-30 top-6 -left-2">ifrhrhe</Info>
            </div>
            <div className="px-5 hover:rounded-lg hover:bg-slate-300 hover:opacity-50 hover:shadow py-0.5 relative"
              onMouseOver={()=> setWatchIsHovering(true)} 
              onMouseOut={()=>setWatchIsHovering(false)}
             > 
            <MdOndemandVideo  className="text-sm font-extralight "/> 
            <Info isHovering={isWatchHovering} cname="bg-slate-800 text-white text-center w-16 h-5 absolute z-60 top-5 -left-2">ifrhrhe</Info>
            </div>
            <div className="px-5 hover:rounded-lg hover:bg-slate-300 hover:opacity-50 hover:shadow py-0.5 relative"
               onMouseOver={()=> setWalletIsHovering(true)} 
               onMouseOut={()=>setWalletIsHovering(false)}
            > 
            < FaWallet  className="text-sm font-extralight "/> 
            <Info isHovering={isWalletHovering} cname="bg-slate-800 text-white text-center w-16 absolute z-10 top-6 -left-2">ifrhrhe</Info>
            </div>
          </div>
          <div className="flex flex-row w-1/2 justify-between items-center px-5">
            <div className=" flex flex-row space-x-3 w-3/4">
              <Badge cname="bg-slate-400"><RiMessengerFill className="text-xs"/></Badge>
              <Badge  cname="bg-slate-400"><GrNotification className="text-xs"/></Badge>
              <Badge  cname="bg-slate-400"><FaRegUser className="text-xs"/></Badge>
            </div>
             
             <div className="w-1/4">
                 <button className="bg-slate-400 rounded-full text-xs shadow-lg font-lato text-white px-3 py-0.5">Connect</button>
                
             </div>
          </div>
         
       </nav>
     
    )

}

export default NavBar