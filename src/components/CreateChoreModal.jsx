import { useState } from 'react'
import { useEffect } from 'react'

function CreateChoreModal() {

  const [children, setChildren] = useState([]) 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    recurrence: '',
    assignedTo: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Chore created!")
      } else {
        console.log(data.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">
          Create a chore
        </h1>

        <input
          type="text"
          placeholder="Chore name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <input
          type="text"
          placeholder="Chore description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <select
          value={formData.recurrence}
          onChange={(e) =>
            setFormData({ ...formData, recurrence: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        >
          <option value="">Select recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <select
          value={formData.assignedTo}
          onChange={(e) =>
            setFormData({ ...formData, assignedTo: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        >
          <option value="">Select a child</option>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold"
        >
          Add Chore
        </button>
      </div>
    </div>
  );
}
export default CreateChoreModal