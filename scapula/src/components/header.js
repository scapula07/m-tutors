import NavBar from "./navbar"
import SearchBar from "./searchbar"
const Header =()=>{

    return(
        <div className="bg-slate-400 mt-3 mx-auto flex flex-row  space-x-4 justify-center ">
            <h1 className="text-2xl font-semibold bg hover:text-stone-500 h-16 text-center inline w-1/4">Scapula</h1>
            <SearchBar />
            <NavBar />
           
        </div>
    )
}

export default Header