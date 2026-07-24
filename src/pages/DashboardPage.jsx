

import Navbar from '../components/Navbar'
import ChoreCard from '../components/ChoreCard'

function Dashboard() {
  const placeholderChores = [
    { id: 1, name: "Take out trash", description: "Empty all bins", recurrence: "daily", completed: true },
    { id: 2, name: "Vacuum living room", description: "Focus on the rug", recurrence: "weekly", completed: false },
    { id: 3, name: "Feed the dog", description: "Morning and evening", recurrence: "daily", completed: false },
  ]

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Welcome back!</h1>

        <div className="space-y-4">
        {placeholderChores.map(chore =>(
            <ChoreCard key={chore.id} {...chore} />
        ))
        }
        </div>
      </div>
    </div>
  )
}
export default Dashboard