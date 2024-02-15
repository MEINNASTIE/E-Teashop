import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(""); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (password.length < 3) {
        setError("Password must be at least 3 characters");
        return;
      }
      const body = {
        email,
        password,
      };
  
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          body
        );
        console.log("🚀 ~ response:", response.data);
  
        if (response.data.success) {
          setMessage("A verification email has been sent to your email address. Please check your inbox and click on the verification link.");
          navigate("/login");
        }
      } catch (error) {
        setError("Registration failed. Please try again.");
      }
    };
  

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{
            backgroundImage: `url('/assets/tealogin.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
      }}>
        <div className="max-w-md w-full space-y-8 bg-white p-6 shadow-md border-[#BCC490] border-4">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
          </div>
          <form className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit} >
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-[#782F10] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-[#782F10] focus:z-10 sm:text-sm mt-10"
                  placeholder="Password"
                />
                 <div
                    className="absolute top-[50%] right-[40.3%] cursor-pointer"
                    onClick={handleTogglePassword}
                  >{showPassword ? 'Hide' : 'Show'}</div>
              </div>
            </div>
            {message && <p className="text-green-500">{message}</p>}
            <p className="text-red-500 h-[2rem]">{error}</p>
            <div>
              <button
                type="submit"
                className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 hover:transform hover:-translate-y-1 transition duration-200 w-full"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  