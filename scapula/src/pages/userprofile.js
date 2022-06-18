import MainLayout from "../layouts/mainlayout"
import { currentUserState } from "../recoil/globalState";
import {constSelector, useRecoilValue} from "recoil"
import Card from "../components/card"
import profileImg from "../images/profile.png"
import Badge from "../components/badge";
import {AiFillCamera} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import {FaEthereum} from "react-icons/fa"
import {GrAdd} from "react-icons/gr"
import Modal from "../components/modal"
import { useState } from "react";
import "../styles/channel.css"
import {BsInfo} from "react-icons/bs"
import Switch from "react-switch";
import {AiOutlineCloseCircle} from "react-icons/ai"
import { Routes, Route, useParams } from 'react-router-dom';
 const UserProfile =({match})=> {
     const currentUser =useRecoilValue(currentUserState)
     const [courseTrigger,setCourseTrigger] =useState(false)
     const [demoTrigger,setDemoTrigger] =useState(false)
     const [langTrigger,setLangTrigger] =useState(false)
     const [eduTrigger,setEduTrigger] =useState(false)
     const [costTrigger,setCostTrigger] =useState(false)
     const [available,setAvailable]=useState(false)
     const { id } = useParams();
     
     console.log(currentUser,id)
    return (
      <MainLayout>
           <Card cname="flex flex-row border-b-2 mb-4">
              <main className="mb-4" >
                {currentUser.imgUrl&&<img src={currentUser.imgUrl}  className="h-48 w-48 rounded-full inline"/>  } 
                {!currentUser.imgUrl&&<img src={profileImg}  className="h-48 w-48 rounded-full inline"/>  } 
                <Badge cname="bg-white -ml-4 mt-4">
                   <AiFillCamera className="text-3xl"/>  
                </Badge>
              </main>
                <div className="flex flex-row space-x-36">
                  <main>
                     {currentUser.name?<span className="block text-3xl font-bold">{currentUser.name}</span>
                       :
                       
                          <span className="block text-3xl font-bold text-white">  Name </span>
                       }
                      
                           <h3 className="flex flex-row space-x-2 "><Badge cname="bg-white "><FaEthereum className="text-xl"/></Badge><span className="text-xl font-medium">{currentUser.addresses[0].slice(0,7)+"..."+currentUser.addresses[0].slice(-4)}</span> </h3> 
                           
                  </main>

                    <main>
                    <button className="bg-white text-base rounded-lg p-2 w-36"><MdEdit className="inline text-xl  "/> Edit Profile</button>
                    </main>
                </div>
            
                </Card>

                <div className="flex flex-row ">
                   <div className="w-2/5 ">
                         <Card cname="rounded-lg shadow-lg  border-2 ml-4 mr-2">
                             <h2 className="text-3xl font-semibold ml-4 mt-6">Become a Tutor</h2>
                             <span className="block text-lg font-medium ml-7">Go through this session to register as a tutor </span>
                              
                              <label className="mt-10 font-medium ml-7 text-xl">Cover letter</label>
                              <textarea  
                              placeholder="Write briefly,describe yourself and your teaching abilities" 
                              className="text-white text-lg font-light h-44 w-4/5 block mt-10 bg-slate-300 shadow-lg rounded-lg ml-6 mb-10 p-3" />
                                
                              <h2 className="flex flex-row mt-10 ml-7  space-x-4"><span className="font-medium text-xl">Courses</span> <Badge cname="bg-white inline"><GrAdd className=" text-xl" onClick={()=>setCourseTrigger(true)}/></Badge> </h2>
                               <Modal trigger={courseTrigger} cname="w-3/4 h-72">
                                        <div className="flex flex-row justify-between">
                                           <h2 className="text-2xl font-semibold">Add Courses</h2>
                                           <button onClick={()=>setCourseTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
                                        </div>  
                                        <div>
                                          <label className="text-xl font-semibold block mt-5">Course</label>
                                        <select name="courses" id="courses" className="text-lg font-medium border-2 p-4 w-3/4 rounded-lg mt-4">
                                             <option value="Anatomy">Anatomy</option>
                                             <option value="Physiology">Physiology</option>
                                             <option value="Biochemisty">Biochemistry</option>
                                             <option value="Pathology">Pathology</option>
                                             <option value="Pharmacology">Pharmacology</option>
                                             <option value="Clinical Medicine">Clinical Medicine</option>
                                        </select>
                                           <button className="rounded-full w-44 p-2 bg-slate-500 text-white fixed  bottom-4 right-4 ">Save changes</button>
                                        </div>
                               </Modal>
                              <h2 className="flex flex-row mt-10 ml-7  space-x-4"><span className="font-medium text-xl">Demo tutorials</span> <Badge cname="bg-white inline"><GrAdd className=" text-xl" onClick={()=>setDemoTrigger(true)}/></Badge> </h2>
                               <Modal trigger={demoTrigger} cname="w-3/4 h-72">
                            
                                 <div className="flex flex-row justify-between">
                                           <h2 className="text-2xl font-semibold">Add Demo tutorials</h2>
                                           <button onClick={()=>setDemoTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
                                        </div>
                                         <div className="mt-5 " >
                                             <input  type="file" name="file" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                             <button className="rounded-full w-44 p-2 bg-slate-500 text-white fixed  bottom-4 right-4 ">Save changes</button>
                                         </div>
                               </Modal>
                                 
                              <h2 className="flex flex-row  ml-7 mt-10 space-x-4"><span className="font-medium text-xl">Languages</span> <Badge cname="bg-white inline"><GrAdd className=" text-xl" onClick={()=>setLangTrigger(true)}/></Badge> </h2>
                               <Modal trigger={langTrigger}  cname="w-3/4 h-72">
                               <div className="flex flex-row justify-between">
                                           <h2 className="text-2xl font-semibold">Add Languages</h2>
                                           <button onClick={()=>setLangTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
                                        </div>

                                          <div>
                                            <input type="text" placeholder="......" className="border-2 p-4 w-3/4 rounded-lg mt-4"/>
                                       
                                           <button className="rounded-full w-44 p-2 bg-slate-500 text-white fixed  bottom-4 right-4 ">Save changes</button>
                                        </div>
                                         
                               </Modal>

                               <h2 className="flex flex-row  ml-7 mt-10 space-x-4"><span className="font-medium text-xl">Education</span> <Badge cname="bg-white inline"><GrAdd className=" text-xl" onClick={()=>setEduTrigger(true)}/></Badge> </h2>
                               <Modal trigger={eduTrigger} cname="w-3/4 h-72">
                                  <div className="flex flex-row justify-between">
                                           <h2 className="text-2xl font-semibold">Add Education</h2>
                                           <button onClick={()=>setEduTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
                                        </div>
                                        <div>
                                           <label>Institution</label>
                                           <input type="text" name="Institution"/>
                                        </div>

                                        <div>
                                           <label>Degree</label>
                                           <input type="text" name="degree"/>
                                        </div>
                               </Modal>

                               <h2 className="flex flex-row  ml-7 mt-10 space-x-4"><span className="font-medium text-xl">Estimated service charges/course</span> <Badge cname="bg-white inline"><GrAdd className=" text-xl" onClick={()=>setCostTrigger(true)}/></Badge> </h2>
                               <Modal trigger={costTrigger} cname="flex flex-row ">
                                    <div className="flex flex-row justify-between">
                                           <h2 className="text-2xl font-semibold">Add Courses</h2>
                                           <button onClick={()=>setCostTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
                                     </div> 
                               </Modal>
                                <main className="flex flex-row  ml-7 mt-10 space-x-4">
                                  <label className="flex flex-row space-x-4">
                                  <span className="font-medium text-xl">Available</span>
                                    <Switch onChange={()=>available? setAvailable(false):setAvailable(true)} checked={available} />
                                 </label>
                                 <Badge cname="bg-white inline"><BsInfo className=" text-xl"/></Badge> 
                                </main>
                                
                       </Card>
                   </div>
                   <div className="w-3/5">
                        gvhbkbjn
                   </div>
                    
                </div>
      </MainLayout>
    )
 
}
export default UserProfile

