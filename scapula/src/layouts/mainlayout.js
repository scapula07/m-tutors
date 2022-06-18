
import SideBar from "../components/sidebar"
import Header from "../components/header"
import Footer from "../components/footer"
import {AiOutlineHome} from "react-icons/ai"
import {MdOutlineOndemandVideo} from "react-icons/md"
import {FaChalkboardTeacher} from "react-icons/fa"

const MainLayout=({children})=>{

   return(
      <div className="h-full">
          <Header />
         <div className="mx-auto flex flex-row ">
             <SideBar items={items}/>
                <div className ="w-3/4 bg-slate-400">
                    {children}
                </div>
          </div>
           <Footer />
           
        </div>
)

}

export const items=[
   {tag:"Home",
      icon:<AiOutlineHome className="inline text-2xl"/>},
   {tag:"Videos",
    icon: <MdOutlineOndemandVideo className="inline text-2xl"/>},
    {
       tag:"Tutors",
       icon: <FaChalkboardTeacher className="inline text-2xl" />
    }
]
   


export default MainLayout