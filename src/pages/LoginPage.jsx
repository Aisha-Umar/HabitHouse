import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'


function LoginPage(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } else {
            console.log(data.message)
        }
    } catch (err) {
        console.error(err)
    }
}

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-purple-900 mb-6">
            Log in to HabitHouse
          </h1>

          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email:e.target.value})} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="password"
            placeholder="Your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <button onClick={handleSubmit} className="w-full bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold">
            Log In
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
}
export default LoginPage
    
    
