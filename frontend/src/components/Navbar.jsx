import React from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const Navigate = useNavigate();
    const signedIn = localStorage.getItem("signedIn");
return (
    <div className="flex justify-between bg-black items-center px-6 py-4 border-b-4 border-black">
        <h1 onClick={()=>{Navigate("/signin")}} className="text-5xl font-mono shadow-[4px_4px_0px_0px_black] font-bold text-white cursor-pointer ">GumRoad</h1>
        <div className='flex space-x-4'> 

            <div className="space-x-4">
                <button 
                    onClick={() => {
                        Navigate("/marketplace")
                    }} 
                    className="bg-blue-300 border-2 cursor-pointer shadow-[4px_4px_0px_0px_white] border-black px-4 py-1 rounded transition-transform transform hover:scale-110"
                >
                    Marketplace
                </button>
            </div>
            {signedIn === "true" ? (<div className="space-x-4">
                <button 
                    onClick={() => {
                        Navigate("/dashboard")
                    }} 
                    className="bg-red-300 cursor-pointer border-2 shadow-[4px_4px_0px_0px_white] border-black px-4 py-1 rounded transition-transform transform hover:scale-110"
                >
                    Dashboard
                </button>
                <button 
                    onClick={() => {
                        Navigate("/signin")
                        localStorage.setItem("signedIn", false);
                    }} 
                    className="bg-red-300 cursor-pointer border-2 shadow-[4px_4px_0px_0px_white] border-black px-4 py-1 rounded transition-transform transform hover:scale-110"
                >
                    signout
                </button>
            </div>):(<button 
                    onClick={() => {
                        Navigate("/signin")
                        localStorage.setItem("signedIn", false);
                    }} 
                    className="bg-red-300 cursor-pointer font-ui-sans border-2 shadow-[4px_4px_0px_0px_white] border-black px-4 py-1 rounded transition-transform transform hover:scale-110"
                >
                    Signin
                </button>)}  
            
        </div>
    </div>
)
}

export default Navbar