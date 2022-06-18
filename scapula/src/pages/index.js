
import { useEffect,useState } from "react"
import { Link,useLocation} from "react-router-dom";
import Card from "../components/card"
import { currentUserState } from "../recoil/globalState";
import { useRecoilValue } from "recoil";

const Index=({provider,userAuth,email,setEmail})=>{
     const [error,setError] =useState("")
     const currentUser =useRecoilValue(currentUserState)
     const {pathname}=useLocation()
     console.log(pathname,"path")
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
        <div>
            {error&& <Card>{error}</Card>}
             <Card>
                <input placeholder="Enter email address"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                 {window.ethereum&& <button className="bg-red-400" onClick={userAuth}>Connect with Metamask</button>}
                 {!window.ethereum&& <button className="bg-green-400 ">connect with Metamask</button>}
                 <Link to="/channel/dbhebaera">video</Link>
                 <Link to={`/user/${currentUser.id}`}>profile</Link>
                 <Link to="/tutors">tutors</Link>
             </Card>
             <span>index</span>
        </div>
    )

}

export default Index