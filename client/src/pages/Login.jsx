import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../context/userProvider"

export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
    const response = await login(email, password);

    if (!response.success) {
      setError(response.error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `url('/assets/tealogin.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      }}>
      <div className="max-w-md w-full space-y-8 bg-white p-6 shadow-md border-[#BCC490] border-4">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Log In</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-[#A8A25C] hover:text-[#782F10]">
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
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
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-[#782F10] focus:z-10 sm:text-sm mt-10"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <p className="text-red-500 h-[2rem]">{error}</p>
            <button
              type="submit"
              className="border-[#782F10] border text-[#782F10] hover:bg-[#782F10] hover:text-white font-semibold py-2 px-4 hover:transform hover:-translate-y-1 transition duration-200 w-full"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      <Link to="/" className="absolute top-12 left-20 bg-white p-2 shadow-md font-semibold hover:bg-[#782F10] hover:text-white transition duration-200 border-[#BCC490] border-2">Go Back</Link>
    </div>
  );
}




