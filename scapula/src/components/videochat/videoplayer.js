import React from 'react'

 const VideoPlayer=( { name, callAccepted, myVideo, userVideo, callEnded, stream, call } )=> {
  return (
    <div className="flex md:flex-row sm:flex-col space-x-7 ">
       <div className='bg-slate-800 border-3 w-5/6 shadow-lg rounded-lg h-60 '>
        {
            stream&&(
                
                <video 
                  playsInline  
                  ref={myVideo}
                  muted  
                  autoPlay 
                  className="shadow-lg  rounded-lg  w-full max-h-full "
                  >

                  </video>
            )
        
        }
        </div>

        <div className='bg-slate-800 border-3 w-5/6 shadow-lg rounded-lg h-60'>
        
        {
          callAccepted && !callEnded&&(
                <video 
                 playsInline 
                 autoPlay 
                 ref={userVideo}
                 className=" shadow-lg rounded-lg h-full w-full "
                  > 
                </video>
            )

        }
        </div>
    </div>
  )
}
export default VideoPlayer