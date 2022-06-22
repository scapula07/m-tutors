import {useState,useEffect} from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import profileImage from "../../images/profile.png"
const Conversation=({conv,currentUser})=>{

    const [friend, setFriend] = useState({});
    useEffect(()=>{
        const friendId = conv.members.find((m) => m !== currentUser.id);
        console.log(friendId)
        
        const getUser=async()=>{
            const docRef = doc(db, "users", friendId);
            const docSnap=await getDoc(docRef);
            setFriend({...docSnap.data(),id:docSnap.id})
            console.log(docSnap.data(),docSnap.id)
          
        }
        getUser()
    },[currentUser,conv])
    console.log(friend,"user")
    return(
        <>
        <div classsName="flex flex-row space-x-5">
            {friend?.imgUrl?<img src={friend.imgUrl} className="w-10 h-10 rounded-full inline"/>:<img src={profileImage} className="w-10 h-10 rounded-full inline"/>}
            <span>{friend?.name}</span>
        </div>
        </>
    )
}
export default Conversation