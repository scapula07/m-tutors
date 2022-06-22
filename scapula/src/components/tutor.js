import Card from "./card"
import Badge from "./badge"
import {GoVerified} from "react-icons/go"
import {ImLocation2} from "react-icons/im"
import {AiFillStar} from "react-icons/ai"
import Modal from "./modal"
import { useEffect, useState } from "react"
import MiniChats from "./messenger/chats"
import { FaBullseye } from "react-icons/fa"
import profileImage from "../images/profile.png"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentUserState } from "../recoil/globalState";
import {doc,setDoc,addDoc,collection,getDoc,getDocs,query, where} from "firebase/firestore"
import { errorPrefix } from "@firebase/util"
import {db} from "../firebase/firebase.utils"
import { Link,useLocation} from "react-router-dom";

const Tutor =({tutor})=>{
    const [trigger,setTrigger]=useState(false)
    const [conversations,setConversations]=useState({})
    const currentUser=useRecoilValue(currentUserState)
    const {pathname}=useLocation()
    console.log(pathname,"path")

    const handleMakeConversation=async()=>{
        const payload={
            members:[currentUser.id,tutor.id]
          }
          try{
            const docRef = await addDoc(collection(db, "conversations"),payload);
            console.log(docRef)
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data(),doc.id,"third")
            setConversations({...docSnap.data(),id:docSnap.id});
         
         }catch (err) {
         console.log(err)
        }

        setTrigger(true)
    }
  console.log(conversations.id)  
    return(
        <>
           <h1 className="text-3xl font-bold ml-5">About</h1>
           <Card cname="flex flex-row">
              
               <main className="mt-5">
              {tutor.imgUrl&&<img src={tutor.imgUrl} className="h-52 w-52 rounded-full inline"/>} 
              {!tutor.imgUrl&&<img src={profileImage} className="h-52 w-52 rounded-full inline"/>} 
                <Badge cname="inline bg-white h-8 w-8 p-2 top-4 -ml-5"><GoVerified className="text-2xl mb-0.5 text-blue-500 inline"/></Badge>
                </main>
                <div className="ml-5">
                    <h2 className="mt-5 text-3xl font-bold">{tutor.firstname +" " +tutor.lastname}</h2>
                    <h3 className="mt-3"><ImLocation2 className="inline text-2xl"/>{tutor.location?.city&& tutor.location.country&&<span className="text-xl ml-2">{tutor.location.city+" , "+tutor.location.country}</span>}</h3>
                    <h4 className="mt-9 ml-3">{tutor.available&&<span className="text-blue-600 text-xl ">Available</span>}</h4>
                    <h4 className="mt-9 ml-3">{tutor.available===false&&<span className="text-blue-600">Away</span>}</h4>
                </div>
            </Card>
             <div className="flex flex-row mt-10 space-x-2">
                   <div className="w-2/5">
                      <Card cname="rounded-lg shadow-lg p-3 w-full">
                           <h2 className="text-2xl font-semibold">Courses</h2>
                          {tutor.courses.map((course)=>
                             <ol className="ml-3 mt-3">
                                <li className="font-medium text-xl">{course}</li>
                             </ol>
                          ) }
                          <h2 className="text-2xl font-semibold mt-10" >Languages</h2>
                          {tutor.languages.map((language)=>
                            <ol className="ml-3 mt-3">
                                <li  className="font-medium text-xl">{language}</li>
                            </ol>
                          )
                          }


                          <h2 className="text-2xl font-semibold mt-10">Verifications </h2>
                            <span className="ml-3 mt-4 font-medium text-xl">ID:Approved <Badge cname="inline p-2 "><GoVerified className="text-2xl mb-0.5 text-blue-500 inline"/></Badge> </span>
                      </Card>

                      <Card cname="rounded-lg shadow-lg p-3 mt-10 w-full" >
                         <h2 className="text-2xl font-semibold">All Stats</h2>
                         <div className="flex flex-row  justify-evenly">
                            <main>
                                <span className="block text-xl font-medium">{tutor.jobs}</span>
                                <span className="block text-base ">Jobs</span>
                            </main>
                            <main>
                                <span className="block text-xl font-medium">{tutor.level}</span>
                                <span className="block text-base">Level</span>
                            </main>
                            <main>
                            <span className=" text-xl font-medium"><AiFillStar className="inline text-xl mb-0.5 text-amber-400"/><span className="mt-1 ml-0.5 text-amber-400">{tutor.ratings}</span></span>
                                <span className="block text-base ">Ratings</span>
                            </main>
                         </div>
                      </Card>
                      <Card cname="rounded-lg shadow-lg p-3 mt-10 w-full mb-10">
                           <h2 className="text-2xl font-semibold mt-10">Education</h2>
                           <h3 className="text-xl font-semibold mt-10">Institutions</h3>
                           { tutor.education.institution.map((institution)=>
                           <ol className="ml-3 mt-3">
                            <li className="text-xl font-medium">{institution}</li>
                           </ol>)
                           }
                            <h3  className="text-xl font-semibold mt-4">Degrees</h3>
                           { tutor.education.degree.map((degree)=>
                           <ol className="ml-3 mt-3">
                            <li  className="text-xl font-medium">{degree}</li>
                           </ol>)
                           }
                      </Card>

                        <Card cname="rounded-lg shadow-lg p-3 mt-10 w-full">
                            <h2 className="text-2xl font-semibold">Service Charges</h2>
                          
                            <button className="bg-blue-600 text-white rounded-lg shadow-lg border-1 p-2 max-h-14 mt-10" onClick={handleMakeConversation}>Send {tutor.firstname} a Message</button>
                             
                         </Card>
                   </div>
                    <div className="w-3/5 p-4 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-semibold">Description</h2>
                      <p className="mt-3 ml-2 text-xl font-medium">Hello, my name is {tutor.firstname+" "+tutor.lastname} {tutor.description} </p>

                      <Card>
                          <h2  className="text-2xl font-semibold mt-10">Demo Tutorials</h2>
                          <p className="mt-3 ml-2 text-xl font-medium">A 5-minutes demo tutorial to help you make a decision. Each tutorial is for each courses registered by a tutor.</p>
                            <main className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2  gap-3 mt-5" >
                                {tutor.demotutorials.map((tutorial)=>
                                  <Card cname="rounded-lg">
                                    <video className="rounded-lg  " controls width="320" height="240">
                                        <source src={tutorial}/>
                                    </video>
                                  </Card>
                                
                                )

                                }
                            </main>
                      </Card>

                      <Modal cname="w-1/2 h-3/4 rounded-lg shadow-lg bg-white"  trigger={trigger}>
                           
                           <MiniChats tutor={tutor}  setTrigger={setTrigger} conversation={conversations}/>
                      </Modal>

                   </div>

                   
                 

             </div>
        </>
    )
}

export default Tutor