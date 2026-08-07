
import { useState } from 'react'
import Navbar from '../components/Navbar'
import ChoreCard from '../components/ChoreCard'
import CreateChoreModal from '../components/CreateChoreModal'
import AddChildModal from '../components/AddChildModal'
import { useNavigate } from 'react-router-dom'



function Dashboard() {
  const [showModal, setShowModal] = useState(false)
  const [showChildModal, setChildModal] = useState(false)
  const navigate = useNavigate()
  const placeholderChores = [
    { id: 1, name: "Take out trash", description: "Empty all bins", recurrence: "daily", completed: true },
    { id: 2, name: "Vacuum living room", description: "Focus on the rug", recurrence: "weekly", completed: false },
  ]

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-900">Welcome back!</h1>
       
          <button
            onClick={() => navigate("/children")}
            className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            View Children
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            + Add Chore
          </button>
          <button
            onClick={() => setChildModal(true)}
            className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            + Add Child
          </button>
        </div>

        <div className="space-y-4">
          {placeholderChores.map((chore) => (
            <ChoreCard key={chore.id} {...chore} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 shadow-md text-purple-900 font-bold"
            >
              ✕
            </button>
            <CreateChoreModal />
          </div>
        </div>
      )}
      {showChildModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setChildModal(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 shadow-md text-purple-900 font-bold"
            >
              ✕
            </button>
            <AddChildModal />
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard