import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function MyChoresPage() {
  const { childId } = useParams()
  const [chores, setChores] = useState([])

  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch(`/api/chores/mine?childId=${childId}`, {
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        if (response.ok) {
          setChores(data.chores)
        } else {
          console.log(data.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchChores()
  }, [childId])

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-2xl font-bold text-purple-900 mb-6">My Chores</h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {chores.length === 0 && (
          <p className="text-gray-500">No chores assigned yet.</p>
        )}
        {chores.map(chore => (
          <div
            key={chore.id}
            className="bg-white rounded-xl shadow-sm border border-purple-100 p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-purple-900">{chore.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{chore.description}</p>
              <span className="inline-block mt-2 text-xs font-medium bg-purple-50 text-purple-600 px-2 py-1 rounded-full capitalize">
                {chore.recurrence}
              </span>
            </div>
            <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300">
              Mark Done
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MyChoresPage