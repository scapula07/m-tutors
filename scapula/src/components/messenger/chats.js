import {BsFillCameraVideoFill} from "react-icons/bs"
import {AiFillPhone} from "react-icons/ai"
import Card from "../card"
import "../../styles/util.css"
import { useState,useEffect ,useRef} from "react"
import Messages from "./messages"
import { useRecoilValue } from "recoil"
import { currentUserState } from "../../recoil/globalState";
import axios from "axios"
import {doc,setDoc,addDoc,collection,getDoc,getDocs,query, where} from "firebase/firestore"
import { db } from "../../firebase/firebase.utils"
import TextareaAutosize from 'react-textarea-autosize';
import {MdSend} from "react-icons/md"
import Badge from "../badge"
import {AiOutlineCloseCircle } from "react-icons/ai"
import { io } from "socket.io-client";


const  MiniChats =({tutor,setTrigger,conversation})=>{
   const [currentChat,setCurrentChat] =useState(null)
   const [messages,setMessages]=useState([])
   const currentUser=useRecoilValue(currentUserState)
   const [conversations,setConversations]=useState([])
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const socket = useRef();
    const [newMessage, setNewMessage] = useState("");
 console.log(tutor.id,"tt")

 useEffect(() => {
  socket.current = io("ws://localhost:4000");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);

useEffect(() => {
  socket.current.emit("addUser", currentUser.id);
  socket.current.on("getUsers", (users) => {
     console.log(users,"uuuuu")
 });
}, [currentUser]);


   useEffect(()=>{
    const getConversations = async () => {
        try{
          const q = query(collection(db, "conversations"), where("members", "array-contains",currentUser.id));
          const convSnapshot =await getDocs(q)
          const conversations= convSnapshot.docs.map((doc)=> ({...doc.data(),id:doc.id}) )
          console.log(conversations)
          setConversations(conversations)
        }catch(error){
          console.log(error)
        }
      };
    getConversations();
 
   },[currentUser.id])

   useEffect(()=>{
    const getCurrentChat=async()=>{
      try {
        const q = query(collection(db, "conversations"),where('members', 'array-contains-any', ["DAelD8dNUhhgilybWOqj", " Cf4buHpPej9lS33O77I5"]));
        const chatSnapshot =await getDocs(q)
        const chat= chatSnapshot.docs.map((doc)=> ({...doc.data(),id:doc.id}) )
        console.log(chat,"chat")
        setCurrentChat(chat);
      } catch (err) {
        console.log(err);
      }
    }
    getCurrentChat()
  
   },[])
     const sendMessage=async (e)=>{
      e.preventDefault();
      const message = {
        sender: currentUser.id,
        text: newMessage,
        conversationid:conversation.id
      };

      socket.current.emit("sendMessage", {
        senderId: currentUser.id,
        receiverId:tutor.id,
        text: newMessage,
      });
        
      try{
        const docRef = await addDoc(collection(db, "messages"),message);
       
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data(),doc.id,"third")
        setMessages([...messages,{...docSnap.data(),id:docSnap.id}]);
        setNewMessage("")
     
     }catch (err) {
     console.log(err)
    }

     }
    // console.log(messages)
  // console.log(currentUser.id,"id")
  // console.log(conversations,"conver")
  console.log(conversation.id,"chats")
  return(
    <> 
       <Card cname="flex flex-row justify-between w-full ">
          <main>
            <img src={tutor.imgUrl} className="inline rounded-full h-8 w-8 space-x-4"/>
            <span className="text-lg font-semibold">{tutor.firstname}</span>
         
          </main>
          <main className="flex flex-row">
           < BsFillCameraVideoFill className="inline "/>
           <AiFillPhone className="inline ml-4 mr-4"/>
           <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-3xl" /></button>
          </main>
       </Card>
       <div className="flex-center bg-red-300 w-full  h-96 mt-10">
          <img src={tutor.imgUrl} className="inline rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold -mt-1">{tutor.firstname+" "+tutor.lastname}</h2>
          <h2 className="-mt-1">{tutor.available?<span className="text-base text-blue-500 ">Available</span >:<span className="text-base text-blue-500">Away</span>}</h2> 
           <button className="rounded-lg shadow-lg text-white bg-blue-500 w-24">Proceed to Hire</button>
       </div>
        <div>
            {
              currentChat?(
                <>
                  <div>
                      {messages.map((message)=>(
                         <div>
                            <Messages tutor={tutor} message={message} own={message.sender===currentUser.id}/>
                         </div>
                      ))}

                  </div>
                 
                  
                </>
              )
                 :
                (
                  <>
                    <h2 className="absolute   font-medium text-slate-400">Open a conversation.</h2>
                  </>
                )
              }
              
              <div className="flex flex-row fixed bottom-4 ">
                <TextareaAutosize
                   className="text-slate-400 font-medium h-auto rounded-xl  w-3/5 border-2 relative right-7 "
                   placeholder="Message..."
                   
                   onChange={(e)=>setNewMessage(e.target.value)}
                   value={newMessage}
                />
                <botton onClick={sendMessage}><Badge cname="bg-white border-3 shadow-lg"><MdSend className="text-2xl text-blue-600 font-bold"/></Badge></botton>

               </div>
        </div>
    </>
  )
}

export default MiniChats