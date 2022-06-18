



const SideBar=({children,cname,items})=>{

    return(
        <div className="w-1/4 h-full bg-slate-600 ">
            
            <ol className="flex flex-col justify-center">
                { items.map((item)=>{
                    const {tag,icon}=item
                  return (
                    <li className="m-auto "> {icon}<span className="text-2xl ml-6">{tag}</span></li>
                  )
                })
                 }
                
             </ol>
        </div>
    )
}

export default SideBar