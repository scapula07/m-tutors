

import {AiOutlineSearch} from "react-icons/ai"
import "./searchbar.css"
const SearchBar=()=>{

    return(
        <div className=" flex flex-row rounded-full items-center bg-slate-300  px-2 h-5 space-x-2 w-3/4">
            <AiOutlineSearch className="text-sm text-slate-500"/>
           <input type="search" placeholder="search..." className="text-xs text-slate-400 w-10/12 h-full border-0 outline-0 font-lato bg-slate-300 font-light " />
        </div>
    )

}

export default SearchBar