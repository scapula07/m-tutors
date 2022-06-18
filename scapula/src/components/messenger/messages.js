

 const Messages=({tutor,message,own})=> {
  return (
       <>
         <div>
            <div className="bg-blue-500 text-white mt-2 mb-1 rounded-lg  pl-2">
                <span>{message.text}</span> 
            </div>
         </div>
       </>
  )
}
export default Messages