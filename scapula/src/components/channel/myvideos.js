
import {useEffect,useState,useRef} from "react"
import {videoListState,currentUserState} from "../../recoil/globalState"
import {useRecoilValue,useRecoilState} from "recoil"
import reelImage from "../../images/reel.jpg"
import uploadIcon from "../../images/upload.png"
import Card from "../card"
import Modal from "../modal"
import "../../styles/util.css"
import { useMoralis } from "react-moralis";
import { Oval } from  'react-loader-spinner'
import { v4 as uuidv4 } from 'uuid';
import { collection, query, where, getDocs,addDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase.utils"




const MyVideos =()=>{
      const { Moralis, isInitialized, ...rest } = useMoralis();
      const [videoList,setVideoList]=useState({})
      const [trigger,setTrigger]=useState(false)
      const [selectedFile,setFile] =useState({})
      const [isFilePicked, setIsFilePicked] = useState(false);
      const [videoipfsLink,setVideoipfsLink] =useState("")
      const [imageIpfsLink,setImageipfsLink] =useState("")
      const { authenticate,isAuthenticated, user, account, logout  } = useMoralis();
      const [videoTitle,setTitle]=useState("")
      const [videoTag,setTag]=useState("")
      const [videoDescription,setDescription]=useState("")
      const [loader,setLoader]=useState(false)
      const currentUser =useRecoilValue(currentUserState)
      console.log(currentUser.addresses,"cuuuuu>>>>>")
    useEffect(()=>{
         const fetchVideo=async () =>{

          const docQuery =query(collection(db, "videos"),where("address", "array-contains-any",currentUser.addresses))
          const docSnapshot = await getDocs(docQuery);
          setVideoList(docSnapshot.docs)
         }
         fetchVideo()
         
        
    },[])
    console.log(videoList)
    const handleFiles=(e)=>{
      setFile(e.target.files[0]);
      setIsFilePicked(true);


  }
console.log(selectedFile)
console.log("user", )

const handleUpload=async()=>{
 
  if (!isAuthenticated) {

    await authenticate({signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setLoader(true)
  const file = new Moralis.File("video",selectedFile);
   try{
    await file.saveIPFS();
    setVideoipfsLink(file.ipfs())
   }catch(error){
    console.log(error)
   }
  
}

  const uploadImage=async (e)=>{
    const data =e.target.files[0]
    const file = new Moralis.File("image",data);
   try{
    await file.saveIPFS();
    setImageipfsLink(file.ipfs())
   }catch(error){
    console.log(error)
   }
  }
  

  const uploadMetaData=async ()=>{
    const account =window.localStorage.getItem("currentAccount")
    console.log(account,"ac>>>>>>")
      
    const payload={
      address :account,
      videoUrl:videoipfsLink,
      thumbnailUrl:imageIpfsLink,
      tag:videoTag,
      title:videoTitle,   
     
    }
    const docRef = await addDoc(collection(db, "videos"),payload);
    console.log(docRef.id)
  }
  console.log(videoipfsLink + "video")
  console.log(imageIpfsLink + "image")

  return(
      <div className="h-full">
         {videoList.length===0&&(
            <div>
                <Card cname="flex-center">
                   <img src={reelImage} className=" h-32 w-32 rounded-full " />
                   <span className="text-lg">No video contents available</span>
                  < button className="rounded-full bg-blue-400 text-lg text-white w-40" onClick={()=>setTrigger(true)}>UPLOAD VIDEOS</button>
                </Card>
              
                <Modal trigger={trigger} cname=" bg-white border-2 rounded-md shadow w-10/12">
                     
                     {!isFilePicked?
                      <Card cname="flex-center ">
                        <img src={uploadIcon} className="h-24 w-24 rounded-full"/>
                         <input type="file" name="file" onChange={handleFiles}/>
                      </Card>
                     
                        :
                        <div >
                          {videoipfsLink.length===0?
                            <Card cname="grid grid-rows-2 ">
                                 
                                 {loader===false&&
                                  <main>
                                   <img src={uploadIcon} className="h-24 w-24 rounded-full"/>
                                   <button className="rounded-lg bg-blue-500" onClick={handleUpload}>Upload Video</button>
                                  </main>
                                   }
                               {loader===true &&<Oval height="100" width="100" color='red' ariaLabel='loading'/>}
                            </Card>
                               :
                              <div className="grid grid-cols-3">
                                  <Card cname="col-span-2">
                                     <h3>Details</h3>
                                     
                                     <input type="text" name="videoTitle" value={videoTitle} placeholder="Title" className="block w-1/2 border-2" onChange={(e)=>setTitle(e.target.value)}/>
                                      <textarea name="videoDescription"value={videoDescription} placeholder="Video Description" className="block w-3/4 h-1/2 border-2" onChange={(e)=>setDescription(e.target.value)}/>
                                      
                                       <label className="inline">Anatomy:</label>
                                        <input type="radio" name="tag" value="anatomy" onChange={(e)=>setTag(e.target.value)}/>
                                        
                                        <label className="inline">Physiology:</label>
                                        <input type="radio" name="tag" value="physiology" onChange={(e)=>setTag(e.target.value)} />
                                        
                                        <label className="inline">Biochemistry:</label>
                                        <input type="radio" name="tag" value="bch" onChange={(e)=>setTag(e.target.value)}/>

                                        <label className="inline">pathology:</label>
                                        <input type="radio" name="tag" value="pathology" onChange={(e)=>setTag(e.target.value)} />
                                        <label className="inline">Pharmacology:</label>
                                        <input type="radio" name="tag" value="pharmacology"onChange={(e)=>setTag(e.target.value)} />
                                        <label className="inline">clinical medicine:</label>
                                        <input type="radio" name="tag" value="clinical medicine" onChange={(e)=>setTag(e.target.value)}/>

                                      <label>Thumbnail</label>

                                      <p>Select or upload a picture that shows what's in your video.</p>
                                      {imageIpfsLink.length===0&&<input type="file" name="file" onChange ={uploadImage}/>} 
                                      { 
                                       imageIpfsLink.length>0 &&<img src={imageIpfsLink} className=" w-40"/>
                                       }
                                    </Card>
                                 
                                      <div>
                                          <Card cname="">
                                             <video>
                                                <source src={videoipfsLink}/>
                                                <span>No good video player</span>
                                             </video>
                                          </Card>
                                           <main>
                                              <span className="block">Video Link</span>
                                              <p>{videoipfsLink}</p>
                                           </main>
                                           <main>
                                              <span className="block">Filename</span>
                                              <p>{selectedFile.name}</p>
                                           </main>
                                      </div>
                                    {loader===true&&<button className="rounded-full w-40 bg-blue-700" onClick={uploadMetaData}>Save</button>}
                                    {loader===false&&<Oval height="100" width="100" color='red' ariaLabel='loading'/>} 
                              </div>
                           
                           }
                            
                        </div>
                      }
                     
                </Modal>
            </div>
         )
          }
      </div>
  )
}

export default MyVideos