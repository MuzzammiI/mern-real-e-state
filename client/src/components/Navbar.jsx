import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <header className="flex flex-row w-screen bg-slate-300 p-4 items-center justify-around">
        <Link to={"/"}>
        <div className="flex flex-row cursor-pointer"> 
            <span className="text-black">Muzzu</span>
            <span className="text-slate-600">Estate</span>
        </div>
        </Link>
        <div>
            <form className=' border-black rounded-lg bg-slate-400 px-2'>
                <input type="search" placeholder="Search"  className="rounded-lg p-2 text-black placeholder-black bg-transparent focus:outline-none " />
                <SearchIcon className='cursor-pointer'/>
            </form>
        </div>
        <div>
            <nav>
                <ul className="flex flex-row items-center justify-center">
                    <Link to={"/"}>
                    <li className="p-2 hidden sm:inline hover:underline">Home</li>
                    </Link>
                    <Link to={"/about"}>
                    <li className="p-2 hidden sm:inline hover:underline">About</li>
                    </Link>
                    <Link to={"/sign-in"}>
                    <li className="p-2 hover:underline">Sign In</li>
                    </Link>
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}
export default Navbar