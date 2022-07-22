import NavBar from "./navbar"
import SearchBar from "./searcbar/searchbar"
const Header =()=>{

    return(
        <div className="flex flex-row items-center pt-2 pb-5 px-1">
            <div className="flex flex-row items-center w-1/4 space-x-4 px-4 d">
                <h1 className="text-lg font-semibold font-lato text-slate-800">Scapula</h1>
                <SearchBar />
            </div>
            
            <div className="w-3/4">
                <NavBar />
            </div>
            
           
        </div>
    )
}

export default Header