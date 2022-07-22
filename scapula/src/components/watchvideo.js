import {useState} from 'react'
import { Link,useLocation} from "react-router-dom";
import MainLayout from '../layouts/mainlayout';
import Card from './card';
import {AiFillDislike,AiFillLike} from "react-icons/ai"
import {RiPlayListAddFill } from "react-icons/ri"


 function WatchVideo() {
    const location =useLocation()
      const [video,setVideo] = useState(location.state)
      console.log(video,"vid>>>")
  return (
   <MainLayout>
    <div className='flex flex-row'>
        <div className='w-3/5'>
            <Card>
                <video src={video.video.videoUrl} controls autoPlay/>
                <h1>{video.video.title}</h1>
                <div className="flex flex-row justify-between items-center">
                    <div className='flex flex-row space-x-1'>
                        <span>1k views</span>
                        <span>27 Jul 2022</span>
                       
                    </div>
                    <div className='flex flex-row space-x-1'>
                     
                       <h3><AiFillLike className="inline text-white"/> <span>3k</span></h3> 
                       <h3><AiFillDislike className="inline text-white"/> <span>Dislike</span></h3> 
                       <h3><RiPlayListAddFill className='inline'/> <span>Save</span></h3>
                    </div>

                </div>
            </Card>
             
        </div>
        <div className='2/5'>
           videos
        </div>

    </div>
   </MainLayout>
  )
}
export default WatchVideo