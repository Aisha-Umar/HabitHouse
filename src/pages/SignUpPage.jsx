import { Link } from 'react-router-dom'
import { useState } from 'react'

function SignUpPage(){

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        role:'parent',
        householdName:''
    }) 

    const handleSubmit= async (e) => {
            e.preventDefault()

            if(formData.password !== formData.confirmPassword){
                alert('Passwords do not match')
                return 
            }
            const response = await fetch('/api/auth', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
        })
            const data = await response.json()

            if(response.ok){
                console.log("success")
            }
            else{
                console.log(data.message)
            }
        }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-purple-900 mb-6">
            Create your account
          </h1>

          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="text"
            placeholder="Your householdName"
            value={formData.householdName}
            onChange={(e) => setFormData({...formData, householdName: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="password"
            placeholder="Your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <p className="text-sm text-gray-600 mb-1">I am a...</p>
          <select onChange={(e) => setFormData({...formData, role:e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4">
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>

          <button onClick={handleSubmit}  className="w-full bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold">
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
    )
}
export default SignUpPage