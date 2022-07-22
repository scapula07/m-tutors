



const SideBar=({children,cname,items})=>{

    return(
        <div className="w-1/4 h-vh bg-slate-600 pt-4 overflow-auto">
            
            <ol className="flex flex-col justify-center items-center space-y-3">
                { items.map((item)=>{
                    const {tag,icon}=item
                  return (
                    <li className=" flex flex-row items-center w-10/12 px-2 py-1 space-x-1 hover:bg-slate-400 hover:rounded-md hover:shadow  "> {icon}<span className="text-xs font-lato">{tag}</span></li>
                  )
                })
                 }
            
             </ol>
             
        </div>
    )
}

export default SideBar