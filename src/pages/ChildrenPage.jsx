import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ChildrenPage() {
  const [children, setChildren] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch('/api/household/children', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setChildren(data.children)
        } else {
          console.log(data.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchChildren()
  }, [])

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-2xl font-bold text-purple-900 mb-6">Children</h1>
      <div className="max-w-md mx-auto space-y-3">
        {children.map(child => (
          <div
            key={child.id}
            onClick={() => navigate(`/mychores/${child.id}`)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-300 transition-all"
          >
            <span className="font-semibold text-purple-900">{child.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ChildrenPage