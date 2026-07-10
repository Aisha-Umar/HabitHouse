import { Link } from 'react-router-dom'

function LandingPage(){
   return(
   <div className="min-h-screen flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold mb-2">HabitHouse</h1>
      <p className="mb-8">Where good habits start at home.</p>
    
      <div className="flex gap-4">
        <Link to="/signup"><button className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold">Sign up</button></Link>
        <Link to="/login"><button className="border-2 border-purple-900 text-purple-900 px-6 py-3 rounded-xl font-semibold">Log In</button></Link>
        
      </div>
    </div>
   )
   }

   export default LandingPage