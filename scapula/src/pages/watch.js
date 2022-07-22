import MainLayout from "../layouts/mainlayout"
import {useEffect,useState} from "react"
import {db} from "../firebase/firebase.utils"
import { collection,onSnapshot} from "firebase/firestore";
import Card from "../components/card";
import {FaEthereum} from "react-icons/fa"
import Badge from "../components/badge";
import {Link} from "react-router-dom"
const Watch=()=>{
       const [videos,setVideos]=useState([])
    useEffect(()=>{
      const fetchVideos=async()=>{
           
        onSnapshot(collection(db, "videos"),(snapshot)=>{
         setVideos( snapshot.docs.map((doc)=>{
                return {...doc.data(),id:doc.id }
          } ))
       });   
       }
fetchVideos()
    },[])
    console.log(videos)
  return(
      <div>
          <MainLayout>
          <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 ml-3 mr-3">
                {
                  videos.map((video)=>{
                    return(
                      
                      <Card  cname="shadow-lg rounded-lg">
                      <Link  to={`/watch/${video.id}`}
                   state={{
                      video
                         }}
                     >
                          <img src={video.thumbnailUrl} />
                        </Link>
                      
                        <h1 className="block">{video.title}</h1>
                        <h3 className="flex flex-row space-x-2 "><Badge cname="bg-white "><FaEthereum className="text-xl"/></Badge><span className="text-xl font-medium">{video.address.slice(0,4)+"..."+video.address.slice(-4)}</span> </h3> 
                      </Card>
                    )
                  })
                }
              </div>
              
            </MainLayout>
            
         
      </div>
  )

}

export default Watch