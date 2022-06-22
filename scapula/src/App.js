import {Routes,Route,BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import {useEffect,useState} from "react"
import Watch from "./pages/watch.js";
import Index from "./pages/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Channel from "./pages/channel";
import MyVideos from "./components/channel/myvideos";
import PlayList from "./components/playlists";
import detectEthereumProvider from "@metamask/detect-provider"
import { collection, addDoc,getDoc,getDocs, doc } from "firebase/firestore"; 
import {db} from "./firebase/firebase.utils"
import {useRecoilState} from "recoil"
import { currentUserState } from "./recoil/globalState";
import { query, where } from "firebase/firestore";  
import Tutors from "./pages/tutors";
import TutorPage from "./pages/tutorpage";
import UserProfile from "./pages/userprofile";
import RequireAuth from "./components/requireAuth";
import MessengerPage from "./pages/messengerpage";
import VideoMeet from "./pages/videomeet";

const App=()=> {
  const [provider,setProvider]=useState({})
  const [currentUser,setCurrentUser] =useRecoilState(currentUserState)
  const [email,setEmail] =useState("")

   const web3loader=async() =>{
      
    const webProvider = await detectEthereumProvider();
    setProvider(webProvider)
     console.log(webProvider)
    if(webProvider){
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log(chainId)
    }
   const accounts = await window.ethereum.request({ method: 'eth_accounts' })
   handleAccountsChanged(accounts)
   }
  useEffect(()=>{
     
      window.addEventListener('load',web3loader)
       window.ethereum.on('accountsChanged', handleAccountsChanged);
      
       return()=>{
        window.removeEventListener('load',web3loader)
       window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
       }
      
       
    },[])
 
    console.log(email)
    const handleAccountsChanged=(accounts)=> {
      let currentAccount =window.localStorage.getItem("currentAccount")
      console.log(currentAccount)
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        alert('Please connect to MetaMask.');
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        window.localStorage.setItem("currentAccount",currentAccount)
       
      }
    }
    const userAuth=async(from)=>{
      let account 
      try{
       const accounts = await window.ethereum.request({method: 'eth_requestAccounts'  })
         console.log(accounts)
         account =accounts[0]
         window.localStorage.setItem("currentAccount",account)
         window.localStorage.setItem("email",email)

         const userRef = collection(db, "users");
             const usersQuery = query(userRef, where("addresses", "array-contains", account));
             const userDocSnapshot =await getDocs(usersQuery)
             console.log(userDocSnapshot.docs.length)
             
             if(userDocSnapshot.docs.length >=1){
              console.log(userDocSnapshot.docs.length , "first")
              userDocSnapshot.docs.map((doc)=>{
                console.log(doc.data())
               // window.localStorage.setItem("currentUser",{...doc.data(),id:doc.id})
                setCurrentUser({...doc.data(),id:doc.id})
              })
              console.log(currentUser)
           }else if(userDocSnapshot.docs.length===0){
            

             const usersQuery = query(userRef, where("email", "==", email));
             const userDocEmailSnapshot =await getDocs(usersQuery)
            

             if(userDocEmailSnapshot.docs.length >=1){
              userDocSnapshot.docs.map((doc)=>{
                console.log(doc.data() +"first")
                //window.localStorage.setItem("currentUser",{...doc.data(),id:doc.id})
                setCurrentUser({...doc.data(),id:doc.id})
              })
              
               
            }else{
              const payload={
                addresses :[account],
                email:email,
                
              }
              const docRef = await addDoc(collection(db, "users"),payload);
              console.log(docRef.id)
              const docSnap = await getDoc(docRef);
              console.log(docSnap.data(),"third")
              //window.localStorage.setItem("currentUser",{...doc.data(),id:doc.id})
              setCurrentUser({...docSnap.data(),id:docSnap.id})
               
            } 
             // from&&navigate(from,{replace:true})
           }
      }catch(error){
         if(error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
         }
         
      }
    }
 
    console.log(currentUser,"created")
  return (
    <div className="App">
     
         <Routes>
            {/**public route */}
           <Route exact path="/"  element={<Index provider={provider} userAuth={userAuth} email={email} setEmail={setEmail} />} />
           <Route  exact path="/watch"  element={<Watch />} />
             {/**Private roues */}
             
                 <Route  exact path="/channel/:id"  element={<Channel />}>
                     <Route exact path="video" element={<MyVideos />}/>
                     <Route exact path="playlists" element={<PlayList />}/>
                 </Route>
                 <Route exact path="/tutors" element={<Tutors />} />
                <Route exact path="/tutor/:id" element={<TutorPage />} />
              <Route exact path="/user/:id" element={<UserProfile />} />
              <Route exact path="/messenger" element={<MessengerPage />}/>
              <Route exact path="/Videomeet" element={<VideoMeet />}/>
           </Routes>
           
     </div>
  );
}

export default App;