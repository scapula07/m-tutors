import MainLayout from "../layouts/mainlayout"
import Card from "../components/card"
import { MdAllInclusive } from "react-icons/md"
import { useState } from "react"
import { useLocation,useParams} from "react-router-dom";
  
import Tutor from "../components/tutor"
const TutorPage=()=>{
    const location =useLocation()
    const [locationState,setlocationState] = useState(location.state)
   
    return(
    <MainLayout>
        <div className="ml-8 mr-8">
        <Tutor tutor={locationState.tutor}/>
        </div>
    </MainLayout>
    )
}

export default TutorPage