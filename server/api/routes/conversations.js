const router = require("express").Router();
const {doc,setDoc,addDoc,collection,getDoc,getDocs,query, where}=require("firebase/firestore")
const{db}=require("../../model/firebase.utils")


router.route("/:userId")
.get(async (req, res) => {
   const uid=req.params.userId
  
  console.log("dbhbchdc")
 try {
  const q = query(collection(db, "conversations"), where("members", "array-contains",uid));
    
 
   const convSnapshot =await getDocs(q)
  
   const conversations= convSnapshot.docs.map((doc)=> ({...doc.data(),id:doc.id}) )
   console.log(conversations)
   res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err);
  } 
  })

  .post(async(req,res)=>{

    const payload={
      members:[req.body.senderId,req.body.receiverId]
    }
 
    try{
        const docRef = await addDoc(collection(db, "conversations"),payload);
        console.log(docRef)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data(),doc.id,"third")
        res.status(200).json({...docSnap.data(),id:docSnap.id});
     
     }catch (err) {
        res.status(500).json(err);
    }
  })

  module.exports = router;