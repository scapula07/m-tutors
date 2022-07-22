
import SideBar from "../components/sidebar"
import Header from "../components/header"
import Footer from "../components/footer"
import {RiVideoUploadFill,RiBarChart2Fill,RiSurroundSoundLine} from "react-icons/ri"
import {MdVideoLibrary,MdOutlineWork,MdFeedback} from "react-icons/md"
import {FaChalkboardTeacher} from "react-icons/fa"
import {AiFillPlaySquare}from "react-icons/ai"

import {FiHelpCircle} from "react-icons/fi"
const MainLayout=({children})=>{

   return(
      <div className="h-full">
          <Header />
         <div className="mx-auto flex flex-row ">
             <SideBar items={items}/>
                <div className ="w-3/4 bg-slate-400 static pt-4 px-4 h-vh">
                    {children}
                </div>
          </div>
           <Footer />
           
        </div>
)

}

export const items=[
   {tag:"Create Videos",
      icon:< RiVideoUploadFill className=" text-sm"/>},
   {tag:"Library",
    icon: <MdVideoLibrary className=" text-sm"/>},
    {tag:"Your Videos",
    icon: <AiFillPlaySquare className="text-sm"/>},
    {
       tag:"Tutors",
       icon: <FaChalkboardTeacher className="text-sm" />
    },
    {
      tag:"Your Jobs",
      icon: <MdOutlineWork className="text-sm" />
   },
   {
      tag:"Ads Manager",
      icon: <RiBarChart2Fill className=" text-sm" />
   },
   {
      tag:"Live",
      icon: <RiSurroundSoundLine className=" text-sm" />
   },
   
   {
      tag:"Help",
      icon: <FiHelpCircle className="text-sm" />
   },
   {
      tag:"Feedbacks",
      icon: <MdFeedback className="text-sm" />
   },
]
   


export default MainLayout