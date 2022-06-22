 
import {HiVideoCamera} from "react-icons/hi"
import "../styles/util.css"
import { useState,useEffect ,useRef} from "react"
import Messages from "../components/messenger/messages"
import { useRecoilValue } from "recoil"
import { currentUserState } from "../recoil/globalState";

import {doc,setDoc,addDoc,collection,getDoc,getDocs,query, where} from "firebase/firestore"
import { db } from "../firebase/firebase.utils"
import TextareaAutosize from 'react-textarea-autosize';
import {MdSend} from "react-icons/md"
import Badge from "../components/badge"
import MainLayout from "../layouts/mainlayout"
import { io } from "socket.io-client";
import Conversation from "../components/messenger/conversation"
import { Link } from "react-router-dom"


const  MessengerPage =()=>{
   const [currentChat,setCurrentChat] =useState(null)
   const [messages,setMessages]=useState([])
   const currentUser=useRecoilValue(currentUserState)
   const [conversations,setConversations]=useState(null)
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [textsubmit,setTextsubmit]=useState(false)
   const [socketUsers,setSocketUsers]=useState([])
   const socket = useRef();
  const [newMessage, setNewMessage] = useState("");
  console.log(currentUser,currentUser.id,"ccuuu")

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
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
     
      setSocketUsers(users)

        
    })
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
    console.log(currentChat)
   useEffect(() => {
    const getMessages = async () => {
      try {
        const q = query(collection(db, "messages"), where("conversationId", "==",currentChat.id));
        const msgSnapshot =await getDocs(q)
  
        const messages= msgSnapshot.docs.map((doc)=> ({...doc.data(),id:doc.id}) )
    
         setMessages(messages)
      } catch (err) {
        console.log(err)
      }
    };
    getMessages();
  }, [currentChat]);
 
  const sendMessage=async (e)=>{

    e.preventDefault();
    
    const message = {
      sender: currentUser.id,
      text: newMessage,
      conversationid:currentChat.id
    };
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.id
    );
    console.log(receiverId,"rrrr");
     const u=socketUsers.find((user)=>user.userId ===receiverId)
    console.log(u,"urur>>>>>>>>>>>>>")
    socket.current.emit("sendMessage", {
      senderId: currentUser.id,
      socketId: u.socketId,
      text: newMessage,
    });
      setTextsubmit(false)
    try{
      const docRef = await addDoc(collection(db, "messages"),message);
     
      const docSnap = await getDoc(docRef);
      
      setMessages([...messages,{...docSnap.data(),id:docSnap.id}]);
      setNewMessage("")
   
       }catch (err) {
         console.log(err)
        }
  }
   
  return(
    <MainLayout>
      <div className="flex flex-row">
         <div className="w-2/5">
            {
            
              conversations?
                <div>
                  {conversations.map((conv)=>{
                    console.log(conv)
                     return(
                      <div onClick={()=>setCurrentChat(conv)}>
                       <Conversation conv={conv} currentUser={currentUser}/>
                    </div>
                     )
                    
                  }
                  )} 
                </div>
                :
                <div>
                    <h2 className="absolute   font-medium text-white">No recent conversations.</h2>
                </div>
            }
         </div>
       
     
        <div className="w-3/5">
            {
              currentChat?(
                <div >
                  <div className="relative">
                      {messages.map((message)=>(
                        <>
                         <div>
                            <Messages user={currentUser} message={message} own={message.sender===currentUser.id}/>
                         </div>
                        
                          </>
                          ))}

                    <div className="flex flex-row relative bottom-4">
                         <TextareaAutosize
                           className="text-slate-400 font-medium h-auto rounded-xl  w-3/5 border-2 relative right-7 "
                           placeholder="Message..."
                           onClick={()=>setTextsubmit(true)}
                           onChange={(e)=>setNewMessage(e.target.value)}
                           value={newMessage}
                     />
                     {textsubmit&&
                      <botton onClick={sendMessage}><Badge cname="bg-white border-3 shadow-lg"><MdSend className="text-2xl text-slate-900 font-bold"/></Badge></botton>
                     }
                       { !textsubmit&&
                        <Link to="/videomeet"> <botton ><Badge cname="bg-white border-3 shadow-lg"><HiVideoCamera className="text-2xl text-slate-900 font-bold"/></Badge></botton></Link>
                       }
                     

               </div>

                  </div>
                 
                  
                </div>
              )
                 :
                (
                  <>
                    <h2 className="absolute   font-medium text-white">Open a conversation.</h2>
                  </>
                )
              }
              
            
        </div>
    </div>
    </MainLayout>
  )
}

export default MessengerPage