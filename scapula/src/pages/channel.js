import MainLayout from "../layouts/mainlayout"
import Card from "../components/card"
import {FiSettings} from "react-icons/fi"
import Badge from "../components/badge"
import { Outlet,Link } from "react-router-dom"
const Channel =()=>{
      const name="bartholomew onogwu"
    
    return(
        <MainLayout>
            <div>
                <Card cname="flex flex-row justify-between border-b-1">
                    <h3 className="inline ml-4">{name.toUpperCase()}</h3>
                    <Badge cname="h-20 w-20 mr-8"><FiSettings  className="text-3xl"/></Badge>
                </Card>
                <div>
                    <Card cname="flex flex-row justify-start space-x-4">
                        <span className="text-xl hover:underline hover:decoration-cyan-200 ml-4"><Link to="video">My Videos</Link></span>
                        <span  className="text-xl hover:underline hover:decoration-cyan-200"><Link to="playlists">Playlists</Link></span>
                    </Card>
                   <Card cname="">
                         <Outlet />
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}

export default Channel