import {AiOutlineVideoCameraAdd} from "react-icons/ai"
import {GrNotification} from "react-icons/gr"
import Badge from "./badge"
import {RiMessengerFill} from "react-icons/ri"
import { Link } from "react-router-dom"
const NavBar=()=>{


    return(
       <nav className="inline w-1/4" >
        <ol className="flex flex-row space-x-8 justify-center" >
           <li> <AiOutlineVideoCameraAdd className="text-2xl"/></li>
           <li><GrNotification  className="text-2xl"/></li>
           <li><Badge cname="bg-fuchsia-400 h-10 w-9 border-2">B</Badge></li>
           <li><Link><Badge><RiMessengerFill className="text-2xl"/></Badge></Link></li>
        </ol>
          
       </nav>
    )

}

export default NavBar