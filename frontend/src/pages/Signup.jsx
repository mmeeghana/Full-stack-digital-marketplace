import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [fullName, setFullName] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_black] w-80">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
        />
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
        />
        <input
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          placeholder="fullName"
          className="w-full mb-4 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
        />
        <div className="flex space-x-3">
          <button onClick={async ()=>{
                try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                  username,
                  password,
                  fullName,
                });
                if (response.status === 200) {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("signedIn", true);
                  navigate("/dashboard");
                } else {
                  alert("Error signing up. Please try again.");
                }
                } catch (error) {
                console.error("Signup error:", error);
                alert("An error occurred during signup. Please try again later.");
                }
          }} className="bg-yellow-300 cursor-pointer px-4 py-2 border-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110">
            Signup
          </button>
          <button onClick={
            ()=>{
              navigate('/signin');
            }
          } className="bg-gray-300 px-4 py-2 cursor-pointer  border-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110">
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup