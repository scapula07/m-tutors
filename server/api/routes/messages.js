const router = require("express").Router();
const {doc,setDoc,addDoc,collection,getDoc,getDocs,query, where}=require("firebase/firestore")
const{db}=require("../../model/firebase.utils")

router.route("/:convId")
 .get(async(req,res)=>{
    const cid=req.params.convId
    try {
        const q = query(collection(db, "messages"), where("conversationId", "==",cid));
        const msgSnapshot =await getDocs(q)
  
        const messages= msgSnapshot.docs.map((doc)=> ({...doc.data(),id:doc.id}) )
        console.log(messages)
        res.status(200).json(messages)
      } catch (err) {
        res.status(500).json(err);
      }
 })
 .post(async(req,res)=>{
  
    try{
        const docRef = await addDoc(collection(db, "messages"),req.body);
       
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data(),doc.id,"third")
        res.status(200).json({...docSnap.data(),id:docSnap.id});
     
     }catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;