import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signin = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_black] w-80">
        <h2 className="text-xl font-semibold mb-4 font-ui-sans ">Sign in</h2>
        <input
          type="username"
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username"
          className="w-full mb-3 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border-2 border-black shadow-[4px_4px_0px_0px_black] placeholder-gray-400"
        />
        <div className="flex space-x-3">
          <button onClick={async()=>{
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password,
              });
              if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("signedIn", true);
              Navigate("/dashboard");
              } else {
              alert("Error signing in. Please try again.");
              }
            } catch (error) {
              console.error("Signin error:", error);
              alert("An error occurred while signing in. Please check your credentials and try again.");
            }
          }} className="bg-yellow-300 px-4 py-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-black shadow-[4px_4px_0px_0px_black] cursor-pointer transition-transform transform hover:scale-110">
            Signin
          </button>
          <button onClick={()=>{
            Navigate("/signup")
          }} className="bg-gray-300 px-4 py-2 border-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black shadow-[4px_4px_0px_0px_black] cursor-pointer transition-transform transform hover:scale-110">
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signin