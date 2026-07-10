import { Link } from 'react-router-dom'

function SignUpPage(){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-purple-900 mb-6">
            Create your account
          </h1>

          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="password"
            placeholder="Your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <p className="text-sm text-gray-600 mb-1">I am a...</p>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4">
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>

          <button className="w-full bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold">
            Submit
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
}
export default SignUpPage