import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function ProgressPage() {
  const [progress, setProgress] = useState([])

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/chores/progress/household', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setProgress(data.progress)
        } else {
          console.log(data.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProgress()
  }, [])

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Weekly Progress</h1>
        <div className="space-y-4">
          {progress.map(child => (
            <div key={child.id} className="bg-white rounded-xl shadow-sm border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-purple-900">{child.name}</h3>
                <span className="text-sm font-bold text-purple-600">{child.percentage}%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${child.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProgressPage