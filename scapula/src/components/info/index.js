const Info=({children,isHovering,cname})=>{
    return(
        <>
        
        {isHovering&& (
          <div className={`rounded-lg shadow  text-xs  ${cname}`}>
            {children}
          </div>
        )}
    </>
    )
   
}

export default Info