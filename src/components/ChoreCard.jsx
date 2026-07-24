function ChoreCard({ name, description, recurrence, completed }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-semibold text-purple-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <span className="inline-block mt-2 text-xs font-medium bg-purple-50 text-purple-600 px-2 py-1 rounded-full capitalize">
          {recurrence}
        </span>
      </div>

      <div>
        {completed ? (
          <span className="text-sm font-semibold text-green-600">✓ Done</span>
        ) : (
          <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300">
            Mark Done
          </button>
        )}
      </div>
    </div>
  )
}
export default ChoreCard