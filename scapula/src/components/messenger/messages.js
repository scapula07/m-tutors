

 const Messages=({user,message,own})=> {
  return (
       <>
         <div>
            <div className="bg-blue-500 text-black mt-2 mb-1 rounded-lg max-w-xs pl-2">
               {message.text&&<span>{message.text}</span> }  
               {message.text===""&&<span>No messages</span> }  
               
            </div>
         </div>
       </>
  )
}
export default Messages