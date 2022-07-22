
import { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import Card from "../components/card"
import { currentUserState } from "../recoil/globalState";
import { useRecoilValue } from "recoil";
import bookhero from "../images/bookhero.jpg"
import {GiHamburgerMenu} from "react-icons/gi"

const Index=({provider,userAuth,email,setEmail})=>{
     const [error,setError] =useState("")
     const currentUser =useRecoilValue(currentUserState)
   //  const {pathname}=useLocation()
   //  console.log(pathname,"path")
  //   const location=useLocation()
    // const from =location.state?.from?.pathname
   // const router =useRouter()
  // console.log(router)
    useEffect(()=>{
       
       if(provider==null) return setError("Please install metamask")
       console.log(error)
       if(provider === window.ethereum) {
           return console.log("alright")
        }else return setError("Do you have multiple wallet installed")

    },[provider])
    console.log(currentUser.id,"ibd")
  
    return(
        <div className="mx-auto">
            <nav className=" flex flex-row justify-between items-center py-5 px-7 relative z-20 ">
            
                <div className="flex flex-row  items-center space-x-14 max-w-7xl">
                <h2  className="text-white text-4xl font-semibold flex flex-row items-center space-x-4"><GiHamburgerMenu className=" text-white inline lg:hidden"/><span>Scapula</span></h2>
                <div className="hidden lg:block">
                <Link to=""><span className="text-white font-medium text-lg py-2 px-4">Find Tutors</span></Link>
                <Link to=""><span className="text-white font-medium text-lg  py-2 px-4 ">Free Video Tutorials</span></Link>
                <Link to=""><span  className="text-white font-medium text-lg  py-2 px-4 ">About </span></Link>
                <Link to=""><span  className="text-white font-medium text-lg py-2 px-4 ">Contact</span></Link>
                </div>
                </div>
                <div>
                    <Link to=""><button className="text-slate-600 content-center bg-white rounded-full py-2 px-4 font-bold">Connect to Metamask</button></Link>
                </div>
            </nav>
            <section className="relative">
               <div  className="absolute -top-48 height-605px w-full md:h-689px">
                <div className="bg-black absolute opacity-50  z-10 inset-0"></div>
                <div>
                <img src={bookhero} className="w-full h-full  height-605px md:h-689px object-cover "/>
                </div>
                </div>
                <div className=" sm:pt-10 lg:pt-20 px-6 max-w-7xl ">
                <div className=" relative z-10 ">
                    <h1 className="text-3xl md:text-5xl text-white font-bold line">Find tutors,<br></br><span>find medicine easy.</span></h1>
                    <p className="text-lg md:text-2xl text-white max-w-xl mt-5 font-bold">Emergency? <span className="text-white">Have a test? You can have the best tutors.</span><br></br>
                      <span>Right now.Right here.</span> 
                    </p>
                    <div className="flex flex-col justify-center items-center sm:flex-row space-y-4 sm:space-y-0 sm:justify-start space-x-7 my-7">
                        <button className="text-slate-600 w-3/5 ml-6 sm:w-3/12 bg-white rounded-full py-2 px-4 font-bold">Find Tutors</button>
                        <button className="text-slate-600 w-3/5  sm:w-3/12 bg-white rounded-full py-2 px-4 font-bold">Become a Tutor</button>
                    </div>
                </div>
                </div>
            </section>

               
            <div>

         
            </div>
                 <Card cname="bg-red-900 relative z-10">
                      <input placeholder="Enter email address"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                       {window.ethereum&& <button className="bg-red-400" onClick={userAuth}>Connect with Metamask</button>}
                       {!window.ethereum&& <button className="bg-green-400 ">connect with Metamask</button>}
                       <Link to="/watch">watch</Link>
                       <Link to="/tutors">tutors</Link>
                       <Link to={`/channel/${currentUser.id}`}>channel</Link>
                       <Link to={`/user/${currentUser.id}`}>profile</Link>
                   </Card>
        </div>
    )

}

export default Index