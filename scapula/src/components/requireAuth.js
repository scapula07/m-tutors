import { currentUserState } from "../recoil/globalState"
import { useRecoilValue } from "recoil"
import {useLocation,Navigate,Outlet} from "react-router-dom"

 const RequireAuth=() =>{
    const currentUser =useRecoilValue(currentUserState)
    const location =useLocation()
  return (
       <>
       </>
    )
}
export default RequireAuth

