import "../styles/channel.css"

const Modal =({children ,cname,trigger,onClose})=>{
  
    return(
        <>
            { trigger?
            <div className="overlay-style">
                <div className={`modal-upload ${cname}`}>
                   {children}
                </div> 
                
            </div>
         : <div></div>
            
            }

        </>
    )

}

export default Modal